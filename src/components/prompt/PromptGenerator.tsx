"use client";

import { useState } from "react";
import type { PromptConfig, Difficulty, QuestionType, SourceType } from "@/types/prompt";
import { generatePrompt, validatePromptConfig } from "@/lib/prompt-builder";

type PromptGeneratorProps = {
  onBack?: () => void;
};

export function PromptGenerator({ onBack }: PromptGeneratorProps) {
  const [config, setConfig] = useState<PromptConfig>({
    questionCount: 10,
    difficulty: "Normal",
    questionTypes: ["mc", "multi", "tf", "short"],
    source: "general-knowledge",
    topic: "",
  });

  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [copyFeedback, setCopyFeedback] = useState(false);

  const errors = validatePromptConfig(config);
  const hasErrors = Object.keys(errors).length > 0;

  const handleGenerate = () => {
    if (hasErrors) return;
    const prompt = generatePrompt(config);
    setGeneratedPrompt(prompt);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const toggleQuestionType = (type: QuestionType) => {
    const current = config.questionTypes;
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    setConfig({ ...config, questionTypes: updated });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      {/* Header */}
      <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-deep)] flex-shrink-0">
        <div className="container mx-auto py-3 flex items-center justify-between">
          <div className="text-lg font-semibold text-[var(--text-primary)]">
            Answering
          </div>
          {onBack && (
            <button
              onClick={onBack}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm"
            >
              Back
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 container mx-auto py-6 overflow-y-auto">
        {/* Title */}
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
            Prompt Generator
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Configure your worksheet requirements and generate a prompt for external AI.
          </p>
        </div>

        {/* Configuration form */}
        <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg p-3 mb-3">
          <h2 className="text-base font-semibold text-[var(--text-primary)] mb-2">
            Configure
          </h2>

          {/* Question count */}
          <div className="mb-2">
            <label className="block text-xs font-medium text-[var(--text-primary)] mb-1">
              Question Count
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={config.questionCount}
              onChange={(e) =>
                setConfig({ ...config, questionCount: parseInt(e.target.value) || 1 })
              }
              className={`
                w-full max-w-xs p-1.5 rounded-md border bg-[var(--bg-deep)] text-[var(--text-primary)]
                focus:border-[var(--gold-primary)] focus:outline-none
                ${errors.questionCount ? "border-[var(--error)]" : "border-[var(--border-subtle)]"}
              `}
            />
            {errors.questionCount && (
              <div className="text-xs text-[var(--error)] mt-0.5">{errors.questionCount}</div>
            )}
          </div>

          {/* Difficulty */}
          <div className="mb-2">
            <label className="block text-xs font-medium text-[var(--text-primary)] mb-1">
              Difficulty
            </label>
            <div className="flex flex-wrap gap-1">
              {(["Simple", "Normal", "HOTS", "Mixed"] as Difficulty[]).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setConfig({ ...config, difficulty: diff })}
                  className={`
                    px-3 py-1.5 rounded-md border font-medium transition-colors duration-200
                    ${
                      config.difficulty === diff
                        ? "border-[var(--gold-primary)] bg-[var(--gold-primary)]/10 text-[var(--gold-bright)]"
                        : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                    }
                  `}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Question types */}
          <div className="mb-2">
            <label className="block text-xs font-medium text-[var(--text-primary)] mb-1">
              Question Types
            </label>
            <div className="flex flex-wrap gap-1">
              {[
                { type: "mc" as QuestionType, label: "Multiple Choice" },
                { type: "multi" as QuestionType, label: "Multiple Select" },
                { type: "tf" as QuestionType, label: "True / False" },
                { type: "short" as QuestionType, label: "Short Answer" },
              ].map(({ type, label }) => (
                <button
                  key={type}
                  onClick={() => toggleQuestionType(type)}
                  className={`
                    px-3 py-1.5 rounded-md border font-medium transition-colors duration-200
                    ${
                      config.questionTypes.includes(type)
                        ? "border-[var(--gold-primary)] bg-[var(--gold-primary)]/10 text-[var(--gold-bright)]"
                        : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>
            {errors.questionTypes && (
              <div className="text-xs text-[var(--error)] mt-0.5">{errors.questionTypes}</div>
            )}
          </div>

          {/* Source */}
          <div className="mb-2">
            <label className="block text-xs font-medium text-[var(--text-primary)] mb-1">
              Source
            </label>
            <div className="flex flex-wrap gap-1">
              {[
                { type: "user-material" as SourceType, label: "My Material" },
                { type: "general-knowledge" as SourceType, label: "General Knowledge" },
              ].map(({ type, label }) => (
                <button
                  key={type}
                  onClick={() => setConfig({ ...config, source: type })}
                  className={`
                    px-3 py-1.5 rounded-md border font-medium transition-colors duration-200
                    ${
                      config.source === type
                        ? "border-[var(--gold-primary)] bg-[var(--gold-primary)]/10 text-[var(--gold-bright)]"
                        : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Topic / Material */}
          <div className="mb-2">
            <label className="block text-xs font-medium text-[var(--text-primary)] mb-1">
              {config.source === "user-material"
                ? "Material / Topic Description"
                : "Topic"}
            </label>
            <textarea
              value={config.topic}
              onChange={(e) => setConfig({ ...config, topic: e.target.value })}
              placeholder={
                config.source === "user-material"
                  ? "Describe your material or paste the content here..."
                  : "E.g., Discrete Mathematics, Pigeonhole Principle"
              }
              rows={3}
              className={`
                w-full p-1.5 rounded-md border bg-[var(--bg-deep)] text-[var(--text-primary)]
                placeholder:text-[var(--text-muted)]
                focus:border-[var(--gold-primary)] focus:outline-none
                ${errors.topic ? "border-[var(--error)]" : "border-[var(--border-subtle)]"}
              `}
            />
            {errors.topic && (
              <div className="text-xs text-[var(--error)] mt-0.5">{errors.topic}</div>
            )}
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={hasErrors}
            className={`
              w-full px-3 py-1.5 rounded-md font-medium transition-colors duration-200
              ${hasErrors
                ? "bg-[var(--bg-secondary)] text-[var(--text-muted)] cursor-not-allowed"
                : "bg-[var(--gold-primary)] text-[var(--bg-primary)] hover:bg-[var(--gold-bright)]"
              }
            `}
          >
            Generate Prompt
          </button>
        </div>

        {/* Generated prompt */}
        {generatedPrompt && (
          <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                Generated Prompt
              </h1>
              <button
                onClick={handleCopy}
                className="px-2 py-1 rounded-md bg-[var(--gold-primary)] text-[var(--bg-primary)] font-medium hover:bg-[var(--gold-bright)] transition-colors duration-200 text-sm"
              >
                {copyFeedback ? "Copied!" : "Copy Prompt"}
              </button>
            </div>

            <textarea
              readOnly
              value={generatedPrompt}
              rows={8}
              className="w-full p-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-deep)] text-[var(--text-primary)] font-mono text-xs"
            />

            <div className="mt-1 text-xs text-[var(--text-secondary)]">
              Copy this prompt and paste it into an external AI (e.g., ChatGPT, Claude) to
              generate your worksheet.
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-deep)] flex-shrink-0">
        <div className="container mx-auto py-2 flex items-center justify-between text-xs">
          <span className="text-[var(--text-muted)]">© 2026 Answering</span>
          <span className="text-[var(--text-muted)]">Version 0.1.0</span>
        </div>
      </footer>
    </div>
  );
}
