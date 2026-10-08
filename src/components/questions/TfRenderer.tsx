"use client";

import type { TfQuestion } from "@/types/worksheet";

type TfRendererProps = {
  question: TfQuestion;
  value?: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  showAnswer?: boolean;
};

export function TfRenderer({
  question,
  value,
  onChange,
  disabled = false,
  showAnswer = false,
}: TfRendererProps) {
  const options = [
    { label: "True", value: true },
    { label: "False", value: false },
  ];

  return (
    <div className="space-y-3">
      <div className="text-base text-[var(--text-primary)] font-medium mb-1">
        {question.question}
      </div>

      <div className="flex gap-2">
        {options.map((option) => {
          const isSelected = value === option.value;
          const isCorrect = showAnswer && question.answer === option.value;

          return (
            <button
              key={option.label}
              onClick={() => onChange(option.value)}
              disabled={disabled}
              className={`
                flex-1 p-2 rounded-md border transition-colors duration-200 font-medium
                ${
                  isSelected
                    ? "border-[var(--gold-primary)] bg-[var(--gold-primary)]/10 text-[var(--gold-bright)]"
                    : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                }
                ${disabled ? "cursor-not-allowed opacity-60" : ""}
                ${isCorrect && showAnswer ? "ring-1 ring-[var(--gold-bright)]" : ""}
              `}
            >
              {option.label}
              {isCorrect && showAnswer && (
                <span className="block text-xs text-[var(--gold-bright)] mt-0.5">
                  ✓ Correct
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
