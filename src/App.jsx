import React, { useState } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import UploadSection from './components/UploadSection';
import QuestionGenerator from './components/QuestionGenerator';
import StudentTest from './components/StudentTest';
import EvaluationDashboard from './components/EvaluationDashboard';
import PersonalizedFeedback from './components/PersonalizedFeedback';
import LearningInsights from './components/LearningInsights';
import SystemArchitecture from './components/SystemArchitecture';
import ModelSettingsModal from './components/ModelSettingsModal';
import { SAMPLE_DOCUMENTS, INITIAL_QUESTIONS } from './services/gemmaEngine';
import { evaluateAllAnswersViaGemma, detectGemmaModel } from './services/ollamaService';

export default function App() {
  const [currentStep, setCurrentStep] = useState('landing');
  const [selectedDoc, setSelectedDoc] = useState(SAMPLE_DOCUMENTS[0]);
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [studentAnswers, setStudentAnswers] = useState({});
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalProgress, setEvalProgress] = useState({ done: 0, total: 0 });

  // Handlers for step navigation
  const handleProceedToGenerate = () => {
    setCurrentStep('generate');
  };

  const handleStartTest = () => {
    setCurrentStep('test');
  };

  const handleSubmitTest = async (answers) => {
    setStudentAnswers(answers);
    setIsEvaluating(true);
    setEvalProgress({ done: 0, total: questions.length });
    setCurrentStep('evaluating');

    try {
      // Try real Gemma evaluation first
      const model = await detectGemmaModel();
      let result;
      if (model) {
        result = await evaluateAllAnswersViaGemma(
          answers, questions, model,
          (done, total) => setEvalProgress({ done, total })
        );
      } else {
        // Fallback: local evaluation
        const { evaluateStudentAnswers } = await import('./services/gemmaEngine');
        result = evaluateStudentAnswers(answers, questions);
      }
      setEvaluationResult(result);
      setCurrentStep('evaluate-dash');
    } catch (err) {
      console.error('Evaluation error:', err);
      // Last resort fallback
      const { evaluateStudentAnswers } = await import('./services/gemmaEngine');
      const result = evaluateStudentAnswers(answers, questions);
      setEvaluationResult(result);
      setCurrentStep('evaluate-dash');
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleEvaluationComplete = () => {
    setCurrentStep('feedback');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Header Navigation */}
      <Header
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Step Renderer */}
      <main style={{ flex: 1, paddingBottom: '3rem' }}>
        {currentStep === 'landing' && (
          <LandingPage onGetStarted={() => setCurrentStep('upload')} />
        )}

        {currentStep === 'upload' && (
          <UploadSection
            selectedDoc={selectedDoc}
            setSelectedDoc={setSelectedDoc}
            onProceedToGenerate={handleProceedToGenerate}
          />
        )}

        {currentStep === 'generate' && (
          <QuestionGenerator
            questions={questions}
            setQuestions={setQuestions}
            selectedDoc={selectedDoc}
            onStartTest={handleStartTest}
          />
        )}

        {currentStep === 'test' && (
          <StudentTest
            questions={questions}
            onSubmitTest={handleSubmitTest}
          />
        )}

        {currentStep === 'evaluating' && (
          <div className="container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🧠</div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#4f46e5', marginBottom: '0.5rem' }}>
              Gemma 4 is evaluating your answers...
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
          <LearningInsights />
        )}

        {currentStep === 'architecture' && (
          <SystemArchitecture />
        )}
      </main>

      {/* Footer Callout */}
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '1.5rem 2rem', textAlign: 'center', color: '#64748b', fontSize: '0.875rem', background: '#ffffff' }}>
        <p>
          Maevein Tutor (GemmaTutor) — Built with <strong>Gemma 4</strong> by Google DeepMind. 100% Local & Private.
        </p>
      </footer>

      {/* Model Settings Modal */}
      <ModelSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

    </div>
  );
}
