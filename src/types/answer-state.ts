// Answer state for user interactions
// Keeps user responses separate from question definitions

export type UserAnswer = {
  questionId: string;
  value: string | number | boolean | number[];
  submitted: boolean;
};

export type AnswerState = {
  [questionId: string]: UserAnswer;
};

export type FeedbackState = {
  questionId: string;
  correct: boolean;
  showFeedback: boolean;
};
