/**
 * ollamaService.js — Real Gemma API client for Maevein Tutor
 *
 * Calls the local Ollama REST API (http://localhost:11434) to run
 * Gemma 4 (or Gemma 3 as fallback) for:
 *   - Question generation from document text
 *   - Student answer evaluation
 *
 * Architecture: mirrors prompts.py dual-call design:
 *   Call 1 → build_question_gen_prompt → generates questions + key_concepts + source_excerpt
 *   Call 2 → build_evaluation_prompt   → grades answer against SAME rubric from Call 1
 */

const OLLAMA_BASE = 'http://localhost:11434';

// Model preference order:
// 1. gemma3-tutor  — custom 1B model, fits GTX 1650 4GB, fast GPU inference
// 2. gemma3:4b     — quality fallback, confirmed working
// 3. gemma3 / gemma2 — generic fallbacks
// NOTE: gemma4 8B crashes on GTX 1650 (GGML graph splitter bug, needs >4GB VRAM)
const MODEL_PRIORITY = ['gemma3-tutor', 'gemma3:4b', 'gemma3', 'gemma2'];

// ─────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────

/**
 * Detect which Gemma model is available in the local Ollama instance.
 * Returns the first matching model name or null if server is unreachable.
 */
export async function detectGemmaModel() {
  try {
    const res = await fetch(`${OLLAMA_BASE}/api/tags`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return null;
    const data = await res.json();
    const names = (data.models || []).map(m => m.name);
    for (const preferred of MODEL_PRIORITY) {
      const found = names.find(n => n === preferred || n.startsWith(preferred + ':'));
      if (found) return found;
    }
    // Return first available if none match preference
    return names[0] || null;
  } catch {
    return null;
  }
}

/**
 * Call Ollama /api/chat — returns the assistant message content string.
 * Throws with a user-friendly message on network/server errors.
 */
async function ollamaChat(model, messages, timeoutMs = 60000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${OLLAMA_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages, stream: false }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(`Ollama error ${res.status}: ${errText.slice(0, 200)}`);
    }

    const data = await res.json();
    const content = data?.message?.content || data?.response || '';
    if (!content.trim()) {
      throw new Error('Gemma returned an empty response. Try a shorter document or fewer questions.');
    }
    return content;
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Gemma timed out. The document may be too long — try a shorter excerpt.');
    }
    if (err.message.includes('fetch') || err.message.includes('Failed')) {
      throw new Error('Cannot reach Ollama. Is it running? Start it with: ollama serve');
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Defensive JSON parser — strips markdown fences, finds first {...} block.
 */
function parseGemmaJson(raw) {
  let text = raw.trim();
  // Strip ```json ... ``` fences
  text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try { return JSON.parse(match[0]); } catch { /* fall through */ }
    }
  }
  throw new Error(`Could not parse JSON from Gemma: ${raw.substring(0, 300)}...`);
}

// ─────────────────────────────────────────────
// CALL 1: Question Generation
// ─────────────────────────────────────────────

const QUESTION_GEN_SYSTEM = `You are an assessment designer for a classroom tool. \
You write questions strictly grounded in the teacher's uploaded material. \
You never introduce facts or terminology not in the supplied text. \
Respond with ONLY valid JSON — no markdown fences, no commentary.`;

/**
 * Generate questions from document text using Gemma.
 *
 * @param {string} docText    - Raw text from uploaded document
 * @param {number} numQ       - Number of questions to generate (default 5)
 * @param {string} model      - Ollama model name (auto-detected if omitted)
 * @param {object} studentProfile - Optional student profile for personalization
 * @returns {Array}           - Array of question objects ready for the app
 */
export async function generateQuestionsViaGemma(docText, numQ = 5, model = null, studentProfile = null) {
  const resolvedModel = model || await detectGemmaModel();
  if (!resolvedModel) {
    throw new Error('No Gemma model found in Ollama. Run: ollama pull gemma3:4b');
  }

  // Truncate very long documents (keep first ~3000 chars to stay within context)
  const excerpt = docText.length > 3000
    ? docText.substring(0, 3000) + '...'
    : docText;

  const studentContext = (studentProfile && studentProfile.studentName)
    ? `\nSTUDENT ADAPTIVE PROFILE (${studentProfile.studentName}):\n` +
      `Historical Weak Concepts to Reinforce: ${(studentProfile.weakConcepts || []).slice(0, 4).join(', ') || 'General review'}.\n` +
      `Ensure at least 1-2 questions directly reinforce these weak concepts grounded in the text.`
    : '';

  const userPrompt = `Read the following study material and write exactly ${numQ} questions.
${studentContext}

For EACH question provide:
- "type": one of "MCQ", "Short Answer", or "Long Answer"
- "bloomsTaxonomy": one of Remembering, Understanding, Applying, Analyzing, Evaluating, Creating
- "question_text": the question string
- "marks": integer (2 for MCQ, 5 for Short Answer, 10 for Long Answer)
- "key_concepts": array of 2-4 specific concepts the answer must demonstrate
- "source_excerpt": 1-2 sentences copied exactly from the material showing where this comes from
- For MCQ also include "options": array of {id, text} objects, and mark the correct one with "correct": true
- For non-MCQ include "sample_answer": a model answer string

Do NOT ask about anything outside the material below.

Respond with ONLY this JSON shape, no other text:
{
  "questions": [
    {
      "id": "q1",
      "type": "MCQ",
      "bloomsTaxonomy": "Remembering",
      "question_text": "...",
      "marks": 2,
      "key_concepts": ["...", "..."],
      "source_excerpt": "...",
      "options": [{"id":"A","text":"..."},{"id":"B","text":"...","correct":true},{"id":"C","text":"..."},{"id":"D","text":"..."}]
    }
  ]
}

MATERIAL:
"""
${excerpt}
"""`;


  const messages = [
    { role: 'system', content: QUESTION_GEN_SYSTEM },
    { role: 'user',   content: userPrompt },
  ];

  const raw = await ollamaChat(resolvedModel, messages, 90000);
  const parsed = parseGemmaJson(raw);

  if (!parsed.questions || !Array.isArray(parsed.questions)) {
    throw new Error('Gemma returned unexpected format — no "questions" array found.');
  }

  // Normalize to app's internal question shape
  return parsed.questions.map((q, i) => ({
    id: `gemma-${Date.now()}-${i}`,
    type: q.type || 'Short Answer',
    typeBadge: q.type || 'Short Answer',
    bloomsTaxonomy: q.bloomsTaxonomy || 'Understanding',
    question: q.question_text || q.question || 'Question text missing',
    marks: q.marks || (q.type === 'MCQ' ? 2 : q.type === 'Long Answer' ? 10 : 5),
    keyConcepts: q.key_concepts || [],
    sourceExcerpt: q.source_excerpt || '',
    sampleAnswer: q.sample_answer || '',
    options: q.options || [],
    explanation: q.explanation || '',
    _generatedByGemma: true,
    _model: resolvedModel,
  }));
}

// ─────────────────────────────────────────────
// CALL 2: Answer Evaluation
// ─────────────────────────────────────────────

const EVALUATOR_SYSTEM = `You are a patient teaching assistant grading a student's answer. \
Grade against the specific source material and key concepts provided — never against general knowledge. \
Explain the student's thinking, not just whether they were right. \
Respond with ONLY valid JSON — no markdown fences, no commentary.`;

/**
 * Evaluate one student answer using Gemma.
 *
 * @param {object} question      - Question object (from generateQuestionsViaGemma)
 * @param {string} studentAnswer - The student's typed answer
 * @param {string} model         - Ollama model name
 * @returns {object}             - Evaluation result object
 */
export async function evaluateAnswerViaGemma(question, studentAnswer, model) {
  const answer = (studentAnswer || '').trim();

  // Strict check: If answer is empty or blank, return 0% Unanswered immediately (no LLM call)
  if (!answer) {
    return {
      status: 'unanswered',
      score_percent: 0,
      understood: [],
      gaps: question.keyConcepts || [],
      whatYouDidWell: 'No response submitted for this question.',
      conceptToImprove: `Question was skipped. Required concepts: ${(question.keyConcepts || []).join(', ')}`,
      suggestion: 'Attempt all questions to test your conceptual understanding.',
      matched_concepts: [],
      missing_concepts: question.keyConcepts || []
    };
  }

  const resolvedModel = model || await detectGemmaModel();
  if (!resolvedModel) throw new Error('No Gemma model available.');

  const userPrompt = `SOURCE MATERIAL EXCERPT:
"""
${question.sourceExcerpt || 'See document.'}
"""

QUESTION: ${question.question}

KEY CONCEPTS AN IDEAL ANSWER COVERS: ${(question.keyConcepts || []).join(', ')}

STUDENT'S ANSWER:
"""
${answer}
"""

Evaluate the student's answer against the key concepts and source material. \
Do not penalize grammar or phrasing — grade understanding only. \
Identify which exact key concepts were correctly demonstrated (matched_concepts) and which were missing or wrong (missing_concepts). \
Respond with ONLY this JSON, no other text:

{
  "status": "correct",
  "score_percent": 85,
  "matched_concepts": ["concept student demonstrated"],
  "missing_concepts": ["concept missing or wrong"],
  "whatYouDidWell": "1-2 sentences on what was correct",
  "conceptToImprove": "specific concept gap with explanation",
  "suggestion": "one concrete actionable next step"
}

"status" must be exactly one of: "correct", "partial", "incorrect", "unanswered"
"score_percent" is an integer 0-100.`;

  const messages = [
    { role: 'system', content: EVALUATOR_SYSTEM },
    { role: 'user',   content: userPrompt },
  ];

  const raw = await ollamaChat(resolvedModel, messages, 60000);
  return parseGemmaJson(raw);
}

/**
 * Evaluate ALL student answers in one pass.
 * MCQ answers are evaluated locally (no LLM call needed).
 * Open-ended answers go through Gemma.
 *
 * @param {object} studentAnswers  - { questionId: answerString }
 * @param {Array}  questions       - Array of question objects
 * @param {string} model           - Ollama model
 * @param {function} onProgress    - Called with (doneCount, totalCount) per question
 * @returns {object}               - Full evaluation result matching app shape
 */
export async function evaluateAllAnswersViaGemma(studentAnswers, questions, model, onProgress) {
  const resolvedModel = model || await detectGemmaModel();
  const detailedEvaluations = [];
  let totalPointsEarned = 0;
  let maxPointsTotal = 0;

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    maxPointsTotal += q.marks;
    const rawAnswer = (studentAnswers[q.id] || '').trim();
    const isAnswerEmpty = !rawAnswer;

    if (q.type === 'MCQ') {
      // MCQ: evaluate locally — no LLM needed
      const correctOpt = (q.options || []).find(o => o.correct);
      const isCorrect = !isAnswerEmpty && rawAnswer === correctOpt?.id;
      const status = isAnswerEmpty ? 'unanswered' : (isCorrect ? 'correct' : 'incorrect');
      const score = isCorrect ? q.marks : 0;
      totalPointsEarned += score;

      detailedEvaluations.push({
        questionId: q.id,
        question: q.question,
        userAnswer: isAnswerEmpty ? '(Unanswered / Left Blank)' : `Option (${rawAnswer})`,
        correctAnswer: correctOpt ? `Option (${correctOpt.id}) — ${correctOpt.text}` : 'N/A',
        status,
        scorePercentage: isCorrect ? 100 : 0,
        whatYouDidWell: isAnswerEmpty
          ? 'No option selected for this MCQ.'
          : (isCorrect ? `Correctly identified option (${correctOpt?.id}).` : 'Attempted the question.'),
        conceptToImprove: isAnswerEmpty
          ? `Concept missed: ${(q.keyConcepts || []).join(', ')}`
          : (isCorrect ? 'Solid recall — try applying this to edge cases.' : `Review: ${q.explanation || (q.keyConcepts || []).join(', ')}`),
        suggestion: isAnswerEmpty
          ? 'Make sure to select an option for every MCQ.'
          : (isCorrect ? 'Explore how this concept applies in complex scenarios.' : 'Re-read the source material and try again.'),
        matchedConcepts: isCorrect ? (q.keyConcepts || []) : [],
        missingConcepts: isCorrect ? [] : (q.keyConcepts || []),
        _evaluatedBy: 'local',
      });
    } else {
      // Open-ended: call Gemma for conceptual evaluation
      let gemmaEval = null;
      if (isAnswerEmpty) {
        gemmaEval = {
          status: 'unanswered',
          score_percent: 0,
          whatYouDidWell: 'No response submitted for this question.',
          conceptToImprove: `Question was skipped. Required concepts: ${(q.keyConcepts || []).join(', ')}`,
          suggestion: 'Attempt all questions to test your conceptual understanding.',
          matched_concepts: [],
          missing_concepts: q.keyConcepts || []
        };
      } else {
        try {
          gemmaEval = await evaluateAnswerViaGemma(q, rawAnswer, resolvedModel);
        } catch (err) {
          console.warn(`Gemma eval failed for q${i + 1}:`, err.message);
          // Graceful degradation: use keyword matching
          gemmaEval = localFallbackEval(q, rawAnswer);
        }
      }

      const scorePercent = gemmaEval.score_percent ?? 0;
      const score = Math.round(q.marks * (scorePercent / 100) * 10) / 10;
      totalPointsEarned += score;

      const status = gemmaEval.status || (isAnswerEmpty ? 'unanswered' : scorePercent >= 80 ? 'correct' : scorePercent >= 40 ? 'partial' : 'incorrect');

      const matchedConcepts = gemmaEval.matched_concepts || gemmaEval.understood || [];
      const missingConcepts = gemmaEval.missing_concepts || gemmaEval.gaps || (status === 'correct' ? [] : q.keyConcepts || []);

      detailedEvaluations.push({
        questionId: q.id,
        question: q.question,
        userAnswer: rawAnswer || '(No answer provided)',
        correctAnswer: q.sampleAnswer || 'See key concepts.',
        status,
        scorePercentage: scorePercent,
        whatYouDidWell: gemmaEval.whatYouDidWell || (matchedConcepts.length > 0 ? `Demonstrated: ${matchedConcepts.join(', ')}` : 'Response recorded.'),
        conceptToImprove: gemmaEval.conceptToImprove || (missingConcepts.length > 0 ? `Needs work on: ${missingConcepts.join(', ')}` : 'Review key concepts.'),
        suggestion: gemmaEval.suggestion || 'Re-read the source material.',
        matchedConcepts,
        missingConcepts,
        _evaluatedBy: isAnswerEmpty ? 'strict-blank-check' : (gemmaEval._fallback ? 'local-fallback' : resolvedModel),
      });
    }

    if (onProgress) onProgress(i + 1, questions.length);
  }

  const overallScore = maxPointsTotal > 0
    ? Math.round((totalPointsEarned / maxPointsTotal) * 100)
    : 0;

  return {
    overallScore,
    totalPoints: totalPointsEarned,
    maxPoints: maxPointsTotal,
    breakdown: {
      correctPercent: detailedEvaluations.filter(e => e.status === 'correct').length,
      partialPercent: detailedEvaluations.filter(e => e.status === 'partial').length,
      incorrectPercent: detailedEvaluations.filter(e => e.status === 'incorrect' || e.status === 'unanswered').length,
    },
    evaluations: detailedEvaluations,
    _model: resolvedModel,
  };
}


// ─────────────────────────────────────────────
// Local fallback evaluation (no Gemma needed)
// ─────────────────────────────────────────────
function localFallbackEval(q, userAnswer) {
  const text = (userAnswer || '').trim().toLowerCase();
  const concepts = q.keyConcepts || [];

  if (!text) {
    return {
      score_percent: 0,
      status: 'unanswered',
      _fallback: true,
      whatYouDidWell: 'No response submitted for this question.',
      conceptToImprove: `Question was skipped. Required concepts: ${concepts.join(', ')}`,
      suggestion: 'Attempt all questions to test your understanding.',
      matched_concepts: [],
      missing_concepts: concepts,
    };
  }

  const matched = [];
  const missing = [];

  concepts.forEach(c => {
    const words = c.split(' ').filter(w => w.length > 3);
    if (words.some(w => text.includes(w.toLowerCase()))) {
      matched.push(c);
    } else {
      missing.push(c);
    }
  });

  const ratio = concepts.length === 0 ? 0.6 : Math.min(matched.length / concepts.length, 1);
  const status = ratio >= 0.8 ? 'correct' : ratio >= 0.4 ? 'partial' : 'incorrect';

  return {
    score_percent: Math.round(ratio * 100),
    status,
    _fallback: true,
    whatYouDidWell: matched.length > 0 ? `Covered concepts: ${matched.join(', ')}` : 'Attempted the question.',
    conceptToImprove: missing.length > 0 ? `Needs more depth on: ${missing.join(', ')}` : 'Great answer!',
    suggestion: ratio < 0.8 ? 'Re-read the relevant section and expand your answer.' : 'Challenge yourself with harder questions.',
    matched_concepts: matched,
    missing_concepts: missing,
  };
}

