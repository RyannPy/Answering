"use client";

import { useState } from "react";
import { parseWorksheet, type ParseError } from "@/parser";
import type { Worksheet } from "@/types/worksheet";
import { SessionOrchestrator } from "@/components/session/SessionOrchestrator";
import { PromptGenerator } from "@/components/prompt/PromptGenerator";

type AppView = "home" | "prompt-generator" | "worksheet-input" | "practice";

export default function Home() {
  const [view, setView] = useState<AppView>("home");
  const [worksheetInput, setWorksheetInput] = useState("");
  const [parseErrors, setParseErrors] = useState<ParseError[] | null>(null);
  const [parsedWorksheet, setParsedWorksheet] = useState<Worksheet | null>(null);

  if (view === "prompt-generator") {
    return <PromptGenerator onBack={() => setView("home")} />;
  }

  if (view === "worksheet-input") {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-6">
        <div className="max-w-xl w-full space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              Paste your Answering worksheet below.
            </h2>
            <p className="text-[var(--text-secondary)]">
              Use Answering Worksheet Format v1.
            </p>
          </div>

          {parseErrors && parseErrors.length > 0 ? (
            <div className="bg-[var(--bg-elevated)] border border-[var(--error)]/30 rounded-lg p-4">
              <div className="text-xl font-semibold text-[var(--error)] mb-2">
                Could not load worksheet.
              </div>
              <div className="space-y-2 text-[var(--text-primary)]">
                {parseErrors.map((error, idx) => (
                  <div key={idx}>
                    {error.question && `Question ${error.question}: `}
                    {error.message}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <textarea
            value={worksheetInput}
            onChange={(e) => setWorksheetInput(e.target.value)}
            placeholder="@worksheet
  title: My Worksheet
  description: Optional description

  @question
  type: mc
  question: Sample question
  options:
   - Option A
   - Option B
  answer: 1
  @end"
            className="w-full min-h-[200px] rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--gold-primary)] focus:border-[var(--gold-primary)] px-4 py-2 resize-y"
          />
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setView("home")}
              className="px-6 py-2 rounded-lg border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const result = parseWorksheet(worksheetInput);
                if (result.ok) {
                  setParsedWorksheet(result.worksheet);
                  setParseErrors(null);
                  setView("practice");
                } else {
                  setParseErrors(result.errors);
                }
              }}
              className="px-6 py-2 rounded-lg bg-[var(--gold-primary)] text-[var(--bg-primary)] hover:bg-[var(--gold-bright)] transition-colors"
            >
              Load Worksheet
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === "practice") {
    if (!parsedWorksheet) {
      // This should not happen, but fallback to home
      setView("home");
      return null;
    }

    return <SessionOrchestrator worksheet={parsedWorksheet} />;
  }

  // Home view
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-6">
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
            onClick={() => setView("worksheet-input")}
            className="p-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:border-[var(--gold-primary)] hover:bg-[var(--bg-secondary)] transition-all text-left group"
          >
            <div className="text-2xl font-semibold text-[var(--text-primary)] mb-3 group-hover:text-[var(--gold-bright)] transition-colors">
              Start Practicing
            </div>
            <div className="text-[var(--text-secondary)] mb-4">
              Paste your Answering worksheet to begin.
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
