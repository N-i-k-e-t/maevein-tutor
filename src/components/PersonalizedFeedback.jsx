import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, AlertTriangle, Lightbulb, ArrowRight, RotateCcw, BarChart3, ThumbsUp } from 'lucide-react';

export default function PersonalizedFeedback({ evaluationResult, onRetake, onViewInsights }) {
  const result = evaluationResult || {
    overallScore: 85,
    totalPoints: 8.5,
    maxPoints: 10,
    breakdown: { correctPercent: 70, partiallyCorrectPercent: 15, incorrectPercent: 15 },
    evaluations: [
      {
        questionId: 'q1',
        question: 'Q1. What is the difference between Supervised and Unsupervised learning?',
        userAnswer: 'Supervised learning uses labeled data to train a model and predict outputs. Unsupervised learning uses unlabeled data to find patterns and structure without explicit outputs.',
        status: 'correct',
        whatYouDidWell: 'Great! You clearly explained the core difference and mentioned labeled vs unlabeled data.',
        conceptToImprove: 'Add an example for each type to make your answer even stronger.',
        suggestion: 'Try referring to the clustering example for unsupervised learning.'
      },
      {
        questionId: 'q2',
        question: 'Q2. Which of the following is an example of Unsupervised learning?',
        userAnswer: 'Option (B) - K-Means Clustering',
        status: 'correct',
        whatYouDidWell: 'Spot on! K-Means Clustering is an unsupervised algorithm for grouping unlabeled data.',
        conceptToImprove: 'No gaps in concept recall.',
        suggestion: 'Explore how hierarchical clustering differs from K-Means.'
      }
    ]
  };

  useEffect(() => {
    // Trigger celebratory confetti on load if score >= 75%
    if (result.overallScore >= 75) {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [result.overallScore]);

  return (
    <div className="container" style={{ maxWidth: '950px' }}>
      
      {/* Top Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
          Personalized Feedback
        </h2>
        <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
          Detailed insights for better concept retention and growth
        </p>
      </div>

      {/* Score Overview Glass Card */}
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem' }}>
          
          {/* Left: Overall Score Big Metric */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
              Overall Score
            </div>
            <div style={{ fontSize: '4.5rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#10b981', lineHeight: 1 }}>
              {result.overallScore}%
            </div>
            <div style={{ marginTop: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#dcfce7', color: '#15803d', padding: '0.35rem 1rem', borderRadius: '999px', fontWeight: 700 }}>
              <ThumbsUp size={16} /> Well Done! 🎉
            </div>
          </div>

          {/* Center: Donut Chart Visualization */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div className="donut-chart">
              <div className="donut-inner">
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>{result.overallScore}%</span>
                <span style={{ fontSize: '0.65rem', color: '#64748b' }}>Accuracy</span>
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
                <span style={{ fontWeight: 600 }}>Correct</span>
                <span style={{ marginLeft: 'auto', color: '#64748b' }}>{result.breakdown.correctPercent}%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
                <span style={{ fontWeight: 600 }}>Partially Correct</span>
                <span style={{ marginLeft: 'auto', color: '#64748b' }}>{result.breakdown.partiallyCorrectPercent}%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f43f5e' }} />
                <span style={{ fontWeight: 600 }}>Incorrect</span>
                <span style={{ marginLeft: 'auto', color: '#64748b' }}>{result.breakdown.incorrectPercent}%</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Question-by-Question Granular Feedback */}
      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#0f172a' }}>
        Detailed Question Breakdown
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '3rem' }}>
        {result.evaluations.map((item, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '1.75rem' }}>
            
            {/* Question Title & Status */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                  {item.question}
                </h4>
                <div style={{ marginTop: '0.5rem', padding: '0.5rem 0.85rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '3px solid #6366f1', fontSize: '0.9rem', color: '#334155' }}>
                  <strong>Your Answer:</strong> "{item.userAnswer}"
                </div>
              </div>

              <span className={`badge ${item.status === 'correct' ? 'badge-green' : item.status === 'partial' ? 'badge-amber' : 'badge-rose'}`} style={{ flexShrink: 0 }}>
                {item.status.toUpperCase()}
              </span>
            </div>

            {/* 3 Feedback Callouts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1.25rem' }}>
              
              {/* 1. What You Did Well */}
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#065f46', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                  <CheckCircle2 size={18} /> What you did well
                </div>
                <div style={{ fontSize: '0.875rem', color: '#047857' }}>
                  {item.whatYouDidWell}
                </div>
              </div>

              {/* 2. Concept to Improve */}
              <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '12px', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#9f1239', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                  <AlertTriangle size={18} /> Concept to Improve
                </div>
                <div style={{ fontSize: '0.875rem', color: '#be123c' }}>
                  {item.conceptToImprove}
                </div>
              </div>

              {/* 3. Suggestion */}
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#1e40af', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                  <Lightbulb size={18} /> Suggestion & Recommendation
                </div>
                <div style={{ fontSize: '0.875rem', color: '#1d4ed8' }}>
                  {item.suggestion}
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '4rem' }}>
        <button className="btn btn-secondary" onClick={onRetake}>
          <RotateCcw size={18} /> Retake Test
        </button>

        <button className="btn btn-primary" onClick={onViewInsights} style={{ padding: '0.8rem 2rem' }}>
          <BarChart3 size={18} /> View Learning Insights <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
}
