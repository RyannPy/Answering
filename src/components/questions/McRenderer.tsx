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
      <div className="text-question">
        {question.question}
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const optionNumber = index + 1;
          const isSelected = value === optionNumber;
          const isCorrect = showAnswer && question.answer === optionNumber;

          return (
            <label
              key={optionNumber}
              className={`
                option-base flex items-start gap-3
                ${isSelected && !showAnswer ? "option-selected" : ""}
                ${isCorrect && showAnswer ? "option-correct" : ""}
                ${disabled ? "option-disabled" : ""}
              `}
            >
              <input
                type="radio"
                name={`mc-${question.id}`}
                value={optionNumber}
                checked={isSelected}
                onChange={() => onChange(optionNumber)}
                disabled={disabled}
                className="mt-0.5 accent-[var(--gold-500)] h-4 w-4 shrink-0"
              />
              <span className="flex-1 text-option">
                {option}
                {isCorrect && showAnswer && (
                  <span className="ml-2 text-xs font-medium text-[var(--gold-400)]">
                    ✓ Correct answer
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
