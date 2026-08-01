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
  let baseQuestions = [...INITIAL_QUESTIONS];

  if (docText.toLowerCase().includes('photosynthesis')) {
    baseQuestions = [
      {
        id: 'q-bio-1',
        type: 'Short Answer',
        typeBadge: 'Short Answer',
        bloomsTaxonomy: 'Understanding',
        question: 'What are the main outputs of light-driven photosynthesis?',
        marks: 5,
        sampleAnswer: 'Glucose (C6H12O6) and Oxygen (O2).',
        keyConcepts: ['Glucose', 'Oxygen', 'Chemical Energy'],
        sourceExcerpt: 'Formula: 6CO2 + 6H2O + Light -> C6H12O6 + 6O2.'
      },
      {
        id: 'q-bio-2',
        type: 'MCQ',
        typeBadge: 'MCQ',
        bloomsTaxonomy: 'Remembering',
        question: 'Where do the light-dependent reactions of photosynthesis take place?',
        options: [
          { id: 'A', text: 'Stroma' },
          { id: 'B', text: 'Thylakoid Membrane', correct: true },
          { id: 'C', text: 'Mitochondria' },
          { id: 'D', text: 'Cell Wall' }
        ],
        marks: 2,
        explanation: 'Light-dependent reactions occur in the thylakoid membrane inside chloroplasts.'
      }
    ];
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
        const text = rawAnswer.toLowerCase();
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

        const ratio = concepts.length === 0 ? 0.6 : Math.min(matched.length / concepts.length, 1);
        const score = Math.round(q.marks * ratio * 10) / 10;
        totalPointsEarned += score;

        let status = 'correct';
        if (ratio < 0.4) status = 'incorrect';
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

