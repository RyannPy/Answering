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
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-deep)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold text-[var(--text-primary)]">
            Answering
          </div>
          <div className="text-[var(--text-secondary)]">
            Question {session.currentQuestionIndex + 1} / {session.worksheet.questions.length}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="lg:flex lg:gap-8">
          {/* Main content */}
          <div className="flex-1">
            {/* Worksheet title */}
            <div className="mb-6">
              <div className="text-sm text-[var(--text-muted)] mb-1">Exam Mode</div>
              <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
                {session.worksheet.title}
              </h1>
            </div>

            {/* Question card */}
            <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg p-6 mb-6">
              <div className="text-sm text-[var(--text-muted)] mb-4">
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
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handlePrevious}
                disabled={session.currentQuestionIndex === 0}
                className={`
                  px-6 py-3 rounded-lg border transition-colors
                  ${
                    session.currentQuestionIndex === 0
                      ? "border-[var(--border-subtle)] text-[var(--text-muted)] cursor-not-allowed"
                      : "border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
                  }
                `}
              >
                ← Previous
              </button>

              <button
                onClick={handleNext}
                disabled={
                  session.currentQuestionIndex === session.worksheet.questions.length - 1
                }
                className={`
                  px-6 py-3 rounded-lg border transition-colors
                  ${
                    session.currentQuestionIndex === session.worksheet.questions.length - 1
                      ? "border-[var(--border-subtle)] text-[var(--text-muted)] cursor-not-allowed"
                      : "border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
                  }
                `}
              >
                Next →
              </button>
            </div>

            {/* Submit exam section */}
            {!showSubmitConfirm ? (
              <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg p-6">
                <div className="text-lg font-medium text-[var(--text-primary)] mb-2">
                  Ready to submit?
                </div>
                <div className="text-[var(--text-secondary)] mb-4">
                  {answeredCount} / {session.worksheet.questions.length} questions answered
                  {unansweredCount > 0 && (
                    <span className="text-[var(--warning)]">
                      {" "}
                      • {unansweredCount} unanswered
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setShowSubmitConfirm(true)}
                  className="px-6 py-3 rounded-lg bg-[var(--gold-primary)] text-[var(--bg-primary)] font-medium hover:bg-[var(--gold-bright)] transition-colors"
                >
                  Submit Exam
                </button>
              </div>
            ) : (
              <div className="bg-[var(--bg-elevated)] border border-[var(--warning)]/30 rounded-lg p-6">
                <div className="text-lg font-medium text-[var(--text-primary)] mb-2">
                  Confirm submission
                </div>
                <div className="text-[var(--text-secondary)] mb-4">
                  {answeredCount} answered • {unansweredCount} unanswered
                  <br />
                  You cannot change answers after submitting.
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSubmitConfirm(false)}
                    className="px-6 py-3 rounded-lg border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitExam}
                    className="px-6 py-3 rounded-lg bg-[var(--gold-primary)] text-[var(--bg-primary)] font-medium hover:bg-[var(--gold-bright)] transition-colors"
                  >
                    Confirm Submit
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation sidebar - Desktop */}
          <div className="hidden lg:block w-48 shrink-0">
            <div className="sticky top-8">
              <div className="text-sm text-[var(--text-secondary)] mb-3">Questions</div>
              <div className="grid grid-cols-4 gap-2">
                {session.worksheet.questions.map((q, idx) => {
                  const isCurrent = idx === session.currentQuestionIndex;
                  const isAnswered = !!session.answers[q.id];

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleNavigate(idx)}
                      className={`
                        aspect-square rounded-lg border text-sm font-medium transition-colors
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
        <div className="lg:hidden mt-6">
          <div className="flex gap-1 justify-center mb-4">
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
      </div>
    </div>
  );
}
