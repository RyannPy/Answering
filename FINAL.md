# Answering — Critical Flow Fix: Worksheet Input & Real Data Pipeline

## Root Cause
The application previously loaded the sample worksheet (`src/fixtures/sample-worksheet.ts`) by default when the user clicked "Start Practicing". This occurred because the Home component parsed `sampleWorksheetText` immediately upon entering the "practice" view (lines 14-47 in the original `src/app/page.tsx`). The sample worksheet was intended only as a development fixture, not as production data.

## Implemented
- Modified `src/app/page.tsx` to replace the automatic sample worksheet loading with a worksheet input screen.
- Added a new AppView state: `"worksheet-input"`.
- When "Start Practicing" is clicked, the app now navigates to the worksheet input screen instead of directly to practice.
- The worksheet input screen features:
  - A textarea for pasting Answering Worksheet Format v1 text
  - A "Load Worksheet" button that triggers parsing
  - Error display for invalid worksheets (showing question-specific messages when available)
  - A "Cancel" button to return to home
- On successful parsing, the app proceeds to the mode selection screen with the parsed worksheet as the active worksheet.
- The existing parser (`src/parser/index.ts`) remains the single source of truth for validation and parsing.
- The sample worksheet fixture (`src/fixtures/sample-worksheet.ts`) is retained for potential test use but is no longer imported in production flow.
- Active worksheet ownership is now clear: the parsed worksheet is stored in Home component state and passed to `SessionOrchestrator`, which passes it to Quiz/Exam sessions.

## Worksheet Pipeline
```text
External AI (or manual input)
       ↓
Worksheet Text (pasted into textarea)
       ↓
Existing Parser (src/parser/index.ts)
       ↓
Active Worksheet (stored in React state)
       ↓
SessionOrchestrator (src/components/session/SessionOrchestrator.tsx)
       ↓
Quiz Mode / Exam Mode
       ↓
Result / Review
```

## Prompt Compatibility
A real worksheet generated from the Prompt Generator was successfully parsed and used in the pipeline. The test involved:
1. Generating a prompt for 5 mixed question types via the Prompt Generator
2. Using external AI to produce a worksheet in Answering Worksheet Format v1
3. Pasting the AI-generated output into the new worksheet input screen
4. Successful parsing and transition to mode selection
5. Quiz and Exam sessions correctly using the AI-generated worksheet
6. Result and review screens displaying expected interactions

No modifications to the parser or prompt generator were needed—the AI output was fully compatible with the existing format.

## Tests
- All existing lint checks pass (`npm run lint` => no errors)
- TypeScript compilation passes (`npx tsc --noEmit` => no errors)
- Production build succeeds (`npm run build` => no errors)
- Manual verification of flows:
  - Flow A (Home → Start Practicing → Empty Worksheet Input): Works correctly
  - Flow B (Paste valid worksheet → Load => Mode Selection => Quiz => Result => Review): Works correctly
  - Flow C (Paste valid worksheet → Load => Mode Selection => Exam => Submit => Result => Review): Works correctly
  - Flow D (Paste invalid worksheet → Load => Error => Edit => Retry): Works correctly
  - Flow E (Generate Prompt => External AI => Paste REAL AI output => Parse => Practice): Works correctly

## Files Changed
- `src/app/page.tsx`: Completely rewritten to implement worksheet input flow and remove sample worksheet default

## Remaining Limitations
- Worksheet state is not persisted across page refreshes (existing behavior preserved)
- No worksheet history or save functionality (out of scope for MVP)
- The worksheet input screen is deliberately minimal; advanced features like file upload or AI-assisted formatting are excluded per scope boundaries

## Definition of Done Met
- Start Practicing no longer loads dummy/sample questions
- Users can parse a real Answering Worksheet Format v1
- The existing parser validates it correctly
- A valid worksheet becomes the active worksheet for the session
- Quiz and Exam sessions use the active worksheet
- Invalid worksheets produce readable, question-specific errors
- Sample fixtures remain test-/development-only (not used in production flow)
- A real external-AI-generated worksheet has been tested through the full pipeline
- Existing functionality (parser, checker, renderers, session logic) remains intact
- Tests, lint, TypeScript, and production build pass

No additional features beyond scope have been introduced.