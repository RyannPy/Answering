# Answering — Roadmap

## Phase 0 — Product & Contract

Status: **In progress**

Goals:

- define product scope
- define supported question types
- define Quiz and Exam modes
- define worksheet format
- define deterministic checking rules
- define external-AI prompt workflow
- establish agent constraints
- keep `DESIGN.md` separate

Deliverables:

- `AGENTS.md`
- `README.md`
- `docs/PRODUCT.md`
- `docs/FORMAT.md`
- `docs/PROMPTS.md`
- `docs/ROADMAP.md`

Checkpoint:

> A coding agent can understand what Answering is, what it accepts, what it must render, and what it must not build.

## Phase 1 — Foundation & Parser

Goals:

- initialize Next.js + TypeScript project
- configure static-compatible deployment for Vercel
- establish basic project structure
- define internal worksheet/question types
- implement Answering Worksheet Format v1 parser
- implement parser validation and useful errors

Checkpoint:

> A valid worksheet string can be converted into typed worksheet data without involving the UI.

## Phase 2 — Question Renderer & Checking

Implement:

- Multiple Choice
- Multiple Select
- True / False
- Short Answer
- deterministic answer checking
- answer state

Checkpoint:

> A loaded worksheet can render all MVP question types and correctly determine answers.

## Phase 3 — Quiz & Exam Modes

Implement:

### Quiz Mode

- one question per card
- submit answer
- immediate feedback
- answer/explanation reveal
- next question

### Exam Mode

- one question per card
- navigation
- no answer reveal during exam
- submit exam
- score
- review

Checkpoint:

> A complete worksheet can be practiced or taken as an exam from start to finish.

## Phase 4 — Prompt Generator

Implement:

- question count
- source selection
- difficulty selection
- question type selection
- generated prompt preview
- copy prompt action

Checkpoint:

> A user can configure a request and obtain a ready-to-copy prompt for an external AI.

## Phase 5 — Polish & Release

Implement only after the core workflow is stable:

- responsive behavior
- accessibility improvements
- loading/empty/error states where relevant
- visual polish
- final Vercel deployment
- production smoke test

Checkpoint:

> Answering is comfortable to use on both desktop and mobile for its intended personal workflow.

## Future Features

These are intentionally outside the MVP roadmap:

- AI/API-powered essay evaluation
- semantic short-answer evaluation
- saved worksheets
- persistent history
- accounts
- cloud synchronization
- richer question types
- worksheet sharing
- question bank

Future features must not be implemented during MVP unless explicitly promoted into the roadmap.

## Design Documentation

`DESIGN.md` is intentionally excluded from Phase 0.

Visual language, layout, interaction styling, component appearance, and detailed UX decisions will be designed separately before implementation of the relevant UI phases.
