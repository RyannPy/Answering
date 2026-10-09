# Answering — Design System v2

**Modern. Refined. Academic.**

---

## Design Philosophy

Answering is a focused interactive worksheet application for serious study.

The interface should feel:

- **Intentional, not generic** — Every element has a purpose
- **Modern, not trendy** — Contemporary without chasing short-lived trends
- **Refined, not flashy** — Premium quality through restraint
- **Academic, not corporate** — Study tool, not business dashboard
- **Interactive, not animated** — Feedback that matters, not decoration
- **Composed, not card-heavy** — Structure through hierarchy, not containers

The original dark + gold identity remains intact. This redesign makes it feel significantly more polished, interactive, and characterful without abandoning what makes Answering distinctive.

---

## Product Personality

> **A beautifully designed digital study sheet — not an AI dashboard.**

Answering should feel like:

- A premium personal workspace
- A refined academic instrument
- A thoughtfully crafted study environment
- A focused practice tool

Answering should NOT feel like:

- A generic SaaS dashboard
- An AI marketing website
- A colorful gamified quiz app
- A corporate enterprise admin panel
- A flat text-only terminal
- An empty minimalist concept

---

## Visual Direction

### Core Identity

Dark, gold, academic, focused, confident, understated.

### What Changed From v1

**v1 Problems:**
- Too flat (no depth)
- Too monotonous (visual repetition)
- Too rigid (lacked warmth)
- Slightly old-fashioned
- Overly utility-dashboard-like
- Everything looked the same

**v2 Solutions:**
- Subtle layered depth through tonal surfaces
- Stronger typography hierarchy
- Refined interactive states
- Modern spacing and composition
- Contextual surfaces (not cards everywhere)
- Distinct visual roles for components

### What Did NOT Change

The black + gold foundation remains the identity.

Gold is still restrained, not everywhere.

The product is still a focused study tool.

No AI aesthetic introduced.

---

# Color System

## Foundation Palette

### Backgrounds

```css
--bg-primary: #0B0B0A        /* Main page background */
--bg-deep: #0E0E0D           /* Recessed surfaces */
--bg-elevated: #141412       /* Raised surfaces */
--bg-elevated-hover: #1A1917 /* Hover state for elevated */
--bg-surface: #1E1D1A        /* Secondary surfaces */
--bg-subtle: #242320         /* Tertiary surfaces */
```

**Usage:**
- Body: `--bg-primary`
- Question cards: `--bg-elevated`
- Nested content: `--bg-surface`
- Inset areas: `--bg-deep`

### Gold Accents

```css
--gold-50: #FDF8E8           /* Tint (rarely used) */
--gold-100: #F5E6B8          /* Very light gold */
--gold-200: #E8D495          /* Light gold */
--gold-300: #D9BE6C          /* Soft gold */
--gold-400: #C9A94B          /* Medium gold */
--gold-500: #C9A227          /* Primary gold (main accent) */
--gold-600: #A88820          /* Dark gold */
--gold-700: #8A6F1A          /* Deeper gold */
--gold-800: #6B5615          /* Very dark gold */
--gold-900: #4D3E0F          /* Almost black gold */
```

**Primary usage:**
- Primary CTA: `--gold-500` background
- Active states: `--gold-500` border
- Selected options: `--gold-500` border + `--gold-900` background
- Hover: `--gold-400`
- Focus rings: `--gold-500`
- Progress: `--gold-500`

**Anti-pattern:**
Do NOT use gold for every button, border, heading, icon, or decoration.

### Text

```css
--text-primary: #F5F3EB      /* Main content */
--text-secondary: #C4C1B8    /* Supporting text */
--text-tertiary: #8F8C84     /* De-emphasized */
--text-muted: #5E5C56        /* Metadata, labels */
--text-disabled: #3A3937     /* Disabled states */
--text-on-gold: #0B0B0A      /* Text on gold backgrounds */
```

**Hierarchy:**
- Question text: `--text-primary`
- Answer options: `--text-primary`
- Instructions: `--text-secondary`
- Metadata: `--text-tertiary`
- Placeholders: `--text-muted`

### Borders

```css
--border-none: transparent
--border-subtle: #242320     /* Almost invisible dividers */
--border-soft: #2E2D28       /* Quiet borders */
--border-default: #3A3831    /* Standard borders */
--border-strong: #4A4740     /* Prominent borders */
--border-emphasis: #5C5A51   /* High contrast borders */
```

**Usage:**
- Default cards: `--border-default`
- Hover: `--border-strong`
- Active/Selected: `--gold-500`
- Dividers: `--border-subtle`

### Semantic Colors

```css
/* Success */
--success-50: #EEF5F0
--success-500: #4A7C59       /* Primary success */
--success-600: #3D6749
--success-700: #2F4F37
--success-900: #1A2B20

/* Error */
--error-50: #F9EEEF
--error-500: #B04449          /* Primary error */
--error-600: #8E353A
--error-700: #6D272B
--error-900: #3D1618

/* Warning */
--warning-50: #F9F5ED
--warning-500: #A88852        /* Primary warning */
--warning-600: #8A6F42
--warning-700: #6B5532
--warning-900: #3D3020

/* Info */
--info-500: #6B8A9A           /* Neutral info (not blue) */
```

**Usage:**
- Correct feedback: `--success-500` with `--success-900` background
- Incorrect feedback: `--error-500` with `--error-900` background
- Warnings: `--warning-500` with `--warning-900` background

**Anti-pattern:**
Do NOT use neon green/red. Keep semantic colors muted and secondary to gold.

---

# Typography

## Font Stack

```css
--font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
--font-mono: "JetBrains Mono", "Fira Code", "SF Mono", Consolas, monospace;
```

Use Inter (or Geist Sans if available) for all UI text.

Use monospace only for generated prompts and code-like content.

## Type Scale

```css
--text-xs: 0.75rem;          /* 12px - Tiny metadata */
--text-sm: 0.875rem;         /* 14px - Supporting text */
--text-base: 1rem;           /* 16px - Body text */
--text-lg: 1.125rem;         /* 18px - Emphasis */
--text-xl: 1.25rem;          /* 20px - Subheadings */
--text-2xl: 1.5rem;          /* 24px - Section headings */
--text-3xl: 1.875rem;        /* 30px - Page headings */
--text-4xl: 2.25rem;         /* 36px - Display small */
--text-5xl: 3rem;            /* 48px - Display large */
--text-6xl: 3.75rem;         /* 60px - Hero only */
```

## Weights

```css
--font-normal: 400;          /* Body text */
--font-medium: 500;          /* Emphasis */
--font-semibold: 600;        /* Headings */
--font-bold: 700;            /* Strong emphasis (rarely) */
```

## Line Heights

```css
--leading-tight: 1.25;       /* Headings */
--leading-snug: 1.375;       /* Compact text */
--leading-normal: 1.5;       /* Body text */
--leading-relaxed: 1.625;    /* Reading text */
--leading-loose: 2;          /* Spacious text (rarely) */
```

## Typography Hierarchy

### Display (Home page hero)

```css
font-size: var(--text-6xl);
font-weight: var(--font-semibold);
line-height: var(--leading-tight);
letter-spacing: -0.02em;
color: var(--text-primary);
```

### Page Heading

```css
font-size: var(--text-4xl);
font-weight: var(--font-semibold);
line-height: var(--leading-tight);
color: var(--text-primary);
```

### Section Heading

```css
font-size: var(--text-2xl);
font-weight: var(--font-semibold);
line-height: var(--leading-tight);
color: var(--text-primary);
```

### Question Number

```css
font-size: var(--text-sm);
font-weight: var(--font-medium);
line-height: var(--leading-normal);
text-transform: uppercase;
letter-spacing: 0.05em;
color: var(--text-tertiary);
```

### Question Text

```css
font-size: var(--text-xl);
font-weight: var(--font-medium);
line-height: var(--leading-relaxed);
color: var(--text-primary);
```

### Answer Option

```css
font-size: var(--text-base);
font-weight: var(--font-normal);
line-height: var(--leading-normal);
color: var(--text-primary);
```

### Supporting Text

```css
font-size: var(--text-sm);
font-weight: var(--font-normal);
line-height: var(--leading-normal);
color: var(--text-secondary);
```

### Metadata / Labels

```css
font-size: var(--text-xs);
font-weight: var(--font-medium);
line-height: var(--leading-normal);
text-transform: uppercase;
letter-spacing: 0.05em;
color: var(--text-muted);
```

---

# Spacing System

8px base unit.

```css
--space-0: 0;
--space-1: 0.25rem;          /* 4px */
--space-2: 0.5rem;           /* 8px */
--space-3: 0.75rem;          /* 12px */
--space-4: 1rem;             /* 16px */
--space-5: 1.25rem;          /* 20px */
--space-6: 1.5rem;           /* 24px */
--space-8: 2rem;             /* 32px */
--space-10: 2.5rem;          /* 40px */
--space-12: 3rem;            /* 48px */
--space-16: 4rem;            /* 64px */
--space-20: 5rem;            /* 80px */
--space-24: 6rem;            /* 96px */
--space-32: 8rem;            /* 128px */
```

## Spacing Usage

### Micro (4–8px)
- Icon padding
- Inline gaps
- Tight list spacing

### Small (12–16px)
- Form field internal padding
- Button padding
- Card internal spacing

### Medium (20–32px)
- Section gaps
- Component spacing
- Card padding

### Large (40–64px)
- Major section spacing
- Page padding
- Content block separation

### Extra Large (80–128px)
- Hero spacing
- Landing page sections
- Empty state spacing

---

# Layout & Content Width

## Max Widths

```css
--width-xs: 20rem;           /* 320px - Compact forms */
--width-sm: 24rem;           /* 384px - Small modals */
--width-md: 28rem;           /* 448px - Standard modals */
--width-lg: 32rem;           /* 512px - Worksheet input */
--width-xl: 36rem;           /* 576px - Long forms */
--width-2xl: 42rem;          /* 672px - Reading width */
--width-3xl: 48rem;          /* 768px - Article width */
--width-4xl: 56rem;          /* 896px - Question cards */
--width-5xl: 64rem;          /* 1024px - Max prose */
--width-6xl: 72rem;          /* 1152px - App container */
--width-7xl: 80rem;          /* 1280px - Wide layouts */
--width-full: 100%;
```

## Application Layout

### Desktop (≥1024px)

```
┌────────────────────────────────────────────────────────────┐
│ Header (full width)                                        │
├──────────────────────────────────────┬─────────────────────┤
│                                      │                     │
│ Main Content Area                    │ Navigation Sidebar  │
│ (--width-4xl max)                   │ (fixed 240px)       │
│                                      │                     │
│                                      │                     │
└──────────────────────────────────────┴─────────────────────┘
```

### Mobile (<1024px)

```
┌──────────────────────┐
│ Header               │
├──────────────────────┤
│                      │
│ Content (full width) │
│                      │
│                      │
├──────────────────────┤
│ Navigation (bottom)  │
└──────────────────────┘
```

## Content Padding

- Desktop: `--space-8` (32px) horizontal
- Tablet: `--space-6` (24px) horizontal
- Mobile: `--space-4` (16px) horizontal

---

# Surfaces & Depth

## Depth Strategy

Create depth through:

1. **Tonal layering** — Lighter surfaces feel elevated
2. **Borders** — Subtle outlines define boundaries
3. **Minimal shadows** — Only when elevation is critical
4. **Inset surfaces** — Darker = recessed

Do NOT rely on:
- Large drop shadows
- Glowing effects
- Heavy blur
- Excessive glassmorphism

## Surface Hierarchy

```
Level 0: bg-primary (page background)
  ↓
Level 1: bg-elevated (main cards)
  ↓
Level 2: bg-surface (nested content)
  ↓
Level 3: bg-subtle (tertiary surfaces)
```

## Card Treatment

Default card:

```css
background: var(--bg-elevated);
border: 1px solid var(--border-default);
border-radius: var(--radius-lg);
```

Hover card:

```css
border-color: var(--border-strong);
```

Active/Selected card:

```css
border-color: var(--gold-500);
background: var(--bg-elevated-hover);
```

## When NOT to Use Cards

Do NOT wrap every component in a card.

Use cards only when:
- Grouping related content
- Creating clear boundaries
- Establishing interactive surfaces
- Containing forms

Do NOT use cards for:
- Every text block
- Individual headings
- Single buttons
- Navigation items
- Already-grouped content inside cards

Prefer:
- Dividers
- Spacing
- Typography hierarchy
- Background tonal differences

---

# Borders & Radius

## Border Radius

```css
--radius-sm: 4px;            /* Small controls */
--radius-md: 6px;            /* Standard inputs */
--radius-lg: 8px;            /* Cards */
--radius-xl: 12px;           /* Large surfaces */
--radius-2xl: 16px;          /* Hero elements (rare) */
--radius-full: 9999px;       /* Pills, badges */
```

**Usage:**
- Buttons: `--radius-md`
- Input fields: `--radius-md`
- Cards: `--radius-lg`
- Question cards: `--radius-lg`
- Badges: `--radius-full`

Do NOT use excessive rounding (24px+).

## Border Width

```css
--border-width-0: 0;
--border-width-1: 1px;       /* Default */
--border-width-2: 2px;       /* Emphasis */
--border-width-4: 4px;       /* Strong emphasis (rare) */
```

Default border: 1px.

Use 2px for:
- Selected state
- Active focus
- Error state

---

# Shadows

Use shadows sparingly.

## Shadow Scale

```css
--shadow-none: none;
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.08);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.12);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.16);
--shadow-xl: 0 12px 24px rgba(0, 0, 0, 0.2);
```

**Usage:**
- Most cards: `--shadow-none` (use borders instead)
- Elevated modals: `--shadow-md`
- Dropdown menus: `--shadow-lg`
- Focus states: Use outline, not shadow

**Anti-pattern:**
Do NOT add shadows to every card.

Do NOT use colored/glowing shadows.

---

# Motion

## Duration

```css
--duration-instant: 0ms;
--duration-fast: 100ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
--duration-slower: 500ms;
```

**Usage:**
- Hover: `--duration-fast` (100ms)
- Transitions: `--duration-normal` (200ms)
- Modal open/close: `--duration-slow` (300ms)
- Page transitions: `--duration-slower` (500ms)

## Easing

```css
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

**Default:** `--ease-out` for most transitions.

## Transition Properties

Animate:
- `opacity`
- `transform`
- `background-color`
- `border-color`
- `color`

Do NOT animate:
- `width` / `height` (use transform scale)
- `padding` / `margin`
- `box-shadow` (expensive)

## Motion Principles

- **Fast interactions** — Hover/focus should feel instant
- **Medium transitions** — State changes should be smooth
- **Slow emphasis** — Important moments can be deliberate
- **Never block** — Animation should never delay the user

**Anti-pattern:**
- Bouncing
- Excessive scaling
- Floating effects
- Continuous motion
- Decorative particles
- Unnecessary page transitions

---

# Iconography

Use icons sparingly and consistently.

## Icon System

Choose one icon library:
- Lucide (recommended)
- Heroicons
- Feather

**Size scale:**
```css
--icon-xs: 12px;
--icon-sm: 16px;
--icon-base: 20px;
--icon-lg: 24px;
--icon-xl: 32px;
```

## Icon Usage

Use icons for:
- Actions (copy, submit, navigate)
- Status indicators (correct ✓, incorrect ✕)
- Navigation affordances (arrows)
- Visual labels (settings, help)

Do NOT use icons for:
- Decoration
- Every button
- Every heading
- Replacing clear text

Icons must have accessible labels.

---

# Buttons

## Button Variants

### Primary

Purpose: Main action.

```css
background: var(--gold-500);
color: var(--text-on-gold);
border: none;
font-weight: var(--font-medium);
```

Hover:
```css
background: var(--gold-400);
```

### Secondary

Purpose: Supporting action.

```css
background: var(--bg-surface);
color: var(--text-primary);
border: 1px solid var(--border-default);
font-weight: var(--font-medium);
```

Hover:
```css
background: var(--bg-elevated-hover);
border-color: var(--border-strong);
```

### Ghost

Purpose: Low-emphasis action.

```css
background: transparent;
color: var(--text-secondary);
border: none;
font-weight: var(--font-normal);
```

Hover:
```css
color: var(--text-primary);
background: var(--bg-elevated);
```

### Destructive

Purpose: Dangerous action (rarely used).

```css
background: var(--error-500);
color: var(--text-primary);
border: none;
font-weight: var(--font-medium);
```

## Button Sizes

### Small

```css
padding: var(--space-2) var(--space-4);  /* 8px 16px */
font-size: var(--text-sm);
border-radius: var(--radius-md);
```

### Medium (default)

```css
padding: var(--space-3) var(--space-6);  /* 12px 24px */
font-size: var(--text-base);
border-radius: var(--radius-md);
```

### Large

```css
padding: var(--space-4) var(--space-8);  /* 16px 32px */
font-size: var(--text-lg);
border-radius: var(--radius-lg);
```

## Button States

### Hover

```css
transition: all var(--duration-fast) var(--ease-out);
```

Visual change: background/border color shift.

### Focus

```css
outline: 2px solid var(--gold-500);
outline-offset: 2px;
```

### Active (pressed)

```css
transform: scale(0.98);
```

### Disabled

```css
opacity: 0.4;
cursor: not-allowed;
pointer-events: none;
```

---

# Forms & Controls

## Text Input

```css
padding: var(--space-3) var(--space-4);  /* 12px 16px */
background: var(--bg-deep);
border: 1px solid var(--border-default);
border-radius: var(--radius-md);
color: var(--text-primary);
font-size: var(--text-base);
```

Hover:
```css
border-color: var(--border-strong);
```

Focus:
```css
border-color: var(--gold-500);
outline: none;
box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.1);
```

Error:
```css
border-color: var(--error-500);
```

## Textarea

Same as text input, with:

```css
resize: vertical;
min-height: 120px;
```

## Select

Same base styling as text input.

## Radio Button

Do NOT use default browser radio buttons as the primary visual.

Custom radio:

```css
/* Container */
padding: var(--space-3) var(--space-4);
background: var(--bg-elevated);
border: 1px solid var(--border-default);
border-radius: var(--radius-md);
cursor: pointer;
transition: all var(--duration-fast) var(--ease-out);
```

Selected:
```css
border-color: var(--gold-500);
background: var(--gold-900);
```

Correct answer (showAnswer):
```css
border-color: var(--gold-400);
border-width: 2px;
```

## Checkbox

Similar to radio, but allow multiple.

Selected:
```css
border-color: var(--gold-500);
background: var(--gold-900);
```

## Label

```css
font-size: var(--text-sm);
font-weight: var(--font-medium);
color: var(--text-primary);
margin-bottom: var(--space-2);
```

---

# Answer Options

## Multiple Choice

Visual structure:

```
┌─────────────────────────────────────────┐
│ ○ Option A                              │
└─────────────────────────────────────────┘
```

Default state:
```css
padding: var(--space-3);
background: var(--bg-elevated);
border: 1px solid var(--border-default);
border-radius: var(--radius-md);
```

Hover:
```css
border-color: var(--border-strong);
background: var(--bg-elevated-hover);
```

Selected:
```css
border-color: var(--gold-500);
border-width: 2px;
background: var(--gold-900);
```

Correct (Quiz feedback):
```css
border-color: var(--gold-400);
border-width: 2px;
background: var(--gold-900);
```

Incorrect:
```css
border-color: var(--error-500);
background: var(--error-900);
```

## Multiple Select

Same as Multiple Choice, but:

- Use checkboxes, not radio buttons
- Show "Select all that apply" instruction
- Allow multiple selections

## True / False

Two-button layout:

```
┌─────────────┬─────────────┐
│    True     │    False    │
└─────────────┴─────────────┘
```

Each button follows button variant styling.

Selected button uses Primary visual treatment.

## Short Answer

```css
width: 100%;
padding: var(--space-3) var(--space-4);
background: var(--bg-deep);
border: 1px solid var(--border-default);
border-radius: var(--radius-md);
font-size: var(--text-base);
```

Focus:
```css
border-color: var(--gold-500);
box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.1);
```

---

# Feedback States

## Correct Feedback

```css
background: var(--success-900);
border: 1px solid var(--success-500);
border-radius: var(--radius-lg);
padding: var(--space-6);
```

Icon: ✓ (large, `--success-500`)

Heading:
```css
color: var(--success-500);
font-size: var(--text-xl);
font-weight: var(--font-semibold);
```

## Incorrect Feedback

```css
background: var(--error-900);
border: 1px solid var(--error-500);
border-radius: var(--radius-lg);
padding: var(--space-6);
```

Icon: ✕ (large, `--error-500`)

Heading:
```css
color: var(--error-500);
font-size: var(--text-xl);
font-weight: var(--font-semibold);
```

## Explanation Box

```css
background: var(--bg-surface);
border: 1px solid var(--border-subtle);
border-radius: var(--radius-md);
padding: var(--space-4);
margin-top: var(--space-4);
```

Label:
```css
font-size: var(--text-sm);
font-weight: var(--font-medium);
color: var(--text-tertiary);
text-transform: uppercase;
letter-spacing: 0.05em;
```

---

# Navigation

## Desktop Sidebar (Quiz/Exam)

Width: 240px (fixed)

```css
background: var(--bg-deep);
border-left: 1px solid var(--border-subtle);
padding: var(--space-4);
```

Question grid: 4 columns

Each cell:
```css
aspect-ratio: 1;
border: 1px solid var(--border-default);
border-radius: var(--radius-md);
font-size: var(--text-sm);
font-weight: var(--font-medium);
```

States:
- Unanswered: `--border-default`, `--text-muted`
- Answered: `--border-strong`, `--text-primary`, `--bg-elevated`
- Current: `--gold-500` border, `--gold-900` background, `--gold-400` text

## Mobile Navigation

Progress dots:

```css
width: 8px;
height: 8px;
border-radius: var(--radius-full);
```

States:
- Unanswered: `--border-subtle`
- Answered: `--text-secondary`
- Current: `--gold-500`

Prev/Next buttons:

```css
padding: var(--space-3) var(--space-6);
border: 1px solid var(--border-default);
border-radius: var(--radius-md);
```

---

# Screen Specifications

## Home

Layout: Centered, generous spacing

```
[ Large vertical spacing ]

ANSWERING (--text-6xl, semibold)

Practice questions.
Without the back-and-forth.

[ Supporting description ]

[ Large vertical spacing ]

┌───────────────────┬───────────────────┐
│ Generate Prompt   │ Start Practicing  │
│ [Description]     │ [Description]     │
└───────────────────┴───────────────────┘
```

**Generate Prompt card:**
- Hover: gold border
- Title: `--text-2xl`, gold on hover
- Description: `--text-secondary`

**Start Practicing card:**
- Same treatment
- Both cards equal visual weight

Background: `--bg-primary`, possibly subtle texture.

## Prompt Generator

Layout: Standard application layout

**Header:**
```css
background: var(--bg-deep);
border-bottom: 1px solid var(--border-subtle);
padding: var(--space-4);
```

**Configuration section:**

Card with fields:
- Question count (number input)
- Difficulty (button group)
- Question types (toggle buttons)
- Source (button group)
- Topic (textarea)

Button groups use selected state: gold border + gold-tinted background.

**Generated prompt:**

```css
background: var(--bg-elevated);
border: 1px solid var(--border-default);
border-radius: var(--radius-lg);
padding: var(--space-6);
```

Preview:
```css
font-family: var(--font-mono);
font-size: var(--text-sm);
background: var(--bg-deep);
border: 1px solid var(--border-subtle);
border-radius: var(--radius-md);
```

Copy button: Primary style.

## Worksheet Input

Centered modal-style layout.

Max width: `--width-lg`

Textarea:
```css
min-height: 240px;
font-family: var(--font-mono);
background: var(--bg-deep);
```

Load button: Primary.

Validation errors:

```css
background: var(--error-900);
border: 1px solid var(--error-500);
border-radius: var(--radius-md);
padding: var(--space-4);
```

## Mode Selection

Centered layout, generous spacing.

Worksheet info:
- Title: `--text-4xl`
- Description: `--text-lg`, `--text-secondary`
- Question count: `--text-base`, `--text-tertiary`

Mode cards: Two-column grid (desktop), stacked (mobile)

Each card:
```css
padding: var(--space-8);
background: var(--bg-elevated);
border: 1px solid var(--border-default);
border-radius: var(--radius-lg);
```

Hover:
```css
border-color: var(--gold-500);
background: var(--bg-elevated-hover);
```

Title: `--text-2xl`, gold on hover

## Quiz Mode

Layout: Main content + sidebar (desktop)

**Question card:**

```css
max-width: var(--width-4xl);
background: var(--bg-elevated);
border: 1px solid var(--border-default);
border-radius: var(--radius-lg);
padding: var(--space-8);
```

Question number:

```css
font-size: var(--text-xs);
font-weight: var(--font-medium);
text-transform: uppercase;
letter-spacing: 0.05em;
color: var(--text-tertiary);
margin-bottom: var(--space-2);
```

Question text:

```css
font-size: var(--text-xl);
font-weight: var(--font-medium);
line-height: var(--leading-relaxed);
color: var(--text-primary);
margin-bottom: var(--space-6);
```

Submit button: Primary (full width on mobile, inline on desktop)

Feedback: Appears below question card.

Navigation: Previous (secondary) / Submit (primary)

## Exam Mode

Same layout as Quiz, with differences:

- No feedback during exam
- Submit confirmation:

```css
background: var(--warning-900);
border: 1px solid var(--warning-500);
border-radius: var(--radius-lg);
padding: var(--space-6);
```

Navigation sidebar shows:
- Answered (not correct/incorrect)
- Unanswered
- Current

## Result Screen

Centered layout.

Score display:

```css
font-size: var(--text-6xl);
font-weight: var(--font-semibold);
color: var(--text-primary);
text-align: center;
margin-bottom: var(--space-4);
```

Percentage:

```css
font-size: var(--text-3xl);
color: var(--text-secondary);
```

Breakdown:

```
Correct: X
Incorrect: X
Unanswered: X
```

Actions:
- Review Answers (Primary)
- Start Over (Secondary)

**Anti-pattern:**
Do NOT add circular progress charts, trophies, confetti, or gamification.

## Review Mode

Layout: Same as Quiz/Exam (main + sidebar)

Sidebar shows:
- ✓ Correct (success color)
- ✕ Incorrect (error color)
- − Unanswered (muted)

Question card shows:
- Question
- User's answer (highlighted if incorrect)
- Correct answer
- Explanation

Navigate through all questions.

Exit Review: Back button returns to Result screen.

---

# Component Patterns

## Cards

Use cards for:
- Question containers
- Mode selection
- Result summaries
- Configuration sections

Do NOT use cards for:
- Every text block
- Navigation items
- Already-grouped content

## Dividers

Use dividers to separate:
- Sections
- List items
- Content blocks

```css
border-top: 1px solid var(--border-subtle);
```

## Badges

Use for:
- Question type labels
- Status indicators
- Counts

```css
padding: var(--space-1) var(--space-3);
font-size: var(--text-xs);
font-weight: var(--font-medium);
text-transform: uppercase;
letter-spacing: 0.05em;
border-radius: var(--radius-full);
background: var(--bg-surface);
color: var(--text-tertiary);
```

## Empty States

Centered, calm presentation.

Icon (optional): large, `--text-muted`

Heading:

```css
font-size: var(--text-xl);
color: var(--text-primary);
margin-bottom: var(--space-2);
```

Description:

```css
font-size: var(--text-base);
color: var(--text-secondary);
```

Action: Primary button.

## Error States

```css
background: var(--error-900);
border: 1px solid var(--error-500);
border-radius: var(--radius-md);
padding: var(--space-4);
```

Heading:

```css
font-size: var(--text-lg);
font-weight: var(--font-semibold);
color: var(--error-500);
```

## Loading States

Minimal spinner or skeleton.

Do NOT use:
- Excessive loading animations
- Progress bars for fast operations
- Decorative loaders

---

# Responsive Design

## Breakpoints

```css
--breakpoint-sm: 640px;      /* Mobile large */
--breakpoint-md: 768px;      /* Tablet */
--breakpoint-lg: 1024px;     /* Desktop */
--breakpoint-xl: 1280px;     /* Desktop large */
--breakpoint-2xl: 1536px;    /* Desktop extra large */
```

## Responsive Strategy

### Mobile-first approach

Start with mobile layout, enhance for desktop.

### Key responsive changes:

**Desktop (≥1024px):**
- Sidebar navigation visible
- Two-column mode selection
- Wider question cards
- Inline button groups

**Mobile (<1024px):**
- Bottom navigation (dots)
- Stacked mode selection
- Full-width question cards
- Stacked button groups

### Touch targets

Minimum: 44px × 44px on mobile.

Buttons and interactive elements should be comfortable for thumbs.

### Horizontal scrolling

NEVER introduce horizontal scrolling for main content.

---

# Accessibility

## Focus States

All interactive elements must have visible focus states:

```css
outline: 2px solid var(--gold-500);
outline-offset: 2px;
```

## Keyboard Navigation

- Tab through all interactive elements
- Enter/Space activates buttons
- Arrow keys navigate question grid (optional enhancement)
- Escape closes modals

## Color Contrast

Text on backgrounds must meet WCAG AA:

- `--text-primary` on `--bg-primary`: ≥4.5:1
- `--text-secondary` on `--bg-elevated`: ≥4.5:1
- `--gold-500` on `--bg-primary`: ≥3:1 (large text)

## Semantic HTML

- Use `<button>` for actions
- Use `<label>` for form fields
- Use `<nav>` for navigation
- Use headings hierarchy (`<h1>`, `<h2>`, etc.)

## Screen Reader Support

- Provide `aria-label` for icon-only buttons
- Announce feedback state changes
- Label form fields correctly
- Provide status updates for Quiz/Exam progress

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Color Independence

Do NOT rely only on color to indicate:
- Correctness (use icons: ✓ ✕)
- Selection (use borders + background)
- Focus (use outline)

---

# Design Tokens

Complete token reference for implementation:

```css
/* Colors */
--bg-primary: #0B0B0A;
--bg-deep: #0E0E0D;
--bg-elevated: #141412;
--bg-elevated-hover: #1A1917;
--bg-surface: #1E1D1A;
--bg-subtle: #242320;

--gold-500: #C9A227;
--gold-400: #C9A94B;
--gold-600: #A88820;
--gold-900: #4D3E0F;

--text-primary: #F5F3EB;
--text-secondary: #C4C1B8;
--text-tertiary: #8F8C84;
--text-muted: #5E5C56;
--text-on-gold: #0B0B0A;

--border-subtle: #242320;
--border-default: #3A3831;
--border-strong: #4A4740;

--success-500: #4A7C59;
--success-900: #1A2B20;
--error-500: #B04449;
--error-900: #3D1618;
--warning-500: #A88852;
--warning-900: #3D3020;

/* Typography */
--font-sans: "Inter", system-ui, sans-serif;
--font-mono: "JetBrains Mono", monospace;

--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-3xl: 1.875rem;
--text-4xl: 2.25rem;
--text-5xl: 3rem;
--text-6xl: 3.75rem;

--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;

--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.625;

/* Spacing */
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-6: 1.5rem;
--space-8: 2rem;
--space-12: 3rem;
--space-16: 4rem;
--space-20: 5rem;
--space-24: 6rem;

/* Radius */
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;
--radius-xl: 12px;
--radius-full: 9999px;

/* Motion */
--duration-fast: 100ms;
--duration-normal: 200ms;
--duration-slow: 300ms;

--ease-out: cubic-bezier(0, 0, 0.2, 1);

/* Layout */
--width-lg: 32rem;
--width-2xl: 42rem;
--width-4xl: 56rem;
--width-6xl: 72rem;
```

---

# Visual Anti-Patterns

## What Answering Must NOT Look Like

### AI Dashboard Aesthetic

❌ Purple/blue gradients
❌ Cyan neon accents
❌ Glowing cards
❌ Excessive glassmorphism
❌ Floating holographic elements
❌ Animated particles
❌ Giant gradient text
❌ Decorative AI imagery

### Generic SaaS

❌ Excessive rounded cards (24px+ radius)
❌ Giant shadows everywhere
❌ Colorful dashboard charts
❌ Statistics overload
❌ Unnecessary data visualization
❌ Corporate blue
❌ Stock illustrations

### Over-Gamified Quiz UI

❌ Confetti animations
❌ Trophy graphics
❌ XP/level systems
❌ Streak counters
❌ Badges everywhere
❌ Leaderboards
❌ Excessive celebrations
❌ Childish colors

### Flat Minimalism

❌ No depth at all
❌ Pure black backgrounds
❌ No borders
❌ No visual hierarchy
❌ Terminal-only aesthetic
❌ Monochrome text-only interface

### Enterprise Admin Panel

❌ Sidebar with 20 menu items
❌ Tabs everywhere
❌ Data tables
❌ Complex form layouts
❌ Small gray text
❌ Excessive nested menus

### Bad Interaction Patterns

❌ Bouncing animations
❌ Excessive scaling
❌ Continuous motion
❌ Horizontal scrolling
❌ Floating elements
❌ Auto-playing effects
❌ Delays before actions

---

# Implementation Guidelines

## For Implementation Agent

### Phase 1: Foundation

1. Update CSS design tokens
2. Implement color system
3. Implement typography scale
4. Implement spacing system

### Phase 2: Components

1. Update button variants
2. Update form controls
3. Update answer options
4. Update feedback components

### Phase 3: Layouts

1. Update Home page
2. Update Prompt Generator
3. Update Mode Selection
4. Update Quiz/Exam layouts
5. Update Result/Review screens

### Phase 4: Polish

1. Add micro-interactions
2. Refine responsive behavior
3. Test accessibility
4. Verify contrast ratios

## Testing Checklist

- [ ] All screens feel cohesive
- [ ] Gold accent is restrained, not everywhere
- [ ] Typography hierarchy is clear
- [ ] Interactive states are obvious
- [ ] Keyboard navigation works
- [ ] Focus states are visible
- [ ] Touch targets are large enough (mobile)
- [ ] No horizontal scrolling
- [ ] Loading states are calm
- [ ] Error states are helpful
- [ ] Reduced motion works
- [ ] Dark theme is consistent

## Do NOT

- Add new product features
- Change information architecture
- Modify worksheet format
- Add animations for decoration
- Make everything gold
- Use excessive shadows
- Create visual clutter
- Add unnecessary illustrations

## Core Constraint

> The visual design must feel modern and polished WITHOUT looking like every other AI-generated SaaS website.

The answer is in:
- Typography
- Composition
- Spacing
- Subtle depth
- Restrained gold
- Strong interactive states
- Intentional motion
- Excellent answer controls
- Focused layouts

NOT in:
- Gradients
- Glow
- Glass
- Giant cards
- Decorative AI visuals

---

# Final Quality Bar

The redesigned Answering should feel:

✓ **Modern** — Contemporary interface patterns, refined execution
✓ **Polished** — Attention to detail in every interaction
✓ **Intentional** — Every element has a clear purpose
✓ **Academic** — Serious study tool, not a toy
✓ **Distinctive** — Recognizable Answering identity
✓ **Comfortable** — Pleasant to use for extended sessions
✓ **Focused** — Question content dominates UI chrome
✓ **Interactive** — States and feedback are clear
✓ **Accessible** — Keyboard, screen reader, reduced motion support
✓ **Cohesive** — All screens belong to the same product

The original black + gold identity is preserved and strengthened.

---

**End of Design System v2**
