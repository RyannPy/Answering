# Answering — AI Prompt Generator

## 1. Purpose

Answering can generate prompts for an external AI chat service.

The web does not call an AI API. It only constructs a prompt that the user can copy and send manually.

## 2. Prompt Configuration

The prompt generator should support:

- question count
- difficulty
- question types
- source

## 3. Difficulty Modes

### Simple

Questions should primarily test recall, recognition, definitions, direct application, or basic understanding.

### Normal

Questions should require normal course-level understanding and application, with some reasoning.

### HOTS

Questions should require deeper reasoning, interpretation, comparison, multi-step thinking, or application to unfamiliar situations.

### Mixed

Questions may combine Simple, Normal, and HOTS difficulty levels.

The exact distribution should remain configurable or be decided during implementation; it must not be treated as a hard product invariant in Phase 0.

## 4. Source Modes

### User-Provided Material

The user will provide material after the generated prompt, or include it as part of the prompt.

The prompt should instruct the AI to:

- prioritize the provided material
- avoid inventing material-specific facts that are unsupported by the source
- preserve the intended academic topic
- produce an answer for every question
- provide explanations when appropriate
- output only the Answering worksheet format after the instructions/material

### General Internet Knowledge

The prompt should instruct the AI to create questions using generally available knowledge about the requested topic.

The AI should still output the Answering worksheet format.

## 5. Question Type Selection

The user may select one or more:

- Multiple Choice
- Multiple Select
- True / False
- Short Answer

The generated prompt should tell the AI to freely mix the selected types across the worksheet.

If the user selects all supported types, the AI may choose the type most appropriate for each question.

## 6. Output Contract

Every generated question must:

- use a supported question type
- include its answer
- include valid options when applicable
- include an explanation when useful
- follow `Answering Worksheet Format v1`

The prompt should explicitly tell the AI not to output Markdown explanations around the worksheet when strict machine-readable output is requested.

## 7. Base Prompt Template

The implementation should generate a prompt equivalent in meaning to the following:

```text
You are creating a practice worksheet for the Answering web application.

Create {QUESTION_COUNT} questions about:
{TOPIC_OR_MATERIAL}

Difficulty: {DIFFICULTY}
Allowed question types:
{QUESTION_TYPES}

Source policy:
{SOURCE_INSTRUCTION}

Requirements:
- Make the questions academically useful, not trivial unless the selected difficulty is Simple.
- You may mix the allowed question types.
- Include the correct answer for every question.
- For multiple choice, provide exactly one correct option.
- For multiple select, provide all correct option numbers.
- For true/false, provide true or false.
- For short answer, provide one or more accepted answers.
- Include a concise explanation when useful.
- Do not create unsupported question types.
- Do not omit answers.
- Preserve the meaning of the requested topic/material.

Output strictly in Answering Worksheet Format v1.
Do not wrap the worksheet in Markdown code fences.
Do not add commentary before or after the worksheet.
```

The actual implementation should substitute the selected configuration values rather than exposing placeholders to the user.
