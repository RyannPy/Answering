"use client";

import type { Worksheet } from "@/types/worksheet";

type ModeSelectionProps = {
  worksheet: Worksheet;
  onSelectMode: (mode: "quiz" | "exam") => void;
};

export function ModeSelection({ worksheet, onSelectMode }: ModeSelectionProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center py-20 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[var(--gold-500)] rounded-full opacity-5 blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
      </div>

      <div className="container relative z-10">
        {/* Worksheet info */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="heading-page mb-4 text-gradient-gold">
            {worksheet.title}
          </h1>
          {worksheet.description && (
            <p className="text-lg text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto leading-relaxed">
              {worksheet.description}
            </p>
          )}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-default)]">
            <span className="inline-block w-2 h-2 bg-[var(--gold-500)] rounded-full animate-pulse"></span>
            <span className="text-supporting">{worksheet.questions.length} questions</span>
          </div>
        </div>

        {/* Mode selection */}
        <div className="mb-12 text-center animate-slide-up">
          <h2 className="heading-subsection text-[var(--text-secondary)] mb-8">
            Choose how you want to practice
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Quiz mode */}
          <button
            onClick={() => onSelectMode("quiz")}
            className="card-interactive p-12 text-left group animate-scale-in relative"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-[var(--gold-500)] to-[var(--gold-700)] rounded-full opacity-15 blur-2xl group-hover:opacity-30 transition-opacity"></div>
            
            <div className="heading-section mb-4 group-hover:text-gradient-gold transition-all duration-300">
              Quiz
            </div>
            <div className="text-supporting mb-6 leading-relaxed">
              Practice with immediate feedback after every answer.
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-[var(--text-tertiary)]">
                <span className="inline-block w-1.5 h-1.5 bg-[var(--gold-500)] rounded-full mt-1.5 flex-shrink-0"></span>
                <span>See correct answers right away</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[var(--text-tertiary)]">
                <span className="inline-block w-1.5 h-1.5 bg-[var(--gold-500)] rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Learn as you go</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[var(--text-tertiary)]">
                <span className="inline-block w-1.5 h-1.5 bg-[var(--gold-500)] rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Perfect for studying</span>
              </div>
            </div>
          </button>

          {/* Exam mode */}
          <button
            onClick={() => onSelectMode("exam")}
            className="card-interactive p-12 text-left group animate-scale-in relative"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-[var(--gold-500)] to-[var(--gold-700)] rounded-full opacity-15 blur-2xl group-hover:opacity-30 transition-opacity"></div>
            
            <div className="heading-section mb-4 group-hover:text-gradient-gold transition-all duration-300">
              Exam
            </div>
            <div className="text-supporting mb-6 leading-relaxed">
              Complete the test first, see results afterward.
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-[var(--text-tertiary)]">
                <span className="inline-block w-1.5 h-1.5 bg-[var(--gold-500)] rounded-full mt-1.5 flex-shrink-0"></span>
                <span>No feedback until you submit</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[var(--text-tertiary)]">
                <span className="inline-block w-1.5 h-1.5 bg-[var(--gold-500)] rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Navigate between questions</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[var(--text-tertiary)]">
                <span className="inline-block w-1.5 h-1.5 bg-[var(--gold-500)] rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Simulates real exam conditions</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
