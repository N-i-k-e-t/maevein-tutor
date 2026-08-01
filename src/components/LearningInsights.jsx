import React from 'react';
import { TrendingUp, Award, BookCheck, Target, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function LearningInsights() {
  const scoreHistory = [
    { day: 'Mon', score: 65 },
    { day: 'Tue', score: 72 },
    { day: 'Wed', score: 70 },
    { day: 'Thu', score: 80 },
    { day: 'Fri', score: 85 },
    { day: 'Sat', score: 82 },
    { day: 'Sun', score: 92 }
  ];

  return (
    <div className="container" style={{ maxWidth: '1000px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#0f172a' }}>
            Learning Insights
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
            Track student performance and progress over time
          </p>
        </div>

        <select style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontWeight: 600 }}>
          <option>This Week</option>
          <option>This Month</option>
          <option>All Time</option>
        </select>
      </div>

      {/* 4 Stat Summary Cards */}
      <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
        
        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            Tests Taken
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#1e1b4b' }}>
            6
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            Average Score
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#4f46e5' }}>
            82%
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            Improvement
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}>
            +18% <ArrowUpRight size={24} />
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>vs last week</div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            Strong Topics
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#9333ea' }}>
            8
          </div>
        </div>

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
