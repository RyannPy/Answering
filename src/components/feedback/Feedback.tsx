"use client";

import type { Question } from "@/types/worksheet";

type FeedbackProps = {
  correct: boolean;
  question: Question;
  onContinue?: () => void;
  onTryAgain?: () => void;
};

export function Feedback({
  correct,
  question,
  onContinue,
  onTryAgain,
}: FeedbackProps) {
  return (
    <div
      className={`
        p-6 rounded-lg border
        ${
          correct
            ? "bg-[var(--success)]/10 border-[var(--success)]/30"
            : "bg-[var(--error)]/10 border-[var(--error)]/30"
        }
      `}
    >
      <div className="flex items-start gap-3 mb-4">
        <div
          className={`
            text-2xl
            ${correct ? "text-[var(--success)]" : "text-[var(--error)]"}
          `}
        >
          {correct ? "✓" : "✕"}
        </div>
        <div>
          <div
            className={`
              text-lg font-medium mb-1
              ${correct ? "text-[var(--success)]" : "text-[var(--error)]"}
            `}
          >
            {correct ? "Correct" : "Incorrect"}
          </div>
          <div className="text-[var(--text-secondary)]">
            {correct
              ? "Your answer is correct."
              : "Your answer is not correct."}
          </div>
        </div>
      </div>

      {!correct && (
        <div className="mb-4 p-4 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
          <div className="text-sm text-[var(--text-secondary)] mb-2">
            Correct answer:
          </div>
          <div className="text-[var(--text-primary)]">
            {getCorrectAnswerDisplay(question)}
          </div>
        </div>
      )}

      {question.explanation && (
        <div className="mb-4 p-4 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
          <div className="text-sm text-[var(--text-secondary)] mb-2">
            Explanation:
          </div>
          <div className="text-[var(--text-primary)]">{question.explanation}</div>
        </div>
      )}

      <div className="flex gap-3">
        {!correct && onTryAgain && (
          <button
            onClick={onTryAgain}
            className="px-6 py-2 rounded-lg border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
          >
            Try Again
          </button>
        )}
        {onContinue && (
          <button
            onClick={onContinue}
            className="px-6 py-2 rounded-lg bg-[var(--gold-primary)] text-[var(--bg-primary)] font-medium hover:bg-[var(--gold-bright)] transition-colors"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

function getCorrectAnswerDisplay(question: Question): string {
  switch (question.type) {
    case "mc":
      return question.options[question.answer - 1];
    case "multi":
      return question.answer
        .map((idx) => question.options[idx - 1])
        .join(", ");
    case "tf":
      return question.answer ? "True" : "False";
    case "short":
      return question.answer.join(", ");
    default:
      const _exhaustive: never = question;
      return _exhaustive;
  }
}
