import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, Sparkles, ArrowRight, Layers, Loader, BookOpen } from 'lucide-react';
import { SAMPLE_DOCUMENTS } from '../services/gemmaEngine';
import { extractPdfTextChunked } from '../services/pdfExtractor';

export default function UploadSection({ selectedDoc, setSelectedDoc, onProceedToGenerate, onSetNextBatch }) {
  const [isDragging, setIsDragging]   = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractStatus, setExtractStatus] = useState('');

  const handleSelectSample = (doc) => {
    setSelectedDoc(doc);
    // Clear any pending batch from previous custom upload
    if (onSetNextBatch) onSetNextBatch(null);
  };

  const processFile = async (file) => {
    if (!file) return;

    const isPdf = file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf';
    setIsExtracting(true);
    setExtractStatus(isPdf
      ? '⚡ Parallel multi-agent worker: extracting first 10 pages…'
      : '📄 Reading text document…'
    );

    if (isPdf) {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        try {
          const { fullText, totalPages, extractedPagesCount, topics, loadNextBatch } =
            await extractPdfTextChunked(evt.target.result);

          const newDoc = {
            id: 'custom-' + Date.now(),
            title: file.name,
            size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
            type: totalPages > 10
              ? `PDF · Pages 1-10 of ${totalPages} (pages 11-20 load during test)`
              : `PDF · ${extractedPagesCount} page${extractedPagesCount !== 1 ? 's' : ''} extracted`,
            rawText: fullText,
            pageCount: totalPages,
            topics: topics || []
          };

          setSelectedDoc(newDoc);

          // Hand the background-batch loader up to App so it can fire during the test
          if (onSetNextBatch) onSetNextBatch(loadNextBatch || null);

          if (totalPages > 10) {
            setExtractStatus(`✅ Pages 1-10 ready (${totalPages - 10} more pages will load in background during your test)`);
          } else {
            setExtractStatus('');
          }
        } catch (err) {
          console.warn('PDF extraction error, falling back to text:', err);
          const textReader = new FileReader();
          textReader.onload = (e) => {
            setSelectedDoc({
              id: 'custom-' + Date.now(),
              title: file.name,
              size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
              type: 'Uploaded Document',
              rawText: e.target.result || 'Extracted content.',
              topics: []
            });
          };
          textReader.readAsText(file);
          setExtractStatus('');
        } finally {
          setIsExtracting(false);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setSelectedDoc({
          id: 'custom-' + Date.now(),
          title: file.name,
          size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
          type: 'Text Document',
          rawText: evt.target.result || '',
          topics: []
        });
        setIsExtracting(false);
        setExtractStatus('');
        if (onSetNextBatch) onSetNextBatch(null);
      };
      reader.readAsText(file);
    }
  };

  const handleFileUpload = (e) => processFile(e.target.files[0]);

  return (
    <div className="container" style={{ maxWidth: '900px' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Upload Study Material
        </h2>
        <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
          Upload your syllabus, lecture notes, or any PDF — up to 20 pages processed.
        </p>
        <p style={{ color: '#a78bfa', fontSize: '0.85rem', marginTop: '0.35rem' }}>
          First 10 pages generate questions instantly. Pages 11-20 load in the background during your test.
        </p>
      </div>

      {/* Drop Zone */}
      <div
        className={`dropzone ${isDragging ? 'active' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]);
        }}
        style={{ marginBottom: '2rem', position: 'relative' }}
      >
        <div style={{
          width: '64px', height: '64px', borderRadius: '16px',
          background: '#e0e7ff', color: '#4f46e5',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.25rem auto'
        }}>
          {isExtracting ? <Loader size={32} className="animate-spin" /> : <FileText size={32} />}
        </div>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          {isExtracting ? 'Extracting PDF text in parallel…' : 'Drag & drop your PDF or document here'}
        </h3>

        {isExtracting ? (
          <p style={{ color: '#6366f1', fontSize: '0.875rem', marginBottom: '1.5rem', fontWeight: 600 }}>
            {extractStatus}
          </p>
        ) : (
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Parallel page worker · up to 20 pages max · binary PDF decoding
          </p>
        )}

        {!isExtracting && (
          <label className="btn btn-primary" style={{ cursor: 'pointer' }}>
            <Upload size={18} /> Choose File
            <input type="file" accept=".pdf,.txt,.docx" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>
        )}
      </div>

      {/* Extract-status banner (persists after extraction if >10 pages) */}
      {extractStatus && !isExtracting && (
        <div style={{
          background: '#ede9fe', border: '1px solid #a78bfa', borderRadius: '10px',
          padding: '0.75rem 1.25rem', marginBottom: '1.5rem',
          fontSize: '0.85rem', color: '#5b21b6', fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: '0.5rem'
        }}>
          ⏳ {extractStatus}
        </div>
      )}

      {/* Sample documents */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontWeight: 600, fontSize: '0.95rem', color: '#475569' }}>
          <Layers size={18} /> Or select pre-loaded study materials:
        </div>
        <div className="grid-3">
          {SAMPLE_DOCUMENTS.map((doc) => {
            const isSelected = selectedDoc?.id === doc.id;
            return (
              <div
                key={doc.id}
                onClick={() => handleSelectSample(doc)}
                className="glass-card"
                style={{
                  padding: '1.25rem', cursor: 'pointer',
                  border: isSelected ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                  background: isSelected ? '#f5f3ff' : '#ffffff',
                  transition: 'all 0.2s ease', position: 'relative'
                }}
              >
                {isSelected && (
                  <div style={{ position: 'absolute', top: '12px', right: '12px', color: '#4f46e5' }}>
                    <CheckCircle2 size={20} />
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <FileText size={20} style={{ color: '#6366f1' }} />
                  <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{doc.type}</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem', color: '#1e293b' }}>
                  {doc.title}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Size: {doc.size}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected doc preview */}
      {selectedDoc && (
        <div className="glass-card" style={{ padding: '1.5rem', background: '#f8fafc', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ef4444', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                PDF
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a' }}>{selectedDoc.title}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  {selectedDoc.size} · {selectedDoc.type}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a', fontWeight: 600, background: '#dcfce7', padding: '0.4rem 0.9rem', borderRadius: '999px', fontSize: '0.85rem' }}>
              <CheckCircle2 size={18} /> Ready
            </div>
          </div>

          {/* Topics extracted */}
          {selectedDoc.topics?.length > 0 && (
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <BookOpen size={14} style={{ color: '#6366f1' }} />
              <span style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 600 }}>Topics detected:</span>
              {selectedDoc.topics.map(t => (
                <span key={t} style={{ fontSize: '0.7rem', background: '#e0e7ff', color: '#4338ca', padding: '0.15rem 0.6rem', borderRadius: '999px', fontWeight: 600 }}>{t}</span>
              ))}
            </div>
          )}

          {/* Content preview */}
          <div style={{ marginTop: '1.25rem', padding: '1rem', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#334155', maxHeight: '110px', overflowY: 'auto' }}>
            <strong>Extracted Content Preview:</strong>
            <p style={{ marginTop: '0.35rem', fontStyle: 'italic' }}>
              "{selectedDoc.rawText?.substring(0, 280)}…"
            </p>
          </div>
        </div>
      )}

      {/* CTA */}
      <div style={{ textAlign: 'center' }}>
        <button
          className="btn btn-primary"
          style={{ padding: '0.9rem 2.5rem', fontSize: '1.1rem' }}
          disabled={!selectedDoc || isExtracting}
          onClick={onProceedToGenerate}
        >
          <Sparkles size={20} /> Generate Questions with Gemma 4 <ArrowRight size={20} />
        </button>
      </div>

    </div>
  );
}
