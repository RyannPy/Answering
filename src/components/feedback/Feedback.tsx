"use client";

import type { Question } from "@/types/worksheet";
import { MathContent } from "@/components/common/MathContent";

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
        p-8 rounded-lg border animate-scale-in relative overflow-hidden
        ${correct ? "feedback-correct" : "feedback-incorrect"}
      `}
    >
      {/* Decorative glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 ${correct ? 'bg-[var(--success-500)]' : 'bg-[var(--error-500)]'}`}></div>
      
      <div className="flex items-start gap-4 mb-6 relative z-10">
        <div
          className={`
            text-4xl shrink-0 flex items-center justify-center w-14 h-14 rounded-full
            ${correct ? "text-[var(--success-500)] bg-[var(--success-900)]/50" : "text-[var(--error-500)] bg-[var(--error-900)]/50"}
          `}
        >
          {correct ? "✓" : "✕"}
        </div>
        <div className="flex-1">
          <div
            className={`
              text-2xl font-semibold mb-2
              ${correct ? "text-[var(--success-500)]" : "text-[var(--error-500)]"}
            `}
          >
            {correct ? "Correct!" : "Incorrect"}
          </div>
          <div className="text-supporting">
            {correct
              ? "Great job! Your answer is correct."
              : "Not quite right. Review the correct answer below."}
          </div>
        </div>
      </div>

      {!correct && (
        <div className="mb-6 surface p-5 relative z-10">
          <div className="text-metadata mb-3 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-[var(--gold-500)] rounded-full"></span>
            Correct answer
          </div>
          <CorrectAnswerDisplay question={question} />
        </div>
      )}

      {question.explanation && (
        <div className="mb-6 surface p-5 relative z-10">
          <div className="text-metadata mb-3 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-[var(--gold-500)] rounded-full"></span>
            Explanation
          </div>
          <MathContent content={question.explanation} className="text-supporting leading-relaxed" />
        </div>
      )}

      <div className="flex flex-wrap gap-3 relative z-10">
        {!correct && onTryAgain && (
          <button
            onClick={onTryAgain}
            className="btn btn-secondary"
          >
            Try Again
          </button>
        )}
        {onContinue && (
          <button
            onClick={onContinue}
            className="btn btn-primary"
          >
            {correct ? "Continue →" : "Next Question →"}
          </button>
        )}
      </div>
    </div>
  );
}

function CorrectAnswerDisplay({ question }: { question: Question }) {
  switch (question.type) {
    case "mc":
      return (
        <MathContent 
          content={question.options[question.answer - 1]} 
          className="text-option" 
        />
      );
    case "multi":
      return (
        <div className="space-y-2">
          {question.answer.map((idx, i) => (
            <MathContent
              key={i}
              content={question.options[idx - 1]}
              className="text-option"
            />
          ))}
        </div>
      );
    case "tf":
      return (
        <div className="text-option">
          {question.answer ? "True" : "False"}
        </div>
      );
    case "short":
      return (
        <div className="space-y-2">
          {question.answer.map((ans, i) => (
            <MathContent
              key={i}
              content={ans}
              className="text-option"
            />
          ))}
        </div>
      );
    default:
      const _exhaustive: never = question;
      return _exhaustive;
  }
}
