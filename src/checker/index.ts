import type { Question } from "@/types/worksheet";

export type CheckResult = {
  correct: boolean;
  selectedAnswer: string | number | boolean | number[];
};

export function checkAnswer(
  question: Question,
  userAnswer: string | number | boolean | number[]
): CheckResult {
  switch (question.type) {
    case "mc":
      return checkMc(question, userAnswer);
    case "multi":
      return checkMulti(question, userAnswer);
    case "tf":
      return checkTf(question, userAnswer);
    case "short":
      return checkShort(question, userAnswer);
    default:
      const _exhaustive: never = question;
      return _exhaustive;
  }
}

function checkMc(
  question: Extract<Question, { type: "mc" }>,
  userAnswer: string | number | boolean | number[]
): CheckResult {
  const selected = typeof userAnswer === "string" ? parseInt(userAnswer, 10) : userAnswer;
  const correct = selected === question.answer;
  return { correct, selectedAnswer: selected };
}

function checkMulti(
  question: Extract<Question, { type: "multi" }>,
  userAnswer: string | number | boolean | number[]
): CheckResult {
  const selected = Array.isArray(userAnswer)
    ? userAnswer
    : typeof userAnswer === "string"
      ? userAnswer.split(",").map((s) => parseInt(s.trim(), 10))
      : [];

  const sortedSelected = [...selected].sort((a, b) => a - b);
  const sortedCorrect = [...question.answer].sort((a, b) => a - b);

  const correct =
    sortedSelected.length === sortedCorrect.length &&
    sortedSelected.every((val, idx) => val === sortedCorrect[idx]);

  return { correct, selectedAnswer: selected };
}

function checkTf(
  question: Extract<Question, { type: "tf" }>,
  userAnswer: string | number | boolean | number[]
): CheckResult {
  let selected: boolean;
  if (typeof userAnswer === "boolean") {
    selected = userAnswer;
  } else if (typeof userAnswer === "string") {
    selected = userAnswer === "true";
  } else {
    selected = false;
  }
  const correct = selected === question.answer;
  return { correct, selectedAnswer: selected };
}

function checkShort(
  question: Extract<Question, { type: "short" }>,
  userAnswer: string | number | boolean | number[]
): CheckResult {
  const selected = typeof userAnswer === "string" ? userAnswer : String(userAnswer);
  const normalizedInput = normalizeShortAnswer(selected);

  const correct = question.answer.some((accepted) => {
    const normalizedAccepted = normalizeShortAnswer(accepted);
    return normalizedInput === normalizedAccepted;
  });

  return { correct, selectedAnswer: selected };
}

function normalizeShortAnswer(answer: string): string {
  return answer
    .trim() // remove leading/trailing whitespace
    .toLowerCase(); // case-insensitive
}
