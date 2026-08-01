import React, { useState } from 'react';
import { Sparkles, Plus, Download, Play, HelpCircle, CheckCircle, Filter, BookOpen } from 'lucide-react';
import { generateQuestionsFromDoc } from '../services/gemmaEngine';

export default function QuestionGenerator({ questions, setQuestions, selectedDoc, onStartTest }) {
  const [activeTab, setActiveTab] = useState('All');
  const [bloomsFilter, setBloomsFilter] = useState('All');
  const [isGeneratingMore, setIsGeneratingMore] = useState(false);

  const filteredQuestions = questions.filter(q => {
    if (activeTab !== 'All' && q.type !== activeTab) return false;
    if (bloomsFilter !== 'All' && q.bloomsTaxonomy !== bloomsFilter) return false;
    return true;
  });

  const handleGenerateMore = () => {
    setIsGeneratingMore(true);
    setTimeout(() => {
      const newQuestion = {
        id: 'q-new-' + Date.now(),
        type: 'MCQ',
        typeBadge: 'MCQ',
        bloomsTaxonomy: 'Applying',
        question: 'Which clause in the Kaggle rules regulates open-source licensing for publicly shared notebooks?',
        options: [
          { id: 'A', text: 'Section 1 Eligibility' },
          { id: 'B', text: 'Section 6.b Public Code Sharing (OSI-Approved License)', correct: true },
          { id: 'C', text: 'Section 10 Taxes' },
          { id: 'D', text: 'Section 17 Employment Contract' }
        ],
        marks: 2,
        explanation: 'Section 6.b dictates that publicly shared code must be licensed under an OSI-approved open source license.'
      };
      setQuestions(prev => [...prev, newQuestion]);
      setIsGeneratingMore(false);
    }, 800);
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Generated_Questions_${selectedDoc?.title || 'StudyMaterial'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="container">
      
      {/* Top Title Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a' }}>
            Generated Questions
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Based on uploaded document: <strong>{selectedDoc?.title || 'Machine Learning - Unit 1.pdf'}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={handleExport}>
            <Download size={16} /> Export Questions
          </button>

          <button
            className="btn btn-primary"
            onClick={handleGenerateMore}
            disabled={isGeneratingMore}
          >
            <Plus size={16} /> {isGeneratingMore ? 'Generating...' : 'Generate More'}
          </button>

          <button
            className="btn btn-success"
            style={{ padding: '0.65rem 1.5rem', fontWeight: 700 }}
            onClick={onStartTest}
          >
            <Play size={18} /> Attempt Test
          </button>
        </div>
      </div>

      {/* Filter Toolbar: Format Tabs & Bloom's Taxonomy Dropdown */}
      <div className="glass-card" style={{ padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Type Tabs */}
        <div className="filter-tabs">
          <button className={`filter-tab ${activeTab === 'All' ? 'active' : ''}`} onClick={() => setActiveTab('All')}>
            All ({questions.length})
          </button>
          <button className={`filter-tab ${activeTab === 'MCQ' ? 'active' : ''}`} onClick={() => setActiveTab('MCQ')}>
            MCQ ({questions.filter(q => q.type === 'MCQ').length})
          </button>
          <button className={`filter-tab ${activeTab === 'Short Answer' ? 'active' : ''}`} onClick={() => setActiveTab('Short Answer')}>
            Short Answer ({questions.filter(q => q.type === 'Short Answer').length})
          </button>
          <button className={`filter-tab ${activeTab === 'Long Answer' ? 'active' : ''}`} onClick={() => setActiveTab('Long Answer')}>
            Long Answer ({questions.filter(q => q.type === 'Long Answer').length})
          </button>
        </div>

        {/* Bloom's Taxonomy Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={16} style={{ color: '#6366f1' }} />
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>Bloom's Taxonomy:</span>
          <select
            value={bloomsFilter}
            onChange={(e) => setBloomsFilter(e.target.value)}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.875rem',
              outline: 'none',
              background: '#ffffff',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            <option value="All">All Levels</option>
            <option value="Remembering">Remembering</option>
            <option value="Understanding">Understanding</option>
            <option value="Applying">Applying</option>
            <option value="Analyzing">Analyzing</option>
            <option value="Evaluating">Evaluating</option>
            <option value="Creating">Creating</option>
          </select>
        </div>

      </div>

      {/* Question List Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredQuestions.map((q, idx) => (
          <div
            key={q.id}
            className="glass-card"
            style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#e0e7ff',
              color: '#4338ca',
              fontWeight: 800,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {idx + 1}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a' }}>
                  {q.question}
                </h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className={`badge ${q.type === 'MCQ' ? 'badge-green' : q.type === 'Short Answer' ? 'badge-purple' : 'badge-blue'}`}>
                    {q.type}
                  </span>
                  <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>
                    Bloom: {q.bloomsTaxonomy}
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>
                    {q.marks} Marks
                  </span>
                </div>
              </div>

              {/* MCQ Preview options if applicable */}
              {q.type === 'MCQ' && q.options && (
                <div className="grid-2" style={{ marginTop: '0.75rem' }}>
                  {q.options.map(opt => (
                    <div
                      key={opt.id}
                      style={{
                        padding: '0.5rem 0.85rem',
                        borderRadius: '6px',
                        background: opt.correct ? '#ecfdf5' : '#f8fafc',
                        border: opt.correct ? '1px solid #6ee7b7' : '1px solid #e2e8f0',
                        fontSize: '0.875rem',
                        color: opt.correct ? '#065f46' : '#334155',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <strong>{opt.id}.</strong> {opt.text}
                      {opt.correct && <CheckCircle size={14} style={{ marginLeft: 'auto', color: '#059669' }} />}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
