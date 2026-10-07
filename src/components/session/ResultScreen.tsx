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
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-sm text-[var(--text-muted)] mb-2">
            {session.mode === "quiz" ? "Quiz Complete" : "Exam Submitted"}
          </div>
          <h1 className="text-3xl font-semibold text-[var(--text-primary)] mb-2">
            {session.worksheet.title}
          </h1>
        </div>

        {/* Score card */}
        <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg p-8 mb-6">
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-[var(--gold-bright)] mb-2">
              {result.correct} / {result.total}
            </div>
            <div className="text-3xl font-semibold text-[var(--text-primary)]">
              {result.percentage}%
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--border-subtle)]">
            <div className="text-center">
              <div className="text-2xl font-semibold text-[var(--success)]">
                {result.correct}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-[var(--error)]">
                {result.incorrect}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">Incorrect</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-[var(--text-muted)]">
                {result.unanswered}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">Unanswered</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={onReview}
            className="flex-1 px-6 py-3 rounded-lg bg-[var(--gold-primary)] text-[var(--bg-primary)] font-medium hover:bg-[var(--gold-bright)] transition-colors"
          >
            Review Answers
          </button>
          <button
            onClick={onRestart}
            className="flex-1 px-6 py-3 rounded-lg border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
