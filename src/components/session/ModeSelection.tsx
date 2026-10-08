"use client";

import type { Worksheet } from "@/types/worksheet";

type ModeSelectionProps = {
  worksheet: Worksheet;
  onSelectMode: (mode: "quiz" | "exam") => void;
};

export function ModeSelection({ worksheet, onSelectMode }: ModeSelectionProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-6">
        {/* Worksheet info */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-[var(--text-primary)] mb-3">
            {worksheet.title}
          </h1>
          {worksheet.description && (
            <p className="text-lg text-[var(--text-secondary)] mb-6">
              {worksheet.description}
            </p>
          )}
          <div className="text-[var(--text-secondary)]">
            {worksheet.questions.length} questions
          </div>
        </div>

        {/* Mode selection */}
        <div className="mb-8 text-center">
          <h2 className="text-xl text-[var(--text-primary)] mb-6">
            Choose how you want to practice
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Quiz mode */}
          <button
            onClick={() => onSelectMode("quiz")}
            className="p-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:border-[var(--gold-primary)] hover:bg-[var(--bg-secondary)] transition-all text-left group"
          >
            <div className="text-2xl font-semibold text-[var(--text-primary)] mb-3 group-hover:text-[var(--gold-bright)] transition-colors">
              Quiz
            </div>
            <div className="text-[var(--text-secondary)] mb-4">
              Practice with immediate feedback after every answer.
            </div>
            <div className="text-sm text-[var(--text-muted)]">
              • See correct answers right away
              <br />
              • Learn as you go
              <br />• Perfect for studying
            </div>
          </button>

          {/* Exam mode */}
          <button
            onClick={() => onSelectMode("exam")}
            className="p-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:border-[var(--gold-primary)] hover:bg-[var(--bg-secondary)] transition-all text-left group"
          >
            <div className="text-2xl font-semibold text-[var(--text-primary)] mb-3 group-hover:text-[var(--gold-bright)] transition-colors">
              Exam
            </div>
            <div className="text-[var(--text-secondary)] mb-4">
              Complete the test first, see results afterward.
            </div>
            <div className="text-sm text-[var(--text-muted)]">
              • No feedback until you submit
              <br />
              • Navigate between questions
              <br />• Simulates real exam conditions
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
