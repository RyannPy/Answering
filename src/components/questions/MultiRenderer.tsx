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
    <div className="space-y-4">
      <div className="text-lg text-[var(--text-primary)] font-medium">
        {question.question}
      </div>

      <div className="text-sm text-[var(--text-secondary)] mb-3">
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
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleToggle(optionNumber)}
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
