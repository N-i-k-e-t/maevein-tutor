import React, { useState, useEffect } from 'react';
import { Clock, Award, Bold, Italic, Underline, List, ListOrdered, Send, User, CheckCircle2 } from 'lucide-react';

export default function StudentTest({ questions, onSubmitTest, studentName = 'Alex Patel', setStudentName }) {
  const [answers, setAnswers] = useState({});
  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
  const initialSeconds = Math.max(900, totalMarks * 120); // 2 minutes per mark, minimum 15 mins
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
    const timer = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [totalMarks, initialSeconds]);

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (qId, val) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  return (
    <div className="container" style={{ maxWidth: '950px' }}>
      
      {/* Top Test Header Bar */}
      <div className="glass-card" style={{ padding: '1.25rem 2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-blue" style={{ marginBottom: '0.35rem' }}>Student View</span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a' }}>
            Attempt Assessment Test
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fef3c7', color: '#b45309', padding: '0.5rem 1rem', borderRadius: '12px', fontWeight: 700 }}>
            <Clock size={18} />
            <span>{formatTime(secondsLeft)}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#e0e7ff', color: '#4338ca', padding: '0.5rem 1rem', borderRadius: '12px', fontWeight: 700 }}>
            <Award size={18} />
            <span>{totalMarks} Marks</span>
          </div>

        </div>
      </div>

      {/* Student Identity Profile Bar */}
      <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '0.85rem 1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <User size={18} style={{ color: '#4f46e5' }} />
          <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a' }}>Student Profile:</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName && setStudentName(e.target.value)}
            placeholder="Enter student name..."
            style={{ padding: '0.4rem 0.85rem', borderRadius: '8px', border: '1px solid #94a3b8', fontSize: '0.875rem', fontWeight: 600, outline: 'none', background: '#ffffff', minWidth: '180px' }}
          />
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <CheckCircle2 size={13} /> Saved locally
          </span>
        </div>
      </div>


      {/* Questions list form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
        {questions.map((q, idx) => (
          <div key={q.id} className="glass-card" style={{ padding: '2rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>
                Q{idx + 1}. {q.question}
              </h3>
              <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>
                {q.marks} Marks
              </span>
            </div>

            {/* MCQ Input Options */}
            {q.type === 'MCQ' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                {q.options?.map((opt) => {
                  const isSelected = answers[q.id] === opt.id;
                  return (
                    <label
                      key={opt.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '0.85rem 1.25rem',
                        borderRadius: '12px',
                        border: isSelected ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                        background: isSelected ? '#eef2ff' : '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
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
              /* Short or Long Answer Text Area with formatting toolbar */
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#f1f5f9', padding: '0.4rem 0.75rem', borderRadius: '8px 8px 0 0', border: '1px solid #cbd5e1', borderBottom: 'none' }}>
                  <button type="button" className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}><Bold size={14} /></button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}><Italic size={14} /></button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}><Underline size={14} /></button>
                  <span style={{ width: '1px', height: '16px', background: '#cbd5e1', margin: '0 0.25rem' }} />
                  <button type="button" className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}><List size={14} /></button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}><ListOrdered size={14} /></button>
                </div>

                <textarea
                  rows={q.type === 'Long Answer' ? 6 : 3}
                  value={answers[q.id] || ''}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  placeholder="Type your response here..."
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '0 0 8px 8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.95rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>
            )}

          </div>
        ))}
      </div>

      {/* Submit Button */}
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
