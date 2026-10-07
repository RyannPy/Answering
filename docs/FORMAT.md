# Answering Worksheet Format

## 1. Purpose

This document defines the text format that Answering accepts as worksheet input.

The format is intentionally human-readable so that an external AI can generate it reliably and a user can inspect or edit it manually.

This format is the core contract between external question generation and the Answering renderer.

## 2. Design Rules

- One worksheet may contain mixed question types.
- Answers are included in the source format.
- The renderer must hide answers until the active mode allows them to be shown.
- Question order is preserved.
- The format should remain easy for both humans and AI models to produce.
- Invalid or incomplete input should produce a useful validation error rather than silently changing the question.

## 3. Proposed Format v1

The exact syntax should be treated as v1 and kept deliberately small.

```text
@worksheet
 title: Discrete Structures Practice
 description: Practice questions about logic and counting

@question
 type: mc
 question: What is the negation of p → q?
 options:
  - ¬p ∧ q
  - p ∧ ¬q
  - p ∨ ¬q
  - ¬p ∨ q
 answer: 2
 explanation: The implication is false only when p is true and q is false.
@end

@question
 type: multi
 question: Which statements are true?
 options:
  - Statement A
  - Statement B
  - Statement C
  - Statement D
 answer: 1,3
@end

@question
 type: tf
 question: A bijective function is both injective and surjective.
 answer: true
@end

@question
 type: short
 question: What is another term for a one-to-one function?
 answer:
  - injective
  - injeksi
  - fungsi injektif
@end
```

## 4. Worksheet Fields

### `@worksheet`

Starts the worksheet.

Required:

- `title`

Optional:

- `description`

### `@question`

Starts a question.

Required:

- `type`
- `question`
- answer information appropriate to the type

Optional:

- `explanation`

### `@end`

Ends the current question.

## 5. Question Types

### `mc`

Multiple Choice. Exactly one option is correct.

```text
@question
 type: mc
 question: ...
 options:
  - Option A
  - Option B
  - Option C
  - Option D
 answer: 2
@end
```

`answer` is a one-based option number.

### `multi`

Multiple Select. One or more options may be correct.

```text
@question
 type: multi
 question: ...
 options:
  - Option A
  - Option B
  - Option C
  - Option D
 answer: 1,3
@end
```

The selected set must exactly match the answer set. Order does not matter.

### `tf`

True / False.

```text
@question
 type: tf
 question: ...
 answer: true
@end
```

Accepted values should be `true` or `false`.

### `short`

Short Answer.

```text
@question
 type: short
 question: ...
 answer:
  - accepted answer one
  - accepted answer two
@end
```

Any accepted answer may be considered correct after normalization.

## 6. Answer Visibility

The source always contains answer information.

The renderer must treat answers as hidden data during normal rendering.

Quiz Mode may reveal the correct answer immediately after submission.

Exam Mode must not reveal answer information until the exam has been submitted.

There is no need for an `answer hidden` or `answer visible` syntax in v1 because visibility is controlled by the selected mode.

## 7. Explanations

An explanation is optional.

If present, it is displayed when the mode permits answer review.

```text
explanation: Short explanation of why the answer is correct.
```

## 8. Parsing Requirements

The parser should:

- identify worksheet metadata
- split questions
- identify question type
- preserve question text
- parse options where required
- parse answer data
- parse optional explanation
- reject unsupported question types
- reject missing required fields
- reject invalid answer references

The parser should return typed internal data rather than exposing raw parser structures directly to UI components.

## 9. Validation

Examples of invalid input:

- missing worksheet title
- question without a type
- `mc` without options
- `mc` answer referencing a nonexistent option
- `multi` without at least one correct option
- `tf` with a value other than true/false
- `short` without an accepted answer
- unsupported question type

Errors should identify the affected question when possible.

## 10. Versioning

The first implementation is `Answering Worksheet Format v1`.

If the format must make a breaking change, update the format version explicitly rather than silently changing parser behavior.

The application does not need a complicated version negotiation system for MVP.
