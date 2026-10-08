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
    <div className="space-y-3">
      <div className="text-base text-[var(--text-primary)] font-medium mb-1">
        {question.question}
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Type your answer..."
        className={`
          w-full p-2 rounded-md border bg-[var(--bg-elevated)] text-[var(--text-primary)]
          placeholder:text-[var(--text-muted)]
          focus:border-[var(--gold-primary)] focus:outline-none
          ${disabled ? "cursor-not-allowed opacity-60" : "border-[var(--border-subtle)]"}
        `}
      />

      {showAnswer && (
        <div className="mt-2 p-2 rounded-md border bg-[var(--bg-elevated)] border-[var(--border-subtle)]">
          <div className="text-xs text-[var(--text-secondary)] mb-1">
            Accepted answers:
          </div>
          <div className="text-[var(--text-primary)] text-xs">
            {question.answer.join(", ")}
          </div>
        </div>
      )}
    </div>
  );
}
