import React from 'react';
import { BookOpen, Sparkles, Sliders, Cpu, BarChart3, Presentation } from 'lucide-react';

export default function Header({ currentStep, setCurrentStep, onOpenSettings, studentName }) {
  const steps = [
    { id: 'upload', number: 1, label: 'Upload PDF' },
    { id: 'generate', number: 2, label: 'Generate Questions' },
    { id: 'evaluate-dash', number: 3, label: 'Evaluate Answers' },
    { id: 'feedback', number: 4, label: 'Personalized Feedback' }
  ];

  return (
    <header className="app-header">
      <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => setCurrentStep('landing')}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#ffffff'
          }}>
            <img src="/logo.png" alt="Maevein Tutor Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 800, fontFamily: 'Outfit, sans-serif', background: 'linear-gradient(135deg, #1e1b4b, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Maevein Tutor
              </span>
              <span style={{ fontSize: '0.6rem', background: '#e0e7ff', color: '#4338ca', padding: '0.15rem 0.5rem', borderRadius: '999px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                Powered by Gemma 4
              </span>
              {studentName && (
                <span style={{ fontSize: '0.65rem', background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '0.15rem 0.5rem', borderRadius: '999px', fontWeight: 700 }}>
                  👤 {studentName}
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.7rem', color: '#64748b', margin: 0 }}>
              AI-Powered Personalized Learning Assistant
            </p>
          </div>
        </div>


        {/* Workflow Stepper */}
        <nav className="nav-stepper">
          {steps.map((step) => {
            const isActive = currentStep === step.id;
            return (
              <button
                key={step.id}
                className={`step-item ${isActive ? 'active' : ''}`}
                onClick={() => setCurrentStep(step.id)}
              >
                <span className="step-number">{step.number}</span>
                <span className="step-label-text" style={{ display: 'inline' }}>{step.label}</span>
              </button>
            );
          })}
        </nav>

        {/* View Switches & Action Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
          <button
            className={`btn btn-secondary ${currentStep === 'insights' ? 'active' : ''}`}
            onClick={() => setCurrentStep('insights')}
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', minHeight: '38px' }}
          >
            <BarChart3 size={15} /> <span className="step-label-text">Insights</span>
          </button>
          
          <button
            className={`btn btn-secondary ${currentStep === 'deck' ? 'active' : ''}`}
            onClick={() => setCurrentStep('deck')}
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', minHeight: '38px' }}
          >
            <Presentation size={15} /> <span className="step-label-text">Deck</span>
          </button>

          <button
            className={`btn btn-secondary ${currentStep === 'architecture' ? 'active' : ''}`}
            onClick={() => setCurrentStep('architecture')}
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', minHeight: '38px' }}
          >
            <Cpu size={15} /> <span className="step-label-text">Architecture</span>
          </button>

          <button
            className="btn btn-secondary"
            onClick={onOpenSettings}
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', minHeight: '38px' }}
            title="Gemma 4 Model Settings"
          >
            <Sliders size={15} /> <span className="step-label-text">Settings</span>
          </button>
        </div>

      </div>
    </header>
  );
}
