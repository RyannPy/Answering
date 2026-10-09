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
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-[var(--gold-500)] rounded-full opacity-5 blur-3xl"></div>
        </div>

        <div className="container-tight relative z-10">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="heading-page mb-3 text-gradient-gold">
              Import Worksheet
            </h2>
            <p className="text-supporting">
              Paste your worksheet in Answering Worksheet Format v1.
            </p>
          </div>

          {parseErrors && parseErrors.length > 0 ? (
            <div className="feedback-incorrect p-6 mb-6 animate-scale-in">
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

          <div className="animate-slide-up">
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
          </div>
          
          <div className="flex justify-end gap-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
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
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--gold-500)] rounded-full opacity-5 blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--gold-600)] rounded-full opacity-5 blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
      </div>

      <div className="container relative z-10">
        {/* Hero */}
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="heading-display mb-6 text-shimmer">
            Answering
          </h1>
          <p className="text-2xl text-[var(--text-secondary)] mb-4 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Practice questions.
            <br />
            Without the back-and-forth.
          </p>
          <p className="text-supporting max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Turn structured questions into an interactive worksheet you can actually use.
          </p>
        </div>

        {/* Action cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <button
            onClick={() => setView("prompt-generator")}
            className="card-interactive p-12 text-left group animate-scale-in relative"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-[var(--gold-500)] to-[var(--gold-700)] rounded-full opacity-20 blur-xl group-hover:opacity-40 transition-opacity"></div>
            <div className="heading-section mb-4 group-hover:text-gradient-gold transition-all duration-300">
              Generate Prompt
            </div>
            <div className="text-supporting mb-6 leading-relaxed">
              Create a prompt for external AI to generate worksheet questions.
            </div>
            <div className="text-metadata text-[var(--text-tertiary)] flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 bg-[var(--gold-500)] rounded-full"></span>
              Configure question count, difficulty, and types
            </div>
          </button>

          <button
            onClick={() => setView("worksheet-input")}
            className="card-interactive p-12 text-left group animate-scale-in relative"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-[var(--gold-500)] to-[var(--gold-700)] rounded-full opacity-20 blur-xl group-hover:opacity-40 transition-opacity"></div>
            <div className="heading-section mb-4 group-hover:text-gradient-gold transition-all duration-300">
              Start Practicing
            </div>
            <div className="text-supporting mb-6 leading-relaxed">
              Paste your Answering worksheet to begin.
            </div>
            <div className="text-metadata text-[var(--text-tertiary)] flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 bg-[var(--gold-500)] rounded-full"></span>
              Quiz or Exam mode with immediate or delayed feedback
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
