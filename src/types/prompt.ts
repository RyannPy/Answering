// Prompt Generator configuration types

export type QuestionType = "mc" | "multi" | "tf" | "short";

export type Difficulty = "Simple" | "Normal" | "HOTS" | "Mixed";

export type SourceType = "user-material" | "general-knowledge";

export type PromptConfig = {
  questionCount: number;
  difficulty: Difficulty;
  questionTypes: QuestionType[];
  source: SourceType;
  topic: string; // Topic for general knowledge, or material description for user-provided
};

export type PromptConfigErrors = {
  questionCount?: string;
  questionTypes?: string;
  topic?: string;
};
