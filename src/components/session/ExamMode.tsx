"use client";

import { useState } from "react";
import type { SessionState } from "@/types/session";
import { QuestionRenderer } from "@/components/questions/QuestionRenderer";

type ExamModeProps = {
  session: SessionState;
  onSubmit: (session: SessionState) => void;
};

export function ExamMode({ session: initialSession, onSubmit }: ExamModeProps) {
  const [session, setSession] = useState(initialSession);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const currentQuestion = session.worksheet.questions[session.currentQuestionIndex];
  const currentAnswer = session.answers[currentQuestion.id];

  const handleAnswerChange = (value: string | number | boolean | number[]) => {
    setSession({
      ...session,
      answers: {
        ...session.answers,
        [currentQuestion.id]: {
          value,
          submitted: true, // In exam mode, "submitted" means "answered"
        },
      },
    });
  };

  const handleNavigate = (index: number) => {
    setSession({
      ...session,
      currentQuestionIndex: index,
    });
    setShowSubmitConfirm(false);
  };

  const handleNext = () => {
    if (session.currentQuestionIndex < session.worksheet.questions.length - 1) {
      handleNavigate(session.currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (session.currentQuestionIndex > 0) {
      handleNavigate(session.currentQuestionIndex - 1);
    }
  };

  const handleSubmitExam = () => {
    onSubmit(session);
  };

  const answeredCount = Object.keys(session.answers).length;
  const unansweredCount = session.worksheet.questions.length - answeredCount;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      {/* Header */}
      <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-deep)] flex-shrink-0">
        <div className="container mx-auto py-3 flex items-center justify-between">
          <div className="text-lg font-semibold text-[var(--text-primary)]">
            Answering
          </div>
          <div className="flex-1">
            <div className="text-sm text-[var(--text-muted)] mx-auto">
              Question {session.currentQuestionIndex + 1} of {session.worksheet.questions.length}
            </div>
          </div>
          <button
            onClick={() => {/* Back logic would go here */}}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm"
          >
            Back
          </button>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-6 overflow-y-auto">
        <div className="lg:flex lg:gap-4">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Worksheet title */}
            <div className="mb-4">
              <div className="text-xs text-[var(--text-muted)] mb-1">Exam Mode</div>
              <h1 className="text-xl font-semibold text-[var(--text-primary)]">
                {session.worksheet.title}
              </h1>
            </div>

            {/* Question card */}
            <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg p-4 mb-4">
              <div className="text-xs text-[var(--text-muted)] mb-2">
                Question {session.currentQuestionIndex + 1}
              </div>

              <QuestionRenderer
                question={currentQuestion}
                value={currentAnswer?.value}
                onChange={handleAnswerChange}
                disabled={false}
                showAnswer={false}
              />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handlePrevious}
                disabled={session.currentQuestionIndex === 0}
                className={`
                  px-3 py-1.5 rounded-md border transition-colors duration-200
                  ${
                    session.currentQuestionIndex === 0
                      ? "border-[var(--border-subtle)] text-[var(--text-muted)] cursor-not-allowed"
                      : "border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
                  }
                `}
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={
                  session.currentQuestionIndex === session.worksheet.questions.length - 1
                }
                className={`
                  px-3 py-1.5 rounded-md border transition-colors duration-200
                  ${
                    session.currentQuestionIndex === session.worksheet.questions.length - 1
                      ? "border-[var(--border-subtle)] text-[var(--text-muted)] cursor-not-allowed"
                      : "border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
                  }
                `}
              >
                Next
              </button>
            </div>

            {/* Submit exam section */}
            {!showSubmitConfirm ? (
              <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg p-4">
                <div className="text-base font-medium text-[var(--text-primary)] mb-2">
                  Ready to submit?
                </div>
                <div className="text-sm text-[var(--text-secondary)] mb-3">
                  {answeredCount} / {session.worksheet.questions.length} questions answered
                  {unansweredCount > 0 && (
                    <span className="text-[var(--warning)] ml-1">
                      • {unansweredCount} unanswered
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setShowSubmitConfirm(true)}
                  className="w-full px-4 py-2 rounded-lg font-medium bg-[var(--gold-primary)] text-[var(--bg-primary)] hover:bg-[var(--gold-bright)] transition-colors duration-200"
                >
                  Submit Exam
                </button>
              </div>
            ) : (
              <div className="bg-[var(--bg-elevated)] border border-[var(--warning)]/30 rounded-lg p-4">
                <div className="text-base font-medium text-[var(--text-primary)] mb-2">
                  Confirm submission
                </div>
                <div className="text-sm text-[var(--text-secondary)] mb-3">
                  {answeredCount} answered • {unansweredCount} unanswered
                  <br />
                  You cannot change answers after submitting.
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowSubmitConfirm(false)}
                    className="flex-1 px-4 py-2 rounded-md border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitExam}
                    className="flex-1 px-4 py-2 rounded-md font-medium bg-[var(--gold-primary)] text-[var(--bg-primary)] hover:bg-[var(--gold-bright)] transition-colors duration-200"
                  >
                    Confirm Submit
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation sidebar - Desktop */}
          <div className="hidden lg:block w-48 shrink-0">
            <div className="sticky top-4">
              <div className="text-xs text-[var(--text-secondary)] mb-2">Questions</div>
              <div className="grid grid-cols-4 gap-1">
                {session.worksheet.questions.map((q, idx) => {
                  const isCurrent = idx === session.currentQuestionIndex;
                  const isAnswered = !!session.answers[q.id];

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleNavigate(idx)}
                      className={`
                        aspect-square rounded-md border text-xs font-medium transition-colors duration-200
                        ${
                          isCurrent
                            ? "border-[var(--gold-primary)] bg-[var(--gold-primary)]/10 text-[var(--gold-bright)]"
                            : isAnswered
                              ? "border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-primary)]"
                              : "border-[var(--border-subtle)] bg-[var(--bg-deep)] text-[var(--text-muted)] hover:border-[var(--border-strong)]"
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
        <div className="lg:hidden mt-4">
          <div className="flex gap-1 justify-center mb-2">
            {session.worksheet.questions.map((q, idx) => {
              const isCurrent = idx === session.currentQuestionIndex;
              const isAnswered = !!session.answers[q.id];
              return (
                <div
                  key={q.id}
                  className={`
                    w-2 h-2 rounded-full
                    ${
                      isCurrent
                        ? "bg-[var(--gold-primary)]"
                        : isAnswered
                          ? "bg-[var(--text-secondary)]"
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
        <div className="container mx-auto py-2 flex items-center justify-between text-sm">
          <span className="text-[var(--text-muted)]">© 2026 Answering</span>
          <span className="text-[var(--text-muted)]">Version 0.1.0</span>
        </div>
      </footer>
    </div>
  );
}
