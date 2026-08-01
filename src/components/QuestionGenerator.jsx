import React, { useState, useEffect } from 'react';
import { Sparkles, Plus, Download, Play, CheckCircle, Filter, Cpu, Wifi, WifiOff, Loader } from 'lucide-react';
import { generateQuestionsFromDoc } from '../services/gemmaEngine';
import { generateQuestionsViaGemma, detectGemmaModel } from '../services/ollamaService';

export default function QuestionGenerator({ questions, setQuestions, selectedDoc, onStartTest }) {
  const [activeTab, setActiveTab] = useState('All');
  const [bloomsFilter, setBloomsFilter] = useState('All');
  const [isGeneratingMore, setIsGeneratingMore] = useState(false);
  const [gemmaStatus, setGemmaStatus] = useState('checking'); // 'checking'|'live'|'offline'
  const [gemmaModel, setGemmaModel] = useState(null);
  const [gemmaError, setGemmaError] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Detect Gemma on mount
  useEffect(() => {
    detectGemmaModel().then(model => {
      if (model) {
        setGemmaModel(model);
        setGemmaStatus('live');
      } else {
        setGemmaStatus('offline');
      }
    });
  }, []);

  const filteredQuestions = questions.filter(q => {
    if (activeTab !== 'All' && q.type !== activeTab) return false;
    if (bloomsFilter !== 'All' && q.bloomsTaxonomy !== bloomsFilter) return false;
    return true;
  });

  // Re-generate ALL questions via real Gemma 4
  const handleRegenerateWithGemma = async () => {
    if (!selectedDoc?.rawText) return;
    setIsRegenerating(true);
    setGemmaError('');
    try {
      const newQs = await generateQuestionsViaGemma(selectedDoc.rawText, 5, gemmaModel);
      setQuestions(newQs);
    } catch (err) {
      setGemmaError(err.message);
    } finally {
      setIsRegenerating(false);
    }
  };

  // Generate one more question via Gemma (or fallback)
  const handleGenerateMore = async () => {
    setIsGeneratingMore(true);
    setGemmaError('');
    try {
      if (gemmaStatus === 'live' && selectedDoc?.rawText) {
        const extras = await generateQuestionsViaGemma(selectedDoc.rawText, 1, gemmaModel);
        setQuestions(prev => [...prev, ...extras]);
      } else {
        // Local fallback
        const docText = (selectedDoc?.rawText || '').toLowerCase();
        let q;
        if (docText.includes('photosynthesis')) {
          q = {
            id: 'q-new-' + Date.now(), type: 'Short Answer', typeBadge: 'Short Answer',
            bloomsTaxonomy: 'Applying',
            question: 'How does the Calvin Cycle use products of light-dependent reactions to synthesize glucose?',
            marks: 5,
            sampleAnswer: 'ATP and NADPH are used to fix CO2 into glucose via RuBisCO in the stroma.',
            keyConcepts: ['ATP', 'NADPH', 'CO2 fixation', 'RuBisCO'],
            sourceExcerpt: 'Calvin Cycle occurs in the stroma using ATP and NADPH.'
          };
        } else if (docText.includes('algorithm') || docText.includes('data structure')) {
          q = {
            id: 'q-new-' + Date.now(), type: 'MCQ', typeBadge: 'MCQ',
            bloomsTaxonomy: 'Applying',
            question: 'What is the average time complexity for search in a balanced BST?',
            options: [{ id: 'A', text: 'O(n)' }, { id: 'B', text: 'O(log n)', correct: true }, { id: 'C', text: 'O(n²)' }, { id: 'D', text: 'O(1)' }],
            marks: 2,
            keyConcepts: ['balanced BST', 'O(log n)', 'divide and conquer'],
            sourceExcerpt: 'BSTs allow O(log N) average time for search.'
          };
        } else {
          q = {
            id: 'q-new-' + Date.now(), type: 'Short Answer', typeBadge: 'Short Answer',
            bloomsTaxonomy: 'Evaluating',
            question: 'Compare and contrast the two main learning paradigms in this material.',
            marks: 5,
            sampleAnswer: 'Supervised uses labeled data for prediction; unsupervised discovers hidden patterns in unlabeled data.',
            keyConcepts: ['labeled data', 'unlabeled data', 'prediction', 'pattern discovery'],
            sourceExcerpt: selectedDoc?.rawText?.substring(0, 120) || ''
          };
        }
        setQuestions(prev => [...prev, q]);
      }
    } catch (err) {
      setGemmaError(err.message);
    } finally {
      setIsGeneratingMore(false);
    }
  };

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questions, null, 2));
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', `Questions_${selectedDoc?.title || 'StudyMaterial'}.json`);
    document.body.appendChild(a); a.click(); a.remove();
  };

  return (
    <div className="container">

      {/* Top Title Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, color: '#0f172a' }}>
            Generated Questions
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            From: <strong>{selectedDoc?.title || 'Study Material'}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" onClick={handleExport} style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
            <Download size={15} /> Export
          </button>
          <button className="btn btn-primary" onClick={handleGenerateMore} disabled={isGeneratingMore}
            style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
            {isGeneratingMore ? <><Loader size={15} className="animate-spin" /> Generating...</> : <><Plus size={15} /> More</>}
          </button>
          <button className="btn btn-success" style={{ fontWeight: 700 }} onClick={onStartTest}>
            <Play size={16} /> Attempt Test
          </button>
        </div>
      </div>

      {/* Gemma Status Banner */}
      <div className="glass-card" style={{ padding: '0.85rem 1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Cpu size={18} style={{ color: gemmaStatus === 'live' ? '#4f46e5' : '#94a3b8' }} />
          <div>
            <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a' }}>Gemma Engine: </span>
            {gemmaStatus === 'checking' && <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Detecting...</span>}
            {gemmaStatus === 'live' && <span style={{ color: '#059669', fontWeight: 600, fontSize: '0.85rem' }}>
              <Wifi size={13} style={{ display: 'inline', marginRight: '0.25rem' }} />{gemmaModel} — Live ✓
            </span>}
            {gemmaStatus === 'offline' && <span style={{ color: '#dc2626', fontSize: '0.85rem' }}>
              <WifiOff size={13} style={{ display: 'inline', marginRight: '0.25rem' }} />Offline — showing sample questions
            </span>}
          </div>
        </div>

        {gemmaStatus === 'live' && (
          <button
            className="btn btn-primary"
            onClick={handleRegenerateWithGemma}
            disabled={isRegenerating}
            style={{ fontSize: '0.82rem', padding: '0.45rem 1rem', minHeight: '38px' }}
          >
            {isRegenerating
              ? <><Loader size={14} className="animate-spin" /> Gemma is thinking...</>
              : <><Sparkles size={14} /> Regenerate with Gemma 4</>}
          </button>
        )}

        {gemmaStatus === 'offline' && (
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
            Start Ollama: <code style={{ background: '#f1f5f9', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>ollama serve</code>
          </span>
        )}
      </div>

      {/* Gemma Error */}
      {gemmaError && (
        <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '12px', padding: '0.875rem 1.25rem', marginBottom: '1.25rem', fontSize: '0.875rem', color: '#be123c' }}>
          ⚠️ {gemmaError}
        </div>
      )}

      {/* Regenerating overlay message */}
      {isRegenerating && (
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🧠</div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#4f46e5', marginBottom: '0.4rem' }}>
            Gemma 4 is reading your document...
          </div>
          <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Extracting key concepts · Generating grounded questions · Mapping Bloom's Taxonomy
          </div>
        </div>
      )}

      {/* Filter Toolbar */}
      {!isRegenerating && (
        <>
          <div className="glass-card" style={{ padding: '0.875rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div className="filter-tabs">
              {['All', 'MCQ', 'Short Answer', 'Long Answer'].map(tab => (
                <button key={tab} className={`filter-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                  {tab} {tab === 'All' ? `(${questions.length})` : `(${questions.filter(q => q.type === tab).length})`}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={15} style={{ color: '#6366f1' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>Bloom's:</span>
              <select value={bloomsFilter} onChange={e => setBloomsFilter(e.target.value)}
                style={{ padding: '0.4rem 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem', outline: 'none', background: '#fff', cursor: 'pointer' }}>
                {['All Levels', 'Remembering', 'Understanding', 'Applying', 'Analyzing', 'Evaluating', 'Creating'].map(l => (
                  <option key={l} value={l === 'All Levels' ? 'All' : l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Question Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {filteredQuestions.map((q, idx) => (
              <div key={q.id} className="glass-card" style={{ padding: '1.4rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#e0e7ff', color: '#4338ca', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {idx + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', fontWeight: 600, color: '#0f172a', lineHeight: 1.4 }}>{q.question}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0, flexWrap: 'wrap' }}>
                      <span className={`badge ${q.type === 'MCQ' ? 'badge-green' : q.type === 'Short Answer' ? 'badge-purple' : 'badge-blue'}`}>{q.type}</span>
                      <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>{q.bloomsTaxonomy}</span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>{q.marks}m</span>
                      {q._generatedByGemma && <span style={{ fontSize: '0.65rem', background: '#e0e7ff', color: '#4338ca', padding: '0.15rem 0.4rem', borderRadius: '999px', fontWeight: 700 }}>AI</span>}
                    </div>
                  </div>

                  {q.type === 'MCQ' && q.options?.length > 0 && (
                    <div className="grid-2" style={{ marginTop: '0.6rem', gap: '0.5rem' }}>
                      {q.options.map(opt => (
                        <div key={opt.id} style={{ padding: '0.45rem 0.75rem', borderRadius: '6px', background: opt.correct ? '#ecfdf5' : '#f8fafc', border: opt.correct ? '1px solid #6ee7b7' : '1px solid #e2e8f0', fontSize: '0.82rem', color: opt.correct ? '#065f46' : '#334155', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <strong>{opt.id}.</strong> {opt.text}
                          {opt.correct && <CheckCircle size={13} style={{ marginLeft: 'auto', color: '#059669' }} />}
                        </div>
                      ))}
                    </div>
                  )}

                  {q.sourceExcerpt && (
                    <div style={{ marginTop: '0.6rem', fontSize: '0.78rem', color: '#94a3b8', fontStyle: 'italic', borderLeft: '2px solid #e2e8f0', paddingLeft: '0.6rem' }}>
                      Source: "{q.sourceExcerpt.substring(0, 100)}{q.sourceExcerpt.length > 100 ? '...' : ''}"
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
