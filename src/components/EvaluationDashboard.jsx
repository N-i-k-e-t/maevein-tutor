import React, { useState, useEffect } from 'react';
import { Brain, CheckCircle2, Loader2, Sparkles, ArrowRight } from 'lucide-react';

export default function EvaluationDashboard({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const evaluationSteps = [
    { title: 'Parsing Student Answers', desc: 'Extracting key phrases and structures' },
    { title: 'Understanding Concepts', desc: 'Mapping answers against subject knowledge graph' },
    { title: 'Evaluating Responses', desc: 'Scoring technical accuracy and concept depth' },
    { title: 'Generating Feedback', desc: 'Synthesizing strengths and improvement areas' },
    { title: 'Finalizing Results', desc: 'Compiling personalized report' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 800);
          return 100;
        }
        const next = prev + 5;
        if (next >= 20 && activeStepIndex === 0) setActiveStepIndex(1);
        if (next >= 45 && activeStepIndex === 1) setActiveStepIndex(2);
        if (next >= 70 && activeStepIndex === 2) setActiveStepIndex(3);
        if (next >= 90 && activeStepIndex === 3) setActiveStepIndex(4);
        return next;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [activeStepIndex, onComplete]);

  return (
    <div className="container" style={{ maxWidth: '800px', textAlign: 'center', padding: '3rem 1.5rem' }}>
      
      <div className="glass-card" style={{ padding: '3rem 2rem' }}>
        
        {/* Header */}
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#0f172a' }}>
          Evaluation Dashboard
        </h2>
        <p style={{ color: '#64748b', fontSize: '1.05rem', marginBottom: '2.5rem' }}>
          AI is evaluating student responses...
        </p>

        {/* Dynamic Progress Circle */}
        <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto 2.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="180" height="180" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="50" cy="50" r="42" stroke="#e2e8f0" strokeWidth="8" fill="transparent" />
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={264}
              strokeDashoffset={264 - (264 * progress) / 100}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.2s linear' }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#0d9488" />
              </linearGradient>
            </defs>
          </svg>

          <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#1e1b4b' }}>
              {progress}%
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
              Progress
            </span>
          </div>
        </div>

        {/* Step Checklist */}
        <div style={{ maxWidth: '480px', margin: '0 auto 2.5rem auto', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {evaluationSteps.map((step, idx) => {
            const isDone = idx < activeStepIndex || progress === 100;
            const isCurrent = idx === activeStepIndex && progress < 100;

            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  background: isCurrent ? '#eef2ff' : '#f8fafc',
                  border: isCurrent ? '1px solid #818cf8' : '1px solid #e2e8f0',
                  transition: 'all 0.3s ease'
                }}
              >
                {isDone ? (
                  <CheckCircle2 size={22} style={{ color: '#10b981', flexShrink: 0 }} />
                ) : isCurrent ? (
                  <Loader2 size={22} className="animate-spin" style={{ color: '#4f46e5', flexShrink: 0 }} />
                ) : (
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: '2px solid #cbd5e1', flexShrink: 0 }} />
                )}

                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: isCurrent ? '#4338ca' : '#1e293b' }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {step.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active AI Status Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #e0e7ff, #f3e8ff)',
          padding: '1rem 1.5rem',
          borderRadius: '16px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: '#4338ca',
          fontWeight: 600,
          fontSize: '0.925rem'
        }}>
          <Brain size={22} className="animate-pulse" />
          <span>Gemma 4 is analyzing understanding and generating personalized feedback...</span>
        </div>

      </div>

    </div>
  );
}
