# Maevein Tutor — Presentation Deck (Google I/O & Apple Quality)

## Slide 1: Title & Vision
- **Visual Layout**: Dark-mode glassmorphism backdrop with glowing Google Gemma 4 badge and high-contrast typography.
- **Title**: Maevein Tutor
- **Subtitle**: AI-Powered Personalized Learning Assistant Built with Google Gemma 4
- **Speaker Notes**: "Welcome everyone. Today we are presenting Maevein Tutor — an AI-powered personalized learning assistant built on Google Gemma 4 that transforms static educational content into adaptive, explainable, personalized learning experiences while keeping AI 100% private and local."

---

## Slide 2: The Education Challenge
- **Visual Layout**: Split diagram comparing Traditional LMS vs Maevein Tutor.
- **Left Column**: Traditional LMS (Static PDF → Static Quiz → Grade 65% → Zero Explanation → Failure).
- **Right Column**: Maevein Tutor (Teacher PDF → Gemma 4 Synthesis → Adaptive Exam → Concept Match Chips → Visual Mindmap → Growth).
- **Speaker Notes**: "Traditional LMS platforms assign marks, but fail to teach. They return percentages without explaining why a student missed a concept or how to close their knowledge gaps."

---

## Slide 3: Dual-Call Rubric Grounding & Gemma 4 Integration
- **Visual Layout**: High-tech data flow diagram showcasing Call 1 (Rubric Synthesis) and Call 2 (Answer Evaluation).
- **Key Callouts**:
  - *Grounded Extraction*: Zero hallucinated facts outside the source PDF.
  - *Bloom's Taxonomy Classification*: Questions mapped across 6 cognitive levels.
  - *Non-Deterministic Grading*: Evaluates conceptual meaning rather than rigid string matches.
- **Speaker Notes**: "Our core breakthrough is Dual-Call Rubric Grounding. In Call 1, Gemma 4 synthesizes an exact ground-truth rubric from the PDF. In Call 2, Gemma 4 evaluates student responses against that exact rubric, providing concept-level feedback."

---

## Slide 4: Personalized AI Learning Report & Knowledge Mindmap Graph
- **Visual Layout**: Screenshot mockup of the Personalized Feedback view featuring green/red concept chips and dark-mode Mindmap Node Graph.
- **Key Features**:
  - Green Matched Chips (`✓ balanced BST, O(log n)`)
  - Red Gap Chips (`• missed overlapping subproblems`)
  - Color-coded Mindmap Graph (Green Mastered, Yellow Partial, Red Priority Review)
- **Speaker Notes**: "Instead of a cold score, students receive an interactive learning report. Source concept chips show exactly what matched, while our visual Knowledge Mindmap Node Graph maps their personal tree of knowledge."

---

## Slide 5: Student History & Zero-Config Wi-Fi Demo
- **Visual Layout**: Side-by-side view of the Assessment History Log table and Local Network Access badge (`http://192.168.1.7:3000`).
- **Speaker Notes**: "Every test attempt is stored locally to build an adaptive student profile over time. Best of all, Maevein Tutor runs 100% locally with zero setup — any judge or student on the same Wi-Fi router can instantly run the demo on their phone."
