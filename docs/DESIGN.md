# Answering — Design System & UX

## 1. Design Direction

Answering is a focused interactive worksheet application.

The visual identity should feel:

- dark
- premium
- calm
- academic
- focused
- slightly editorial
- distinctive
- intentional

The interface should feel like a **serious personal study workspace**, not an AI dashboard.

### Primary visual concept

> Dark paper / dark workspace + restrained gold accents.

Gold represents:

- focus
- progress
- achievement
- important actions
- selected states

Gold must NOT become the default color of every component.

The majority of the interface should remain dark and neutral.

---

# 2. Design Principles

## 2.1 Dark First

Answering is fundamentally a dark-mode application.

Use dark neutral surfaces as the foundation.

Avoid:

- pure black everywhere
- excessive contrast between every component
- bright colored backgrounds
- large glowing gradients

The UI should have depth through:

- surface hierarchy
- borders
- spacing
- typography
- subtle tonal differences

rather than shadows and glow.

---

## 2.2 Gold as an Accent

Gold is the primary brand accent.

Gold should be used selectively for:

- primary CTA
- active navigation
- selected answer
- important progress state
- success/result emphasis
- small decorative details

Gold should not be used as:

- the entire page background
- every button
- every border
- every icon
- large glowing gradients

The interface should still look coherent if most gold elements are removed.

---

## 2.3 No "AI Aesthetic"

Avoid the common generic AI visual language.

Do NOT use:

- neon cyan/purple gradients
- glowing cards
- excessive blur
- excessive glassmorphism
- huge gradient text
- floating holographic elements
- glowing borders
- excessive rounded cards
- decorative AI particles
- unnecessary charts
- dashboard-style data overload

Answering is not an AI product.

AI is only part of the user's workflow for creating questions.

The product itself should feel like a **study instrument**.

---

# 3. Color System

The exact values may be refined during implementation, but the visual direction should remain within this family.

## Background

Primary page background:

```text
#0B0B0A
```

````

Deep surface:

```text
#10100F
```

Elevated surface:

```text
#151513
```

Secondary surface:

```text
#1B1A17
```

These surfaces should be close enough that the interface feels cohesive.

---

## Gold

Primary gold:

```text
#C9A227
```

Bright gold:

```text
#E0BD55
```

Muted gold:

```text
#92731E
```

Gold should be used carefully.

Prefer solid gold accents over gradients.

---

## Text

Primary:

```text
#F4F1E8
```

Secondary:

```text
#B7B3A8
```

Muted:

```text
#77746C
```

---

## Borders

Subtle:

```text
#282721
```

Strong:

```text
#39362B
```

Borders should be subtle and should not visually dominate the interface.

---

## Semantic Colors

Success:

Use a restrained green.

Error:

Use a restrained red.

Warning:

Use a muted amber.

These semantic colors must remain secondary to the gold brand identity.

Do not turn success/error states into glowing neon blocks.

---

# 4. Typography

Typography should feel clean and editorial.

Use a modern sans-serif as the primary UI font.

Recommended:

- Inter
- Geist
- Geist Sans

The application should prioritize readability over stylistic typography.

## Hierarchy

Landing page:

- large expressive headline
- medium supporting text
- compact navigation

Application:

- clear worksheet title
- strong question text
- readable answer text
- small supporting metadata

Questions should be visually dominant over UI chrome.

---

# 5. Layout Philosophy

The reference dashboard image is used primarily for its **layout structure**.

Do not copy its visual styling.

Answering should use a strong spatial hierarchy.

The main worksheet experience follows:

```text
┌─────────────────────────────────────────────────────────────┐
│ Header                                                      │
├───────────────────────────────────────────────┬─────────────┤
│                                               │             │
│                                               │ Question    │
│              QUESTION AREA                   │ Navigation  │
│                                               │             │
│                                               │             │
│                                               │             │
├───────────────────────────────────────────────┤             │
│ Question actions / navigation                 │             │
└───────────────────────────────────────────────┴─────────────┘
```

The left side is the primary workspace.

The right side is supporting navigation.

---

# 6. Landing Page

The landing page should take inspiration from the second reference image:

- generous spacing
- centered content
- strong headline
- restrained navigation
- large visual breathing room
- simple CTA

However, Answering must have its own identity.

## Hero

Possible structure:

```text
                         ANSWERING

              Practice questions.
              Without the back-and-forth.

       Turn structured questions into an interactive
                 worksheet you can actually use.

                  [ Start Practicing ]
```

The exact copy is not fixed by this document.

The visual hierarchy is more important.

---

## Background

The landing page may use:

- subtle dark tonal variation
- extremely subtle texture/grid if useful
- thin structural lines
- restrained gold detail

Avoid:

- large background illustrations
- glowing gradients
- floating 3D objects
- excessive decorative elements

The background should feel almost like a dark desk or study surface.

---

# 7. Application Entry Flow

After clicking Start, the user should enter a simple preparation flow.

The conceptual flow is:

```text
Landing
   ↓
Get Prompt
   ↓
Input Worksheet
   ↓
Preparation
   ↓
Choose Mode
   ↓
Practice
```

The user should always understand which stage they are currently in.

---

# 8. Get Prompt

This page allows the user to create a prompt for an external AI.

The purpose is not to generate questions inside Answering.

It is a prompt builder.

## Structure

```text
Create your worksheet

Question count
[ 20 ]

Source
○ My material
○ General knowledge

Difficulty
○ Simple
○ Normal
○ HOTS
○ Mixed

Question types
☑ Multiple Choice
☑ Multiple Select
☑ True / False
☑ Short Answer

             [ Generate Prompt ]
```

After generation:

```text
Your prompt

┌─────────────────────────────────────────┐
│                                         │
│ generated prompt...                     │
│                                         │
└─────────────────────────────────────────┘

[ Copy Prompt ]
```

The prompt builder should feel lightweight.

Do not make it look like a complex AI configuration dashboard.

---

# 9. Input Worksheet

After obtaining questions from external AI, the user pastes the structured worksheet.

## Structure

```text
Import Worksheet

Paste your Answering worksheet below.

┌─────────────────────────────────────────┐
│ @worksheet                              │
│ title: ...                              │
│                                         │
│ @question                               │
│ ...                                     │
└─────────────────────────────────────────┘

              [ Load Worksheet ]
```

The user should also be able to see validation feedback.

Example:

```text
✓ Worksheet recognized
20 questions
4 question types
```

or:

```text
Could not load worksheet

Question 7 has an invalid answer reference.
```

Errors should be understandable to a normal user.

---

# 10. Preparation Page

Before answering, show a short preparation screen.

This gives the user a mental transition from "importing questions" to "actually studying".

## Information

Possible information:

```text
Discrete Structures
Pigeonhole Principle

20 questions
4 question types
Estimated difficulty: Mixed

Multiple Choice       8
Multiple Select       4
True / False          4
Short Answer          4
```

Then:

```text
Choose how you want to practice

┌─────────────────────┐
│ Quiz                │
│                     │
│ Immediate feedback  │
│ after every answer  │
│                     │
│ [ Select Quiz ]     │
└─────────────────────┘

┌─────────────────────┐
│ Exam                │
│                     │
│ Results are hidden  │
│ until submission    │
│                     │
│ [ Select Exam ]     │
└─────────────────────┘
```

The preparation page should not become a statistics dashboard.

Keep it concise.

---

# 11. Quiz Mode

Quiz Mode is optimized for learning.

The user sees one question at a time.

## Main Layout

```text
┌─────────────────────────────────────────────────────────────┐
│ Answering                                  7 / 20          │
├───────────────────────────────────────────────┬─────────────┤
│                                               │             │
│  Question 7                                   │ 01 ✓        │
│                                               │ 02 ✓        │
│  What is the negation of p → q?               │ 03 ✓        │
│                                               │ 04          │
│                                               │ 05          │
│  ○ ¬p ∧ q                                     │ 06          │
│  ○ p ∧ ¬q                                     │ 07 •        │
│  ○ p ∨ ¬q                                     │ 08          │
│  ○ ¬p ∨ q                                     │ ...         │
│                                               │             │
│                         [ Submit Answer ]      │             │
└───────────────────────────────────────────────┴─────────────┘
```

The left area is the actual worksheet.

The right area is navigation.

---

# 12. Question Navigation

The navigation panel is intentionally inspired by the right-side narrow panel of the first reference.

It should display question numbers.

Possible states:

```text
01  completed
02  completed
03  incorrect
04  unanswered
05  current
```

Use subtle states.

Do not make the navigation look like a calendar or analytics dashboard.

Question numbers should be compact and easy to scan.

---

# 13. Quiz Feedback

After submitting an answer:

Correct:

```text
✓ Correct

Your answer is correct.

[ Next Question ]
```

Incorrect:

```text
✕ Incorrect

Correct answer:
p ∧ ¬q

Explanation:
...

[ Try Again ]    [ Next Question ]
```

The exact interaction may be refined during implementation.

The important rule:

> Quiz Mode is allowed to reveal the answer immediately.

---

# 14. Exam Mode

Exam Mode should feel more restrained.

Do not expose correctness while the exam is active.

The layout remains similar:

```text
┌─────────────────────────────────────────────────────────────┐
│ Answering                         Question 7 / 20           │
├───────────────────────────────────────────────┬─────────────┤
│                                               │             │
│                QUESTION                       │ 01 ✓        │
│                                               │ 02 ✓        │
│                answers                        │ 03          │
│                                               │ 04 •        │
│                                               │ ...         │
│                                               │             │
│  [ Previous ]                    [ Next ]      │             │
└───────────────────────────────────────────────┴─────────────┘
```

The navigation should clearly distinguish:

- answered
- unanswered
- current

Do not show:

- correct/incorrect
- correct answer
- score

until submission.

---

# 15. Exam Submission

Before submission, provide a clear confirmation.

Example:

```text
Ready to submit?

20 questions
18 answered
2 unanswered

[ Continue Exam ]   [ Submit Exam ]
```

After submission:

```text
Your Result

16 / 20

80%

Correct       16
Incorrect      4
Unanswered     0

[ Review Answers ]
```

The result page should be calm and focused.

Avoid turning the score into a giant gamified celebration.

---

# 16. Review

After Quiz or Exam completion, users should be able to review questions.

Possible status:

```text
01  ✓
02  ✓
03  ✕
04  ✓
05  ✕
```

Selecting a question shows:

- question
- user's answer
- correct answer
- explanation if available

The review page should remain focused on learning.

---

# 17. Cards and Surfaces

Cards are useful but should not dominate the entire interface.

Use surfaces to establish hierarchy.

Preferred hierarchy:

```text
Page background
    ↓
Main surface
    ↓
Question surface
    ↓
Interactive elements
```

Avoid:

```text
card
  → card
      → card
          → card
```

Every card should have a purpose.

The question itself should feel like the main object, not a card inside a dashboard full of cards.

---

# 18. Borders and Shadows

Prefer subtle borders over shadows.

Default cards should use:

- dark surface
- thin subtle border
- small radius

Avoid:

- giant shadows
- glowing shadows
- gold outer glows
- floating glass panels

Depth should come primarily from surface contrast.

---

# 19. Border Radius

Use moderate rounding.

Recommended direction:

- buttons: medium radius
- cards: medium radius
- input fields: medium radius
- question container: medium radius

Avoid extremely rounded "pill everything" styling.

Pills may be used for:

- small status labels
- difficulty indicators
- compact metadata

but not as the default shape for every element.

---

# 20. Gold Interaction Language

Gold should communicate interaction.

Examples:

### Selected option

```text
dark surface
subtle gold border
very subtle gold-tinted background
```

### Primary CTA

```text
solid gold
dark text
```

### Current question

```text
gold number / indicator
```

### Progress

```text
thin gold progress indicator
```

Gold should communicate:

> "This is where your attention should go."

---

# 21. Micro-interactions

Interactions should be subtle.

Allowed:

- small opacity changes
- slight border transitions
- subtle background transitions
- short slide/fade transitions
- button press feedback

Avoid:

- excessive motion
- floating animations
- glowing hover states
- large scaling effects
- decorative animation

The application should feel responsive but calm.

---

# 22. Responsive Behavior

Desktop:

```text
┌───────────────────────────────┬──────────┐
│ question                      │ nav      │
│                               │          │
└───────────────────────────────┴──────────┘
```

Mobile:

```text
┌──────────────────────────┐
│ question                 │
│                          │
│                          │
└──────────────────────────┘

Question 7 / 20

[ ← ]              [ → ]

01 02 03 04 05 06 07 ...
```

The right navigation panel should become a compact navigation component on mobile.

The question remains the primary content.

Do not create horizontal scrolling for the main application layout.

---

# 23. Landing → Application Transition

The landing page and application should feel like the same product.

Landing:

- spacious
- editorial
- focused

Application:

- dense enough for productivity
- structured
- focused

The transition should not feel like entering a completely different dashboard.

---

# 24. Visual Identity

Answering should be recognizable through:

1. dark neutral foundation
2. restrained gold accent
3. strong typography
4. generous spacing
5. structured worksheet layout
6. narrow question navigation
7. minimal decorative effects

The identity should come from **composition and restraint**, not visual effects.

---

# 25. Explicit Anti-Patterns

Do not introduce these without explicit approval:

- blue/purple AI gradients
- cyan neon accents
- glowing gold borders
- excessive glassmorphism
- excessive blur
- floating 3D cards
- dashboard charts
- unnecessary illustrations
- excessive rounded containers
- giant shadows
- animated background particles
- AI-generated decorative imagery
- overly colorful question states
- excessive emoji usage
- excessive badges
- gamified XP/levels

---

# 26. Relationship With PRODUCT.md

`PRODUCT.md` defines what Answering does.

This document defines how the experience should feel and how the main screens are structured.

Do not change product scope through visual design decisions.

If a design idea requires a new product capability, treat it as a product decision first.

---

# 27. Relationship With FORMAT.md

`FORMAT.md` defines the worksheet input contract.

The visual design must adapt to the supported question types.

Do not change the worksheet syntax merely to make the UI implementation easier without explicitly revisiting `FORMAT.md`.

---

# 28. Design Priority

When making visual decisions, prioritize in this order:

1. Readability
2. Answering questions efficiently
3. Clear navigation
4. Focus
5. Consistency
6. Visual identity
7. Decoration

If a decorative idea makes the worksheet harder to use, remove the decoration.

---

# 29. Core Design Statement

> Answering should feel like a beautifully designed digital study sheet — not an AI dashboard.

Dark, restrained, focused, and recognizable.

Gold should guide attention, not dominate the interface.

The interface should feel crafted rather than generated.

```

```
````
