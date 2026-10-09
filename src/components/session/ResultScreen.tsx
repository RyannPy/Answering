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
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center py-20">
      <div className="container max-w-2xl">
        {/* Mode indicator */}
        <div className="text-center mb-8">
          <div className="text-metadata mb-3">
            {session.mode === "quiz" ? "Quiz Complete" : "Exam Submitted"}
          </div>
          <h1 className="heading-section mb-2">
            {session.worksheet.title}
          </h1>
        </div>

        {/* Score card */}
        <div className="card p-10 mb-8">
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-[var(--gold-400)] mb-4">
              {result.correct} / {result.total}
            </div>
            <div className="text-3xl font-semibold text-[var(--text-primary)]">
              {result.percentage}%
            </div>
          </div>

          <div className="divider my-8" />

          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-semibold text-[var(--success-500)] mb-2">
                {result.correct}
              </div>
              <div className="text-supporting">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-[var(--error-500)] mb-2">
                {result.incorrect}
              </div>
              <div className="text-supporting">Incorrect</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-[var(--warning-500)] mb-2">
                {result.unanswered}
              </div>
              <div className="text-supporting">Unanswered</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onReview}
            className="btn btn-primary btn-lg"
          >
            Review Answers
          </button>
          <button
            onClick={onRestart}
            className="btn btn-secondary btn-lg"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
