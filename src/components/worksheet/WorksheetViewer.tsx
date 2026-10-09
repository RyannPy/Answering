"use client";

import { useState } from "react";
import type { Worksheet } from "@/types/worksheet";
import type { AnswerState, FeedbackState } from "@/types/answer-state";
import { QuestionRenderer } from "@/components/questions/QuestionRenderer";
import { Feedback } from "@/components/feedback/Feedback";
import { checkAnswer } from "@/checker";

type WorksheetViewerProps = {
  worksheet: Worksheet;
};

export function WorksheetViewer({ worksheet }: WorksheetViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  const currentQuestion = worksheet.questions[currentIndex];
  const currentAnswer = answers[currentQuestion.id];

  const handleAnswerChange = (value: string | number | boolean | number[]) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        value,
        submitted: false,
      },
    });
    // Clear feedback when answer changes
    if (feedback?.questionId === currentQuestion.id) {
      setFeedback(null);
    }
  };

  const handleSubmit = () => {
    if (!currentAnswer?.value && currentAnswer?.value !== false) {
      return; // No answer to submit
    }

    const result = checkAnswer(currentQuestion, currentAnswer.value);

    setAnswers({
      ...answers,
      [currentQuestion.id]: {
        ...currentAnswer,
        submitted: true,
      },
    });

    setFeedback({
      questionId: currentQuestion.id,
      correct: result.correct,
      showFeedback: true,
    });
  };

  const handleTryAgain = () => {
    setFeedback(null);
    setAnswers({
      ...answers,
      [currentQuestion.id]: {
        ...currentAnswer,
        submitted: false,
      },
    });
  };

  const handleContinue = () => {
    if (currentIndex < worksheet.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFeedback(null);
    }
  };

  const handleNavigate = (index: number) => {
    setCurrentIndex(index);
    setFeedback(null);
  };

  const isSubmitted = currentAnswer?.submitted || false;
  const hasAnswer =
    currentAnswer?.value !== undefined &&
    currentAnswer?.value !== "" &&
    (Array.isArray(currentAnswer?.value)
      ? currentAnswer.value.length > 0
      : true);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-deep)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold text-[var(--text-primary)]">
            Answering
          </div>
          <div className="text-[var(--text-secondary)]">
            {currentIndex + 1} / {worksheet.questions.length}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="lg:flex lg:gap-8">
          {/* Main content */}
          <div className="flex-1">
            {/* Worksheet title */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
                {worksheet.title}
              </h1>
              {worksheet.description && (
                <p className="text-[var(--text-secondary)]">
                  {worksheet.description}
                </p>
              )}
            </div>

            {/* Question card */}
            <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg p-6 mb-6">
              <div className="text-sm text-[var(--text-muted)] mb-4">
                Question {currentIndex + 1}
              </div>

              <QuestionRenderer
                question={currentQuestion}
                value={currentAnswer?.value}
                onChange={handleAnswerChange}
                disabled={isSubmitted}
                showAnswer={feedback?.correct === false}
              />
            </div>

            {/* Feedback */}
            {feedback && feedback.showFeedback && (
              <Feedback
                correct={feedback.correct}
                question={currentQuestion}
                onTryAgain={feedback.correct ? undefined : handleTryAgain}
                onContinue={
                  currentIndex < worksheet.questions.length - 1
                    ? handleContinue
                    : undefined
                }
              />
            )}

            {/* Submit button */}
            {!feedback && (
              <button
                onClick={handleSubmit}
                disabled={!hasAnswer}
                className={`
                  w-full lg:w-auto px-8 py-3 rounded-lg font-medium transition-colors
                  ${
                    hasAnswer
                      ? "bg-[var(--gold-primary)] text-[var(--bg-primary)] hover:bg-[var(--gold-bright)]"
                      : "bg-[var(--bg-secondary)] text-[var(--text-muted)] cursor-not-allowed"
                  }
                `}
              >
                Submit Answer
              </button>
            )}
          </div>

          {/* Navigation sidebar */}
          <div className="hidden lg:block w-48 shrink-0">
            <div className="sticky top-8">
              <div className="text-sm text-[var(--text-secondary)] mb-3">
                Questions
              </div>
              <div className="grid grid-cols-4 gap-2">
                {worksheet.questions.map((q, idx) => {
                  const ans = answers[q.id];
                  const isCurrent = idx === currentIndex;
                  const isAnswered = ans?.submitted;

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleNavigate(idx)}
                      className={`
                        aspect-square rounded-lg border text-sm font-medium transition-colors
                        ${
                          isCurrent
                            ? "border-[var(--gold-500)] border-2 bg-[var(--gold-900)] text-[var(--gold-400)]"
                            : isAnswered
                              ? "border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated-hover)]"
                              : "border-[var(--border-default)] bg-transparent text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text-secondary)]"
                        }
                      `}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="lg:hidden mt-6 flex items-center justify-between">
          <button
            onClick={() =>
              currentIndex > 0 && handleNavigate(currentIndex - 1)
            }
            disabled={currentIndex === 0}
            className={`
              px-4 py-2 rounded-lg border transition-colors
              ${
                currentIndex === 0
                  ? "border-[var(--border-subtle)] text-[var(--text-muted)] cursor-not-allowed"
                  : "border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
              }
            `}
          >
            ← Previous
          </button>

          <div className="flex gap-1">
            {worksheet.questions.map((q, idx) => {
              const isCurrent = idx === currentIndex;
              return (
                <div
                  key={q.id}
                  className={`
                    w-2 h-2 rounded-full
                    ${
                      isCurrent
                        ? "bg-[var(--gold-primary)]"
                        : "bg-[var(--border-subtle)]"
                    }
                  `}
                />
              );
            })}
          </div>

          <button
            onClick={() =>
              currentIndex < worksheet.questions.length - 1 &&
              handleNavigate(currentIndex + 1)
            }
            disabled={currentIndex === worksheet.questions.length - 1}
            className={`
              px-4 py-2 rounded-lg border transition-colors
              ${
                currentIndex === worksheet.questions.length - 1
                  ? "border-[var(--border-subtle)] text-[var(--text-muted)] cursor-not-allowed"
                  : "border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
              }
            `}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
