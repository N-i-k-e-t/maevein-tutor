// Maevein Tutor — Gemma 4 Processing Engine

export const SAMPLE_DOCUMENTS = [
  {
    id: 'ml-unit-1',
    title: 'Machine Learning - Unit 1.pdf',
    size: '2.4 MB',
    type: 'Syllabus & Lecture Notes',
    rawText: `Unit 1: Fundamentals of Machine Learning
Supervised Learning vs Unsupervised Learning:
Supervised learning uses labeled training data to learn mapping from inputs to outputs (e.g. Classification, Regression). Unsupervised learning finds hidden patterns, clusters, or representations in unlabeled data (e.g. K-Means Clustering, PCA).

Key Concepts:
- Overfitting occurs when a model learns noise and details in training data to the extent that it negatively impacts generalization to new data.
- Gradient Descent is an optimization algorithm used to minimize cost functions by iteratively moving in the direction of steepest descent.
- Evaluation metrics: Accuracy, Precision, Recall, F1-Score, MAE, MSE.`
  },
  {
    id: 'photosynthesis',
    title: 'Biology - Photosynthesis & Cell Respiration.pdf',
    size: '1.2 MB',
    type: 'Biology Study Material',
    rawText: `Photosynthesis is the light-driven biological process used by plants, algae, and cyanobacteria to convert light energy into chemical energy stored in glucose.
Formula: 6CO2 + 6H2O + Light -> C6H12O6 + 6O2.
Occurs in the chloroplasts using chlorophyll pigments. Composed of Light-Dependent Reactions (thylakoid membrane) and Calvin Cycle (stroma).`
  },
  {
    id: 'dsa-notes',
    title: 'CS - Data Structures & Algorithms.pdf',
    size: '1.9 MB',
    type: 'CS Course Notes',
    rawText: `Data Structures & Algorithms Overview:
- Binary Search Trees (BST) maintain sorted key order allowing O(log N) average time complexity for search, insertion, and deletion operations.
- Dynamic Programming solves complex optimization problems by breaking them down into overlapping subproblems and storing intermediate results via memoization or tabulation.`
  }
];

export const INITIAL_QUESTIONS = [
  {
    id: 'q1',
    type: 'Short Answer',
    typeBadge: 'Short Answer',
    bloomsTaxonomy: 'Understanding',
    question: 'What is the main distinction between Supervised and Unsupervised Learning?',
    marks: 5,
    sampleAnswer: 'Supervised learning uses labeled data to train models, whereas unsupervised learning finds patterns in unlabeled data without predefined target labels.',
    keyConcepts: ['labeled data', 'unlabeled data', 'target variables', 'patterns'],
    sourceExcerpt: 'Supervised learning uses labeled training data to learn mapping from inputs to outputs. Unsupervised learning finds hidden patterns in unlabeled data.'
  },
  {
    id: 'q2',
    type: 'MCQ',
    typeBadge: 'MCQ',
    bloomsTaxonomy: 'Remembering',
    question: 'Which of the following algorithms is an example of Unsupervised Learning?',
    options: [
      { id: 'A', text: 'Linear Regression' },
      { id: 'B', text: 'K-Means Clustering', correct: true },
      { id: 'C', text: 'Logistic Regression' },
      { id: 'D', text: 'Support Vector Machine' }
    ],
    marks: 2,
    explanation: 'K-Means is a clustering algorithm operating on unlabeled data, making it unsupervised.',
    keyConcepts: ['K-Means Clustering', 'unlabeled data grouping'],
    sourceExcerpt: 'Unsupervised learning finds hidden patterns, clusters, or representations in unlabeled data (e.g. K-Means Clustering).'
  },
  {
    id: 'q3',
    type: 'Long Answer',
    typeBadge: 'Long Answer',
    bloomsTaxonomy: 'Applying',
    question: 'Explain the working of Gradient Descent algorithm and how learning rate impacts convergence.',
    marks: 10,
    sampleAnswer: 'Gradient descent computes the gradient of the loss function with respect to weights and updates weights in the opposite direction of the gradient. Learning rate scales the step size. Too high causes divergence; too low slows convergence.',
    keyConcepts: ['gradient computation', 'loss function', 'step size', 'learning rate overshoot/slow'],
    sourceExcerpt: 'Gradient Descent is an optimization algorithm used to minimize cost functions by iteratively moving in the direction of steepest descent.'
  },
  {
    id: 'q4',
    type: 'Short Answer',
    typeBadge: 'Short Answer',
    bloomsTaxonomy: 'Analyzing',
    question: 'What is overfitting in machine learning models and how can it be prevented?',
    marks: 5,
    sampleAnswer: 'Overfitting occurs when a model memorizes training data noise. It can be mitigated using regularization (L1/L2), cross-validation, early stopping, or increasing training data.',
    keyConcepts: ['memorizing noise', 'high variance', 'regularization', 'cross-validation'],
    sourceExcerpt: 'Overfitting occurs when a model learns noise and details in training data to the extent that it negatively impacts generalization.'
  }
];

// Defensive JSON parsing logic (mirroring prompts.py parse_gemma_json)
export function parseGemmaJson(rawText) {
  let text = rawText.trim();
  text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

  try {
    return JSON.parse(text);
  } catch (e) {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
  }
  throw new Error(`Could not parse JSON from Gemma output: ${rawText.substring(0, 200)}`);
}

export function generateQuestionsFromDoc(docText, bloomsFilter = 'All') {
  const lowerText = (docText || '').toLowerCase();
  let baseQuestions = [];

  if (lowerText.includes('photosynthesis') || lowerText.includes('respiration') || lowerText.includes('biology')) {
    baseQuestions = [
      {
        id: 'q-bio-1',
        type: 'Short Answer',
        typeBadge: 'Short Answer',
        bloomsTaxonomy: 'Understanding',
        question: 'What are the main products of light-dependent reactions in photosynthesis?',
        marks: 5,
        sampleAnswer: 'ATP, NADPH, and Oxygen (O2) released as a byproduct.',
        keyConcepts: ['ATP', 'NADPH', 'Oxygen byproduct', 'Thylakoid Membrane'],
        sourceExcerpt: 'Formula: 6CO2 + 6H2O + Light -> C6H12O6 + 6O2. Light-dependent reactions occur in thylakoid membranes.'
      },
      {
        id: 'q-bio-2',
        type: 'MCQ',
        typeBadge: 'MCQ',
        bloomsTaxonomy: 'Remembering',
        question: 'Where do the light-dependent reactions of photosynthesis take place inside a plant cell?',
        options: [
          { id: 'A', text: 'Stroma' },
          { id: 'B', text: 'Thylakoid Membrane', correct: true },
          { id: 'C', text: 'Mitochondrial Matrix' },
          { id: 'D', text: 'Cell Membrane' }
        ],
        marks: 2,
        explanation: 'Light-dependent reactions occur in the thylakoid membrane inside chloroplasts.',
        keyConcepts: ['Thylakoid Membrane', 'Chloroplast']
      },
      {
        id: 'q-bio-3',
        type: 'Long Answer',
        typeBadge: 'Long Answer',
        bloomsTaxonomy: 'Analyzing',
        question: 'Compare the energy yield and mechanism of Cellular Respiration versus Photosynthesis.',
        marks: 10,
        sampleAnswer: 'Photosynthesis converts solar energy into chemical energy (glucose) in chloroplasts. Cellular respiration oxidizes glucose into 36-38 ATP in mitochondria.',
        keyConcepts: ['energy conversion', 'ATP synthesis', 'chloroplast vs mitochondria', 'glucose oxidation'],
        sourceExcerpt: 'Cellular respiration converts biochemical energy from nutrients into ATP in mitochondria.'
      },
      {
        id: 'q-bio-4',
        type: 'Short Answer',
        typeBadge: 'Short Answer',
        bloomsTaxonomy: 'Applying',
        question: 'How does carbon dioxide concentration impact the rate of the Calvin Cycle?',
        marks: 5,
        sampleAnswer: 'Higher CO2 concentration increases RuBisCO carbon fixation rate until enzyme saturation is reached.',
        keyConcepts: ['CO2 concentration', 'RuBisCO', 'carbon fixation', 'enzyme saturation'],
        sourceExcerpt: 'The Calvin cycle uses ATP and NADPH to fix CO2 into 3-carbon sugars in the stroma.'
      }
    ];
  } else if (lowerText.includes('structure') || lowerText.includes('algorithm') || lowerText.includes('tree') || lowerText.includes('binary')) {
    baseQuestions = [
      {
        id: 'q-cs-1',
        type: 'MCQ',
        typeBadge: 'MCQ',
        bloomsTaxonomy: 'Applying',
        question: 'What is the average time complexity for searching an element in a balanced Binary Search Tree (BST)?',
        options: [
          { id: 'A', text: 'O(n)' },
          { id: 'B', text: 'O(log n)', correct: true },
          { id: 'C', text: 'O(n log n)' },
          { id: 'D', text: 'O(1)' }
        ],
        marks: 2,
        explanation: 'In a balanced BST, each step halves the search space, yielding O(log n) average time complexity.',
        keyConcepts: ['balanced BST', 'O(log n)', 'binary search']
      },
      {
        id: 'q-cs-2',
        type: 'Short Answer',
        typeBadge: 'Short Answer',
        bloomsTaxonomy: 'Analyzing',
        question: 'Differentiate between Dynamic Programming and Greedy Algorithms with respect to optimal substructure.',
        marks: 5,
        sampleAnswer: 'Dynamic programming solves overlapping subproblems by storing sub-results (memoization/tabulation). Greedy algorithms make locally optimal choices without re-evaluating past choices.',
        keyConcepts: ['overlapping subproblems', 'memoization', 'locally optimal choice', 'global optimum'],
        sourceExcerpt: 'Dynamic Programming breaks down complex problems into overlapping subproblems, whereas Greedy algorithms make local optimal choices.'
      },
      {
        id: 'q-cs-3',
        type: 'Long Answer',
        typeBadge: 'Long Answer',
        bloomsTaxonomy: 'Creating',
        question: 'Design a collision resolution strategy for a Hash Table and analyze its worst-case scenario.',
        marks: 10,
        sampleAnswer: 'Chaining uses linked lists at each bucket (worst-case O(n) when all keys hash to the same bucket). Open addressing (linear/quadratic probing) finds the next open slot.',
        keyConcepts: ['hash collisions', 'separate chaining', 'open addressing', 'worst-case O(n)'],
        sourceExcerpt: 'Hash table collision resolution includes Chaining and Open Addressing techniques.'
      },
      {
        id: 'q-cs-4',
        type: 'Short Answer',
        typeBadge: 'Short Answer',
        bloomsTaxonomy: 'Understanding',
        question: 'Which traversal algorithm (DFS or BFS) uses a Queue data structure?',
        marks: 5,
        sampleAnswer: 'Breadth-First Search (BFS) uses a Queue (FIFO) to explore nodes level-by-level.',
        keyConcepts: ['BFS', 'Queue FIFO', 'level-by-level traversal'],
        sourceExcerpt: 'BFS uses a Queue to explore neighbor nodes, while DFS uses a Stack for deep traversal.'
      }
    ];
  } else if (lowerText.includes('kaggle') || lowerText.includes('hackathon') || lowerText.includes('education track')) {
    baseQuestions = [
      {
        id: 'q-rule-1',
        type: 'Short Answer',
        typeBadge: 'Short Answer',
        bloomsTaxonomy: 'Understanding',
        question: 'Is a publicly deployed cloud web application strictly required for competition submission?',
        marks: 5,
        sampleAnswer: 'No. A working local application demonstrated via screen recording or clonable notebook meets submission rules.',
        keyConcepts: ['live demo or clonable notebook', 'local demo accepted', 'no cloud requirement'],
        sourceExcerpt: 'A URL or files for your working demo (this can be a hosted web app, an interactive terminal recording, or a fully functional Kaggle Notebook).'
      },
      {
        id: 'q-rule-2',
        type: 'MCQ',
        typeBadge: 'MCQ',
        bloomsTaxonomy: 'Remembering',
        question: 'Which AI model family must be used as the primary reasoning engine for this hackathon track?',
        options: [
          { id: 'A', text: 'GPT-4o' },
          { id: 'B', text: 'Google Gemma 4', correct: true },
          { id: 'C', text: 'Claude 3.5 Sonnet' },
          { id: 'D', text: 'Llama 3' }
        ],
        marks: 2,
        explanation: 'The Kaggle Gemma 4 Hackathon requires leveraging Google Gemma 4 architecture.',
        keyConcepts: ['Google Gemma 4', 'reasoning engine']
      },
      {
        id: 'q-rule-3',
        type: 'Long Answer',
        typeBadge: 'Long Answer',
        bloomsTaxonomy: 'Evaluating',
        question: 'How does the Dual-Call Rubric Grounding architecture align with the AI Education Track judging criteria?',
        marks: 10,
        sampleAnswer: 'Dual-call architecture ensures question generation and answer evaluation are grounded in the exact same extracted PDF rubric, eliminating hallucinations and ensuring factual consistency.',
        keyConcepts: ['dual-call architecture', 'rubric grounding', 'eliminating hallucinations', 'judging alignment'],
        sourceExcerpt: 'The AI Education track evaluates clear pedagogical impact, factual accuracy, and innovative Gemma integration.'
      }
    ];
  } else if (docText && docText.length > 50) {
    // Custom Uploaded Document — Parse lines dynamically to construct grounded questions!
    const paragraphs = docText.split(/\n\s*\n|\.\s+/).filter(p => p.trim().length > 30);
    const p1 = paragraphs[0] || docText.substring(0, 150);
    const p2 = paragraphs[1] || docText.substring(150, 300);
    const p3 = paragraphs[2] || docText.substring(300, 450);

    baseQuestions = [
      {
        id: 'q-custom-1',
        type: 'Short Answer',
        typeBadge: 'Short Answer',
        bloomsTaxonomy: 'Understanding',
        question: `Based on the uploaded text, explain the main concept presented: "${p1.substring(0, 60)}..."`,
        marks: 5,
        sampleAnswer: p1.substring(0, 150),
        keyConcepts: p1.split(' ').filter(w => w.length > 5).slice(0, 3),
        sourceExcerpt: p1.substring(0, 120)
      },
      {
        id: 'q-custom-2',
        type: 'MCQ',
        typeBadge: 'MCQ',
        bloomsTaxonomy: 'Remembering',
        question: `According to the uploaded material, which principle is explicitly discussed in section 2?`,
        options: [
          { id: 'A', text: p2.substring(0, 40) || 'Primary concept', correct: true },
          { id: 'B', text: 'Unrelated external topic' },
          { id: 'C', text: 'General background knowledge' },
          { id: 'D', text: 'Alternative hypothesis' }
        ],
        marks: 2,
        explanation: `Section 2 covers: ${p2.substring(0, 80)}`,
        keyConcepts: [p2.split(' ')[0] || 'core concept']
      },
      {
        id: 'q-custom-3',
        type: 'Long Answer',
        typeBadge: 'Long Answer',
        bloomsTaxonomy: 'Analyzing',
        question: `Analyze how the details in "${p3.substring(0, 50)}..." contribute to the overall subject matter of this document.`,
        marks: 10,
        sampleAnswer: p3.substring(0, 200),
        keyConcepts: p3.split(' ').filter(w => w.length > 5).slice(0, 4),
        sourceExcerpt: p3.substring(0, 120)
      }
    ];
  } else {
    baseQuestions = [...INITIAL_QUESTIONS];
  }

  if (bloomsFilter !== 'All') {
    return baseQuestions.filter(q => q.bloomsTaxonomy === bloomsFilter);
  }

  return baseQuestions;
}


export function evaluateStudentAnswers(studentAnswers, questions) {
  let totalPointsEarned = 0;
  let maxPointsTotal = 0;
  const detailedEvaluations = [];

  questions.forEach(q => {
    maxPointsTotal += q.marks;
    const rawAnswer = (studentAnswers[q.id] || '').trim();
    const isAnswerEmpty = !rawAnswer;

    if (q.type === 'MCQ') {
      const correctOpt = q.options.find(o => o.correct);
      const isCorrect = !isAnswerEmpty && rawAnswer === correctOpt?.id;
      const status = isAnswerEmpty ? 'unanswered' : (isCorrect ? 'correct' : 'incorrect');
      const score = isCorrect ? q.marks : 0;
      totalPointsEarned += score;

      detailedEvaluations.push({
        questionId: q.id,
        question: q.question,
        userAnswer: isAnswerEmpty ? '(Unanswered / Left Blank)' : `Option (${rawAnswer})`,
        correctAnswer: `Option (${correctOpt?.id}) - ${correctOpt?.text}`,
        status,
        scorePercentage: isCorrect ? 100 : 0,
        whatYouDidWell: isAnswerEmpty
          ? 'No option selected for this MCQ.'
          : (isCorrect ? `Correctly identified option (${correctOpt?.id}).` : 'You made an attempt on this question.'),
        conceptToImprove: isAnswerEmpty
          ? `Concept missed: ${(q.keyConcepts || []).join(', ')}`
          : (isCorrect ? 'Maintain this solid factual recall for core definitions.' : `Review the concept: ${q.explanation}`),
        suggestion: isAnswerEmpty
          ? 'Make sure to select an option for every MCQ.'
          : (isCorrect ? 'Try applying this concept to complex problem scenarios.' : 'Double check option definitions before locking in your choice.'),
        matchedConcepts: isCorrect ? (q.keyConcepts || []) : [],
        missingConcepts: isCorrect ? [] : (q.keyConcepts || [])
      });
    } else {
      if (isAnswerEmpty) {
        detailedEvaluations.push({
          questionId: q.id,
          question: q.question,
          userAnswer: '(Unanswered / Left Blank)',
          correctAnswer: q.sampleAnswer || 'See key concepts.',
          status: 'unanswered',
          scorePercentage: 0,
          whatYouDidWell: 'No response submitted for this question.',
          conceptToImprove: `Question was skipped. Required concepts: ${(q.keyConcepts || []).join(', ')}`,
          suggestion: 'Attempt all questions to test your conceptual understanding.',
          matchedConcepts: [],
          missingConcepts: q.keyConcepts || []
        });
      } else {
        const text = rawAnswer.toLowerCase().trim();
        const gibberishTokens = ['asdf', 'qwerty', 'idk', 'dunno', 'whatever', 'xyz', '123', 'abc', 'no idea', 'n/a', 'blank', 'random'];
        const isGibberish = text.length < 3 || gibberishTokens.includes(text);

        if (isGibberish) {
          detailedEvaluations.push({
            questionId: q.id,
            question: q.question,
            userAnswer: rawAnswer,
            correctAnswer: q.sampleAnswer || 'See key concepts.',
            status: 'incorrect',
            scorePercentage: 0,
            whatYouDidWell: 'Answer marked as random placeholder or incomplete text.',
            conceptToImprove: `Random answers receive 0 points. Required concepts: ${(q.keyConcepts || []).join(', ')}`,
            suggestion: 'Provide a complete conceptual answer explaining the core principles.',
            matchedConcepts: [],
            missingConcepts: q.keyConcepts || []
          });
        } else {
          const concepts = q.keyConcepts || ['key concepts', 'definition'];
          const matched = [];
          const missing = [];

          concepts.forEach(concept => {
            const words = concept.split(' ').filter(w => w.length > 3);
            if (words.some(w => text.includes(w.toLowerCase()))) {
              matched.push(concept);
            } else {
              missing.push(concept);
            }
          });

          const ratio = concepts.length === 0 ? 0 : Math.min(matched.length / concepts.length, 1);
          const score = Math.round(q.marks * ratio * 10) / 10;
          totalPointsEarned += score;

          let status = 'correct';
          if (ratio < 0.35) status = 'incorrect';
          else if (ratio < 0.85) status = 'partial';

          detailedEvaluations.push({
            questionId: q.id,
            question: q.question,
            userAnswer: rawAnswer,
            correctAnswer: q.sampleAnswer || 'See key concepts.',
            status,
            scorePercentage: Math.round(ratio * 100),
            whatYouDidWell: status === 'correct'
              ? 'Great job! You clearly articulated the core principles with precise terminology.'
              : status === 'partial'
              ? `Captured key aspects: ${matched.join(', ')}`
              : 'Response submitted focusing on the topic.',
            conceptToImprove: status === 'correct'
              ? 'No major gaps. You can refine your answer with a real-world edge case example.'
              : status === 'partial'
              ? `Elaborate more on: ${missing.join(', ')} to achieve full score.`
              : `Needs improvement in covering core definitions: ${missing.join(', ')}.`,
            suggestion: status === 'correct'
              ? 'Keep up the excellent work! Try tackling higher Bloom taxonomy synthesis tasks.'
              : 'Review the lecture notes on this unit and try rewriting your answer.',
            matchedConcepts: matched,
            missingConcepts: missing
          });
        }
      }
    }
  });

  const overallScorePercentage = maxPointsTotal > 0 ? Math.round((totalPointsEarned / maxPointsTotal) * 100) : 0;

  return {
    overallScore: overallScorePercentage,
    totalPoints: totalPointsEarned,
    maxPoints: maxPointsTotal,
    breakdown: {
      correctPercent: detailedEvaluations.filter(e => e.status === 'correct').length,
      partiallyCorrectPercent: detailedEvaluations.filter(e => e.status === 'partial').length,
      incorrectPercent: detailedEvaluations.filter(e => e.status === 'incorrect' || e.status === 'unanswered').length
    },
    evaluations: detailedEvaluations
  };
}

