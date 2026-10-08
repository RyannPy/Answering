"use client";

import type { MultiQuestion } from "@/types/worksheet";

type MultiRendererProps = {
  question: MultiQuestion;
  value?: number[];
  onChange: (value: number[]) => void;
  disabled?: boolean;
  showAnswer?: boolean;
};

export function MultiRenderer({
  question,
  value = [],
  onChange,
  disabled = false,
  showAnswer = false,
}: MultiRendererProps) {
  const handleToggle = (optionNumber: number) => {
    if (value.includes(optionNumber)) {
      onChange(value.filter((v) => v !== optionNumber));
    } else {
      onChange([...value, optionNumber]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="text-base text-[var(--text-primary)] font-medium mb-1">
        {question.question}
      </div>

      <div className="text-xs text-[var(--text-secondary)] mb-2">
        Select all that apply
      </div>

      <div className="space-y-2">
        {question.options.map((option, index) => {
          const optionNumber = index + 1;
          const isSelected = value.includes(optionNumber);
          const isCorrect = showAnswer && question.answer.includes(optionNumber);

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
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleToggle(optionNumber)}
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
