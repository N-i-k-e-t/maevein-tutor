import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import UploadSection from './components/UploadSection';
import QuestionGenerator from './components/QuestionGenerator';
import StudentTest from './components/StudentTest';
import EvaluationDashboard from './components/EvaluationDashboard';
import PersonalizedFeedback from './components/PersonalizedFeedback';
import LearningInsights from './components/LearningInsights';
import SystemArchitecture from './components/SystemArchitecture';
import PresentationDeck from './components/PresentationDeck';
import ModelSettingsModal from './components/ModelSettingsModal';
import { SAMPLE_DOCUMENTS, INITIAL_QUESTIONS, generateQuestionsFromDoc } from './services/gemmaEngine';
import { evaluateAllAnswersViaGemma, detectGemmaModel } from './services/ollamaService';

const INITIAL_TEST_HISTORY = [
  {
    id: 'hist-1',
    studentName: 'Alex Patel',
    docTitle: 'Machine Learning - Unit 1.pdf',
    date: 'Aug 1, 2026',
    overallScore: 85,
    totalQuestions: 4,
    weakConcepts: ['gradient descent', 'learning rate'],
    masteredConcepts: ['supervised learning', 'K-Means']
  },
  {
    id: 'hist-2',
    studentName: 'Alex Patel',
    docTitle: 'Biology - Photosynthesis.pdf',
    date: 'Aug 1, 2026',
    overallScore: 70,
    totalQuestions: 4,
    weakConcepts: ['Calvin Cycle', 'RuBisCO'],
    masteredConcepts: ['light dependent reactions', 'thylakoid']
  }
];

export default function App() {
  const [currentStep, setCurrentStep]       = useState('landing');
  const [selectedDoc, setSelectedDoc]       = useState(null); // no sample auto-selected
  const [questions, setQuestions]           = useState(INITIAL_QUESTIONS);
  const [studentAnswers, setStudentAnswers] = useState({});
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEvaluating, setIsEvaluating]     = useState(false);
  const [evalProgress, setEvalProgress]     = useState({ done: 0, total: 0 });
  const [teacherWisdom, setTeacherWisdom]   = useState(
    'Encouraging & Constructive: Focus on conceptual understanding, highlight strengths, and provide clear step-by-step guidance.'
  );

  // Stores the async loader for PDF pages 11-20
  const nextBatchLoaderRef = useRef(null);

  const [studentName, setStudentNameState] = useState(
    () => localStorage.getItem('maevein_student_name') || 'Alex Patel'
  );

  const [testHistory, setTestHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('maevein_test_history');
      return saved ? JSON.parse(saved) : INITIAL_TEST_HISTORY;
    } catch {
      return INITIAL_TEST_HISTORY;
    }
  });

  const setStudentName = (name) => {
    setStudentNameState(name);
    localStorage.setItem('maevein_student_name', name);
  };

  // ── Background batch loader: fires when user enters the test ──────────────
  useEffect(() => {
    if (currentStep !== 'test') return;
    const loader = nextBatchLoaderRef.current;
    if (!loader) return;

    loader().then(({ additionalText }) => {
      if (!additionalText) return;
      setSelectedDoc(prev => {
        if (!prev) return prev;
        const merged = prev.rawText + '\n\n' + additionalText;
        return { ...prev, rawText: merged, type: prev.type.replace('pages 11-20 load during test', 'pages 11-20 loaded ✓') };
      });
      console.log('[Maevein] Background PDF batch (pages 11-20) loaded successfully.');
    }).catch(err => {
      console.warn('[Maevein] Background batch load failed:', err);
    });
    // Clear so it doesn't re-run
    nextBatchLoaderRef.current = null;
  }, [currentStep]);

  // ── Doc selection ─────────────────────────────────────────────────────────
  const handleSelectDoc = (doc) => {
    setSelectedDoc(doc);
    // For sample docs: generate from their text immediately
    if (doc?.rawText && doc.id !== 'custom-' + Date.now()) {
      const topicQs = generateQuestionsFromDoc(doc.rawText);
      setQuestions(topicQs);
    }
  };

  const handleProceedToGenerate = () => {
    // Don't pre-generate here — QuestionGenerator will call Gemma live if connected
    setCurrentStep('generate');
  };

  const handleStartTest = () => setCurrentStep('test');

  const recordTestHistory = (result) => {
    const weakList   = Array.from(new Set((result.evaluations || []).flatMap(e => e.missingConcepts || [])));
    const masterList = Array.from(new Set((result.evaluations || []).flatMap(e => e.matchedConcepts || [])));
    const entry = {
      id: 'hist-' + Date.now(),
      studentName,
      docTitle: selectedDoc?.title || 'Study Material',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      overallScore: result.overallScore || 0,
      totalQuestions: questions.length,
      weakConcepts: weakList,
      masteredConcepts: masterList
    };
    setTestHistory(prev => {
      const updated = [entry, ...prev];
      try { localStorage.setItem('maevein_test_history', JSON.stringify(updated)); } catch { /* ignore */ }
      return updated;
    });
  };

  const handleSubmitTest = async (answers) => {
    setStudentAnswers(answers);
    setIsEvaluating(true);
    setEvalProgress({ done: 0, total: questions.length });
    setCurrentStep('evaluating');

    try {
      const model = await detectGemmaModel();
      let result;
      if (model) {
        result = await evaluateAllAnswersViaGemma(
          answers, questions, model,
          (done, total) => setEvalProgress({ done, total }),
          teacherWisdom
        );
      } else {
        const { evaluateStudentAnswers } = await import('./services/gemmaEngine');
        result = evaluateStudentAnswers(answers, questions, teacherWisdom);
      }
      setEvaluationResult(result);
      recordTestHistory(result);
      setCurrentStep('evaluate-dash');
    } catch (err) {
      console.error('Evaluation error:', err);
      const { evaluateStudentAnswers } = await import('./services/gemmaEngine');
      const result = evaluateStudentAnswers(answers, questions);
      setEvaluationResult(result);
      recordTestHistory(result);
      setCurrentStep('evaluate-dash');
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleEvaluationComplete = () => setCurrentStep('feedback');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <Header
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        onOpenSettings={() => setIsSettingsOpen(true)}
        studentName={studentName}
      />

      <main style={{ flex: 1, paddingBottom: '3rem' }}>

        {currentStep === 'landing' && (
          <LandingPage onGetStarted={() => setCurrentStep('upload')} />
        )}

        {currentStep === 'upload' && (
          <UploadSection
            selectedDoc={selectedDoc}
            setSelectedDoc={handleSelectDoc}
            onProceedToGenerate={handleProceedToGenerate}
            onSetNextBatch={(fn) => { nextBatchLoaderRef.current = fn; }}
          />
        )}

        {currentStep === 'generate' && (
          <QuestionGenerator
            questions={questions}
            setQuestions={setQuestions}
            selectedDoc={selectedDoc}
            onStartTest={handleStartTest}
            studentName={studentName}
            testHistory={testHistory}
          />
        )}

        {currentStep === 'test' && (
          <StudentTest
            questions={questions}
            onSubmitTest={handleSubmitTest}
            studentName={studentName}
            setStudentName={setStudentName}
            docTitle={selectedDoc?.title}
            topics={selectedDoc?.topics || []}
          />
        )}

        {currentStep === 'evaluating' && (
          <div className="container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🧠</div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#4f46e5', marginBottom: '0.5rem' }}>
              Gemma 4 is evaluating your answers…
            </h2>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
              Analysing conceptual understanding · Reasoning over source material · Building your learning report
            </p>
            {evalProgress.total > 0 && (
              <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.4rem' }}>
                  <span>Question {evalProgress.done} of {evalProgress.total}</span>
                  <span>{Math.round((evalProgress.done / evalProgress.total) * 100)}%</span>
                </div>
                <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(evalProgress.done / evalProgress.total) * 100}%`, background: 'linear-gradient(135deg, #4f46e5, #9333ea)', borderRadius: '999px', transition: 'width 0.4s ease' }} />
                </div>
              </div>
            )}
          </div>
        )}

        {currentStep === 'evaluate-dash' && (
          <EvaluationDashboard
            evaluationResult={evaluationResult}
            onComplete={handleEvaluationComplete}
          />
        )}

        {currentStep === 'feedback' && (
          <PersonalizedFeedback
            evaluationResult={evaluationResult}
            onRetake={() => setCurrentStep('test')}
            onViewInsights={() => setCurrentStep('insights')}
          />
        )}

        {currentStep === 'insights' && (
          <LearningInsights studentName={studentName} testHistory={testHistory} />
        )}

        {currentStep === 'deck' && (
          <PresentationDeck onStartDemo={() => setCurrentStep('upload')} />
        )}

        {currentStep === 'architecture' && (
          <SystemArchitecture />
        )}

      </main>

      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '1.5rem 2rem', textAlign: 'center', color: '#64748b', fontSize: '0.875rem', background: '#ffffff' }}>
        <p>Maevein Tutor — Built with <strong>Gemma 4</strong> by Google DeepMind. 100% Local &amp; Private.</p>
      </footer>

      <ModelSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
