import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, Sparkles, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { SAMPLE_DOCUMENTS } from '../services/gemmaEngine';

export default function UploadSection({ selectedDoc, setSelectedDoc, onProceedToGenerate }) {
  const [isDragging, setIsDragging] = useState(false);
  const [customFileName, setCustomFileName] = useState('');
  const [customFileText, setCustomFileText] = useState('');

  const handleSelectSample = (doc) => {
    setSelectedDoc(doc);
    setCustomFileName('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const newDoc = {
          id: 'custom-' + Date.now(),
          title: file.name,
          size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
          type: 'Uploaded Document',
          rawText: text || 'Extracted document content.'
        };
        setSelectedDoc(newDoc);
        setCustomFileName(file.name);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '900px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Upload Study Material
        </h2>
        <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
          Upload your syllabus, lecture notes, competition rules, or any document to begin.
        </p>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div 
        className={`dropzone ${isDragging ? 'active' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setSelectedDoc({
              id: 'custom-' + Date.now(),
              title: file.name,
              size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
              type: 'Uploaded Document',
              rawText: 'Extracted uploaded document content.'
            });
          }
        }}
        style={{ marginBottom: '2rem' }}
      >
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          background: '#e0e7ff',
          color: '#4f46e5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem auto'
        }}>
          <FileText size={32} />
        </div>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          Drag & drop your PDF or document here
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          Supports PDFs, DOCX, and TXT files up to 50MB
        </p>

        <label className="btn btn-primary" style={{ cursor: 'pointer' }}>
          <Upload size={18} /> Choose File
          <input type="file" accept=".pdf,.txt,.docx" onChange={handleFileUpload} style={{ display: 'none' }} />
        </label>
      </div>

      {/* Sample Documents Presets */}
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
                  padding: '1.25rem',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                  background: isSelected ? '#f5f3ff' : '#ffffff',
                  transition: 'all 0.2s ease',
                  position: 'relative'
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
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Size: {doc.size}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected File Card & Status */}
      {selectedDoc && (
        <div className="glass-card" style={{ padding: '1.5rem', background: '#f8fafc', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ef4444', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                PDF
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a' }}>
                  {selectedDoc.title}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>{selectedDoc.size}</span> • <span>Ready for Gemma 4 Extraction</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a', fontWeight: 600, background: '#dcfce7', padding: '0.4rem 0.9rem', borderRadius: '999px', fontSize: '0.85rem' }}>
              <CheckCircle2 size={18} /> Upload Complete
            </div>

          </div>

          {/* Document Preview Snippet */}
          <div style={{ marginTop: '1.25rem', padding: '1rem', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#334155', maxHeight: '120px', overflowY: 'auto' }}>
            <strong>Extracted Content Preview:</strong>
            <p style={{ marginTop: '0.35rem', fontStyle: 'italic' }}>
              "{selectedDoc.rawText.substring(0, 300)}..."
            </p>
          </div>
        </div>
      )}

      {/* Action CTA */}
      <div style={{ textAlign: 'center' }}>
        <button
          className="btn btn-primary"
          style={{ padding: '0.9rem 2.5rem', fontSize: '1.1rem' }}
          disabled={!selectedDoc}
          onClick={onProceedToGenerate}
        >
          <Sparkles size={20} /> Generate Questions with Gemma 4 <ArrowRight size={20} />
        </button>
      </div>

    </div>
  );
}
