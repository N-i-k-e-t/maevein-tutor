# Maevein Tutor (GemmaTutor) — AI-Powered Personalized Learning Assistant

[![Built with Gemma 4](https://img.shields.io/badge/Model-Gemma%204%20by%20Google%20DeepMind-indigo.svg)](https://deepmind.google/technologies/gemma/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Live%20Deployment-000000.svg?logo=vercel)](https://maevein-tutor.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Local & Offline First](https://img.shields.io/badge/Privacy-100%25%20Local%20%26%20Private-emerald.svg)]()

> **Single Source of Truth**: See [`MAEVEIN_TUTOR_MASTER_CONTEXT.md`](./MAEVEIN_TUTOR_MASTER_CONTEXT.md) for complete technical architecture, Gemma 4 deep-dive, branding, presentation deck, and demo storyboard.

**Maevein Tutor (GemmaTutor)** is an end-to-end AI-powered personalized learning and assessment assistant built on top of **Gemma 4** by Google DeepMind. Designed for educators and students, Maevein Tutor transforms raw study materials, lecture notes, and competition rules into interactive assessments, intelligent evaluations, and concept-level feedback.

---

## 🚀 Live Demo & Master Documentation

- **Single Source of Truth Document**: [`MAEVEIN_TUTOR_MASTER_CONTEXT.md`](./MAEVEIN_TUTOR_MASTER_CONTEXT.md)
- **💡 Plain English & Layman's Feature Guide**: [`Project Assets/Documentation/LAYMAN_EXPLANATION_AND_FEATURES.md`](./Project%20Assets/Documentation/LAYMAN_EXPLANATION_AND_FEATURES.md)
- **📊 Technical Benchmark & Validation Report**: [`PROJECT_VALIDATION_REPORT.md`](./PROJECT_VALIDATION_REPORT.md)
- **📱 Device Capacity & Compatibility Spec**: [`Project Assets/Documentation/DEVICE_CAPACITY_AND_COMPATIBILITY.md`](./Project%20Assets/Documentation/DEVICE_CAPACITY_AND_COMPATIBILITY.md)
- **Project Assets Directory**: [`Project Assets/`](./Project%20Assets/)
- **Live Vercel Cloud Link**: [https://maevein-tutor.vercel.app](https://maevein-tutor.vercel.app)
- **GitHub Repository**: [https://github.com/N-i-k-e-t/maevein-tutor.git](https://github.com/N-i-k-e-t/maevein-tutor.git)
- **📊 Pitch Deck / Presentation**: [`Project Assets/Presentation/PRESENTATION_DECK.md`](./Project%20Assets/Presentation/PRESENTATION_DECK.md)
- **📐 System Architecture & Design**: [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- **🏆 Kaggle Competition Writeup**: [`Project Assets/Kaggle/KAGGLE_SUBMISSION_WRITEUP.md`](./Project%20Assets/Kaggle/KAGGLE_SUBMISSION_WRITEUP.md)


---

## 🧠 End-to-End AI Learning Engine Architecture

Instead of simple document processing, Maevein Tutor functions as a complete **AI Learning Engine**:

```
Upload Educational Content ──> Knowledge Extraction ──> Knowledge Map & Rubric
                                                              │
                                                              ▼
Personalized Feedback <── Learning Gap Detection <── Student Evaluation <── Learning Objectives (Bloom's)
        │
        ├──> Interactive Knowledge Mindmap Graph
        └──> Progress Analytics & Assessment History Log
```



---

## ✨ Key Features & Workflow

1. **📄 Study Material & PDF Ingestion**:
   - Drag-and-drop file uploader supporting PDFs, DOCX, and TXT files up to 50MB.
   - Built-in pre-loaded study documents:
     - *Kaggle Competition Foundational Rules*
     - *Machine Learning - Unit 1 Fundamentals*
     - *Biology - Photosynthesis & Cell Respiration*

2. **🧠 Gemma 4 Question Generation**:
   - Synthesizes key concepts into MCQs, Short Answer, and Long Answer questions.
   - Categorized by **Bloom's Taxonomy** levels (*Remembering*, *Understanding*, *Applying*, *Analyzing*, *Evaluating*, *Creating*).
   - Export generated assessments into JSON format.

3. **📝 Interactive Student Test Runner**:
   - Student assessment interface with a live countdown timer (`00:45:30`), marks allocation, rich text formatting toolbar, and interactive choice selection.

4. **⚡ Real-Time AI Evaluation Dashboard**:
   - Stage-by-stage concept evaluation loader (0% → 100%) showing real-time Gemma 4 model status indicators.

5. **🎯 Personalized Concept Feedback**:
   - Overall score percentage breakdown (e.g., 85% Accuracy).
   - SVG Donut Chart visualization (70% Correct, 15% Partially Correct, 15% Incorrect).
   - Granular breakdown cards per question:
     - **What you did well** (Green checkmark)
     - **Concept to Improve** (Orange alert)
     - **Suggestion & Recommendation** (Blue lightbulb)

6. **📊 Learning Insights Analytics**:
   - Performance statistics (*Tests Taken*, *Average Score*, *Improvement +18%*).
   - Interactive SVG Score Trend chart across time (Mon - Sun).
   - Dynamic topic pills for *Top Strengths* and *Topics to Improve*.

7. **⚙️ Local & Cloud Architecture**:
   - Visual system architecture flowchart detailing Gemma 4 local processing modules.
   - Engine toggle supporting local Gemma 4 simulation, local **Ollama** endpoints, or **Gemini API** keys.
   - **100% Client-side & Local Capable** — zero dependency on Supabase or paid cloud databases.

---

## 🛠️ Local Installation & Running

```bash
# 1. Clone the repository
git clone https://github.com/N-i-k-e-t/maevein-tutor.git
cd maevein-tutor

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 🌐 Deploying to Free Vercel Cloud

```bash
# Deploy with Vercel CLI
npm install -g vercel
vercel
```

Or connect the GitHub repository `N-i-k-e-t/maevein-tutor` directly on [vercel.com](https://vercel.com) for automatic free cloud continuous deployment!

---

## 📜 License
MIT License. Created for the Gemma 4 Hackathon by Google DeepMind.
