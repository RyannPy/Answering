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
          submitted: true,
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
      <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-deep)]">
        <div className="container py-4 flex items-center justify-between">
          <div className="text-xl font-semibold text-[var(--text-primary)]">
            Answering
          </div>
          <div className="text-supporting">
            Question {session.currentQuestionIndex + 1} / {session.worksheet.questions.length}
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 container py-12 overflow-y-auto">
          {/* Worksheet title */}
          <div className="mb-10">
            <div className="text-metadata mb-2">Exam Mode</div>
            <h1 className="heading-section">
              {session.worksheet.title}
            </h1>
          </div>

          {/* Question card */}
          <div className="max-w-3xl mb-8">
            <div className="card p-8">
              <div className="text-question-number mb-4">
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
          </div>

          {/* Navigation */}
          <div className="max-w-3xl flex items-center justify-between mb-8">
            <button
              onClick={handlePrevious}
              disabled={session.currentQuestionIndex === 0}
              className="btn btn-secondary"
            >
              ← Previous
            </button>

            <button
              onClick={handleNext}
              disabled={session.currentQuestionIndex === session.worksheet.questions.length - 1}
              className="btn btn-secondary"
            >
              Next →
            </button>
          </div>

          {/* Submit exam section */}
          {!showSubmitConfirm ? (
            <div className="max-w-3xl card p-6">
              <div className="heading-subsection mb-3">
                Ready to submit?
              </div>
              <div className="text-supporting mb-6">
                {answeredCount} / {session.worksheet.questions.length} questions answered
                {unansweredCount > 0 && (
                  <span className="text-[var(--warning-500)] ml-2">
                    • {unansweredCount} unanswered
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowSubmitConfirm(true)}
                className="btn btn-primary btn-lg w-full"
              >
                Submit Exam
              </button>
            </div>
          ) : (
            <div className="max-w-3xl bg-[var(--warning-900)] border border-[var(--warning-500)] rounded-lg p-6 animate-fade-in">
              <div className="heading-subsection mb-3">
                Confirm submission
              </div>
              <div className="text-supporting mb-6">
                {answeredCount} answered • {unansweredCount} unanswered
                <br />
                You cannot change answers after submitting.
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitExam}
                  className="btn btn-primary flex-1"
                >
                  Confirm Submit
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 border-l border-[var(--border-subtle)] bg-[var(--bg-deep)] overflow-y-auto">
          <div className="p-6 sticky top-0">
            <div className="text-metadata mb-4">Questions</div>
            <div className="grid grid-cols-4 gap-2">
              {session.worksheet.questions.map((q, idx) => {
                const isCurrent = idx === session.currentQuestionIndex;
                const isAnswered = !!session.answers[q.id];

                return (
                  <button
                    key={q.id}
                    onClick={() => handleNavigate(idx)}
                    className={`
                      aspect-square rounded-md border text-sm font-medium transition-all duration-[var(--duration-fast)]
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
      </main>

      {/* Mobile navigation dots */}
      <div className="lg:hidden border-t border-[var(--border-subtle)] bg-[var(--bg-deep)] py-4">
        <div className="flex gap-1.5 justify-center px-4 overflow-x-auto">
          {session.worksheet.questions.map((q, idx) => {
            const isCurrent = idx === session.currentQuestionIndex;
            const isAnswered = !!session.answers[q.id];
            return (
              <div
                key={q.id}
                className={`
                  w-2 h-2 rounded-full shrink-0
                  ${
                    isCurrent
                      ? "bg-[var(--gold-500)] scale-125"
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
  );
}
