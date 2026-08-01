# Kaggle Gemma 4 Hackathon Submission: Maevein Tutor

## Track: AI Education Track
**Project Name**: Maevein Tutor — AI-Powered Personalized Learning Assistant  
**Primary Reasoning Engine**: Google Gemma 4 (via local Ollama `gemma3-tutor` / `gemma3:4b`)  
**Deployment**: 100% Local & Private Node/Vite Web App + Local Wi-Fi Network Access + Clonable Notebook  

---

## Executive Summary
Current Learning Management Systems (LMS) suffer from a fundamental flaw: **they assign marks, but they do not teach**. Tests return percentages, but fail to explain *why* a student missed a question, *which specific concepts* from the source text were missing, or *what exact learning path* will close the gap.

**Maevein Tutor** redefines education by deploying **Google Gemma 4** as an autonomous, grounded AI Reasoning Engine. By converting static syllabus PDFs into grounded bloom's-taxonomy questions, evaluating student responses against exact source material rubrics, and generating visual learning mindmaps with personalized study paths, Maevein Tutor turns assessments into transformative learning experiences.

---

## 🔑 Key Innovation: Dual-Call Rubric Grounding
1. **Call 1 (Gemma Question & Rubric Synthesis)**: Gemma 4 reads the teacher's PDF, extracts key concepts, and generates questions along with a strict reference rubric (`keyConcepts` + `sourceExcerpt`).
2. **Call 2 (Gemma Conceptual Evaluation & Mindmap)**: Gemma 4 evaluates student responses against the exact rubric generated in Call 1, rewarding conceptual understanding rather than exact string matching, detecting skipped answers instantly, and populating a color-coded **Knowledge Mindmap Node Graph**.

---

## 🏆 Kaggle Education Track Alignment
- **Pedagogical Impact**: Replaces rote grading with concept-level feedback (Green Matched Chips vs Red Missing Chips).
- **Gemma 4 Deep Integration**: Uses Gemma 4 for PDF extraction, Bloom's Taxonomy classification, non-deterministic answer grading, and adaptive historical profile generation.
- **Privacy & Accessibility**: Runs 100% locally on standard consumer hardware (8GB RAM / GTX 1650 4GB VRAM) with zero data leaving the student's device.
