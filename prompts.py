"""
prompts.py — Gemma 4 prompt templates for Maevein Tutor.

Two prompts, two jobs:
  1. build_question_gen_prompt   -> turns raw PDF text into grounded questions
  2. build_evaluation_prompt     -> grades a student answer against the SAME
                                     source text + the rubric produced in step 1

Design note (lift this straight into PROJECT_CONTEXT.md, "why this
architecture" section):

Question generation doesn't just produce question strings — it also
produces a short `key_concepts` list and `source_excerpt` per question.
That output becomes the grading rubric for step 2. This keeps generation
and evaluation grounded in the SAME extracted facts instead of two
independent LLM calls that could quietly disagree with each other about
what "correct" means. This is the load-bearing use of Gemma 4 for the
rubric's "is the model core to the solution?" criterion — swap this for a
template-based quiz generator and the eval step has nothing reliable left
to grade against.
"""

import json
import re

# ---------------------------------------------------------------------------
# 1. QUESTION GENERATION
# ---------------------------------------------------------------------------

QUESTION_GEN_SYSTEM = """You are an assessment designer for a classroom tool. \
You write short-answer questions strictly grounded in a teacher's own \
uploaded material. You never introduce facts, examples, or terminology that \
do not appear in the supplied text. You always respond with valid JSON only \
— no markdown fences, no commentary before or after the JSON."""


def build_question_gen_prompt(document_text: str, num_questions: int = 5) -> list[dict]:
    """
    Returns an Ollama-style messages list (system + user) ready to pass to
    /api/chat. Uses Gemma 4's native `system` role instead of folding
    instructions into the user turn.

    document_text: raw extracted text from the teacher's PDF
    num_questions: how many questions to generate (5 = MVP default; keep it
                   <=6 — beyond that, quality drops and eval-time cost adds up)
    """
    user_prompt = f"""Read the following study material and write exactly \
{num_questions} short-answer questions that test conceptual understanding \
of it — not just recall of a definition.

For EACH question, also provide:
- 2-4 `key_concepts` the student's answer should demonstrate to be considered
  correct (be specific — not vague like "understands the topic")
- a short `source_excerpt` (1-2 sentences copied from the material below)
  showing exactly where the question comes from

Do not ask about anything not covered in the material below.

Respond with ONLY a JSON object in this exact shape, no other text:

{{
  "questions": [
    {{
      "id": "q1",
      "question_text": "...",
      "key_concepts": ["...", "..."],
      "source_excerpt": "..."
    }}
  ]
}}

MATERIAL:
\"\"\"
{document_text}
\"\"\"
"""
    return [
        {"role": "system", "content": QUESTION_GEN_SYSTEM},
        {"role": "user", "content": user_prompt},
    ]


# ---------------------------------------------------------------------------
# 2. ANSWER EVALUATION
# ---------------------------------------------------------------------------

EVALUATOR_SYSTEM = """You are a patient teaching assistant grading a \
student's short answer. You grade against the specific source material and \
key concepts provided — never against general outside knowledge. Your job \
is to explain the STUDENT'S THINKING, not just whether they were right. \
You always respond with valid JSON only — no markdown fences, no commentary \
before or after the JSON."""


def build_evaluation_prompt(
    question_text: str,
    key_concepts: list[str],
    source_excerpt: str,
    student_answer: str,
) -> list[dict]:
    """
    Grades one answer. Deliberately takes key_concepts + source_excerpt as
    separate fields (produced by build_question_gen_prompt, stored server
    side between the two calls) rather than re-deriving "what's correct"
    from scratch — see module docstring.
    """
    if not student_answer or not student_answer.strip():
        student_answer = "(no answer submitted)"

    user_prompt = f"""SOURCE MATERIAL EXCERPT:
\"\"\"
{source_excerpt}
\"\"\"

QUESTION: {question_text}

KEY CONCEPTS AN IDEAL ANSWER COVERS: {", ".join(key_concepts)}

STUDENT'S ANSWER:
\"\"\"
{student_answer}
\"\"\"

Evaluate the student's answer against the key concepts and source material \
above. Do not penalize wording, grammar, or phrasing — grade understanding \
only. Respond with ONLY a JSON object in this exact shape, no other text:

{{
  "status": "correct" | "partial" | "incorrect",
  "score": <integer 0-3>,
  "understood": ["concept the student got right", "..."],
  "gaps": ["concept missing or wrong — empty list if none", "..."],
  "explanation": "2-3 sentences on WHY the answer is right/partial/wrong — \
name the specific conceptual gap, don't just restate the verdict",
  "suggestion": "one concrete, actionable next step for the student"
}}
"""
    return [
        {"role": "system", "content": EVALUATOR_SYSTEM},
        {"role": "user", "content": user_prompt},
    ]


# ---------------------------------------------------------------------------
# Defensive JSON parsing.
# ---------------------------------------------------------------------------

def parse_gemma_json(raw_text: str) -> dict:
    """Strips markdown fences / stray prose and parses the first {...} block."""
    text = raw_text.strip()
    text = re.sub(r"^```(?:json)?\s*", "", text)
    text = re.sub(r"\s*```$", "", text).strip()

    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    match = re.search(r"\{.*\}", text, re.DOTALL)
    if match:
        return json.loads(match.group(0))

    raise ValueError(f"Could not parse JSON from Gemma output: {raw_text[:200]}...")
