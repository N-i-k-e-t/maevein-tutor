import React, { useState } from 'react';
import { Presentation, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Cpu, Target, Award, Sparkles, BookOpen, Layers } from 'lucide-react';

export default function PresentationDeck({ onStartDemo }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Title & Overview
    {
      title: "Maevein Tutor (GemmaTutor)",
      subtitle: "AI Teaching Assistant for Personalized Learning",
      tag: "Google Gemma 4 Hackathon — AI Education Track",
      content: (
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'linear-gradient(135deg, rgba(79,70,229,0.1), rgba(124,58,237,0.1))',
            border: '1px solid rgba(99,102,241,0.25)',
            borderRadius: '999px',
            padding: '0.5rem 1.25rem',
            marginBottom: '1.5rem',
            color: '#4338ca',
            fontWeight: 700,
            fontSize: '0.9rem'
          }}>
            <Sparkles size={18} /> Powered by Google Gemma 4 Architecture · 100% Local & Private
          </div>

          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: '1rem' }}>
            Moving from <span style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Passive Grading</span> to <span style={{ background: 'linear-gradient(135deg, #059669, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Conceptual Mastery</span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: '#475569', maxWidth: '750px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Maevein Tutor isn't just an automated mark assigner. It synthesizes course PDFs, generates grounded rubric-backed questions, reasons over student responses, and delivers a personalized AI Learning Report to close conceptual gaps.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem', textAlign: 'center' }}>
              <ShieldCheck size={28} style={{ color: '#059669', marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: 700, color: '#0f172a' }}>100% Private</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Zero third-party cloud data leaks</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem', textAlign: 'center' }}>
              <Cpu size={28} style={{ color: '#4f46e5', marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: 700, color: '#0f172a' }}>Dual-Call Rubric</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Factual grounding in source text</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem', textAlign: 'center' }}>
              <Award size={28} style={{ color: '#7c3aed', marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: 700, color: '#0f172a' }}>AI Learning Report</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Strengths, gaps & next path</div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 2: The Core Problem
    {
      title: "The Problem in Modern AI Education",
      subtitle: "Why traditional auto-graders fall short for real learning",
      tag: "Educational Challenge",
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', padding: '1rem 0' }}>
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '16px', padding: '1.5rem' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#991b1b', marginBottom: '0.5rem' }}>❌ Marks Without Context</div>
            <p style={{ fontSize: '0.9rem', color: '#7f1d1d', margin: 0, lineHeight: 1.5 }}>
              Students receive scores like "6/10" but zero understanding of <i>why</i> they lost marks or how to fix their misconceptions.
            </p>
          </div>

          <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '16px', padding: '1.5rem' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#9a3412', marginBottom: '0.5rem' }}>❌ Hallucination & Inconsistency</div>
            <p style={{ fontSize: '0.9rem', color: '#7c2d12', margin: 0, lineHeight: 1.5 }}>
              Generic LLM grading evaluates answers against arbitrary internet training data instead of the teacher's actual course syllabus.
            </p>
          </div>

          <div style={{ background: '#fefce8', border: '1px solid #fef08a', borderRadius: '16px', padding: '1.5rem' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#854d0e', marginBottom: '0.5rem' }}>❌ Student Data Privacy Risks</div>
            <p style={{ fontSize: '0.9rem', color: '#713f12', margin: 0, lineHeight: 1.5 }}>
              Sending student exam papers and institutional study materials to public cloud APIs violates data governance policies.
            </p>
          </div>

          <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '16px', padding: '1.5rem' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#6b21a8', marginBottom: '0.5rem' }}>❌ Keyword Matching Flaws</div>
            <p style={{ fontSize: '0.9rem', color: '#581c87', margin: 0, lineHeight: 1.5 }}>
              Legacy autograders check for exact phrase matches, penalizing creative or paraphrased student answers that are conceptually correct.
            </p>
          </div>
        </div>
      )
    },

    // Slide 3: The Maevein Tutor Solution
    {
      title: "The Solution: Dual-Call Rubric Architecture",
      subtitle: "Grounded, consistent, and educational evaluation",
      tag: "Core Architecture",
      content: (
        <div>
          <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e1b4b)', color: '#ffffff', borderRadius: '20px', padding: '1.75rem', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.85rem', color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '0.75rem' }}>
              Dual-Call Pipeline Flow
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#818cf8' }}>Stage 1: Question & Rubric Gen</div>
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.25rem' }}>Gemma reads PDF ➔ Synthesizes questions + key concepts + source excerpts</div>
              </div>

              <div style={{ textAlign: 'center', fontSize: '1.5rem', color: '#818cf8', fontWeight: 700 }}>➔</div>

              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#34d399' }}>Stage 2: Student Attempt</div>
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.25rem' }}>Student completes MCQs & open-ended questions</div>
              </div>

              <div style={{ textAlign: 'center', fontSize: '1.5rem', color: '#34d399', fontWeight: 700 }}>➔</div>

              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f472b6' }}>Stage 3: Rubric Evaluation</div>
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.25rem' }}>Gemma grades against original rubric ➔ Generates AI Learning Report</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '14px', padding: '1rem' }}>
              <div style={{ fontWeight: 700, color: '#166534', marginBottom: '0.25rem' }}>✓ Factual Grounding</div>
              <div style={{ fontSize: '0.85rem', color: '#15803d' }}>Evaluates strictly against extracted source facts, preventing hallucinations.</div>
            </div>
            <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: '14px', padding: '1rem' }}>
              <div style={{ fontWeight: 700, color: '#3730a3', marginBottom: '0.25rem' }}>✓ Edge GPU Inference</div>
              <div style={{ fontSize: '0.85rem', color: '#4338ca' }}>Runs locally on standard GPUs (e.g., GTX 1650 4GB) via Ollama.</div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 4: AI Learning Report Card
    {
      title: "The AI Learning Report Card",
      subtitle: "Personalized conceptual feedback for every student",
      tag: "User Experience",
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', padding: '0.5rem 0' }}>
          <div style={{ background: 'linear-gradient(135deg, #4f46e5, #4338ca)', color: '#ffffff', borderRadius: '16px', padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'Outfit' }}>85%</div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', opacity: 0.9 }}>Overall Conceptual Score</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.5rem' }}>Evaluated over Bloom's Taxonomy levels</div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem' }}>
            <div style={{ fontWeight: 700, color: '#059669', marginBottom: '0.5rem' }}>💪 Identified Strengths</div>
            <div style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.5 }}>
              • Clear distinction of Supervised vs Unsupervised Learning<br />
              • Perfect identification of clustering algorithms
            </div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem' }}>
            <div style={{ fontWeight: 700, color: '#d97706', marginBottom: '0.5rem' }}>🎯 Needs Improvement</div>
            <div style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.5 }}>
              • Expand depth on loss function optimization<br />
              • Clarify variance vs bias in overfitting
            </div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem' }}>
            <div style={{ fontWeight: 700, color: '#7c3aed', marginBottom: '0.5rem' }}>🚀 Next Learning Path</div>
            <div style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.5 }}>
              1. Gradient Descent Deep Dive<br />
              2. Learning Rate Tuning<br />
              3. Adam Optimizer Principles
            </div>
          </div>
        </div>
      )
    },

    // Slide 5: Hackathon Criteria & Impact
    {
      title: "Competition Alignment & Impact",
      subtitle: "Built for the Kaggle Gemma 4 Hackathon (AI Education Track)",
      tag: "Hackathon Scoring",
      content: (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4f46e5', textTransform: 'uppercase' }}>Gemma 4 Integration (30%)</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0.25rem 0' }}>Native 5-Stage LLM Pipeline</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Extraction, Question Gen, Rubric Synthesis, Evaluation, Feedback.</div>
            </div>

            <div style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>Innovation & Concept (30%)</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0.25rem 0' }}>AI Teacher Paradigm</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Dual-call rubric grounding focused on conceptual mastery.</div>
            </div>

            <div style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase' }}>Quality & UX (20%)</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0.25rem 0' }}>Fast, Mobile-Friendly UI</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Real-time evaluation loader, dark/light mode, full responsiveness.</div>
            </div>

            <div style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ea580c', textTransform: 'uppercase' }}>Writeup & Code (20%)</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0.25rem 0' }}>Open-Source Codebase</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Public GitHub repo with comprehensive setup guides & specs.</div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button
              className="btn btn-primary"
              onClick={onStartDemo}
              style={{ padding: '0.75rem 1.75rem', fontSize: '1rem', borderRadius: '12px' }}
            >
              <Sparkles size={18} style={{ marginRight: '0.5rem' }} /> Try Maevein Tutor Live Demo
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1rem' }}>
      
      {/* Slide Container Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Presentation style={{ color: '#4f46e5' }} size={22} />
          <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a', fontFamily: 'Outfit' }}>
            Maevein Tutor Pitch Deck
          </span>
          <span style={{ background: '#e0e7ff', color: '#4338ca', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '999px' }}>
            Slide {currentSlide + 1} of {slides.length}
          </span>
        </div>

        {/* Slide Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
            style={{ padding: '0.4rem 0.75rem' }}
          >
            <ChevronLeft size={18} /> Prev
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))}
            disabled={currentSlide === slides.length - 1}
            style={{ padding: '0.4rem 0.75rem' }}
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Slide Presentation Card */}
      <div className="card" style={{ padding: '2rem', minHeight: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
        
        <div>
          {/* Tag */}
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            {slides[currentSlide].tag}
          </div>

          {/* Title & Subtitle */}
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: 'Outfit' }}>
            {slides[currentSlide].title}
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#64748b', marginTop: '0.25rem', marginBottom: '1.5rem' }}>
            {slides[currentSlide].subtitle}
          </p>

          {/* Slide Main Content */}
          <div>
            {slides[currentSlide].content}
          </div>
        </div>

        {/* Slide Navigation Indicator Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', pt: '1rem', marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                style={{
                  width: idx === currentSlide ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '999px',
                  background: idx === currentSlide ? '#4f46e5' : '#cbd5e1',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              />
            ))}
          </div>

          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            Google Gemma 4 Competition Presentation
          </span>
        </div>

      </div>

    </div>
  );
}
