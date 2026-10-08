"use client";

import type { SessionState, SessionResult } from "@/types/session";

type ResultScreenProps = {
  session: SessionState;
  result: SessionResult;
  onReview: () => void;
  onRestart: () => void;
};

export function ResultScreen({
  session,
  result,
  onReview,
  onRestart,
}: ResultScreenProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-deep)] flex-shrink-0">
        <div className="container mx-auto py-3 flex items-center justify-between">
          <div className="text-lg font-semibold text-[var(--text-primary)]">
            Answering
          </div>
          <button
            onClick={() => {/* Back logic would go here */}}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm"
          >
            Back
          </button>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-6 overflow-y-auto">
        <div className="text-center mb-4">
          <div className="text-xs text-[var(--text-muted)] mb-1">
            {session.mode === "quiz" ? "Quiz Complete" : "Exam Submitted"}
          </div>
          <h1 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            {session.worksheet.title}
          </h1>
        </div>

        {/* Score card */}
        <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg p-3 mb-3">
          <div className="text-center mb-2">
            <div className="text-2xl font-bold text-[var(--gold-bright)] mb-1">
              {result.correct} / {result.total}
            </div>
            <div className="text-lg font-semibold text-[var(--text-primary)]">
              {result.percentage}%
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[var(--border-subtle)]">
            <div className="text-center">
              <div className="text-base font-semibold text-[var(--success)]">
                {result.correct}
              </div>
              <div className="text-xs text-[var(--text-secondary)]">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-base font-semibold text-[var(--error)]">
                {result.incorrect}
              </div>
              <div className="text-xs text-[var(--text-secondary)]">Incorrect</div>
            </div>
            <div className="text-center">
              <div className="text-base font-semibold text-[var(--warning)]">
                {result.unanswered}
              </div>
              <div className="text-xs text-[var(--text-secondary)]">Unanswered</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-2">
          <button
            onClick={onReview}
            className="w-full sm:w-auto px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors duration-200 text-sm"
          >
            Review Answers
          </button>
          <button
            onClick={onRestart}
            className="w-full sm:w-auto mt-2 sm:mt-0 px-3 py-1.5 rounded-lg bg-[var(--gold-primary)] text-[var(--bg-primary)] font-medium hover:bg-[var(--gold-bright)] transition-colors duration-200 text-sm"
          >
            Start Over
          </button>
        </div>
      </main>

      <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-deep)] flex-shrink-0">
        <div className="container mx-auto py-2 flex items-center justify-between text-xs">
          <span className="text-[var(--text-muted)]">© 2026 Answering</span>
          <span className="text-[var(--text-muted)]">Version 0.1.0</span>
        </div>
      </footer>
    </div>
  );
}
