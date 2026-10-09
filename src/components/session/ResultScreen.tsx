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
  const getPerformanceMessage = () => {
    if (result.percentage >= 90) return { message: "Excellent!", color: "var(--gold-400)" };
    if (result.percentage >= 70) return { message: "Great Job!", color: "var(--success-500)" };
    if (result.percentage >= 50) return { message: "Good Effort", color: "var(--warning-500)" };
    return { message: "Keep Practicing", color: "var(--text-secondary)" };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--gold-500)] rounded-full opacity-5 blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--gold-600)] rounded-full opacity-5 blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
      </div>

      <div className="container max-w-2xl relative z-10">
        {/* Mode indicator */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-default)] mb-4">
            <span className="inline-block w-2 h-2 bg-[var(--gold-500)] rounded-full"></span>
            <span className="text-metadata">
              {session.mode === "quiz" ? "Quiz Complete" : "Exam Submitted"}
            </span>
          </div>
          <h1 className="heading-section mb-2">
            {session.worksheet.title}
          </h1>
        </div>

        {/* Score card */}
        <div className="card p-12 mb-8 animate-scale-in relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
          {/* Decorative glow based on performance */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20" style={{ background: performance.color }}></div>
          
          <div className="text-center mb-8 relative z-10">
            <div className="text-7xl font-bold mb-2" style={{ 
              background: `linear-gradient(135deg, ${performance.color} 0%, var(--gold-600) 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {result.correct} / {result.total}
            </div>
            <div className="text-4xl font-semibold mb-3" style={{ color: performance.color }}>
              {result.percentage}%
            </div>
            <div className="text-xl text-[var(--text-secondary)]">
              {performance.message}
            </div>
          </div>

          <div className="divider my-8" />

          <div className="grid grid-cols-3 gap-6 relative z-10">
            <div className="text-center p-4 rounded-lg bg-[var(--bg-surface)]/50 backdrop-blur-sm border border-[var(--border-subtle)]">
              <div className="text-3xl font-semibold text-[var(--success-500)] mb-2">
                {result.correct}
              </div>
              <div className="text-supporting">Correct</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-[var(--bg-surface)]/50 backdrop-blur-sm border border-[var(--border-subtle)]">
              <div className="text-3xl font-semibold text-[var(--error-500)] mb-2">
                {result.incorrect}
              </div>
              <div className="text-supporting">Incorrect</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-[var(--bg-surface)]/50 backdrop-blur-sm border border-[var(--border-subtle)]">
              <div className="text-3xl font-semibold text-[var(--warning-500)] mb-2">
                {result.unanswered}
              </div>
              <div className="text-supporting">Unanswered</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={onReview}
            className="btn btn-primary btn-lg"
          >
            Review Answers →
          </button>
          <button
            onClick={onRestart}
            className="btn btn-secondary btn-lg"
          >
            ↻ Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
