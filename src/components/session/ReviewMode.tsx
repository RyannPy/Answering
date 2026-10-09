"use client";

import { useState } from "react";
import type { SessionState } from "@/types/session";
import { QuestionRenderer } from "@/components/questions/QuestionRenderer";
import { MathContent } from "@/components/common/MathContent";

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
      <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-deep)]">
        <div className="container py-4 flex items-center justify-between">
          <div className="text-xl font-semibold text-[var(--text-primary)]">
            Answering
          </div>
          <button
            onClick={onExit}
            className="btn btn-ghost btn-sm"
          >
            Exit Review
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 container py-12 overflow-y-auto">
          {/* Title */}
          <div className="mb-10">
            <div className="text-metadata mb-2">Review</div>
            <h1 className="heading-section">
              {session.worksheet.title}
            </h1>
          </div>

          {/* Question card */}
          <div className="max-w-3xl mb-8">
            <div className="card p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="text-question-number">
                  Question {currentIndex + 1}
                </div>
                {currentResult && (
                  <div
                    className={`badge ${
                      currentResult.correct ? "badge-success" : "badge-error"
                    }`}
                  >
                    {currentResult.correct ? "✓ Correct" : "✕ Incorrect"}
                  </div>
                )}
                {!currentResult && (
                  <div className="badge">
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
          </div>

          {/* Result info */}
          {currentResult && (
            <div className="max-w-3xl space-y-6 mb-8">
              {!currentResult.correct && (
                <div className="surface p-6">
                  <div className="text-metadata mb-3">
                    Your answer:
                  </div>
                  <UserAnswerDisplay question={currentQuestion} answer={currentResult.userAnswer} />
                </div>
              )}

              {currentQuestion.explanation && (
                <div className="surface p-6">
                  <div className="text-metadata mb-3">
                    Explanation:
                  </div>
                  <MathContent content={currentQuestion.explanation} className="text-supporting leading-relaxed" />
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="max-w-3xl flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="btn btn-secondary"
            >
              ← Previous
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === session.worksheet.questions.length - 1}
              className="btn btn-secondary"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 border-l border-[var(--border-subtle)] bg-[var(--bg-deep)] overflow-y-auto">
          <div className="p-6">
            <div className="text-metadata mb-4">Questions</div>
            <div className="space-y-2 mb-8">
              {session.worksheet.questions.map((question, index) => {
                const result = session.results[question.id];
                const isCurrent = index === currentIndex;

                return (
                  <button
                    key={question.id}
                    onClick={() => handleNavigate(index)}
                    className={`
                      w-full text-left px-4 py-3 rounded-md border transition-all duration-[var(--duration-fast)]
                      ${
                        isCurrent
                          ? "border-[var(--gold-500)] border-2 bg-[var(--gold-900)] text-[var(--gold-400)]"
                          : result?.correct || result
                            ? "border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated-hover)]"
                            : "border-[var(--border-default)] bg-transparent text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text-secondary)]"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Question {index + 1}</span>
                      {result?.correct && <span className="text-[var(--success-500)]">✓</span>}
                      {result && !result.correct && <span className="text-[var(--error-500)]">✕</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Stats */}
            <div className="pt-6 border-t border-[var(--border-subtle)]">
              <div className="text-metadata mb-4">Summary</div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="text-supporting">Correct</div>
                  <div className="text-[var(--success-500)] font-medium">
                    {Object.values(session.results).filter(r => r.correct).length}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-supporting">Incorrect</div>
                  <div className="text-[var(--error-500)] font-medium">
                    {Object.values(session.results).filter(r => !r.correct).length}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-supporting">Unanswered</div>
                  <div className="text-[var(--text-muted)] font-medium">
                    {session.worksheet.questions.length - Object.keys(session.results).length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile navigation dots */}
      <div className="lg:hidden border-t border-[var(--border-subtle)] bg-[var(--bg-deep)] py-4">
        <div className="flex gap-1.5 justify-center px-4 overflow-x-auto">
          {session.worksheet.questions.map((q, idx) => {
            const isCurrent = idx === currentIndex;
            const result = session.results[q.id];
            return (
              <div
                key={q.id}
                className={`
                  w-2 h-2 rounded-full shrink-0
                  ${
                    isCurrent
                      ? "bg-[var(--gold-500)] scale-125"
                      : result?.correct
                        ? "bg-[var(--success-500)]"
                        : result
                          ? "bg-[var(--error-500)]"
                          : "bg-[var(--border-subtle)]"
                  }
                `}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function UserAnswerDisplay({ 
  question, 
  answer 
}: { 
  question: { type: string; options?: string[] }; 
  answer: string | number | boolean | number[];
}) {
  switch (question.type) {
    case "mc":
      const mcOption = question.options?.[Number(answer) - 1] || String(answer);
      return <MathContent content={mcOption} className="text-option" />;
    
    case "multi":
      if (Array.isArray(answer)) {
        return (
          <div className="space-y-2">
            {answer.map((idx: number, i) => {
              const option = question.options?.[idx - 1] || String(idx);
              return <MathContent key={i} content={option} className="text-option" />;
            })}
          </div>
        );
      }
      return <div className="text-option">{String(answer)}</div>;
    
    case "tf":
      return <div className="text-option">{answer ? "True" : "False"}</div>;
    
    case "short":
      return <MathContent content={String(answer)} className="text-option" />;
    
    default:
      return <div className="text-option">{String(answer)}</div>;
  }
}
