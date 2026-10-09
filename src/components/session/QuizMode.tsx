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
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      {/* Header */}
      <header className="border-b border-[var(--border-subtle)] glass-strong backdrop-blur-xl sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="text-xl font-semibold text-gradient-gold">
            Answering
          </div>
          <div className="text-supporting flex items-center gap-2">
            <span className="hidden sm:inline">Question</span>
            <span className="font-semibold text-[var(--text-primary)]">{session.currentQuestionIndex + 1}</span>
            <span className="text-[var(--text-tertiary)]">/</span>
            <span>{session.worksheet.questions.length}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-12">
        {/* Worksheet title */}
        <div className="mb-10 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block w-2 h-2 bg-[var(--gold-500)] rounded-full animate-pulse"></span>
            <div className="text-metadata">Quiz Mode</div>
          </div>
          <h1 className="heading-section">
            {session.worksheet.title}
          </h1>
        </div>

        {/* Question card */}
        <div className="max-w-3xl mb-8 animate-slide-up">
          <div className="card p-8">
            <div className="text-question-number mb-4">
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
        </div>

        {/* Feedback */}
        {showFeedback && currentResult && (
          <div className="max-w-3xl mb-8">
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
          <div className="max-w-3xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <button
              onClick={handlePrevious}
              disabled={session.currentQuestionIndex === 0}
              className="btn btn-secondary"
            >
              ← Previous
            </button>

            <button
              onClick={handleSubmit}
              disabled={!hasAnswer || isSubmitted}
              className="btn btn-primary btn-lg"
            >
              Submit Answer
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
