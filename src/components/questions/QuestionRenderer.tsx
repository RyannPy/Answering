"use client";

import type { Question } from "@/types/worksheet";
import { McRenderer } from "./McRenderer";
import { MultiRenderer } from "./MultiRenderer";
import { TfRenderer } from "./TfRenderer";
import { ShortRenderer } from "./ShortRenderer";

type QuestionRendererProps = {
  question: Question;
  value?: string | number | boolean | number[];
  onChange: (value: string | number | boolean | number[]) => void;
  disabled?: boolean;
  showAnswer?: boolean;
};

export function QuestionRenderer({
  question,
  value,
  onChange,
  disabled = false,
  showAnswer = false,
}: QuestionRendererProps) {
  switch (question.type) {
    case "mc":
      return (
        <McRenderer
          question={question}
          value={typeof value === "number" ? value : undefined}
          onChange={onChange}
          disabled={disabled}
          showAnswer={showAnswer}
        />
      );
    case "multi":
      return (
        <MultiRenderer
          question={question}
          value={Array.isArray(value) ? value : []}
          onChange={onChange}
          disabled={disabled}
          showAnswer={showAnswer}
        />
      );
    case "tf":
      return (
        <TfRenderer
          question={question}
          value={typeof value === "boolean" ? value : undefined}
          onChange={onChange}
          disabled={disabled}
          showAnswer={showAnswer}
        />
      );
    case "short":
      return (
        <ShortRenderer
          question={question}
          value={typeof value === "string" ? value : ""}
          onChange={onChange}
          disabled={disabled}
          showAnswer={showAnswer}
        />
      );
    default:
      const _exhaustive: never = question;
      return _exhaustive;
  }
}
