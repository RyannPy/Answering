"use client";

import type { Worksheet } from "@/types/worksheet";

type ModeSelectionProps = {
  worksheet: Worksheet;
  onSelectMode: (mode: "quiz" | "exam") => void;
};

export function ModeSelection({ worksheet, onSelectMode }: ModeSelectionProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center py-20">
      <div className="container">
        {/* Worksheet info */}
        <div className="text-center mb-16">
          <h1 className="heading-page mb-4">
            {worksheet.title}
          </h1>
          {worksheet.description && (
            <p className="text-lg text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto leading-relaxed">
              {worksheet.description}
            </p>
          )}
          <div className="text-supporting">
            {worksheet.questions.length} questions
          </div>
        </div>

        {/* Mode selection */}
        <div className="mb-12 text-center">
          <h2 className="heading-subsection text-[var(--text-secondary)] mb-8">
            Choose how you want to practice
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Quiz mode */}
          <button
            onClick={() => onSelectMode("quiz")}
            className="card-interactive p-10 text-left group"
          >
            <div className="heading-section mb-4 group-hover:text-[var(--gold-400)] transition-colors duration-[var(--duration-fast)]">
              Quiz
            </div>
            <div className="text-supporting mb-6 leading-relaxed">
              Practice with immediate feedback after every answer.
            </div>
            <div className="space-y-2">
              <div className="text-sm text-[var(--text-tertiary)]">
                • See correct answers right away
              </div>
              <div className="text-sm text-[var(--text-tertiary)]">
                • Learn as you go
              </div>
              <div className="text-sm text-[var(--text-tertiary)]">
                • Perfect for studying
              </div>
            </div>
          </button>

          {/* Exam mode */}
          <button
            onClick={() => onSelectMode("exam")}
            className="card-interactive p-10 text-left group"
          >
            <div className="heading-section mb-4 group-hover:text-[var(--gold-400)] transition-colors duration-[var(--duration-fast)]">
              Exam
            </div>
            <div className="text-supporting mb-6 leading-relaxed">
              Complete the test first, see results afterward.
            </div>
            <div className="space-y-2">
              <div className="text-sm text-[var(--text-tertiary)]">
                • No feedback until you submit
              </div>
              <div className="text-sm text-[var(--text-tertiary)]">
                • Navigate between questions
              </div>
              <div className="text-sm text-[var(--text-tertiary)]">
                • Simulates real exam conditions
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
