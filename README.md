# Answering

Answering is a small static web app for practicing questions through interactive worksheets.

The core idea is simple:

> AI or the user creates a worksheet in Answering's structured format. Answering renders it as an interactive worksheet and checks answers locally in the browser.

Answering does **not** need an AI API, database, authentication, or backend for the MVP.

## Core Flow

```text
Material / existing questions
          ↓
      External AI
          ↓
  Answering Worksheet Format
          ↓
       Answering
          ↓
   Interactive practice
```

## Modes

### Quiz Mode

- One question per card.
- User submits an answer.
- Immediate correctness feedback.
- Correct answer and explanation may be shown immediately.
- Intended for learning and practice.

### Exam Mode

- One question per card.
- User can move between questions.
- Answers are not revealed after each submission.
- Final evaluation happens when the exam is submitted.
- Intended for exam simulation.

## Supported Question Types

- Multiple Choice
- Multiple Select
- True / False
- Short Answer

Essay evaluation is a future feature requiring AI/API integration.

## Development

The project uses Next.js and TypeScript and is intended for static-compatible deployment on Vercel.

See `docs/PRODUCT.md`, `docs/FORMAT.md`, `docs/PROMPTS.md`, and `docs/ROADMAP.md` for the product contract.
