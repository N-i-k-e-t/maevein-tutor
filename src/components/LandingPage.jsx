import React from 'react';
import { Sparkles, Shield, Zap, Target, ArrowRight, CheckCircle2, BookOpen, BrainCircuit } from 'lucide-react';

export default function LandingPage({ onGetStarted }) {
  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      
      {/* Hero Section */}
      <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 4rem auto' }}>
        
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e0e7ff', color: '#4338ca', padding: '0.4rem 1rem', borderRadius: '999px', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          <Sparkles size={16} /> Powered by Gemma 4 by Google DeepMind
        </div>

        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem' }} className="hero-gradient-text">
          Teach Less. <br />Impact More.
        </h1>

        <p style={{ fontSize: '1.2rem', color: '#475569', lineHeight: 1.6, marginBottom: '2.5rem' }}>
          Upload your study material, generate questions across Bloom’s Taxonomy, evaluate student answers with concept-level precision, and deliver actionable personalized feedback—all processed locally with <strong>Gemma 4</strong>.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1.1rem' }} onClick={onGetStarted}>
            Get Started <ArrowRight size={20} />
          </button>
        </div>

        {/* 4 Core Pillars Badges */}
        <div className="grid-4" style={{ marginTop: '3.5rem' }}>
          <div className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Shield style={{ color: '#10b981' }} size={24} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>100% Private</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Runs locally on machine</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Zap style={{ color: '#6366f1' }} size={24} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Gemma 4</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Multimodal AI model</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Target style={{ color: '#a855f7' }} size={24} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Personalized</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Tailored for every student</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <BookOpen style={{ color: '#0d9488' }} size={24} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>For Educators</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>By Educators</div>
            </div>
          </div>
        </div>

      </div>

      {/* Feature Showcase Grid */}
      <div style={{ marginTop: '4rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '2.5rem' }}>
          Complete AI-Driven Educational Workflow
        </h2>

        <div className="grid-3">
          
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <BookOpen size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>1. Upload & Generate</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Upload any syllabus, lecture notes, or competition rules PDF. Gemma 4 automatically synthesizes key concepts and creates high-quality MCQs, short answer, and long answer questions mapped to Bloom’s Taxonomy.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f3e8ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <BrainCircuit size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>2. Intelligent Evaluation</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Move beyond simple keyword matching. Gemma 4 evaluates student responses against conceptual understanding, grading accuracy, nuances, and core subject principles.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <CheckCircle2 size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>3. Actionable Feedback</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Students receive a comprehensive breakdown highlighting exact strengths, precise concepts requiring improvement, and customized learning recommendations for growth.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
