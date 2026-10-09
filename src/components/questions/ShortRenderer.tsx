"use client";

import type { ShortQuestion } from "@/types/worksheet";
import { MathContent } from "@/components/common/MathContent";

type ShortRendererProps = {
  question: ShortQuestion;
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  showAnswer?: boolean;
};

export function ShortRenderer({
  question,
  value = "",
  onChange,
  disabled = false,
  showAnswer = false,
}: ShortRendererProps) {
  return (
    <div className="space-y-4">
      <MathContent content={question.question} className="text-question" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Type your answer..."
        className="input"
      />

      {showAnswer && (
        <div className="surface p-4">
          <div className="text-metadata mb-2">
            Accepted answers:
          </div>
          <div className="space-y-1">
            {question.answer.map((answer, idx) => (
              <MathContent key={idx} content={answer} className="text-option" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
