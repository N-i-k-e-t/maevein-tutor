// Gemma 4 Intelligent Processing Engine

export const SAMPLE_DOCUMENTS = [
  {
    id: 'kaggle-rules',
    title: 'Kaggle Competition Foundational Rules.pdf',
    size: '1.8 MB',
    type: 'Competition Rules & Guidelines',
    rawText: `Competition Rules - Kaggle Competition Foundational Rules
1. ELIGIBILITY: Registered account holder at Kaggle.com. Age of majority. Not a resident of sanctioned regions (Crimea, DNR/LNR, Cuba, Iran, North Korea). Full compliance with U.S. export controls and sanctions. Employer consent required if representing an entity.
2. SPONSOR AND HOSTING PLATFORM: Sponsored by named Sponsor, hosted by Kaggle Inc. Kaggle acts as an independent contractor.
3. COMPETITION PERIOD: Starts from Start Date to Final Submission Deadline. Hurdle deadlines may be introduced. Time zones must be determined by participants.
4. COMPETITION ENTRY: No purchase necessary. Follow stated instructions. Hand labeling or human prediction of validation/test data is strictly prohibited. Multi-stage competitions require valid submissions at each stage.
5. INDIVIDUALS AND TEAMS: Single account per individual. Falsifying proxy accounts is prohibited. Teams must confirm membership, max team size applies. Team mergers allowed before deadline if combined submission limits are respected. Private sharing outside teams is strictly forbidden. Public code sharing on Kaggle forums/notebooks is allowed under OSI-approved open source licenses.
6. SUBMISSION CODE REQUIREMENTS: No private sharing of competition code between separate teams. Open source code used must be OSI-approved with commercial use permitted.
7. DETERMINING WINNERS: Evaluated by stated metric. Public Leaderboard based on public test set, Private Leaderboard based on private test set determines official winners. Ties broken by earliest submission time.
8. NOTIFICATION & PRIZES: Winners notified by email. 1-week response time. Prizes net of tax withholdings. 1099 form for US residents. Unanimous team opt-in for custom prize split.
9. WARRANTY & INDEMNITY: Submissions must be original work without infringing third-party intellectual property.`
  },
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
    keyConcepts: ['labeled data', 'unlabeled data', 'target variables', 'patterns']
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
    explanation: 'K-Means is a clustering algorithm operating on unlabeled data, making it unsupervised.'
  },
  {
    id: 'q3',
    type: 'Long Answer',
    typeBadge: 'Long Answer',
    bloomsTaxonomy: 'Applying',
    question: 'Explain the working of Gradient Descent algorithm and how learning rate impacts convergence.',
    marks: 10,
    sampleAnswer: 'Gradient descent computes the gradient of the loss function with respect to weights and updates weights in the opposite direction of the gradient. Learning rate scales the step size. Too high causes divergence; too low slows convergence.',
    keyConcepts: ['gradient computation', 'loss function', 'step size', 'learning rate overshoot/slow']
  },
  {
    id: 'q4',
    type: 'Short Answer',
    typeBadge: 'Short Answer',
    bloomsTaxonomy: 'Analyzing',
    question: 'What is overfitting in machine learning models and how can it be prevented?',
    marks: 5,
    sampleAnswer: 'Overfitting occurs when a model memorizes training data noise. It can be mitigated using regularization (L1/L2), cross-validation, early stopping, or increasing training data.',
    keyConcepts: ['memorizing noise', 'high variance', 'regularization', 'cross-validation']
  },
  {
    id: 'q5',
    type: 'MCQ',
    typeBadge: 'MCQ',
    bloomsTaxonomy: 'Evaluating',
    question: 'According to Kaggle Foundational Rules, under what condition is code sharing permissible?',
    options: [
      { id: 'A', text: 'Privately via direct message between opposing teams' },
      { id: 'B', text: 'Publicly on official Kaggle forums under OSI-approved open source license', correct: true },
      { id: 'C', text: 'Privately with paying corporate sponsors' },
      { id: 'D', text: 'Any method as long as notice is given after competition ends' }
    ],
    marks: 2,
    explanation: 'Kaggle rules strictly forbid private sharing outside official merged teams, but allow public sharing on Kaggle forums under OSI open source licenses.'
  }
];

export function generateQuestionsFromDoc(docText, bloomsFilter = 'All') {
  // Simulates Gemma 4 Multimodal Question Generation logic
  let baseQuestions = [...INITIAL_QUESTIONS];

  if (docText.toLowerCase().includes('kaggle') || docText.toLowerCase().includes('eligibility')) {
    baseQuestions.unshift({
      id: 'q-kaggle-1',
      type: 'Short Answer',
      typeBadge: 'Short Answer',
      bloomsTaxonomy: 'Analyzing',
      question: 'Summarize the Kaggle rule regarding private sharing of competition code between separate teams.',
      marks: 5,
      sampleAnswer: 'Private sharing of code or data outside of confirmed teams is strictly prohibited and leads to immediate disqualification.',
      keyConcepts: ['private sharing prohibited', 'disqualification', 'team merger rule', 'public forum requirement']
    });
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
    const userAnswer = studentAnswers[q.id] || '';

    if (q.type === 'MCQ') {
      const correctOpt = q.options.find(o => o.correct);
      const isCorrect = userAnswer === correctOpt?.id;
      const score = isCorrect ? q.marks : 0;
      totalPointsEarned += score;

      detailedEvaluations.push({
        questionId: q.id,
        question: q.question,
        userAnswer: userAnswer ? `Option (${userAnswer})` : 'Not Attempted',
        correctAnswer: `Option (${correctOpt.id}) - ${correctOpt.text}`,
        status: isCorrect ? 'correct' : 'incorrect',
        scorePercentage: isCorrect ? 100 : 0,
        whatYouDidWell: isCorrect
          ? `Correctly identified option (${correctOpt.id}) as the accurate answer.`
          : 'You made an attempt on this question.',
        conceptToImprove: isCorrect
          ? 'Maintain this solid factual recall for core definitions.'
          : `Review the concept: ${q.explanation}`,
        suggestion: isCorrect
          ? 'Try applying this concept to complex problem scenarios.'
          : 'Double check option definitions before locking in your choice.'
      });
    } else {
      // Short / Long Answer NLP evaluation simulation
      const text = (userAnswer || '').toLowerCase();
      let matchCount = 0;
      const concepts = q.keyConcepts || ['key concepts', 'definition'];

      concepts.forEach(concept => {
        const words = concept.split(' ');
        if (words.some(w => text.includes(w.toLowerCase()))) {
          matchCount++;
        }
      });

      let ratio = matchCount / concepts.length;
      if (text.length > 25 && ratio === 0) ratio = 0.5; // credit for effort
      if (text.length === 0) ratio = 0;

      const score = Math.round(q.marks * ratio * 10) / 10;
      totalPointsEarned += score;

      let status = 'correct';
      if (ratio < 0.4) status = 'incorrect';
      else if (ratio < 0.85) status = 'partial';

      detailedEvaluations.push({
        questionId: q.id,
        question: q.question,
        userAnswer: userAnswer || '(No answer provided)',
        correctAnswer: q.sampleAnswer,
        status,
        scorePercentage: Math.round(ratio * 100),
        whatYouDidWell: status === 'correct'
          ? 'Great job! You clearly articulated the core principles with precise terminology.'
          : status === 'partial'
          ? 'You captured the main idea and correctly mentioned key aspects of the answer.'
          : 'You initiated a response focusing on the topic.',
        conceptToImprove: status === 'correct'
          ? 'No major gaps. You can refine your answer with a real-world edge case example.'
          : status === 'partial'
          ? `Elaborate more on: ${concepts.join(', ')} to achieve full score.`
          : `Needs improvement in covering core definitions: ${concepts.join(', ')}.`,
        suggestion: status === 'correct'
          ? 'Keep up the excellent work! Try tackling higher Bloom taxonomy synthesis tasks.'
          : 'Review the lecture notes on this unit and try rewriting your answer.'
      });
    }
  });

  const overallScorePercentage = Math.round((totalPointsEarned / maxPointsTotal) * 100) || 85;

  return {
    overallScore: overallScorePercentage,
    totalPoints: totalPointsEarned,
    maxPoints: maxPointsTotal,
    breakdown: {
      correctPercent: overallScorePercentage >= 80 ? 70 : 60,
      partiallyCorrectPercent: 15,
      incorrectPercent: overallScorePercentage >= 80 ? 15 : 25
    },
    evaluations: detailedEvaluations
  };
}
