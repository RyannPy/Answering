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
        <div className="container-tight">
          <div className="text-center mb-8">
            <h2 className="heading-page mb-3">
              Import Worksheet
            </h2>
            <p className="text-supporting">
              Paste your worksheet in Answering Worksheet Format v1.
            </p>
          </div>

          {parseErrors && parseErrors.length > 0 ? (
            <div className="feedback-incorrect p-6 mb-6 animate-fade-in">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-2xl text-[var(--error-500)]">✕</div>
                <div>
                  <div className="text-xl font-semibold text-[var(--error-500)] mb-2">
                    Could not load worksheet
                  </div>
                  <div className="space-y-2 text-supporting">
                    {parseErrors.map((error, idx) => (
                      <div key={idx}>
                        {error.question && `Question ${error.question}: `}
                        {error.message}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <textarea
            value={worksheetInput}
            onChange={(e) => setWorksheetInput(e.target.value)}
            placeholder={`@worksheet
title: My Worksheet
description: Optional description

@question
type: mc
question: Sample question
options:
 - Option A
 - Option B
answer: 1
@end`}
            className="textarea font-mono text-sm min-h-[300px] mb-6"
          />
          
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setView("home");
                setParseErrors(null);
                setWorksheetInput("");
              }}
              className="btn btn-secondary"
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
              className="btn btn-primary"
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
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center py-20">
      <div className="container">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="heading-display mb-6">
            Answering
          </h1>
          <p className="text-2xl text-[var(--text-secondary)] mb-4 max-w-2xl mx-auto leading-relaxed">
            Practice questions.
            <br />
            Without the back-and-forth.
          </p>
          <p className="text-supporting max-w-xl mx-auto">
            Turn structured questions into an interactive worksheet you can actually use.
          </p>
        </div>

        {/* Action cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <button
            onClick={() => setView("prompt-generator")}
            className="card-interactive p-10 text-left group"
          >
            <div className="heading-section mb-4 group-hover:text-[var(--gold-400)] transition-colors duration-[var(--duration-fast)]">
              Generate Prompt
            </div>
            <div className="text-supporting mb-6 leading-relaxed">
              Create a prompt for external AI to generate worksheet questions.
            </div>
            <div className="text-metadata text-[var(--text-tertiary)]">
              Configure question count, difficulty, and types
            </div>
          </button>

          <button
            onClick={() => setView("worksheet-input")}
            className="card-interactive p-10 text-left group"
          >
            <div className="heading-section mb-4 group-hover:text-[var(--gold-400)] transition-colors duration-[var(--duration-fast)]">
              Start Practicing
            </div>
            <div className="text-supporting mb-6 leading-relaxed">
              Paste your Answering worksheet to begin.
            </div>
            <div className="text-metadata text-[var(--text-tertiary)]">
              Quiz or Exam mode with immediate or delayed feedback
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
