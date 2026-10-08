"use client";

import type { McQuestion } from "@/types/worksheet";

type McRendererProps = {
  question: McQuestion;
  value?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  showAnswer?: boolean;
};

export function McRenderer({
  question,
  value,
  onChange,
  disabled = false,
  showAnswer = false,
}: McRendererProps) {
  return (
    <div className="space-y-3">
      <div className="text-base text-[var(--text-primary)] font-medium mb-1">
        {question.question}
      </div>

      <div className="space-y-2">
        {question.options.map((option, index) => {
          const optionNumber = index + 1;
          const isSelected = value === optionNumber;
          const isCorrect = showAnswer && question.answer === optionNumber;

          return (
            <label
              key={optionNumber}
              className={`
                block p-2 rounded-md border cursor-pointer transition-colors duration-200
                ${
                  isSelected
                    ? "border-[var(--gold-primary)] bg-[var(--gold-primary)]/10"
                    : "border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
                }
                ${disabled ? "cursor-not-allowed opacity-60" : ""}
                ${isCorrect && showAnswer ? "ring-1 ring-[var(--gold-bright)]" : ""}
              `}
            >
              <div className="flex items-start gap-2">
                <input
                  type="radio"
                  name={`mc-${question.id}`}
                  value={optionNumber}
                  checked={isSelected}
                  onChange={() => onChange(optionNumber)}
                  disabled={disabled}
                  className="mt-0.5 accent-[var(--gold-primary)] h-3 w-3"
                />
                <span className="flex-1 text-[var(--text-primary)] text-sm">
                  {option}
                  {isCorrect && showAnswer && (
                    <span className="ml-1 text-xs text-[var(--gold-bright)]">
                      ✓ Correct answer
                    </span>
                  )}
                </span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
