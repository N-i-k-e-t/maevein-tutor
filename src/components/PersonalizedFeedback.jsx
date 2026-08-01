import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Award, CheckCircle2, AlertTriangle, Lightbulb, ArrowRight,
  RotateCcw, BarChart3, ThumbsUp, Brain, TrendingUp, BookOpen, Zap, Target
} from 'lucide-react';

// ─── Derive AI Learning Report from evaluation ────────────────────────────────
function buildLearningReport(result) {
  if (!result) return null;
  const evals = result.evaluations || [];

  const strengths = evals
    .filter(e => e.status === 'correct')
    .flatMap(e => (e._conceptsUnderstood || e.whatYouDidWell?.split('.')[0] ? [e.question?.split(' ').slice(0, 6).join(' ') + '...'] : []));

  const weaknesses = evals
    .filter(e => e.status !== 'correct')
    .map(e => e.conceptToImprove?.split('.')[0] || e.question?.split(' ').slice(0, 6).join(' ') + '...')
    .filter(Boolean);

  // Build next-path from weakness concepts
  const topicMap = {
    gradient: ['Gradient Descent Deep Dive', 'Learning Rate Tuning', 'Adam Optimizer'],
    overfit: ['Regularization (L1/L2)', 'Cross-Validation', 'Dropout Techniques'],
    cluster: ['K-Means In Depth', 'DBSCAN', 'Hierarchical Clustering'],
    photosynthesis: ['Light Reactions Detailed', 'Calvin Cycle Mechanisms', 'Chloroplast Structure'],
    bst: ['AVL Trees', 'Red-Black Trees', 'B-Trees'],
    dynamic: ['Memoization Patterns', 'Tabulation Approach', 'Classic DP Problems'],
    recursion: ['Recursion Trees', 'Tail Recursion', 'Backtracking'],
  };

  let nextTopics = ['Review Core Concepts', 'Practice Application Problems', 'Test on Related Material'];
  for (const [key, topics] of Object.entries(topicMap)) {
    const weakText = weaknesses.join(' ').toLowerCase();
    if (weakText.includes(key)) { nextTopics = topics; break; }
  }

  const readiness = result.overallScore || 0;

  return { strengths, weaknesses, nextTopics, readiness };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function PersonalizedFeedback({ evaluationResult, onRetake, onViewInsights }) {
  const result = evaluationResult || {
    overallScore: 85,
    totalPoints: 8.5,
    maxPoints: 10,
    breakdown: { correctPercent: 2, partialPercent: 1, incorrectPercent: 1 },
    evaluations: [
      {
        questionId: 'q1',
        question: 'What is the difference between Supervised and Unsupervised Learning?',
        userAnswer: 'Supervised uses labeled data, unsupervised finds patterns in unlabeled data.',
        status: 'correct', scorePercentage: 95,
        whatYouDidWell: 'Clearly explained the core distinction with correct terminology.',
        conceptToImprove: 'No significant gaps. Consider adding real-world examples.',
        suggestion: 'Try explaining how K-Means relates to unsupervised learning.'
      },
      {
        questionId: 'q2',
        question: 'Which algorithm is an example of Unsupervised Learning?',
        userAnswer: 'Option (B)',
        status: 'correct', scorePercentage: 100,
        whatYouDidWell: 'Correctly identified K-Means as unsupervised.',
        conceptToImprove: 'No improvement needed.',
        suggestion: 'Explore how hierarchical clustering differs from K-Means.'
      }
    ]
  };

  const report = buildLearningReport(result);
  const modelUsed = result._model;

  useEffect(() => {
    if (result.overallScore >= 75) {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    }
  }, [result.overallScore]);

  const scoreColor = result.overallScore >= 80 ? '#10b981' : result.overallScore >= 60 ? '#f59e0b' : '#f43f5e';
  const scoreLabel = result.overallScore >= 80 ? 'Excellent! 🎉' : result.overallScore >= 60 ? 'Good Progress 👍' : 'Keep Practising 💪';

  const correctCount  = result.evaluations?.filter(e => e.status === 'correct').length  || 0;
  const partialCount  = result.evaluations?.filter(e => e.status === 'partial').length  || 0;
  const incorrectCount = result.evaluations?.filter(e => e.status === 'incorrect').length || 0;
  const total = result.evaluations?.length || 1;

  return (
    <div className="container" style={{ maxWidth: '960px' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e0e7ff', color: '#4338ca', padding: '0.35rem 1rem', borderRadius: '999px', fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.75rem' }}>
          <Brain size={15} /> Gemma 4 — Personalized Learning Report
        </div>
        <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
          Your Personalized Feedback
        </h2>
        <p style={{ color: '#64748b', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
          Conceptual understanding analysis · not just marks
          {modelUsed && <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', background: '#e0e7ff', color: '#4338ca', padding: '0.15rem 0.5rem', borderRadius: '999px' }}>via {modelUsed}</span>}
        </p>
      </div>

      {/* Score Overview */}
      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1.5rem' }}>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Overall Score</div>
            <div style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: scoreColor, lineHeight: 1 }}>
              {result.overallScore}%
            </div>
            <div style={{ marginTop: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: scoreColor + '22', color: scoreColor, padding: '0.3rem 0.9rem', borderRadius: '999px', fontWeight: 700, fontSize: '0.875rem' }}>
              <ThumbsUp size={14} /> {scoreLabel}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div className="donut-chart" style={{ background: `conic-gradient(#10b981 0% ${(correctCount/total)*100}%, #f59e0b ${(correctCount/total)*100}% ${((correctCount+partialCount)/total)*100}%, #f43f5e ${((correctCount+partialCount)/total)*100}% 100%)` }}>
              <div className="donut-inner">
                <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>{result.overallScore}%</span>
                <span style={{ fontSize: '0.6rem', color: '#64748b' }}>Score</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem' }}>
              {[
                { label: 'Correct', count: correctCount, color: '#10b981' },
                { label: 'Partial', count: partialCount, color: '#f59e0b' },
                { label: 'Incorrect', count: incorrectCount, color: '#f43f5e' },
              ].map(({ label, count, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                  <span style={{ fontWeight: 600 }}>{label}</span>
                  <span style={{ marginLeft: 'auto', color: '#64748b' }}>{count} q</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ★ AI Learning Report Card ★ */}
      {report && (
        <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #0d9488 100%)', borderRadius: '20px', padding: '2rem', marginBottom: '1.75rem', color: 'white', boxShadow: '0 16px 48px rgba(79,70,229,0.35)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Brain size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>AI Learning Report</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.75 }}>Generated by Gemma 4 · Based on your answers</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>

            {/* Strengths */}
            <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.4)', borderRadius: '14px', padding: '1.1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.75rem', color: '#6ee7b7' }}>
                <CheckCircle2 size={16} /> Strengths
              </div>
              {(report.strengths.length > 0 ? report.strengths : ['Good conceptual effort', 'Attempted all questions']).slice(0, 3).map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.82rem', marginBottom: '0.35rem', opacity: 0.9 }}>
                  <span style={{ color: '#6ee7b7', flexShrink: 0 }}>✓</span> {s}
                </div>
              ))}
            </div>

            {/* Needs Improvement */}
            <div style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '14px', padding: '1.1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.75rem', color: '#fcd34d' }}>
                <Target size={16} /> Needs Improvement
              </div>
              {(report.weaknesses.length > 0 ? report.weaknesses : ['Deepen conceptual explanations', 'Add source-specific examples']).slice(0, 3).map((w, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.82rem', marginBottom: '0.35rem', opacity: 0.9 }}>
                  <span style={{ color: '#fcd34d', flexShrink: 0 }}>•</span> {w}
                </div>
              ))}
            </div>

            {/* Next Learning Path */}
            <div style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', borderRadius: '14px', padding: '1.1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.75rem', color: '#a5b4fc' }}>
                <TrendingUp size={16} /> Next Learning Path
              </div>
              {report.nextTopics.map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', marginBottom: '0.35rem', opacity: 0.9 }}>
                  <span style={{ background: 'rgba(165,180,252,0.3)', borderRadius: '50%', width: '18px', height: '18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Readiness Meter */}
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>
                <Zap size={15} style={{ display: 'inline', marginRight: '0.3rem' }} />
                Estimated Topic Readiness
              </span>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: report.readiness >= 75 ? '#6ee7b7' : report.readiness >= 50 ? '#fcd34d' : '#fca5a5' }}>
                {report.readiness}%
              </span>
            </div>
            <div style={{ height: '8px', background: 'rgba(255,255,255,0.15)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${report.readiness}%`, background: report.readiness >= 75 ? '#10b981' : report.readiness >= 50 ? '#f59e0b' : '#f43f5e', borderRadius: '999px', transition: 'width 0.6s ease' }} />
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.65, marginTop: '0.35rem' }}>
              {report.readiness >= 80 ? 'Ready to advance to the next topic!' : report.readiness >= 60 ? 'Good foundation — reinforce weak areas before advancing.' : 'Review source material and retry before moving on.'}
            </div>
          </div>
        </div>
      )}

      {/* Question-by-Question Feedback */}
      <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 700, marginBottom: '1.25rem', color: '#0f172a' }}>
        Detailed Question Breakdown
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', marginBottom: '2.5rem' }}>
        {result.evaluations.map((item, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.875rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                  Q{idx + 1}. {item.question}
                </h4>
                <div style={{ padding: '0.45rem 0.8rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '3px solid #6366f1', fontSize: '0.85rem', color: '#334155' }}>
                  <strong>Your answer:</strong> "{String(item.userAnswer).substring(0, 120)}{String(item.userAnswer).length > 120 ? '...' : ''}"
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem', flexShrink: 0 }}>
                <span className={`badge ${item.status === 'correct' ? 'badge-green' : item.status === 'partial' ? 'badge-amber' : 'badge-rose'}`}>
                  {(item.status || 'scored').toUpperCase()}
                </span>
                {item.scorePercentage !== undefined && (
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{item.scorePercentage}%</span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '10px', padding: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: '#065f46', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                  <CheckCircle2 size={15} /> What you did well
                </div>
                <div style={{ fontSize: '0.83rem', color: '#047857', lineHeight: 1.5 }}>{item.whatYouDidWell}</div>
              </div>

              {item.status !== 'correct' && (
                <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '10px', padding: '0.875rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: '#9f1239', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                    <AlertTriangle size={15} /> Concept to improve
                  </div>
                  <div style={{ fontSize: '0.83rem', color: '#be123c', lineHeight: 1.5 }}>{item.conceptToImprove}</div>
                </div>
              )}

              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: '#1e40af', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                  <Lightbulb size={15} /> Next step
                </div>
                <div style={{ fontSize: '0.83rem', color: '#1d4ed8', lineHeight: 1.5 }}>{item.suggestion}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        <button className="btn btn-secondary" onClick={onRetake}>
          <RotateCcw size={16} /> Retake Test
        </button>
        <button className="btn btn-primary" onClick={onViewInsights} style={{ padding: '0.8rem 1.75rem' }}>
          <BarChart3 size={16} /> View Learning Insights <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
}
