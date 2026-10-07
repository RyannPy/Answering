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
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-deep)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold text-[var(--text-primary)]">
            Answering
          </div>
          <button
            onClick={onExit}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Exit Review
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="lg:flex lg:gap-8">
          {/* Main content */}
          <div className="flex-1">
            {/* Title */}
            <div className="mb-6">
              <div className="text-sm text-[var(--text-muted)] mb-1">Review</div>
              <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
                {session.worksheet.title}
              </h1>
            </div>

            {/* Question card */}
            <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-[var(--text-muted)]">
                  Question {currentIndex + 1}
                </div>
                {currentResult && (
                  <div
                    className={`
                      text-sm font-medium px-3 py-1 rounded-full
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
                  <div className="text-sm font-medium px-3 py-1 rounded-full bg-[var(--bg-deep)] text-[var(--text-muted)]">
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
              <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg p-6 mb-6">
                {!currentResult.correct && (
                  <div className="mb-4">
                    <div className="text-sm text-[var(--text-secondary)] mb-2">
                      Your answer:
                    </div>
                    <div className="text-[var(--text-primary)]">
                      {formatUserAnswer(currentQuestion, currentResult.userAnswer)}
                    </div>
                  </div>
                )}

                {currentQuestion.explanation && (
                  <div>
                    <div className="text-sm text-[var(--text-secondary)] mb-2">
                      Explanation:
                    </div>
                    <div className="text-[var(--text-primary)]">
                      {currentQuestion.explanation}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`
                  px-6 py-3 rounded-lg border transition-colors
                  ${
                    currentIndex === 0
                      ? "border-[var(--border-subtle)] text-[var(--text-muted)] cursor-not-allowed"
                      : "border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
                  }
                `}
              >
                ← Previous
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === session.worksheet.questions.length - 1}
                className={`
                  px-6 py-3 rounded-lg border transition-colors
                  ${
                    currentIndex === session.worksheet.questions.length - 1
                      ? "border-[var(--border-subtle)] text-[var(--text-muted)] cursor-not-allowed"
                      : "border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
                  }
                `}
              >
                Next →
              </button>
            </div>
          </div>

          {/* Navigation sidebar - Desktop */}
          <div className="hidden lg:block w-48 shrink-0">
            <div className="sticky top-8">
              <div className="text-sm text-[var(--text-secondary)] mb-3">Questions</div>
              <div className="grid grid-cols-4 gap-2">
                {session.worksheet.questions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const result = session.results[q.id];

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleNavigate(idx)}
                      className={`
                        aspect-square rounded-lg border text-sm font-medium transition-colors relative
                        ${
                          isCurrent
                            ? "border-[var(--gold-primary)] bg-[var(--gold-primary)]/10 text-[var(--gold-bright)]"
                            : result?.correct
                              ? "border-[var(--success)]/30 bg-[var(--success)]/5 text-[var(--text-primary)]"
                              : result
                                ? "border-[var(--error)]/30 bg-[var(--error)]/5 text-[var(--text-primary)]"
                                : "border-[var(--border-subtle)] bg-[var(--bg-deep)] text-[var(--text-muted)] hover:border-[var(--border-strong)]"
                        }
                      `}
                    >
                      {idx + 1}
                      {result && (
                        <div
                          className={`
                            absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs
                            ${
                              result.correct
                                ? "bg-[var(--success)] text-white"
                                : "bg-[var(--error)] text-white"
                            }
                          `}
                        >
                          {result.correct ? "✓" : "✕"}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="lg:hidden mt-6">
          <div className="flex gap-1 justify-center">
            {session.worksheet.questions.map((q, idx) => {
              const isCurrent = idx === currentIndex;
              const result = session.results[q.id];
              return (
                <div
                  key={q.id}
                  className={`
                    w-2 h-2 rounded-full
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
      </div>
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
