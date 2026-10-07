import { parseWorksheet } from "@/parser";
import { checkAnswer } from "@/checker";
import { sampleWorksheetText } from "@/fixtures/sample-worksheet";

console.log("=== Phase 2 Integration Test ===\n");

// Test 1: Sample worksheet parses correctly
console.log("Test 1: Sample worksheet parsing");
const parseResult = parseWorksheet(sampleWorksheetText);
if (!parseResult.ok) {
  console.log("✕ Failed to parse sample worksheet");
  parseResult.errors.forEach((err) => console.log(`  ${err.message}`));
  process.exit(1);
}
console.log("✓ Sample worksheet parsed");
console.log(`  Title: ${parseResult.worksheet.title}`);
console.log(`  Questions: ${parseResult.worksheet.questions.length}`);

// Test 2: All question types present
console.log("\nTest 2: Question type coverage");
const worksheet = parseResult.worksheet;
const types = worksheet.questions.map((q) => q.type);
const hasAllTypes = ["mc", "multi", "tf", "short"].every((t) =>
  types.includes(t as any)
);
console.log(hasAllTypes ? "✓" : "✕", "All question types present");
console.log(`  Types: ${[...new Set(types)].join(", ")}`);

// Test 3: MC question interaction simulation
console.log("\nTest 3: MC question interaction");
const mcQ = worksheet.questions.find((q) => q.type === "mc");
if (mcQ && mcQ.type === "mc") {
  const correctAnswer = mcQ.answer;
  const wrongAnswer = correctAnswer === 1 ? 2 : 1;

  const correctResult = checkAnswer(mcQ, correctAnswer);
  const wrongResult = checkAnswer(mcQ, wrongAnswer);

  console.log(
    correctResult.correct ? "✓" : "✕",
    `Correct answer (${correctAnswer}) recognized`
  );
  console.log(
    !wrongResult.correct ? "✓" : "✕",
    `Wrong answer (${wrongAnswer}) rejected`
  );
}

// Test 4: Multi question interaction simulation
console.log("\nTest 4: Multi Select interaction");
const multiQ = worksheet.questions.find((q) => q.type === "multi");
if (multiQ && multiQ.type === "multi") {
  const correctAnswer = multiQ.answer;
  const reversedAnswer = [...correctAnswer].reverse();
  const partialAnswer = [correctAnswer[0]];

  const correctResult = checkAnswer(multiQ, correctAnswer);
  const reversedResult = checkAnswer(multiQ, reversedAnswer);
  const partialResult = checkAnswer(multiQ, partialAnswer);

  console.log(
    correctResult.correct ? "✓" : "✕",
    `Correct answer ${JSON.stringify(correctAnswer)} recognized`
  );
  console.log(
    reversedResult.correct ? "✓" : "✕",
    `Order-independent: ${JSON.stringify(reversedAnswer)} also correct`
  );
  console.log(
    !partialResult.correct ? "✓" : "✕",
    `Partial answer ${JSON.stringify(partialAnswer)} rejected`
  );
}

// Test 5: TF question interaction simulation
console.log("\nTest 5: True/False interaction");
const tfQ = worksheet.questions.find((q) => q.type === "tf");
if (tfQ && tfQ.type === "tf") {
  const correctAnswer = tfQ.answer;
  const wrongAnswer = !correctAnswer;

  const correctResult = checkAnswer(tfQ, correctAnswer);
  const wrongResult = checkAnswer(tfQ, wrongAnswer);

  console.log(
    correctResult.correct ? "✓" : "✕",
    `Correct answer (${correctAnswer}) recognized`
  );
  console.log(
    !wrongResult.correct ? "✓" : "✕",
    `Wrong answer (${wrongAnswer}) rejected`
  );
}

// Test 6: Short answer interaction simulation
console.log("\nTest 6: Short Answer interaction");
const shortQ = worksheet.questions.find((q) => q.type === "short");
if (shortQ && shortQ.type === "short") {
  const acceptedAnswers = shortQ.answer;
  const firstAnswer = acceptedAnswers[0];
  const uppercaseAnswer = firstAnswer.toUpperCase();
  const paddedAnswer = `  ${firstAnswer}  `;
  const wrongAnswer = "definitely-not-correct-xyz";

  const exactResult = checkAnswer(shortQ, firstAnswer);
  const caseResult = checkAnswer(shortQ, uppercaseAnswer);
  const paddedResult = checkAnswer(shortQ, paddedAnswer);
  const wrongResult = checkAnswer(shortQ, wrongAnswer);

  console.log(
    exactResult.correct ? "✓" : "✕",
    `Exact match "${firstAnswer}" recognized`
  );
  console.log(
    caseResult.correct ? "✓" : "✕",
    `Case-insensitive "${uppercaseAnswer}" recognized`
  );
  console.log(
    paddedResult.correct ? "✓" : "✕",
    `Whitespace normalized "${paddedAnswer}" recognized`
  );
  console.log(
    !wrongResult.correct ? "✓" : "✕",
    `Wrong answer "${wrongAnswer}" rejected`
  );
}

// Test 7: State isolation simulation
console.log("\nTest 7: Answer state isolation");
const answerState: Record<string, any> = {};
worksheet.questions.forEach((q, idx) => {
  answerState[q.id] = { questionId: q.id, value: idx, submitted: false };
});
const allUnique = Object.keys(answerState).length === worksheet.questions.length;
console.log(
  allUnique ? "✓" : "✕",
  `Each question has independent state (${Object.keys(answerState).length} entries)`
);

console.log("\n=== Phase 2 Integration Test Complete ===");
