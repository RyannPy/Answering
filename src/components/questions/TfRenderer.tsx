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
    <div className="space-y-4">
      <div className="text-question">
        {question.question}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const isSelected = value === option.value;
          const isCorrect = showAnswer && question.answer === option.value;

          return (
            <button
              key={option.label}
              onClick={() => onChange(option.value)}
              disabled={disabled}
              className={`
                p-4 rounded-md border font-medium text-base
                transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)]
                ${
                  isSelected && !showAnswer
                    ? "border-[var(--gold-500)] border-2 bg-[var(--gold-900)] text-[var(--text-primary)]"
                    : "border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated-hover)] hover:text-[var(--text-primary)]"
                }
                ${disabled ? "cursor-not-allowed opacity-60" : ""}
                ${isCorrect && showAnswer ? "border-[var(--gold-400)] border-2 bg-[var(--gold-900)]" : ""}
              `}
            >
              {option.label}
              {isCorrect && showAnswer && (
                <span className="block text-xs font-medium text-[var(--gold-400)] mt-1">
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
