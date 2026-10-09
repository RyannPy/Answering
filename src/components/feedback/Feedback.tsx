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
        p-6 rounded-lg border animate-fade-in
        ${correct ? "feedback-correct" : "feedback-incorrect"}
      `}
    >
      <div className="flex items-start gap-4 mb-6">
        <div
          className={`
            text-3xl shrink-0
            ${correct ? "text-[var(--success-500)]" : "text-[var(--error-500)]"}
          `}
        >
          {correct ? "✓" : "✕"}
        </div>
        <div className="flex-1">
          <div
            className={`
              text-xl font-semibold mb-2
              ${correct ? "text-[var(--success-500)]" : "text-[var(--error-500)]"}
            `}
          >
            {correct ? "Correct" : "Incorrect"}
          </div>
          <div className="text-supporting">
            {correct
              ? "Your answer is correct."
              : "Your answer is not correct."}
          </div>
        </div>
      </div>

      {!correct && (
        <div className="mb-6 surface p-4">
          <div className="text-metadata mb-2">
            Correct answer:
          </div>
          <div className="text-option">
            {getCorrectAnswerDisplay(question)}
          </div>
        </div>
      )}

      {question.explanation && (
        <div className="mb-6 surface p-4">
          <div className="text-metadata mb-2">
            Explanation:
          </div>
          <div className="text-supporting leading-relaxed">{question.explanation}</div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {!correct && onTryAgain && (
          <button
            onClick={onTryAgain}
            className="btn btn-secondary btn-sm"
          >
            Try Again
          </button>
        )}
        {onContinue && (
          <button
            onClick={onContinue}
            className="btn btn-primary btn-sm"
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
