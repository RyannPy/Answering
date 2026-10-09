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

## 11. Mathematical Notation

Worksheet content supports LaTeX mathematical expressions for rendering equations and formulas.

### Inline Math

Use `\( ... \)` for inline mathematical expressions:

```text
question: What is the value of \(x\) when \(x^2 = 4\)?
```

### Display Math

Use `\[ ... \]` for display (block) mathematical expressions:

```text
question: Solve the quadratic equation: \[\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}\]
```

### Supported LaTeX Features

Mathematical notation is rendered using KaTeX and supports:

- Square roots: `\sqrt{x^2 + 4}`
- Fractions: `\frac{a}{b}`
- Exponents: `x^2`, `x^{n+1}`
- Subscripts: `x_i`, `a_{n-1}`
- Greek letters: `\alpha`, `\beta`, `\gamma`, `\Delta`, `\Sigma`
- Inequalities: `\leq`, `\geq`, `\neq`
- Absolute values: `|x|`
- Summations: `\sum_{i=1}^{n}`
- Integrals: `\int_{a}^{b}`
- Piecewise functions: `\begin{cases} ... \end{cases}`
- Interval notation: `[0, \infty)`, `(-\infty, 5]`
- Matrices: `\begin{pmatrix} ... \end{pmatrix}`
- Set notation: `\{x \mid x > 0\}`
- Logical operators: `\land`, `\lor`, `\neg`, `\implies`, `\iff`

### Examples

Multiple Choice with math:

```text
@question
 type: mc
 question: Find \(f(x)\) when \(f(x) = \sqrt{x^2 + 4}\) and \(x = 3\).
 options:
  - \(\sqrt{13}\)
  - \(\sqrt{10}\)
  - 5
  - 7
 answer: 1
 explanation: Substitute \(x = 3\) into \(f(x) = \sqrt{x^2 + 4}\) to get \(f(3) = \sqrt{9 + 4} = \sqrt{13}\).
@end
```

Display equation in question:

```text
@question
 type: short
 question: What is the derivative of \[\frac{d}{dx}(x^3 + 2x^2 - 5x + 1)\]
 answer:
  - \(3x^2 + 4x - 5\)
  - 3x^2 + 4x - 5
 explanation: Apply the power rule to each term: \(\frac{d}{dx}(x^n) = nx^{n-1}\).
@end
```

### Guidelines

- Mathematical expressions are optional. Use LaTeX notation only when displaying mathematical content.
- Plain text worksheets without LaTeX notation remain fully compatible.
- Malformed LaTeX will fall back to displaying the raw notation rather than crashing the application.
- Short answer checking remains deterministic and case-insensitive text comparison. LaTeX rendering does not affect answer evaluation.
