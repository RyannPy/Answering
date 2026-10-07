// Session state for Quiz and Exam modes

import type { Worksheet } from "./worksheet";

export type SessionMode = "quiz" | "exam";

export type QuestionResult = {
  questionId: string;
  userAnswer: string | number | boolean | number[];
  correct: boolean;
  evaluated: boolean;
};

export type SessionState = {
  mode: SessionMode;
  worksheet: Worksheet;
  currentQuestionIndex: number;
  answers: {
    [questionId: string]: {
      value: string | number | boolean | number[];
      submitted: boolean; // For Quiz: submitted and checked. For Exam: just answered.
    };
  };
  results: {
    [questionId: string]: QuestionResult;
  };
  examSubmitted: boolean; // Only relevant for Exam mode
  completed: boolean; // Session finished (all quiz questions done OR exam submitted)
};

export type SessionResult = {
  total: number;
  answered: number;
  unanswered: number;
  correct: number;
  incorrect: number;
  percentage: number;
};
