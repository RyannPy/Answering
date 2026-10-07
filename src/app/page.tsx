"use client";

import { useState } from "react";
import { parseWorksheet } from "@/parser";
import { sampleWorksheetText } from "@/fixtures/sample-worksheet";
import { SessionOrchestrator } from "@/components/session/SessionOrchestrator";
import { PromptGenerator } from "@/components/prompt/PromptGenerator";

type AppView = "home" | "prompt-generator" | "practice";

export default function Home() {
  const [view, setView] = useState<AppView>("home");

  const parseResult = parseWorksheet(sampleWorksheetText);

  if (view === "prompt-generator") {
    return <PromptGenerator onBack={() => setView("home")} />;
  }

  if (view === "practice") {
    if (!parseResult.ok) {
      return (
        <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-6">
          <div className="max-w-2xl w-full bg-[var(--bg-elevated)] border border-[var(--error)]/30 rounded-lg p-6">
            <div className="text-xl font-semibold text-[var(--error)] mb-4">
              Failed to load worksheet
            </div>
            <div className="space-y-2">
              {parseResult.errors.map((error, idx) => (
                <div key={idx} className="text-[var(--text-primary)]">
                  {error.question && `Question ${error.question}: `}
                  {error.message}
                </div>
              ))}
            </div>
            <button
              onClick={() => setView("home")}
              className="mt-6 px-6 py-2 rounded-lg border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      );
    }

    return <SessionOrchestrator worksheet={parseResult.worksheet} />;
  }

  // Home view
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[var(--text-primary)] mb-4">
            Answering
          </h1>
          <p className="text-xl text-[var(--text-secondary)] mb-2">
            Practice questions.
            <br />
            Without the back-and-forth.
          </p>
          <p className="text-[var(--text-secondary)]">
            Turn structured questions into an interactive worksheet you can actually use.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => setView("prompt-generator")}
            className="p-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:border-[var(--gold-primary)] hover:bg-[var(--bg-secondary)] transition-all text-left group"
          >
            <div className="text-2xl font-semibold text-[var(--text-primary)] mb-3 group-hover:text-[var(--gold-bright)] transition-colors">
              Generate Prompt
            </div>
            <div className="text-[var(--text-secondary)] mb-4">
              Create a prompt for external AI to generate worksheet questions.
            </div>
            <div className="text-sm text-[var(--text-muted)]">
              Configure question count, difficulty, and types
            </div>
          </button>

          <button
            onClick={() => setView("practice")}
            className="p-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:border-[var(--gold-primary)] hover:bg-[var(--bg-secondary)] transition-all text-left group"
          >
            <div className="text-2xl font-semibold text-[var(--text-primary)] mb-3 group-hover:text-[var(--gold-bright)] transition-colors">
              Start Practicing
            </div>
            <div className="text-[var(--text-secondary)] mb-4">
              Practice with the sample worksheet or paste your own.
            </div>
            <div className="text-sm text-[var(--text-muted)]">
              Quiz or Exam mode with immediate or delayed feedback
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
