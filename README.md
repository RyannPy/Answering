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

## Features

### Prompt Generator

Configure and generate prompts for external AI (ChatGPT, Claude, etc.) to create worksheet questions:

- Question count
- Difficulty: Simple, Normal, HOTS, Mixed
- Question types: Multiple Choice, Multiple Select, True/False, Short Answer
- Source: User-provided material or general knowledge
- Copy to clipboard

### Practice Modes

#### Quiz Mode

- One question per card
- Submit answer
- Immediate correctness feedback
- Correct answer and explanation shown immediately
- Try Again option for incorrect answers
- Intended for learning and practice

#### Exam Mode

- One question per card
- Navigate between questions
- Answers not revealed during exam
- Final evaluation after submission
- Review with correct answers after completion
- Intended for exam simulation

### Supported Question Types

- **Multiple Choice**: One correct option
- **Multiple Select**: Multiple correct options (order-independent)
- **True / False**: Boolean answer
- **Short Answer**: Text input with normalization (case-insensitive, whitespace-trimmed)

Essay evaluation is a future feature requiring AI/API integration.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Type check
npx tsc --noEmit
```

## Technology Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Static-first** - No backend required
- **Vercel** - Deployment target

## Architecture

The application maintains clean separation of concerns:

1. **Parser** (`src/parser/`) - Converts Answering Worksheet Format v1 text to typed data
2. **Checker** (`src/checker/`) - Deterministic answer validation
3. **Renderer** (`src/components/questions/`) - Question type-specific UI components
4. **Session** (`src/components/session/`) - Quiz/Exam mode orchestration
5. **Prompt Builder** (`src/lib/prompt-builder.ts`) - Pure prompt generation

## Documentation

See the `docs/` directory for detailed specifications:

- `PRODUCT.md` - Product definition and goals
- `FORMAT.md` - Answering Worksheet Format v1 specification
- `PROMPTS.md` - Prompt generator requirements
- `ROADMAP.md` - Implementation phases
- `DESIGN.md` - Visual design system

## License

Private project.
