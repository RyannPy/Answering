import { parseWorksheet } from "@/parser";
import { sampleWorksheetText } from "@/fixtures/sample-worksheet";
import { createSession, calculateResult, evaluateAnswer, evaluateAllAnswers } from "@/lib/session";

console.log("=== Phase 3 Integration Test ===\n");

// Parse sample worksheet
const parseResult = parseWorksheet(sampleWorksheetText);
if (!parseResult.ok) {
  console.log("✕ Failed to parse worksheet");
  process.exit(1);
}
const worksheet = parseResult.worksheet;

// Test 1: Quiz session initialization
console.log("Test 1: Quiz session initialization");
const quizSession = createSession("quiz", worksheet);
console.log(quizSession.mode === "quiz" ? "✓" : "✕", "Quiz mode set");
console.log(quizSession.currentQuestionIndex === 0 ? "✓" : "✕", "Starts at question 0");
console.log(Object.keys(quizSession.answers).length === 0 ? "✓" : "✕", "No answers initially");
console.log(!quizSession.completed ? "✓" : "✕", "Not completed initially");

// Test 2: Exam session initialization
console.log("\nTest 2: Exam session initialization");
const examSession = createSession("exam", worksheet);
console.log(examSession.mode === "exam" ? "✓" : "✕", "Exam mode set");
console.log(!examSession.examSubmitted ? "✓" : "✕", "Not submitted initially");

// Test 3: Answer evaluation (Quiz)
console.log("\nTest 3: Quiz answer evaluation");
const q1 = worksheet.questions[0]; // MC question
const quizWithAnswer = {
  ...quizSession,
  answers: {
    [q1.id]: { value: 2, submitted: true }, // correct answer
  },
};
const result1 = evaluateAnswer(quizWithAnswer, q1.id);
console.log(result1?.correct ? "✓" : "✕", "Correct MC answer evaluated correctly");
console.log(result1?.evaluated ? "✓" : "✕", "Result marked as evaluated");

// Test 4: Wrong answer evaluation
console.log("\nTest 4: Wrong answer evaluation");
const quizWrongAnswer = {
  ...quizSession,
  answers: {
    [q1.id]: { value: 1, submitted: true }, // wrong answer
  },
};
const result2 = evaluateAnswer(quizWrongAnswer, q1.id);
console.log(!result2?.correct ? "✓" : "✕", "Incorrect answer evaluated correctly");

// Test 5: Answer persistence in Exam mode
console.log("\nTest 5: Exam answer persistence");
const examWithAnswers = {
  ...examSession,
  answers: {
    [worksheet.questions[0].id]: { value: 2, submitted: true },
    [worksheet.questions[1].id]: { value: [1, 2, 3], submitted: true },
    [worksheet.questions[2].id]: { value: true, submitted: true },
  },
  currentQuestionIndex: 1,
};
console.log(
  Object.keys(examWithAnswers.answers).length === 3 ? "✓" : "✕",
  "Multiple answers stored"
);
console.log(
  examWithAnswers.currentQuestionIndex === 1 ? "✓" : "✕",
  "Navigation state preserved"
);

// Test 6: Evaluate all answers
console.log("\nTest 6: Evaluate all exam answers");
const evaluatedExam = evaluateAllAnswers(examWithAnswers);
console.log(evaluatedExam.examSubmitted ? "✓" : "✕", "Exam marked as submitted");
console.log(evaluatedExam.completed ? "✓" : "✕", "Session marked as completed");
console.log(
  Object.keys(evaluatedExam.results).length === 3 ? "✓" : "✕",
  "All answered questions evaluated"
);

// Test 7: Result calculation - all answered
console.log("\nTest 7: Result calculation (all answered)");
const fullSession = {
  ...quizSession,
  answers: {
    [worksheet.questions[0].id]: { value: 2, submitted: true }, // correct
    [worksheet.questions[1].id]: { value: [1, 2, 3], submitted: true }, // correct
    [worksheet.questions[2].id]: { value: true, submitted: true }, // correct
    [worksheet.questions[3].id]: { value: "injective", submitted: true }, // correct
    [worksheet.questions[4].id]: { value: 1, submitted: true }, // wrong
    [worksheet.questions[5].id]: { value: true, submitted: true }, // wrong
  },
  completed: true,
};
const evaluatedFull = evaluateAllAnswers(fullSession);
const result = calculateResult(evaluatedFull);

console.log(result.total === 6 ? "✓" : "✕", `Total questions: ${result.total}`);
console.log(result.answered === 6 ? "✓" : "✕", `Answered: ${result.answered}`);
console.log(result.correct === 4 ? "✓" : "✕", `Correct: ${result.correct}`);
console.log(result.incorrect === 2 ? "✓" : "✕", `Incorrect: ${result.incorrect}`);
console.log(result.unanswered === 0 ? "✓" : "✕", `Unanswered: ${result.unanswered}`);
console.log(result.percentage === 67 ? "✓" : "✕", `Percentage: ${result.percentage}%`);

// Test 8: Result calculation - with unanswered
console.log("\nTest 8: Result calculation (with unanswered)");
const partialSession = {
  ...quizSession,
  answers: {
    [worksheet.questions[0].id]: { value: 2, submitted: true }, // correct
    [worksheet.questions[1].id]: { value: [1, 2], submitted: true }, // wrong (incomplete)
    [worksheet.questions[2].id]: { value: true, submitted: true }, // correct
    // questions 3, 4, 5 unanswered
  },
  completed: true,
};
const evaluatedPartial = evaluateAllAnswers(partialSession);
const partialResult = calculateResult(evaluatedPartial);

console.log(partialResult.total === 6 ? "✓" : "✕", `Total: ${partialResult.total}`);
console.log(partialResult.answered === 3 ? "✓" : "✕", `Answered: ${partialResult.answered}`);
console.log(partialResult.correct === 2 ? "✓" : "✕", `Correct: ${partialResult.correct}`);
console.log(
  partialResult.incorrect === 1 ? "✓" : "✕",
  `Incorrect: ${partialResult.incorrect}`
);
console.log(
  partialResult.unanswered === 3 ? "✓" : "✕",
  `Unanswered: ${partialResult.unanswered}`
);
console.log(
  partialResult.percentage === 33 ? "✓" : "✕",
  `Percentage: ${partialResult.percentage}%`
);

// Test 9: State isolation between sessions
console.log("\nTest 9: State isolation");
const session1 = createSession("quiz", worksheet);
const session2 = createSession("exam", worksheet);
console.log(
  session1.mode !== session2.mode ? "✓" : "✕",
  "Different sessions have independent modes"
);
console.log(
  Object.keys(session1.answers).length === 0 && Object.keys(session2.answers).length === 0
    ? "✓"
    : "✕",
  "New sessions start fresh"
);

// Test 10: Multi-select order independence
console.log("\nTest 10: Multi-select order independence in session");
const multiQ = worksheet.questions[1]; // multi question
const sessionMulti1 = {
  ...quizSession,
  answers: {
    [multiQ.id]: { value: [1, 2, 3], submitted: true },
  },
};
const sessionMulti2 = {
  ...quizSession,
  answers: {
    [multiQ.id]: { value: [3, 1, 2], submitted: true },
  },
};
const resultMulti1 = evaluateAnswer(sessionMulti1, multiQ.id);
const resultMulti2 = evaluateAnswer(sessionMulti2, multiQ.id);
console.log(
  resultMulti1?.correct && resultMulti2?.correct ? "✓" : "✕",
  "Order-independent multi-select works in session"
);

console.log("\n=== Phase 3 Integration Test Complete ===");
