# 🎓 Maevein Tutor (GemmaTutor)
## Pitch Deck & Presentation Guide — Kaggle Gemma 4 Hackathon (AI Education Track)

---

### 📌 Slide 1: Title & Executive Summary
**Headline**: Maevein Tutor — An AI Teaching Assistant for Personalized Learning  
**Subtitle**: Moving from Passive Grading to Active Conceptual Mastery with Google Gemma 4  
**Track**: AI Education Track | Google Gemma 4 Competition  
**Core Mission**: 100% Local · Private · Dual-Call Grounded Reasoning Engine  

> *"We don't just assign marks — we build understanding."*

---

### 📌 Slide 2: The Problem in Modern AI Education
1. **Scores Without Context**: Standard grading engines assign scores (e.g., "7/10") but leave students confused on *why* they lost marks.
2. **Hallucination & Inconsistency**: Generic LLM evaluation often grades against arbitrary external knowledge rather than the teacher's actual source material.
3. **Privacy & Data Security Risks**: Uploading student exams, internal syllabi, and institution records to third-party cloud APIs violates student privacy policies.
4. **Keyword Matching vs Conceptual Understanding**: Traditional auto-graders rely on exact phrase matching rather than understanding core subject principles.

---

### 📌 Slide 3: The Solution — Maevein Tutor
**Maevein Tutor** transforms AI from an auto-grader into a **Personal AI Teacher**:

- 📄 **1. Context Extraction**: Teachers upload any PDF syllabus, course notes, or textbook.
- 🎯 **2. Rubric-Grounded Question Generation**: Gemma extracts key concepts, source excerpts, and questions mapped to Bloom's Taxonomy.
- 🧠 **3. Conceptual Reasoning Evaluation**: Gemma evaluates student answers against the grounded rubric — assessing depth, nuances, and core principles.
- 📊 **4. AI Learning Report**: Delivers actionable insights:
  - **Overall Conceptual Score (%)**
  - **Identified Strengths & Mastered Concepts**
  - **Targeted Gaps & Needs Improvement**
  - **Customized Next Learning Path & Topic Readiness**

---

### 📌 Slide 4: Why Google Gemma 4? Architecture & Technical Innovation

#### 🔹 1. Dual-Call Grounded Architecture
```
Teacher Uploads PDF ➔ Gemma Generation (Extracts Questions + Rubric + Source Excerpts)
                               ↓
Student Answers ➔ Gemma Evaluation (Grades using SAME Ground-Truth Rubric) ➔ AI Learning Report
```
*Design Decision*: Grounding evaluation in the exact rubric generated during question synthesis eliminates hallucinations and ensures strict factual consistency with source materials.

#### 🔹 2. 100% Local & Privacy-Preserving
- Powered locally via **Ollama** — zero third-party cloud leaks.
- Student data, exam answers, and institution IP remain completely on-device.

#### 🔹 3. Edge-Optimized Model Tiering
- Support for local GPU execution (`gemma3-tutor`, `gemma3:4b`, `gemma4`).
- Optimized for standard edge hardware (e.g., 4GB VRAM GTX 1650 / laptops / classroom devices).

---

### 📌 Slide 5: Live Demo & Key Product Features

| Feature | Description | Benefit |
|:---|:---|:---|
| **PDF Synthesizer** | Instant extraction of syllabus & lecture notes | Zero setup effort for teachers |
| **Multi-Tier Questions** | MCQs, Short Answer, Long Answer with Bloom's levels | Comprehensive cognitive assessment |
| **Live Gemma Status** | Real-time connection indicator & model detection | Seamless UX with automated fallback |
| **Progressive Evaluation** | Real-time evaluation progress per question | Zero UI lockups during inference |
| **AI Learning Report** | Visual breakdown of conceptual gaps & next steps | Drives student growth & self-study |

---

### 📌 Slide 6: Judging Criteria Alignment

| Criteria | Weight | How Maevein Tutor Delivers |
|:---|:---:|:---|
| **Gemma Integration** | **30%** | Native Ollama integration across 5 distinct pipeline stages (Synthesis, Generation, Rubric Creation, Evaluation, Feedback). |
| **Innovation & Concept** | **30%** | Paradigm shift from "marking" to "teaching assistant" with dual-call rubric grounding and personalized learning paths. |
| **Functionality & Quality**| **20%** | Full local application with dark/light themes, responsive mobile UI, real-time evaluation progress, and structured JSON output parsing. |
| **Writeup & Open Source** | **20%** | Public repository with full setup scripts, clean code, comprehensive `README.md`, and `ARCHITECTURE.md`. |

---

### 📌 Slide 7: Future Roadmap & Impact
1. **Multimodal Student Inputs**: Supporting handwritten math equations and diagrams via Gemma 4 Vision.
2. **Teacher Class Analytics Dashboard**: Aggregating class-wide conceptual weakness patterns for instructors.
3. **Offline Education Kits**: Pre-packaging local Gemma inference onto low-cost devices for remote and underserved schools.

---

### 🌐 Links & Repository
- **GitHub Repository**: [https://github.com/N-i-k-e-t/maevein-tutor.git](https://github.com/N-i-k-e-t/maevein-tutor.git)
- **Built With**: Google Gemma 4 Architecture · Vite + React · Ollama · Tailwind/CSS
