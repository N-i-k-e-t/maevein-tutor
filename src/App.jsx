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
import { SAMPLE_DOCUMENTS, INITIAL_QUESTIONS, evaluateStudentAnswers } from './services/gemmaEngine';

export default function App() {
  const [currentStep, setCurrentStep] = useState('landing');
  const [selectedDoc, setSelectedDoc] = useState(SAMPLE_DOCUMENTS[0]); // default Kaggle Rules doc
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [studentAnswers, setStudentAnswers] = useState({});
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Handlers for step navigation
  const handleProceedToGenerate = () => {
    setCurrentStep('generate');
  };

  const handleStartTest = () => {
    setCurrentStep('test');
  };

  const handleSubmitTest = (answers) => {
    setStudentAnswers(answers);
    const result = evaluateStudentAnswers(answers, questions);
    setEvaluationResult(result);
    setCurrentStep('evaluate-dash');
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

        {currentStep === 'evaluate-dash' && (
          <EvaluationDashboard
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
