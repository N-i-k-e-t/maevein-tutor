import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Award, CheckCircle2, AlertTriangle, Lightbulb, ArrowRight,
  RotateCcw, BarChart3, ThumbsUp, Brain, TrendingUp, BookOpen, Zap, Target
} from 'lucide-react';

// ─── Derive 100% Personalized AI Learning Report ────────────────────────────────
function buildLearningReport(result) {
  if (!result) return null;
  const evals = result.evaluations || [];

  const strengths = [];
  const weaknesses = [];

  evals.forEach((e, idx) => {
    const isUnanswered = e.status === 'unanswered' || !e.userAnswer || e.userAnswer === '(No answer provided)' || e.userAnswer === '(Unanswered / Left Blank)';
    if (!isUnanswered && (e.status === 'correct' || e.scorePercentage >= 80)) {
      const conceptStr = (e.matchedConcepts && e.matchedConcepts.length > 0)
        ? e.matchedConcepts.slice(0, 2).join(', ')
        : (e.question ? e.question.split(' ').slice(0, 5).join(' ') : `Question ${idx+1}`);
      strengths.push(`Q${idx+1}: Mastered ${conceptStr}`);
    } else if (isUnanswered) {
      const missingStr = (e.missingConcepts && e.missingConcepts.length > 0)
        ? e.missingConcepts.slice(0, 2).join(', ')
        : 'Skipped answer';
      weaknesses.push(`Q${idx+1} Skipped — Missed concepts: ${missingStr}`);
    } else {
      const missingStr = (e.missingConcepts && e.missingConcepts.length > 0)
        ? e.missingConcepts.slice(0, 2).join(', ')
        : (e.conceptToImprove ? e.conceptToImprove.substring(0, 45) : 'Needs detail');
      weaknesses.push(`Q${idx+1} Partial — Focus on: ${missingStr}`);
    }
  });

  const nextTopics = [];
  if (weaknesses.length === 0) {
    nextTopics.push('Advance to higher-order synthesis & complex problem sets');
    nextTopics.push('Explore real-world case studies & advanced applications');
    nextTopics.push('Take a timed challenge test on adjacent syllabus topics');
  } else {
    evals.forEach((e, idx) => {
      const isUnanswered = e.status === 'unanswered' || !e.userAnswer || e.userAnswer === '(No answer provided)' || e.userAnswer === '(Unanswered / Left Blank)';
      if (isUnanswered) {
        const topMiss = e.missingConcepts?.[0] || 'core section';
        nextTopics.push(`Re-read source notes on ${topMiss} & attempt Q${idx+1}`);
      } else if (e.status !== 'correct' && e.scorePercentage < 80) {
        const topMiss = e.missingConcepts?.[0] || 'key detail';
        nextTopics.push(`Review ${topMiss} nuances to boost Q${idx+1} clarity`);
      }
    });
    if (nextTopics.length < 3) {
      nextTopics.push('Re-attempt test after 15-minute focused review session');
    }
  }

  const readiness = result.overallScore || 0;

  return { strengths, weaknesses, nextTopics, readiness };
}

// ─── Interactive Visual Mindmap Component ───────────────────────────────────────
function PersonalizedMindmap({ evaluations, overallScore }) {
  if (!evaluations || evaluations.length === 0) return null;

  return (
    <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.75rem', color: '#f8fafc' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Brain size={20} style={{ color: '#38bdf8' }} />
          <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#f8fafc' }}>Gemma 4 Personalized Learning Mindmap</span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', fontWeight: 600 }}>
          <span style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>● Mastered</span>
          <span style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>● Partial</span>
          <span style={{ color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>● Priority Review</span>
        </div>
      </div>

      {/* Visual Node Graph */}
      <div style={{ background: '#1e293b', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
        
        {/* Root Node */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white', padding: '0.6rem 1.25rem', borderRadius: '999px', fontWeight: 800, fontSize: '0.9rem', boxShadow: '0 4px 14px rgba(99,102,241,0.4)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            📖 Study Material Core Concept Map
          </div>
        </div>

        {/* Branch Lines Indicator */}
        <div style={{ textAlign: 'center', color: '#475569', fontSize: '0.75rem', margin: '-0.3rem 0' }}>
          │ ─── Gemma 4 Performance-Based Knowledge Branches ─── │
        </div>

        {/* Concept Nodes Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem' }}>
          {evaluations.map((item, idx) => {
            const isUnanswered = item.status === 'unanswered' || !item.userAnswer || item.userAnswer === '(No answer provided)' || item.userAnswer === '(Unanswered / Left Blank)';
            const nodeStatus = isUnanswered ? 'red' : item.status === 'correct' ? 'green' : item.status === 'partial' ? 'yellow' : 'red';
            const nodeBg = nodeStatus === 'green' ? 'rgba(16,185,129,0.15)' : nodeStatus === 'yellow' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)';
            const nodeBorder = nodeStatus === 'green' ? '#10b981' : nodeStatus === 'yellow' ? '#f59e0b' : '#ef4444';
            const nodeTextColor = nodeStatus === 'green' ? '#34d399' : nodeStatus === 'yellow' ? '#fbbf24' : '#f87171';
            const badgeIcon = nodeStatus === 'green' ? '✓' : nodeStatus === 'yellow' ? '⚡' : '❌';

            const displayConcepts = (nodeStatus === 'green' ? item.matchedConcepts : item.missingConcepts) || [];
            const mainLabel = displayConcepts.length > 0 ? displayConcepts.slice(0, 2).join(', ') : `Topic Q${idx+1}`;

            return (
              <div
                key={idx}
                style={{
                  background: nodeBg,
                  border: `1.5px solid ${nodeBorder}`,
                  borderRadius: '12px',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  transition: 'transform 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8' }}>Q{idx+1} Concept Node</span>
                  <span style={{ background: nodeBorder, color: '#0f172a', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900 }}>
                    {badgeIcon}
                  </span>
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: nodeTextColor }}>
                  {mainLabel}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic' }}>
                  {nodeStatus === 'green' ? 'Strong understanding' : nodeStatus === 'yellow' ? 'Partial mastery — refine details' : 'Unanswered / Skipped — Priority study'}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
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
              {report.strengths.length > 0 ? (
                report.strengths.slice(0, 3).map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.82rem', marginBottom: '0.35rem', opacity: 0.9 }}>
                    <span style={{ color: '#6ee7b7', flexShrink: 0 }}>✓</span> {s}
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '0.82rem', color: '#fca5a5', fontStyle: 'italic' }}>
                  ⚠️ No mastered concepts in this test run — full topic review recommended before re-attempting.
                </div>
              )}
            </div>

            {/* Needs Improvement */}
            <div style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '14px', padding: '1.1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.75rem', color: '#fcd34d' }}>
                <Target size={16} /> Needs Improvement
              </div>
              {report.weaknesses.slice(0, 3).map((w, i) => (
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
              {report.nextTopics.slice(0, 3).map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.82rem', marginBottom: '0.35rem', opacity: 0.9 }}>
                  <span style={{ background: 'rgba(165,180,252,0.3)', borderRadius: '50%', width: '18px', height: '18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>{i + 1}</span>
                  <span>{t}</span>
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

      {/* ★ Gemma 4 Personalized Mindmap Graph ★ */}
      <PersonalizedMindmap evaluations={result.evaluations} overallScore={result.overallScore} />


      {/* Question-by-Question Feedback */}
      <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 700, marginBottom: '1.25rem', color: '#0f172a' }}>
        Detailed Question Breakdown
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', marginBottom: '2.5rem' }}>
        {result.evaluations.map((item, idx) => {
          const isUnanswered = item.status === 'unanswered' || !item.userAnswer || item.userAnswer === '(No answer provided)' || item.userAnswer === '(Unanswered / Left Blank)';
          const matchedList = item.matchedConcepts || [];
          const missingList = item.missingConcepts || [];

          return (
            <div key={idx} className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.875rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                    Q{idx + 1}. {item.question}
                  </h4>
                  <div style={{ padding: '0.45rem 0.8rem', background: isUnanswered ? '#f1f5f9' : '#f8fafc', borderRadius: '8px', borderLeft: `3px solid ${isUnanswered ? '#94a3b8' : '#6366f1'}`, fontSize: '0.85rem', color: isUnanswered ? '#64748b' : '#334155' }}>
                    <strong>Your answer:</strong> {isUnanswered ? <em style={{ color: '#94a3b8' }}>(Unanswered / Left Blank)</em> : `"${String(item.userAnswer).substring(0, 140)}${String(item.userAnswer).length > 140 ? '...' : ''}"`}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem', flexShrink: 0 }}>
                  <span className={`badge ${isUnanswered ? 'badge-slate' : item.status === 'correct' ? 'badge-green' : item.status === 'partial' ? 'badge-amber' : 'badge-rose'}`} style={isUnanswered ? { background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1' } : {}}>
                    {isUnanswered ? 'UNANSWERED' : (item.status || 'scored').toUpperCase()}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{isUnanswered ? '0%' : `${item.scorePercentage}%`}</span>
                </div>
              </div>

              {/* Source Concept Match Breakdown Chips */}
              {(matchedList.length > 0 || missingList.length > 0) && (
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.75rem 0.875rem', marginBottom: '0.75rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                    Source Text Concept Match Analysis
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {matchedList.map((concept, cIdx) => (
                      <span key={`m-${cIdx}`} style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '0.2rem 0.55rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <CheckCircle2 size={12} /> {concept}
                      </span>
                    ))}
                    {missingList.map((concept, mIdx) => (
                      <span key={`miss-${mIdx}`} style={{ background: '#fff1f2', color: '#be123c', border: '1px solid #fecdd3', padding: '0.2rem 0.55rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <AlertTriangle size={12} /> {concept}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ background: isUnanswered ? '#f8fafc' : '#ecfdf5', border: `1px solid ${isUnanswered ? '#e2e8f0' : '#a7f3d0'}`, borderRadius: '10px', padding: '0.875rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: isUnanswered ? '#64748b' : '#065f46', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                    <CheckCircle2 size={15} /> {isUnanswered ? 'Status' : 'What you did well'}
                  </div>
                  <div style={{ fontSize: '0.83rem', color: isUnanswered ? '#64748b' : '#047857', lineHeight: 1.5 }}>
                    {isUnanswered ? 'Question was left blank. No marks awarded.' : item.whatYouDidWell}
                  </div>
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
          );
        })}
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
