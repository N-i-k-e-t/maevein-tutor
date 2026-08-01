import React, { useState } from 'react';
import {
  Cpu, ShieldCheck, ArrowRight, Layers, FileText, CheckCircle2,
  Award, Lightbulb, BarChart3, Database, Terminal, Cloud, Server,
  Code2, GitBranch, Zap, BookOpen, Brain, Package
} from 'lucide-react';

const TAB_ARCH   = 'architecture';
const TAB_BUILD  = 'howwebuilt';
const TAB_LOCAL  = 'localsetup';
const TAB_CLOUD  = 'cloudsetup';

export default function SystemArchitecture() {
  const [activeTab, setActiveTab] = useState(TAB_ARCH);

  const tabs = [
    { id: TAB_ARCH,  label: '🧠 Architecture',      icon: <Cpu size={16} /> },
    { id: TAB_BUILD, label: '🛠 How We Built It',    icon: <Code2 size={16} /> },
    { id: TAB_LOCAL, label: '💻 Run Gemma 4 Locally', icon: <Terminal size={16} /> },
    { id: TAB_CLOUD, label: '☁️ Deploy to Cloud',    icon: <Cloud size={16} /> },
  ];

  return (
    <div className="container" style={{ maxWidth: '1100px' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e0e7ff', color: '#4338ca', padding: '0.35rem 1rem', borderRadius: '999px', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.75rem' }}>
          <Cpu size={16} /> Technical Architecture & Setup
        </div>
        <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 700, color: '#0f172a' }}>
          Maevein Tutor — Powered by Gemma 4
        </h2>
        <p style={{ color: '#64748b', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', marginTop: '0.5rem' }}>
          Full-stack educational AI — built, deployed, and running on Gemma 4
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="filter-tabs" style={{ marginBottom: '2rem', gap: '0.35rem' }}>
        {tabs.map(t => (
          <button
            key={t.id}
            className={`filter-tab ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', padding: '0.5rem 1.1rem' }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ============ TAB 1: ARCHITECTURE ============ */}
      {activeTab === TAB_ARCH && (
        <div className="animate-fade-in">

          {/* Main Flow Diagram */}
          <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1.4fr auto 1fr', gap: '1rem', alignItems: 'center', minWidth: '600px' }}>

              {/* Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>INPUT</div>
                {[
                  { icon: <FileText size={18} />, bg: '#fee2e2', clr: '#dc2626', title: 'PDF / Document', sub: 'Syllabus, notes' },
                  { icon: <CheckCircle2 size={18} />, bg: '#f3e8ff', clr: '#7e22ce', title: 'Student Answers', sub: 'MCQ & text' },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '0.9rem', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.6rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: item.bg, color: item.clr, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{item.title}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <ArrowRight size={22} style={{ color: '#94a3b8', flexShrink: 0 }} />

              {/* Gemma 4 Core */}
              <div style={{ background: 'linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%)', borderRadius: '18px', padding: '1.5rem', border: '2px solid #818cf8', textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#4f46e5', color: 'white', padding: '0.35rem 1.1rem', borderRadius: '999px', fontWeight: 800, fontSize: '0.95rem', marginBottom: '1rem' }}>
                  <Cpu size={16} /> Gemma 4 Core
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {['PDF Text Extraction', 'Question Generation', 'Rubric-Grounded Evaluation', 'Feedback Synthesis', 'Bloom\'s Taxonomy Mapping'].map((m, i) => (
                    <div key={i} style={{ background: '#fff', padding: '0.55rem 0.9rem', borderRadius: '9px', fontSize: '0.82rem', fontWeight: 700, color: '#312e81', border: '1px solid #c7d2fe' }}>{m}</div>
                  ))}
                </div>
              </div>

              <ArrowRight size={22} style={{ color: '#94a3b8', flexShrink: 0 }} />

              {/* Output */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>OUTPUT</div>
                {[
                  { icon: <FileText size={16} />, clr: '#6366f1', label: 'Generated Questions' },
                  { icon: <Award size={16} />, clr: '#f59e0b', label: 'Scores & Rubrics' },
                  { icon: <Lightbulb size={16} />, clr: '#10b981', label: 'Personalized Feedback' },
                  { icon: <BarChart3 size={16} />, clr: '#9333ea', label: 'Learning Insights' },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '0.75rem', background: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ color: item.clr }}>{item.icon}</span>
                    <span style={{ fontWeight: 600, fontSize: '0.82rem' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tech Stack + Privacy Banner */}
          <div className="glass-card" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.25rem' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#475569', marginBottom: '0.75rem' }}>Tech Stack</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {[
                { label: 'Gemma 4', cls: 'badge-purple' },
                { label: 'React + Vite', cls: 'badge-blue' },
                { label: 'Ollama Local', cls: 'badge-amber' },
                { label: 'prompts.py', cls: 'badge-green' },
                { label: 'Vertex AI (Cloud)', cls: 'badge-rose' },
                { label: 'Lucide Icons', cls: 'badge-blue' },
              ].map((b, i) => (
                <span key={i} className={`badge ${b.cls}`} style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}>{b.label}</span>
              ))}
            </div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', padding: '1.1rem 1.5rem', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', boxShadow: '0 8px 24px rgba(16,185,129,0.25)' }}>
            <ShieldCheck size={24} />
            100% Local · Private · Secure — Zero Third-Party Cloud Leaks
          </div>
        </div>
      )}

      {/* ============ TAB 2: HOW WE BUILT IT ============ */}
      {activeTab === TAB_BUILD && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Package size={20} style={{ color: '#6366f1' }} /> What We Leveraged (Existing Tools)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { tool: 'Gemma 4 by Google DeepMind', what: 'The core multimodal large language model. We use Gemma 4\'s native system-role prompt architecture and structured JSON output capability to drive all question generation and evaluation tasks.' },
                { tool: 'React + Vite', what: 'Modern frontend framework and build toolchain. Provides fast HMR during dev, optimized production bundles, and seamless Vercel deployment.' },
                { tool: 'Ollama', what: 'Local model serving layer. Runs Gemma 4 on the user\'s own machine via REST API at localhost:11434 — no cloud dependency required.' },
                { tool: 'Lucide React Icons', what: 'Icon library for a consistent, professional visual language across all UI components.' },
                { tool: 'Vercel', what: 'Serverless deployment platform. Auto-builds from GitHub on every push. Provides global CDN and SPA routing support via vercel.json rewrite rules.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ flexShrink: 0 }}>
                    <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>{item.tool}</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>{item.what}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Brain size={20} style={{ color: '#9333ea' }} /> What We Built Custom (Our Innovation)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {[
                {
                  title: '🔗 Dual-Call Rubric Architecture (prompts.py)',
                  detail: 'Our most critical design decision. Question generation (Call 1) doesn\'t just produce question strings — it also emits a key_concepts list and source_excerpt per question. These become the grading rubric for Call 2 (evaluation). This keeps both calls grounded in the SAME extracted facts. Swap this for a template quiz generator and the eval step has no reliable benchmark left to grade against.',
                  badge: 'Core Innovation'
                },
                {
                  title: '📐 Bloom\'s Taxonomy Mapping Engine',
                  detail: 'We tag every generated question against Bloom\'s 6-level cognitive taxonomy (Remembering → Creating). Educators can filter by level, and students can track which cognitive skills need improvement — going beyond simple right/wrong scoring.',
                  badge: 'Custom Logic'
                },
                {
                  title: '🧪 Concept-Level Answer Evaluation',
                  detail: 'Rather than lexical keyword matching, our evaluateStudentAnswers() function checks whether a student\'s answer demonstrates the specific conceptual understanding required by each question\'s rubric. Partial credit is calculated as a ratio of concepts covered.',
                  badge: 'Custom Logic'
                },
                {
                  title: '🎨 Full React SPA with Step-by-Step Workflow',
                  detail: 'A 5-stage guided learning workflow (Upload → Generate → Test → Evaluate → Feedback → Insights) built entirely in React with state lifted to App.jsx. No router needed — all transitions are state-driven for simplicity and offline support.',
                  badge: 'Custom UI'
                },
                {
                  title: '📊 Personalized Learning Insights Dashboard',
                  detail: 'Post-test analytics page showing performance by Bloom\'s level, concept gap heatmap, time-to-complete, and study recommendations — all computed client-side from the evaluation output with no server required.',
                  badge: 'Custom UI'
                },
              ].map((item, i) => (
                <div key={i} style={{ padding: '1.25rem', background: 'linear-gradient(135deg, #faf5ff, #f0f9ff)', borderRadius: '12px', border: '1px solid #ddd6fe' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e1b4b' }}>{item.title}</span>
                    <span className="badge badge-purple" style={{ fontSize: '0.6rem' }}>{item.badge}</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <GitBranch size={20} style={{ color: '#10b981' }} /> Pitch Script — What We Think & Why
            </h3>
            <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '0.75rem' }}><strong>The Problem:</strong> Educators spend enormous time creating assessments from raw material. Existing tools either generate generic questions or can't ground evaluation in the specific text the student was actually taught.</p>
              <p style={{ marginBottom: '0.75rem' }}><strong>The Insight:</strong> Gemma 4's structured JSON output makes it uniquely suited to a two-stage pipeline. Stage 1 extracts questions AND generates a machine-readable rubric. Stage 2 evaluates against that rubric — not against general world knowledge. This means a physics teacher gets physics-grounded feedback, not generic AI feedback.</p>
              <p style={{ marginBottom: '0.75rem' }}><strong>The Choice to Stay Local:</strong> Teacher PDFs often contain proprietary, sensitive, or unpublished content. We run Gemma 4 entirely on-device (via Ollama) so no student data or exam material ever leaves the machine.</p>
              <p><strong>Why Gemma 4 Specifically:</strong> Gemma 4's system-role prompt support allows us to define strict personas (Assessment Designer, Teaching Assistant) that constrain the model to stay grounded in the uploaded material — crucial for exam fairness.</p>
            </div>
          </div>
        </div>
      )}

      {/* ============ TAB 3: LOCAL SETUP ============ */}
      {activeTab === TAB_LOCAL && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              🖥️ Run Gemma 4 Locally with Ollama
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              The fastest way to run Gemma 4 on your own machine — no cloud account needed.
            </p>

            {[
              {
                step: '1',
                title: 'Install Ollama',
                desc: 'Download and install Ollama from ollama.ai — available for macOS, Windows, and Linux.',
                code: `# macOS / Linux
curl -fsSL https://ollama.ai/install.sh | sh

# Windows — download from:
# https://ollama.ai/download/windows`
              },
              {
                step: '2',
                title: 'Pull the Gemma 4 Model',
                desc: 'Download Gemma 4 — choose the size that fits your GPU/CPU RAM.',
                code: `# Recommended: Gemma 4 4B (needs ~4GB RAM)
ollama pull gemma4

# More capable: Gemma 4 12B (needs ~12GB RAM)
ollama pull gemma4:12b`
              },
              {
                step: '3',
                title: 'Start the Ollama Server',
                desc: 'Ollama serves Gemma 4 as a local REST API on port 11434.',
                code: `ollama serve
# Server running at http://localhost:11434`
              },
              {
                step: '4',
                title: 'Test It — Quick Verification',
                desc: 'Confirm Gemma 4 is running correctly with a simple API call.',
                code: `curl http://localhost:11434/api/chat -d '{
  "model": "gemma4",
  "messages": [
    { "role": "user", "content": "Say: GEMMA4_OK" }
  ],
  "stream": false
}'
# Expected: { "message": { "content": "GEMMA4_OK" } }`
              },
              {
                step: '5',
                title: 'Run Maevein Tutor',
                desc: 'Clone the repo and start the dev server.',
                code: `git clone https://github.com/N-i-k-e-t/maevein-tutor.git
cd maevein-tutor
npm install
npm run dev
# App at: http://localhost:3000`
              },
              {
                step: '6',
                title: 'Connect to Gemma 4',
                desc: 'In the app, click "Model Settings" → select "Ollama Gemma 4 Local Instance" → save.',
                code: `# Settings panel URL: http://localhost:3000
# Engine: Ollama Gemma 4 Local Instance
# URL:    http://localhost:11434`
              },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#4f46e5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>{item.step}</div>
                  <span style={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b' }}>{item.title}</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.6rem', marginLeft: '2.5rem' }}>{item.desc}</p>
                <div className="code-block" style={{ marginLeft: '2.5rem' }}>{item.code}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '14px', padding: '1.25rem 1.5rem' }}>
            <strong style={{ color: '#92400e' }}>⚡ System Requirements:</strong>
            <ul style={{ marginTop: '0.5rem', marginLeft: '1.25rem', color: '#78350f', fontSize: '0.875rem', lineHeight: 2 }}>
              <li>Gemma 4 4B — 8 GB RAM minimum (CPU only), 4 GB with GPU</li>
              <li>Gemma 4 12B — 16 GB RAM recommended</li>
              <li>macOS 13+, Ubuntu 20.04+, Windows 10/11</li>
              <li>Node.js 18+ for the Maevein Tutor UI</li>
            </ul>
          </div>
        </div>
      )}

      {/* ============ TAB 4: CLOUD SETUP ============ */}
      {activeTab === TAB_CLOUD && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Option A: Vertex AI */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Cloud size={22} style={{ color: '#4f46e5' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Option A — Google Vertex AI (Recommended)</h3>
              <span className="badge badge-green">Free Tier Available</span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
              Deploy Gemma 4 on Google Cloud's managed AI platform. Best for production use.
            </p>
            {[
              { title: '1. Create GCP Project & Enable APIs', code: `gcloud projects create maevein-tutor-prod
gcloud config set project maevein-tutor-prod
gcloud services enable aiplatform.googleapis.com` },
              { title: '2. Deploy Gemma 4 on Vertex AI', code: `# Via Google Cloud Console → Model Garden → Search "Gemma"
# Or via CLI (region must support Gemma 4):
gcloud ai models upload \\
  --region=us-central1 \\
  --display-name="gemma4" \\
  --container-image-uri=us-docker.pkg.dev/vertex-ai/prediction/gemma4:latest` },
              { title: '3. Create an Endpoint', code: `gcloud ai endpoints create \\
  --region=us-central1 \\
  --display-name="gemma4-endpoint"

gcloud ai endpoints deploy-model ENDPOINT_ID \\
  --region=us-central1 \\
  --model=MODEL_ID \\
  --machine-type=n1-standard-8` },
              { title: '4. Call Vertex AI from the App', code: `// In gemmaEngine.js — replace local call with:
const response = await fetch(
  'https://us-central1-aiplatform.googleapis.com/v1/projects/' +
  'maevein-tutor-prod/locations/us-central1/endpoints/ENDPOINT_ID:predict',
  {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + ACCESS_TOKEN },
    body: JSON.stringify({ instances: [{ prompt: yourPrompt }] })
  }
);` },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b', marginBottom: '0.5rem' }}>{item.title}</div>
                <div className="code-block">{item.code}</div>
              </div>
            ))}
          </div>

          {/* Option B: Hugging Face Spaces */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Server size={22} style={{ color: '#f59e0b' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Option B — Hugging Face Spaces (Free GPU)</h3>
              <span className="badge badge-amber">100% Free</span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
              Deploy Gemma 4 backend as a Hugging Face Space with Gradio + free T4 GPU. Ideal for demos.
            </p>
            <div className="code-block">{`# 1. Create a new Space at huggingface.co/new-space
# Choose: Gradio / SDK, T4 GPU Hardware

# 2. app.py — Gemma 4 Gradio API endpoint
import gradio as gr
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

model_id = "google/gemma-4-4b-it"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id, torch_dtype=torch.bfloat16, device_map="auto"
)

def chat(message, system):
    inputs = tokenizer(f"{system}\\n{message}", return_tensors="pt").to("cuda")
    outputs = model.generate(**inputs, max_new_tokens=512)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

gr.Interface(fn=chat, inputs=["text","text"], outputs="text",
             title="Maevein Tutor - Gemma 4 API").launch()

# 3. Call from Maevein Tutor UI — point Model Settings to:
# https://YOUR_HF_USERNAME-gemma4-api.hf.space/run/predict`}</div>
          </div>

          {/* Option C: Cloud Run */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Zap size={22} style={{ color: '#10b981' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Option C — Google Cloud Run + Ollama Container</h3>
              <span className="badge badge-green">Scalable</span>
            </div>
            <div className="code-block">{`# Dockerfile — Ollama + Gemma 4 container
FROM ollama/ollama:latest
RUN ollama pull gemma4
CMD ["ollama", "serve"]

# Deploy to Cloud Run
gcloud run deploy gemma4-service \\
  --image gcr.io/YOUR_PROJECT/gemma4-ollama \\
  --platform managed \\
  --region us-central1 \\
  --memory 8Gi \\
  --cpu 4 \\
  --port 11434 \\
  --allow-unauthenticated

# Point Maevein Tutor → Model Settings → Ollama URL:
# https://gemma4-service-xxxx-uc.a.run.app`}</div>
          </div>

          <div style={{ background: '#ecfdf5', border: '1px solid #6ee7b7', borderRadius: '14px', padding: '1.25rem 1.5rem' }}>
            <strong style={{ color: '#065f46' }}>✅ Live Deployment:</strong>
            <p style={{ color: '#047857', fontSize: '0.875rem', marginTop: '0.35rem' }}>
              Maevein Tutor UI is already live at{' '}
              <a href="https://maevein-tutor.vercel.app" target="_blank" rel="noreferrer" style={{ color: '#4f46e5', fontWeight: 700 }}>
                maevein-tutor.vercel.app
              </a>{' '}
              — connect it to any of the above Gemma 4 backends by updating Model Settings.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
