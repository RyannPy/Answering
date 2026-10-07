// Answering Worksheet Format v1 Internal Types

export type Worksheet = {
  title: string;
  description?: string;
  questions: Question[];
};

export type Question = McQuestion | MultiQuestion | TfQuestion | ShortQuestion;

// Multiple Choice: exactly one correct option
export type McQuestion = {
  id: string;
  type: "mc";
  question: string;
  options: string[];
  answer: number; // 1-based index
  explanation?: string;
};

// Multiple Select: one or more correct options
export type MultiQuestion = {
  id: string;
  type: "multi";
  question: string;
  options: string[];
  answer: number[]; // 1-based indices
  explanation?: string;
};

// True/False: boolean answer
export type TfQuestion = {
  id: string;
  type: "tf";
  question: string;
  answer: boolean;
  explanation?: string;
};

// Short Answer: text answer(s)
export type ShortQuestion = {
  id: string;
  type: "short";
  question: string;
  answer: string[]; // accepted answers
  explanation?: string;
};
