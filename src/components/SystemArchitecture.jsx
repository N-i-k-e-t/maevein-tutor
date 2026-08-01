import React from 'react';
import { Cpu, ShieldCheck, ArrowRight, Layers, FileText, CheckCircle2, Award, Lightbulb, BarChart3, Database } from 'lucide-react';

export default function SystemArchitecture() {
  return (
    <div className="container" style={{ maxWidth: '1100px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e0e7ff', color: '#4338ca', padding: '0.35rem 1rem', borderRadius: '999px', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.75rem' }}>
          <Cpu size={16} /> Technical Architecture
        </div>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#0f172a' }}>
          System Architecture
        </h2>
        <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
          Gemma 4 powered local, private, and offline educational workflow
        </p>
      </div>

      {/* Main Flow Grid: Input -> Gemma 4 Core -> Output */}
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2.5rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr', gap: '1.5rem', alignItems: 'center' }}>
          
          {/* 1. INPUT Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Input Layer
            </div>

            <div style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '14px', border: '1px solid #cbd5e1', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>PDF / Documents</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Syllabus, notes, rules</div>
              </div>
            </div>

            <div style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '14px', border: '1px solid #cbd5e1', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f3e8ff', color: '#7e22ce', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Student Answers</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>MCQ & text responses</div>
              </div>
            </div>
          </div>

          {/* 2. GEMMA 4 CORE Column */}
          <div style={{
            background: 'linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%)',
            borderRadius: '20px',
            padding: '1.75rem',
            border: '2px solid #818cf8',
            boxShadow: 'var(--shadow-md)',
            textAlign: 'center'
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#4f46e5', color: 'white', padding: '0.4rem 1.25rem', borderRadius: '999px', fontWeight: 800, fontSize: '1rem', marginBottom: '1.25rem' }}>
              <Cpu size={18} /> Gemma 4 Core
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                'Multimodal Understanding',
                'Question Generation',
                'Answer Evaluation',
                'Feedback Generation',
                'Recommendations Engine'
              ].map((module, i) => (
                <div key={i} style={{ background: '#ffffff', padding: '0.65rem 1rem', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 700, color: '#312e81', border: '1px solid #c7d2fe' }}>
                  {module}
                </div>
              ))}
            </div>
          </div>

          {/* 3. OUTPUT Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Output Layer
            </div>

            <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FileText size={18} style={{ color: '#6366f1' }} />
              <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Generated Questions</span>
            </div>

            <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Award size={18} style={{ color: '#f59e0b' }} />
              <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Evaluation & Scores</span>
            </div>

            <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Lightbulb size={18} style={{ color: '#10b981' }} />
              <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Personalized Feedback</span>
            </div>

            <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <BarChart3 size={18} style={{ color: '#9333ea' }} />
              <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Learning Insights</span>
            </div>
          </div>

        </div>

      </div>

      {/* Tech Stack Badges */}
      <div className="glass-card" style={{ padding: '1.5rem 2rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#475569' }}>
          Tech Stack & Integrations:
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span className="badge badge-purple" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Gemma 4</span>
          <span className="badge badge-blue" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>LangChain</span>
          <span className="badge badge-green" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>LlamaIndex</span>
          <span className="badge badge-amber" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Ollama Local</span>
          <span className="badge badge-rose" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>React / Vite Web UI</span>
        </div>
      </div>

      {/* 100% Local · Private · Secure Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #10b981, #059669)',
        color: 'white',
        padding: '1.25rem',
        borderRadius: '16px',
        textAlign: 'center',
        fontWeight: 800,
        fontSize: '1.2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        boxShadow: '0 8px 24px rgba(16, 185, 129, 0.25)'
      }}>
        <ShieldCheck size={26} />
        <span>100% Local · Private · Secure — Zero Third-Party Cloud Leaks</span>
      </div>

    </div>
  );
}
