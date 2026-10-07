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
    <div className="space-y-4">
      <div className="text-lg text-[var(--text-primary)] font-medium">
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
                block p-4 rounded-lg border cursor-pointer transition-all
                ${
                  isSelected
                    ? "border-[var(--gold-primary)] bg-[var(--gold-primary)]/5"
                    : "border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
                }
                ${disabled ? "cursor-not-allowed opacity-60" : ""}
                ${isCorrect && showAnswer ? "ring-2 ring-[var(--gold-bright)]" : ""}
              `}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name={`mc-${question.id}`}
                  value={optionNumber}
                  checked={isSelected}
                  onChange={() => onChange(optionNumber)}
                  disabled={disabled}
                  className="mt-1 accent-[var(--gold-primary)]"
                />
                <span className="flex-1 text-[var(--text-primary)]">
                  {option}
                  {isCorrect && showAnswer && (
                    <span className="ml-2 text-sm text-[var(--gold-bright)]">
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
