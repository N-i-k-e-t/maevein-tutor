import React, { useState } from 'react';
import { Sliders, X, Check, Cpu, Server, Key } from 'lucide-react';

export default function ModelSettingsModal({ isOpen, onClose }) {
  const [engineType, setEngineType] = useState('local-gemma4');
  const [ollamaUrl, setOllamaUrl] = useState('http://localhost:11434');
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 600);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(4px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '520px', padding: '2rem', background: '#ffffff' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sliders size={20} style={{ color: '#4f46e5' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
              Gemma 4 Engine Settings
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            borderRadius: '12px',
            border: engineType === 'local-gemma4' ? '2px solid #4f46e5' : '1px solid #e2e8f0',
            background: engineType === 'local-gemma4' ? '#eef2ff' : '#ffffff',
            cursor: 'pointer'
          }}>
            <input
              type="radio"
              name="engine"
              checked={engineType === 'local-gemma4'}
              onChange={() => setEngineType('local-gemma4')}
              style={{ accentColor: '#4f46e5' }}
            />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Built-in Gemma 4 Engine (Recommended)</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Runs locally with instant concept evaluation</div>
            </div>
          </label>

          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            borderRadius: '12px',
            border: engineType === 'ollama' ? '2px solid #4f46e5' : '1px solid #e2e8f0',
            background: engineType === 'ollama' ? '#eef2ff' : '#ffffff',
            cursor: 'pointer'
          }}>
            <input
              type="radio"
              name="engine"
              checked={engineType === 'ollama'}
              onChange={() => setEngineType('ollama')}
              style={{ accentColor: '#4f46e5' }}
            />
            <div style={{ width: '100%' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Ollama Gemma 4 Local Instance</div>
              {engineType === 'ollama' && (
                <input
                  type="text"
                  value={ollamaUrl}
                  onChange={(e) => setOllamaUrl(e.target.value)}
                  placeholder="http://localhost:11434"
                  style={{ marginTop: '0.5rem', width: '100%', padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              )}
            </div>
          </label>

          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            borderRadius: '12px',
            border: engineType === 'gemini-api' ? '2px solid #4f46e5' : '1px solid #e2e8f0',
            background: engineType === 'gemini-api' ? '#eef2ff' : '#ffffff',
            cursor: 'pointer'
          }}>
            <input
              type="radio"
              name="engine"
              checked={engineType === 'gemini-api'}
              onChange={() => setEngineType('gemini-api')}
              style={{ accentColor: '#4f46e5' }}
            />
            <div style={{ width: '100%' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Gemini API / Gemma Model Endpoint</div>
              {engineType === 'gemini-api' && (
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter API Key"
                  style={{ marginTop: '0.5rem', width: '100%', padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              )}
            </div>
          </label>

        </div>

        <div style={{ textAlign: 'right' }}>
          <button className="btn btn-primary" onClick={handleSave} style={{ minWidth: '120px' }}>
            {saved ? <><Check size={16} /> Saved!</> : 'Save & Close'}
          </button>
        </div>

      </div>
    </div>
  );
}
