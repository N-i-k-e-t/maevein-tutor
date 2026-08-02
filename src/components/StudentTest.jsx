import React, { useState, useEffect } from 'react';
import { Clock, Award, Send, User, CheckCircle2, BookOpen, AlertTriangle } from 'lucide-react';

/**
 * Detect likely random / keyboard-mash text.
 * Returns true when the text should be treated as a non-answer.
 */
function isGibberishAnswer(raw) {
  if (!raw) return false;
  const text = raw.trim().toLowerCase();
  if (text.length < 3) return true;

  // Known placeholder tokens
  const placeholders = new Set([
    'asdf','qwerty','idk','dunno','whatever','xyz','abc','123','n/a',
    'blank','random','na','none','no','yes','ok','idc','lol','test',
    'hi','hey','something','nothing','anything','everything','stuff'
  ]);
  if (placeholders.has(text)) return true;

  // Vowel-density check: real words have at least 15% vowels
  const vowels  = (text.match(/[aeiou]/g) || []).length;
  const letters = (text.match(/[a-z]/g) || []).length;
  if (letters > 4 && vowels / letters < 0.10) return true;

  // Repetition check: >60% of characters are the same char
  if (letters > 4) {
    const freq = {};
    for (const c of text) freq[c] = (freq[c] || 0) + 1;
    const maxFreq = Math.max(...Object.values(freq));
    if (maxFreq / text.length > 0.60) return true;
  }

  // Runs of consonants >6 in a row without space → likely keyboard mash
  if (/[^aeiou\s]{7,}/i.test(text)) return true;

  return false;
}

export default function StudentTest({
  questions,
  onSubmitTest,
  studentName = 'Alex Patel',
  setStudentName,
  docTitle,
  topics = []
}) {
  const [answers, setAnswers] = useState({});
  const totalMarks    = questions.reduce((sum, q) => sum + q.marks, 0);
  const initialSeconds = Math.max(900, totalMarks * 120);
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
    const timer = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [totalMarks, initialSeconds]);

  const formatTime = (secs) => {
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (qId, val) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  // For an answered text field: decide live border colour
  const getAnswerBorderColor = (qId, type) => {
    if (type === 'MCQ') return answers[qId] ? '#4f46e5' : '#e2e8f0';
    const val = (answers[qId] || '').trim();
    if (!val) return '#e2e8f0';
    if (isGibberishAnswer(val)) return '#ef4444'; // red → random/garbage
    return '#22c55e'; // green → looks like a real attempt
  };

  const getAnswerBg = (qId, type) => {
    if (type === 'MCQ') return '#ffffff';
    const val = (answers[qId] || '').trim();
    if (!val) return '#ffffff';
    if (isGibberishAnswer(val)) return '#fef2f2';
    return '#f0fdf4';
  };

  return (
    <div className="container" style={{ maxWidth: '950px' }}>

      {/* ── Header Bar ── */}
      <div className="glass-card" style={{ padding: '1.25rem 2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-blue" style={{ marginBottom: '0.35rem' }}>Student View</span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a' }}>Attempt Assessment Test</h2>
          {docTitle && (
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>📄 {docTitle}</p>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fef3c7', color: '#b45309', padding: '0.5rem 1rem', borderRadius: '12px', fontWeight: 700 }}>
            <Clock size={18} /><span>{formatTime(secondsLeft)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#e0e7ff', color: '#4338ca', padding: '0.5rem 1rem', borderRadius: '12px', fontWeight: 700 }}>
            <Award size={18} /><span>{totalMarks} Marks</span>
          </div>
        </div>
      </div>

      {/* ── Topics Banner ── */}
      {topics.length > 0 && (
        <div style={{
          background: 'linear-gradient(135deg, #eef2ff, #fae8ff)',
          border: '1px solid #c7d2fe', borderRadius: '12px',
          padding: '0.85rem 1.25rem', marginBottom: '1.25rem',
          display: 'flex', alignItems: 'flex-start', gap: '0.75rem', flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
            <BookOpen size={16} style={{ color: '#4f46e5' }} />
            <span style={{ fontWeight: 700, fontSize: '0.82rem', color: '#3730a3' }}>Topics on this Test:</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {topics.map(t => (
              <span key={t} style={{
                fontSize: '0.72rem', background: '#e0e7ff', color: '#3730a3',
                padding: '0.2rem 0.65rem', borderRadius: '999px', fontWeight: 700
              }}>{t}</span>
            ))}
          </div>
          <div style={{ width: '100%', fontSize: '0.72rem', color: '#6366f1', marginTop: '0.15rem' }}>
            💡 Pages 11-20 of your PDF are being processed in the background during this test.
          </div>
        </div>
      )}

      {/* ── Answer Quality Legend ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.25rem', padding: '0.6rem 1.1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '0.78rem', color: '#475569', flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 700 }}>Answer quality indicators:</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#22c55e', display: 'inline-block' }} /> Real answer
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#ef4444', display: 'inline-block' }} /> Random / gibberish (0 marks)
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#e2e8f0', display: 'inline-block' }} /> Not answered
        </span>
      </div>

      {/* ── Student Name Bar ── */}
      <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '0.85rem 1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <User size={18} style={{ color: '#4f46e5' }} />
          <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a' }}>Student Profile:</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName?.(e.target.value)}
            placeholder="Enter student name…"
            style={{ padding: '0.4rem 0.85rem', borderRadius: '8px', border: '1px solid #94a3b8', fontSize: '0.875rem', fontWeight: 600, outline: 'none', background: '#ffffff', minWidth: '180px' }}
          />
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <CheckCircle2 size={13} /> Saved locally
          </span>
        </div>
      </div>

      {/* ── Questions ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
        {questions.map((q, idx) => {
          const borderColor = getAnswerBorderColor(q.id, q.type);
          const bgColor     = getAnswerBg(q.id, q.type);
          const answered    = q.type === 'MCQ' ? !!answers[q.id] : (answers[q.id] || '').trim().length > 0;
          const isRandom    = q.type !== 'MCQ' && answered && isGibberishAnswer(answers[q.id] || '');

          return (
            <div key={q.id} className="glass-card" style={{ padding: '2rem', border: `2px solid ${borderColor}`, transition: 'border-color 0.3s ease' }}>

              {/* Question Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.5 }}>
                  Q{idx + 1}. {q.question}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem', flexShrink: 0 }}>
                  <span className="badge badge-purple" style={{ fontSize: '0.72rem' }}>{q.marks} Marks</span>
                  {q.typeBadge && (
                    <span style={{ fontSize: '0.65rem', background: '#f1f5f9', color: '#475569', padding: '0.1rem 0.5rem', borderRadius: '999px' }}>{q.typeBadge}</span>
                  )}
                </div>
              </div>

              {/* Random answer warning */}
              {isRandom && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '0.5rem 0.85rem', marginBottom: '0.75rem', fontSize: '0.78rem', color: '#dc2626', fontWeight: 600 }}>
                  <AlertTriangle size={14} />
                  This looks like random text — it will receive 0 marks. Please write a proper answer.
                </div>
              )}

              {/* MCQ Options */}
              {q.type === 'MCQ' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                  {q.options?.map((opt) => {
                    const isSelected = answers[q.id] === opt.id;
                    return (
                      <label
                        key={opt.id}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '1rem',
                          padding: '0.85rem 1.25rem', borderRadius: '12px',
                          border: isSelected ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                          background: isSelected ? '#eef2ff' : '#ffffff',
                          cursor: 'pointer', transition: 'all 0.2s ease',
                          fontWeight: isSelected ? 600 : 400
                        }}
                      >
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          checked={isSelected}
                          onChange={() => handleAnswerChange(q.id, opt.id)}
                          style={{ accentColor: '#4f46e5', width: '18px', height: '18px' }}
                        />
                        <span style={{ color: isSelected ? '#4338ca' : '#334155' }}>
                          <strong>{opt.id}.</strong> {opt.text}
                        </span>
                      </label>
                    );
                  })}
                </div>
              ) : (
                /* Text Answer */
                <textarea
                  rows={q.type === 'Long Answer' ? 6 : 3}
                  value={answers[q.id] || ''}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  placeholder="Type your response here…"
                  style={{
                    width: '100%', padding: '1rem',
                    borderRadius: '8px',
                    border: `2px solid ${borderColor}`,
                    background: bgColor,
                    fontSize: '0.95rem', fontFamily: 'inherit',
                    outline: 'none', resize: 'vertical',
                    transition: 'border-color 0.3s ease, background 0.3s ease'
                  }}
                />
              )}

            </div>
          );
        })}
      </div>

      {/* Submit */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <button
          className="btn btn-success"
          style={{ padding: '1rem 3rem', fontSize: '1.15rem' }}
          onClick={() => onSubmitTest(answers)}
        >
          <Send size={20} /> Submit Test for Gemma 4 Evaluation
        </button>
      </div>

    </div>
  );
}
