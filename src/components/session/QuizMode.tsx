"use client";

import { useState } from "react";
import type { SessionState } from "@/types/session";
import { QuestionRenderer } from "@/components/questions/QuestionRenderer";
import { Feedback } from "@/components/feedback/Feedback";
import { evaluateAnswer } from "@/lib/session";

type QuizModeProps = {
  session: SessionState;
  onComplete: (session: SessionState) => void;
};

export function QuizMode({ session: initialSession, onComplete }: QuizModeProps) {
  const [session, setSession] = useState(initialSession);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = session.worksheet.questions[session.currentQuestionIndex];
  const currentAnswer = session.answers[currentQuestion.id];
  const currentResult = session.results[currentQuestion.id];

  const handleAnswerChange = (value: string | number | boolean | number[]) => {
    setSession({
      ...session,
      answers: {
        ...session.answers,
        [currentQuestion.id]: {
          value,
          submitted: false,
        },
      },
    });
    setShowFeedback(false);
  };

  const handleSubmit = () => {
    if (!currentAnswer?.value && currentAnswer?.value !== false) {
      return;
    }

    const result = evaluateAnswer(session, currentQuestion.id);
    if (!result) return;

    const newSession = {
      ...session,
      answers: {
        ...session.answers,
        [currentQuestion.id]: {
          ...currentAnswer,
          submitted: true,
        },
      },
      results: {
        ...session.results,
        [currentQuestion.id]: result,
      },
    };

    setSession(newSession);
    setShowFeedback(true);
  };

  const handleTryAgain = () => {
    setShowFeedback(false);
    setSession({
      ...session,
      answers: {
        ...session.answers,
        [currentQuestion.id]: {
          ...currentAnswer,
          submitted: false,
        },
      },
    });
  };

  const handleNext = () => {
    const nextIndex = session.currentQuestionIndex + 1;
    
    if (nextIndex >= session.worksheet.questions.length) {
      // Quiz complete
      onComplete({
        ...session,
        completed: true,
      });
    } else {
      setSession({
        ...session,
        currentQuestionIndex: nextIndex,
      });
      setShowFeedback(false);
    }
  };

  const handlePrevious = () => {
    if (session.currentQuestionIndex > 0) {
      setSession({
        ...session,
        currentQuestionIndex: session.currentQuestionIndex - 1,
      });
      setShowFeedback(false);
    }
  };

  const isSubmitted = currentAnswer?.submitted || false;
  const hasAnswer =
    currentAnswer?.value !== undefined &&
    currentAnswer?.value !== "" &&
    (Array.isArray(currentAnswer?.value) ? currentAnswer.value.length > 0 : true);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-deep)]">
        <div className="container mx-auto py-4 flex items-center justify-between">
          <div className="text-xl font-semibold text-[var(--text-primary)]">
            Answering
          </div>
          <div className="text-[var(--text-secondary)]">
            Question {session.currentQuestionIndex + 1} / {session.worksheet.questions.length}
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8">
        {/* Worksheet title */}
        <div className="mb-6">
          <div className="text-sm text-[var(--text-muted)] mb-1">Quiz Mode</div>
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
            disabled={isSubmitted}
            showAnswer={showFeedback && !currentResult?.correct}
          />
        </div>

        {/* Feedback */}
        {showFeedback && currentResult && (
          <div className="mb-6">
            <Feedback
              correct={currentResult.correct}
              question={currentQuestion}
              onTryAgain={!currentResult.correct ? handleTryAgain : undefined}
              onContinue={handleNext}
            />
          </div>
        )}

        {/* Actions */}
        {!showFeedback && (
          <div className="flex items-center justify-between">
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
              onClick={handleSubmit}
              disabled={!hasAnswer || isSubmitted}
              className={`
                px-8 py-3 rounded-lg font-medium transition-colors
                ${
                  hasAnswer && !isSubmitted
                    ? "bg-[var(--gold-primary)] text-[var(--bg-primary)] hover:bg-[var(--gold-bright)]"
                    : "bg-[var(--bg-secondary)] text-[var(--text-muted)] cursor-not-allowed"
                }
              `}
            >
              Submit Answer
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
