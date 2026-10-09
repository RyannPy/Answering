"use client";

import type { ShortQuestion } from "@/types/worksheet";

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
      <div className="text-question">
        {question.question}
      </div>

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
          <div className="text-option">
            {question.answer.join(", ")}
          </div>
        </div>
      )}
    </div>
  );
}
