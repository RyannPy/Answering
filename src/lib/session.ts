import type { SessionState, SessionResult, QuestionResult } from "@/types/session";
import type { Worksheet } from "@/types/worksheet";
import { checkAnswer } from "@/checker";

export function createSession(
  mode: "quiz" | "exam",
  worksheet: Worksheet
): SessionState {
  return {
    mode,
    worksheet,
    currentQuestionIndex: 0,
    answers: {},
    results: {},
    examSubmitted: false,
    completed: false,
  };
}

export function calculateResult(session: SessionState): SessionResult {
  const total = session.worksheet.questions.length;
  const resultsList = Object.values(session.results);
  
  const answered = resultsList.length;
  const correct = resultsList.filter((r) => r.correct).length;
  const incorrect = resultsList.filter((r) => !r.correct).length;
  const unanswered = total - answered;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return {
    total,
    answered,
    unanswered,
    correct,
    incorrect,
    percentage,
  };
}

export function evaluateAnswer(
  session: SessionState,
  questionId: string
): QuestionResult | null {
  const question = session.worksheet.questions.find((q) => q.id === questionId);
  const answer = session.answers[questionId];

  if (!question || !answer) {
    return null;
  }

  const result = checkAnswer(question, answer.value);

  return {
    questionId,
    userAnswer: answer.value,
    correct: result.correct,
    evaluated: true,
  };
}

export function evaluateAllAnswers(session: SessionState): SessionState {
  const results: { [questionId: string]: QuestionResult } = {};

  session.worksheet.questions.forEach((question) => {
    const answer = session.answers[question.id];
    if (answer) {
      const result = evaluateAnswer(session, question.id);
      if (result) {
        results[question.id] = result;
      }
    }
  });

  return {
    ...session,
    results,
    examSubmitted: session.mode === "exam",
    completed: true,
  };
}
