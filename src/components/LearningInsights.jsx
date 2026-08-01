import React from 'react';
import { TrendingUp, Award, BookCheck, Target, ArrowUpRight, CheckCircle2, AlertCircle, User, Clock, FileText } from 'lucide-react';

export default function LearningInsights({ studentName = 'Alex Patel', testHistory = [] }) {
  const totalTests = testHistory.length;
  const avgScore = totalTests > 0
    ? Math.round(testHistory.reduce((sum, h) => sum + (h.overallScore || 0), 0) / totalTests)
    : 0;

  const allWeak = Array.from(new Set(testHistory.flatMap(h => h.weakConcepts || [])));
  const allMastered = Array.from(new Set(testHistory.flatMap(h => h.masteredConcepts || [])));

  return (
    <div className="container" style={{ maxWidth: '1000px' }}>
      
      {/* Header with Student Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            <User size={14} /> Student Profile: {studentName}
          </div>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#0f172a' }}>
            Learning Insights & History
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
            Tracking {studentName}'s historical assessment progress & adaptive learning patterns
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#e0e7ff', color: '#4338ca', padding: '0.45rem 1rem', borderRadius: '12px', fontWeight: 700, fontSize: '0.85rem' }}>
          <Clock size={16} /> Persistent History Saved
        </div>
      </div>

      {/* 4 Stat Summary Cards */}
      <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
        
        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            Tests Taken
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#1e1b4b' }}>
            {totalTests}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            Average Score
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: avgScore >= 75 ? '#10b981' : '#4f46e5' }}>
            {avgScore}%
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            Mastered Concepts
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#10b981' }}>
            {allMastered.length}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            Active Weak Areas
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#9333ea' }}>
            {allWeak.length}
          </div>
        </div>

      </div>

      {/* Historical Test Attempts Table */}
      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={20} style={{ color: '#4f46e5' }} /> Assessment History Log ({testHistory.length})
        </h3>

        {testHistory.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#475569', fontWeight: 700 }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Date</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Study Material / PDF</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Score</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Mastered Concepts</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Reinforcement Areas</th>
                </tr>
              </thead>
              <tbody>
                {testHistory.map((item, idx) => (
                  <tr key={item.id || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#64748b', whiteSpace: 'nowrap' }}>
                      {item.date}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#0f172a' }}>
                      {item.docTitle}
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '999px',
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        background: item.overallScore >= 75 ? '#dcfce7' : item.overallScore >= 50 ? '#fef3c7' : '#ffe4e6',
                        color: item.overallScore >= 75 ? '#15803d' : item.overallScore >= 50 ? '#b45309' : '#be123c'
                      }}>
                        {item.overallScore}%
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                        {(item.masteredConcepts || []).length > 0 ? (
                          item.masteredConcepts.slice(0, 2).map((m, mIdx) => (
                            <span key={mIdx} style={{ background: '#ecfdf5', color: '#047857', padding: '0.15rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>
                              ✓ {m}
                            </span>
                          ))
                        ) : (
                          <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.75rem' }}>None</span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                        {(item.weakConcepts || []).length > 0 ? (
                          item.weakConcepts.slice(0, 2).map((w, wIdx) => (
                            <span key={wIdx} style={{ background: '#fff1f2', color: '#be123c', padding: '0.15rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>
                              • {w}
                            </span>
                          ))
                        ) : (
                          <span style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 600 }}>All clear ✓</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>
            No assessment history recorded yet. Complete a test to track adaptive progress!
          </div>
        )}
      </div>


      {/* Interactive Score Trend Line Chart */}
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: '#0f172a' }}>
          Score Trend (% over time)
        </h3>

        <div style={{ width: '100%', height: '220px', position: 'relative' }}>
          <svg width="100%" height="100%" viewBox="0 0 700 200" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="40" x2="700" y2="40" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="90" x2="700" y2="90" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="140" x2="700" y2="140" stroke="#f1f5f9" strokeWidth="1" />

            {/* Trend Polyline */}
            <path
              d="M 50 140 L 150 110 L 250 120 L 350 70 L 450 50 L 550 60 L 650 20"
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="4"
            />

            {/* Gradient Area under line */}
            <path
              d="M 50 140 L 150 110 L 250 120 L 350 70 L 450 50 L 550 60 L 650 20 L 650 190 L 50 190 Z"
              fill="url(#areaGradient)"
              opacity="0.2"
            />

            {/* Data Points */}
            {[
              { x: 50, y: 140, label: '65%' },
              { x: 150, y: 110, label: '72%' },
              { x: 250, y: 120, label: '70%' },
              { x: 350, y: 70, label: '80%' },
              { x: 450, y: 50, label: '85%' },
              { x: 550, y: 60, label: '82%' },
              { x: 650, y: 20, label: '92%' }
            ].map((pt, i) => (
              <g key={i}>
                <circle cx={pt.x} cy={pt.y} r="6" fill="#4f46e5" stroke="#ffffff" strokeWidth="2" />
                <text x={pt.x} y={pt.y - 12} textAnchor="middle" fontSize="12" fontWeight="700" fill="#4338ca">
                  {pt.label}
                </text>
              </g>
            ))}

            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>
          </svg>

          {/* Days axis labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 2rem', marginTop: '0.5rem', color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>
            {scoreHistory.map(h => <span key={h.day}>{h.day}</span>)}
          </div>
        </div>
      </div>

      {/* Top Strengths & Topics to Improve */}
      <div className="grid-2">
        
        {/* Top Strengths */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.1rem', color: '#065f46', marginBottom: '1.25rem' }}>
            <CheckCircle2 size={20} style={{ color: '#10b981' }} /> Top Strengths
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
            {['Machine Learning Basics', 'Data Preprocessing', 'Clustering', 'Kaggle Rules Compliance', 'Model Generalization', 'MCQ Recall'].map(topic => (
              <span key={topic} className="badge badge-green" style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}>
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Topics to Improve */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.1rem', color: '#9f1239', marginBottom: '1.25rem' }}>
            <AlertCircle size={20} style={{ color: '#f43f5e' }} /> Topics to Improve
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
            {['Neural Networks', 'Gradient Descent Math', 'Overfitting Prevention', 'Hyperparameter Tuning'].map(topic => (
              <span key={topic} className="badge badge-rose" style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}>
                {topic}
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
