"use client";

import { useState } from "react";
import type { SessionState } from "@/types/session";
import { QuestionRenderer } from "@/components/questions/QuestionRenderer";

type ReviewModeProps = {
  session: SessionState;
  onExit: () => void;
};

export function ReviewMode({ session, onExit }: ReviewModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQuestion = session.worksheet.questions[currentIndex];
  const currentAnswer = session.answers[currentQuestion.id];
  const currentResult = session.results[currentQuestion.id];

  const handleNavigate = (index: number) => {
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < session.worksheet.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      {/* Header */}
      <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-deep)] flex-shrink-0">
        <div className="container mx-auto py-3 flex items-center justify-between">
          <div className="text-lg font-semibold text-[var(--text-primary)]">
            Answering
          </div>
          <button
            onClick={onExit}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm"
          >
            Exit Review
          </button>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-6 overflow-y-auto">
        <div className="lg:flex lg:gap-4">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <div className="mb-2">
              <div className="text-xs text-[var(--text-muted)] mb-1">Review</div>
              <h1 className="text-base font-semibold text-[var(--text-primary)]">
                {session.worksheet.title}
              </h1>
            </div>

            {/* Question card */}
            <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg p-3 mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-[var(--text-muted)]">
                  Question {currentIndex + 1}
                </div>
                {currentResult && (
                  <div
                    className={`
                      text-xs font-medium px-2 py-0.5 rounded-full
                      ${
                        currentResult.correct
                          ? "bg-[var(--success)]/10 text-[var(--success)]"
                          : "bg-[var(--error)]/10 text-[var(--error)]"
                      }
                    `}
                  >
                    {currentResult.correct ? "✓ Correct" : "✕ Incorrect"}
                  </div>
                )}
                {!currentResult && (
                  <div className="text-xs font-medium px-2 py-0.5 rounded-full bg-[var(--bg-deep)] text-[var(--text-muted)]">
                    Not answered
                  </div>
                )}
              </div>

              <QuestionRenderer
                question={currentQuestion}
                value={currentAnswer?.value}
                onChange={() => {}}
                disabled={true}
                showAnswer={true}
              />
            </div>

            {/* Result info */}
            {currentResult && (
              <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg p-3 mb-3">
                {!currentResult.correct && (
                  <div className="mb-1">
                    <div className="text-xs text-[var(--text-secondary)] mb-0.5">
                      Your answer:
                    </div>
                    <div className="text-[var(--text-primary)] text-xs">
                      {formatUserAnswer(currentQuestion, currentResult.userAnswer)}
                    </div>
                  </div>
                )}

                {currentQuestion.explanation && (
                  <div>
                    <div className="text-xs text-[var(--text-secondary)] mb-0.5">
                      Explanation:
                    </div>
                    <div className="text-[var(--text-primary)] text-xs">
                      {currentQuestion.explanation}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`
                  px-2 py-1 rounded-md border transition-colors duration-200
                  ${
                    currentIndex === 0
                      ? "border-[var(--border-subtle)] text-[var(--text-muted)] cursor-not-allowed"
                      : "border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
                  }
                `}
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === session.worksheet.questions.length - 1}
                className={`
                  px-2 py-1 rounded-md border transition-colors duration-200
                  ${
                    currentIndex === session.worksheet.questions.length - 1
                      ? "border-[var(--border-subtle)] text-[var(--text-muted)] cursor-not-allowed"
                      : "border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
                  }
                `}
              >
                Next
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block w-48 shrink-0">
            <div className="sticky top-4">
              <div className="text-xs text-[var(--text-muted)] mb-1">
                Question navigation
              </div>
              <div className="space-y-0.5">
                {session.worksheet.questions.map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => handleNavigate(index)}
                    className={`w-full text-left justify-start px-2 py-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-deep)] ${
                      currentIndex === index
                        ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] font-medium"
                        : "hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] transition-colors duration-200"
                    }`}
                  >
                    Question {index + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-2">
              <div className="text-xs text-[var(--text-muted)] mb-1">
                Session stats
              </div>
              <div className="space-y-0.5">
                <div className="flex justify-between">
                  <div className="text-[var(--text-secondary)] text-xs">Correct</div>
                  <div className="text-[var(--text-primary)] text-xs">
                    {Object.values(session.results).filter(r => r.correct).length}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-[var(--text-secondary)] text-xs">Incorrect</div>
                  <div className="text-[var(--text-primary)] text-xs">
                    {Object.values(session.results).filter(r => !r.correct).length}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-[var(--text-secondary)] text-xs">Unanswered</div>
                  <div className="text-[var(--text-primary)] text-xs">
                    {session.worksheet.questions.length - Object.keys(session.results).length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="lg:hidden mt-2">
          <div className="flex gap-0.5 justify-center mb-1">
            {session.worksheet.questions.map((q, idx) => {
              const isCurrent = idx === currentIndex;
              const result = session.results[q.id];
              return (
                <div
                  key={q.id}
                  className={`
                    w-1 h-1 rounded-full
                    ${
                      isCurrent
                        ? "bg-[var(--gold-primary)]"
                        : result?.correct
                          ? "bg-[var(--success)]"
                          : result
                            ? "bg-[var(--error)]"
                            : "bg-[var(--border-subtle)]"
                    }
                  `}
                />
              );
            })}
          </div>
        </div>
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

function formatUserAnswer(
  question: { type: string; options?: string[] },
  answer: string | number | boolean | number[]
): string {
  switch (question.type) {
    case "mc":
      return question.options?.[Number(answer) - 1] || String(answer);
    case "multi":
      return Array.isArray(answer)
        ? answer.map((idx: number) => question.options?.[idx - 1] || String(idx)).join(", ")
        : String(answer);
    case "tf":
      return answer ? "True" : "False";
    case "short":
      return String(answer);
    default:
      return String(answer);
  }
}
