"use client";

import type { MultiQuestion } from "@/types/worksheet";
import { MathContent } from "@/components/common/MathContent";

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
      <MathContent content={question.question} className="text-question" />

      <div className="text-supporting mb-3">
        Select all that apply
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const optionNumber = index + 1;
          const isSelected = value.includes(optionNumber);
          const isCorrect = showAnswer && question.answer.includes(optionNumber);

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
                type="checkbox"
                checked={isSelected}
                onChange={() => handleToggle(optionNumber)}
                disabled={disabled}
                className="mt-0.5 accent-[var(--gold-500)] h-4 w-4 shrink-0"
              />
              <span className="flex-1">
                <MathContent content={option} className="text-option" />
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
