"use client";

import { useState } from "react";
import type { Worksheet } from "@/types/worksheet";
import type { SessionState } from "@/types/session";
import { createSession, calculateResult, evaluateAllAnswers } from "@/lib/session";
import { ModeSelection } from "./ModeSelection";
import { QuizMode } from "./QuizMode";
import { ExamMode } from "./ExamMode";
import { ResultScreen } from "./ResultScreen";
import { ReviewMode } from "./ReviewMode";

type SessionOrchestratorProps = {
  worksheet: Worksheet;
};

type AppState =
  | { stage: "mode-selection" }
  | { stage: "quiz"; session: SessionState }
  | { stage: "exam"; session: SessionState }
  | { stage: "result"; session: SessionState }
  | { stage: "review"; session: SessionState };

export function SessionOrchestrator({ worksheet }: SessionOrchestratorProps) {
  const [appState, setAppState] = useState<AppState>({
    stage: "mode-selection",
  });

  const handleSelectMode = (mode: "quiz" | "exam") => {
    const session = createSession(mode, worksheet);
    if (mode === "quiz") {
      setAppState({ stage: "quiz", session });
    } else {
      setAppState({ stage: "exam", session });
    }
  };

  const handleQuizComplete = (session: SessionState) => {
    setAppState({ stage: "result", session });
  };

  const handleExamSubmit = (session: SessionState) => {
    const evaluatedSession = evaluateAllAnswers(session);
    setAppState({ stage: "result", session: evaluatedSession });
  };

  const handleReview = () => {
    if (appState.stage === "result") {
      setAppState({ stage: "review", session: appState.session });
    }
  };

  const handleExitReview = () => {
    if (appState.stage === "review") {
      setAppState({ stage: "result", session: appState.session });
    }
  };

  const handleRestart = () => {
    setAppState({ stage: "mode-selection" });
  };

  switch (appState.stage) {
    case "mode-selection":
      return <ModeSelection worksheet={worksheet} onSelectMode={handleSelectMode} />;

    case "quiz":
      return <QuizMode session={appState.session} onComplete={handleQuizComplete} />;

    case "exam":
      return <ExamMode session={appState.session} onSubmit={handleExamSubmit} />;

    case "result":
      const result = calculateResult(appState.session);
      return (
        <ResultScreen
          session={appState.session}
          result={result}
          onReview={handleReview}
          onRestart={handleRestart}
        />
      );

    case "review":
      return <ReviewMode session={appState.session} onExit={handleExitReview} />;

    default:
      const _exhaustive: never = appState;
      return _exhaustive;
  }
}
