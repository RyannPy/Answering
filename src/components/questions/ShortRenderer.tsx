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
      <div className="text-lg text-[var(--text-primary)] font-medium">
        {question.question}
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Type your answer..."
        className={`
          w-full p-4 rounded-lg border bg-[var(--bg-elevated)] text-[var(--text-primary)]
          placeholder:text-[var(--text-muted)]
          focus:border-[var(--gold-primary)] focus:outline-none
          ${disabled ? "cursor-not-allowed opacity-60" : "border-[var(--border-subtle)]"}
        `}
      />

      {showAnswer && (
        <div className="mt-3 p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
          <div className="text-sm text-[var(--text-secondary)] mb-1">
            Accepted answers:
          </div>
          <div className="text-[var(--text-primary)]">
            {question.answer.join(", ")}
          </div>
        </div>
      )}
    </div>
  );
}
