# Maevein Tutor — Architecture & Build Story

> **Built for the Gemma 4 Hackathon** · Live: [maevein-tutor.vercel.app](https://maevein-tutor.vercel.app) · Repo: [github.com/N-i-k-e-t/maevein-tutor](https://github.com/N-i-k-e-t/maevein-tutor)

---

## What We Built

**Maevein Tutor** is an AI-powered, 100% local personalized learning assistant that:

1. **Accepts any PDF** (syllabus, lecture notes, textbook excerpt)
2. **Generates graded questions** across Bloom's Taxonomy levels (MCQ, Short Answer, Long Answer)
3. **Evaluates student answers** against rubrics derived from the *same source text* — not general AI knowledge
4. **Delivers actionable personalized feedback** per concept, per question, per student

Everything runs locally on the user's machine via **Gemma 4** (Google DeepMind) — zero data leaves the device.

---

## Architecture

```
┌─────────────────┐     ┌──────────────────────────────────────┐     ┌──────────────────┐
│   INPUT LAYER   │────▶│         GEMMA 4 PROCESSING CORE      │────▶│  OUTPUT LAYER    │
│                 │     │                                      │     │                  │
│ • PDF/Document  │     │  Stage 1: Question Generation        │     │ • Questions Bank │
│ • Student MCQ   │     │    └─ prompts.py: system role +      │     │ • Bloom's Map    │
│ • Free-text     │     │       structured JSON output         │     │ • Scores/Rubrics │
│   Answers       │     │                                      │     │ • Personalized   │
│                 │     │  Stage 2: Answer Evaluation          │     │   Feedback       │
│                 │     │    └─ graded against Stage 1's       │     │ • Learning       │
│                 │     │       key_concepts + source_excerpt  │     │   Insights       │
└─────────────────┘     └──────────────────────────────────────┘     └──────────────────┘
```

---

## Tech Stack — What We Leveraged

| Tool | Role |
|------|------|
| **Gemma 4** (Google DeepMind) | Core LLM — question generation, evaluation, feedback |
| **React + Vite** | Frontend SPA + build toolchain |
| **Ollama** | Local model serving at `localhost:11434` |
| **Vercel** | Production deployment + CDN |
| **Lucide React** | Icon system |

---

## What We Created Custom

### 🔗 Dual-Call Rubric Architecture (`prompts.py`)

Our most critical design decision. Question generation (**Call 1**) doesn't just produce question strings — it also emits:
- `key_concepts[]` — what the student must demonstrate  
- `source_excerpt` — which line in the source text grounds this question

These become the **grading rubric** for **Call 2** (evaluation). This keeps both calls grounded in the *same* extracted facts.

> **Why this matters:** Swap this for a template-based quiz generator and the eval step has nothing reliable left to grade against.

### 📐 Bloom's Taxonomy Mapping
Every generated question is tagged to one of 6 cognitive levels (Remembering → Creating). Educators filter by level; students track cognitive growth.

### 🧪 Concept-Level Evaluation Engine (`gemmaEngine.js`)
`evaluateStudentAnswers()` computes partial credit as a ratio of `key_concepts` covered — not lexical keyword matching.

### 🎨 5-Stage Guided Workflow SPA
Upload → Generate → Test → Evaluate → Feedback → Insights — all state-driven with no router, enabling offline use.

---

## Run Locally

### Prerequisites
- Node.js 18+
- Ollama (`ollama.ai`) with Gemma 4 pulled

```bash
# 1. Pull Gemma 4
ollama pull gemma4

# 2. Start Ollama
ollama serve

# 3. Clone & run Maevein Tutor
git clone https://github.com/N-i-k-e-t/maevein-tutor.git
cd maevein-tutor
npm install
npm run dev
# Open http://localhost:3000
```

In the app: **Model Settings → Ollama Gemma 4 Local Instance → http://localhost:11434**

---

## Deploy to Cloud

### Option A — Google Vertex AI (Production)
```bash
gcloud services enable aiplatform.googleapis.com
# Deploy Gemma 4 from Model Garden → create endpoint
# Point Model Settings to the Vertex endpoint URL
```

### Option B — Hugging Face Spaces (Free)
```bash
# Create a Gradio Space with T4 GPU
# Deploy Gemma 4 via transformers + gradio
# Point Model Settings to the Space API URL
```

### Option C — Google Cloud Run + Ollama Container
```bash
docker build -t gemma4-ollama .
gcloud run deploy gemma4-service --image gcr.io/PROJECT/gemma4-ollama --memory 8Gi
# Point Model Settings to the Cloud Run URL
```

---

## Privacy Guarantee

> **100% Local · Private · Secure — Zero Third-Party Cloud Leaks**

Teacher PDFs and student answers never leave the machine when running in local mode. The Gemma 4 model runs entirely on-device via Ollama.
