# AGENTS.md

## Project

Answering is a small static web application for turning structured worksheets into interactive question-answering experiences.

## Product Philosophy

- Small tool, not a learning platform.
- Static-first.
- The web renders and checks worksheets; it does not generate questions with AI.
- AI is external to the application during MVP.
- Prefer simple, explicit solutions over abstraction for its own sake.
- Do not introduce backend infrastructure, authentication, database, or API integrations unless explicitly requested.
- Do not silently expand scope.
- Do not add dependencies unless they solve a clear MVP need.
- Preserve the worksheet format as a stable contract.

## Stack

- Next.js
- TypeScript
- Static-compatible deployment
- Vercel

## Product Scope

MVP question types:

- Multiple Choice (one correct answer)
- Multiple Select (multiple correct answers)
- True / False
- Short Answer

Essay/semantic answer evaluation is a future feature and must not be implemented in MVP.

MVP modes:

- Quiz Mode: one question per card, immediate feedback after submission.
- Exam Mode: one question per card, no answer reveal until the exam is submitted.

## Architecture Principles

Keep these concerns separate:

1. Worksheet parsing
2. Internal worksheet/question types
3. Answer checking
4. Question rendering
5. Quiz/Exam session state
6. Prompt generation

The parser should convert the text format into typed internal data. UI components should not parse the raw format themselves.

## AI Prompt Generator

The application may generate copyable prompts for an external AI. It must not call an AI API in MVP.

Prompt configuration includes:

- question count
- difficulty: Simple, Normal, HOTS, Mixed
- question types
- source: user-provided material or general internet knowledge

## Scope Control

Before implementing a feature, check whether it is explicitly part of the current roadmap phase. If not, do not implement it without approval.

Do not modify `DESIGN.md` unless explicitly instructed. Visual design decisions are intentionally handled separately from Phase 0 product/technical documentation.

## Validation

After implementation:

- run TypeScript checks
- run linting
- run build
- manually verify the affected flow

A task is not complete merely because the code compiles.
