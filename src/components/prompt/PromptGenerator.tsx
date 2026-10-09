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
      <header className="border-b border-[var(--border-subtle)] glass-strong backdrop-blur-xl sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="text-xl font-semibold text-gradient-gold">
            Answering
          </div>
          {onBack && (
            <button
              onClick={onBack}
              className="btn btn-ghost btn-sm"
            >
              ← Back
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 container py-12 overflow-y-auto max-w-4xl">
        {/* Title */}
        <div className="mb-10 animate-fade-in">
          <h1 className="heading-section mb-3">
            Prompt Generator
          </h1>
          <p className="text-supporting">
            Configure your worksheet requirements and generate a prompt for external AI.
          </p>
        </div>

        {/* Configuration form */}
        <div className="card p-8 mb-8 animate-slide-up">
          <h2 className="heading-subsection mb-6">
            Configure
          </h2>

          {/* Question count */}
          <div className="mb-6">
            <label className="text-metadata mb-3 block">
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
              className={`input max-w-xs ${errors.questionCount ? "border-[var(--error-500)]" : ""}`}
            />
            {errors.questionCount && (
              <div className="text-sm text-[var(--error-500)] mt-2">{errors.questionCount}</div>
            )}
          </div>

          {/* Difficulty */}
          <div className="mb-6">
            <label className="text-metadata mb-3 block">
              Difficulty
            </label>
            <div className="flex flex-wrap gap-3">
              {(["Simple", "Normal", "HOTS", "Mixed"] as Difficulty[]).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setConfig({ ...config, difficulty: diff })}
                  className={`
                    px-6 py-3 rounded-md border font-medium transition-all duration-300 relative overflow-hidden
                    ${
                      config.difficulty === diff
                        ? "border-[var(--gold-500)] border-2 bg-gradient-to-br from-[var(--gold-900)] to-[var(--gold-800)] text-[var(--text-primary)] shadow-lg shadow-[var(--gold-500)]/20"
                        : "border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated-hover)] hover:text-[var(--text-primary)]"
                    }
                  `}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Question types */}
          <div className="mb-6">
            <label className="text-metadata mb-3 block">
              Question Types
            </label>
            <div className="grid grid-cols-2 gap-3">
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
                    px-6 py-3 rounded-md border font-medium text-left transition-all duration-300
                    ${
                      config.questionTypes.includes(type)
                        ? "border-[var(--gold-500)] border-2 bg-gradient-to-br from-[var(--gold-900)] to-[var(--gold-800)] text-[var(--text-primary)] shadow-lg shadow-[var(--gold-500)]/20"
                        : "border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated-hover)] hover:text-[var(--text-primary)]"
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>
            {errors.questionTypes && (
              <div className="text-sm text-[var(--error-500)] mt-2">{errors.questionTypes}</div>
            )}
          </div>

          {/* Source */}
          <div className="mb-6">
            <label className="text-metadata mb-3 block">
              Source
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { type: "user-material" as SourceType, label: "My Material" },
                { type: "general-knowledge" as SourceType, label: "General Knowledge" },
              ].map(({ type, label }) => (
                <button
                  key={type}
                  onClick={() => setConfig({ ...config, source: type })}
                  className={`
                    px-6 py-3 rounded-md border font-medium text-left transition-all duration-300
                    ${
                      config.source === type
                        ? "border-[var(--gold-500)] border-2 bg-gradient-to-br from-[var(--gold-900)] to-[var(--gold-800)] text-[var(--text-primary)] shadow-lg shadow-[var(--gold-500)]/20"
                        : "border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated-hover)] hover:text-[var(--text-primary)]"
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Topic / Material */}
          <div className="mb-8">
            <label className="text-metadata mb-3 block">
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
              rows={4}
              className={`textarea ${errors.topic ? "border-[var(--error-500)]" : ""}`}
            />
            {errors.topic && (
              <div className="text-sm text-[var(--error-500)] mt-2">{errors.topic}</div>
            )}
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={hasErrors}
            className="btn btn-primary btn-lg w-full"
          >
            Generate Prompt
          </button>
        </div>

        {/* Generated prompt */}
        {generatedPrompt && (
          <div className="card p-8 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-subsection">
                Generated Prompt
              </h2>
              <button
                onClick={handleCopy}
                className={`btn ${copyFeedback ? 'btn-secondary' : 'btn-primary'} transition-all`}
              >
                {copyFeedback ? "✓ Copied!" : "Copy Prompt"}
              </button>
            </div>

            <textarea
              readOnly
              value={generatedPrompt}
              rows={12}
              className="textarea font-mono text-sm"
            />

            <div className="mt-4 p-4 rounded-md bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
              <p className="text-supporting text-sm">
                💡 Copy this prompt and paste it into an external AI (e.g., ChatGPT, Claude) to
                generate your worksheet.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
