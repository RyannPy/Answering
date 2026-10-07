import { parseWorksheet } from "@/parser";
import { checkAnswer } from "@/checker";

// Test valid worksheet with all question types
const validWorksheet = `@worksheet
 title: Discrete Structures Practice
 description: Practice questions about logic and counting

@question
 type: mc
 question: What is the negation of p → q?
 options:
  - ¬p ∧ q
  - p ∧ ¬q
  - p ∨ ¬q
  - ¬p ∨ q
 answer: 2
 explanation: The implication is false only when p is true and q is false.
@end

@question
 type: multi
 question: Which statements are true?
 options:
  - Statement A
  - Statement B
  - Statement C
  - Statement D
 answer: 1,3
@end

@question
 type: tf
 question: A bijective function is both injective and surjective.
 answer: true
@end

@question
 type: short
 question: What is another term for a one-to-one function?
 answer:
  - injective
  - injeksi
  - fungsi injektif
@end
`;

console.log("=== Test 1: Valid worksheet with all types ===");
const result1 = parseWorksheet(validWorksheet);
console.log("Parse result:", result1);
if (result1.ok) {
  console.log("✓ Parsed successfully");
  console.log(`  Title: ${result1.worksheet.title}`);
  console.log(`  Questions: ${result1.worksheet.questions.length}`);
  result1.worksheet.questions.forEach((q, idx) => {
    console.log(`  Q${idx + 1}: ${q.type} - ${q.question.substring(0, 40)}...`);
  });
}

// Test MC checking
console.log("\n=== Test 2: MC Answer Checking ===");
if (result1.ok) {
  const mcQ = result1.worksheet.questions[0];
  const correctCheck = checkAnswer(mcQ, 2);
  const incorrectCheck = checkAnswer(mcQ, 1);
  console.log(`Correct answer (2): ${correctCheck.correct ? "✓" : "✕"}`);
  console.log(`Wrong answer (1): ${!incorrectCheck.correct ? "✓" : "✕"}`);
}

// Test Multi checking with different ordering
console.log("\n=== Test 3: Multi-Select with different ordering ===");
if (result1.ok) {
  const multiQ = result1.worksheet.questions[1];
  const correctOrder = checkAnswer(multiQ, [1, 3]);
  const differentOrder = checkAnswer(multiQ, [3, 1]);
  const incomplete = checkAnswer(multiQ, [1]);
  console.log(`Correct [1, 3]: ${correctOrder.correct ? "✓" : "✕"}`);
  console.log(`Different order [3, 1]: ${differentOrder.correct ? "✓" : "✕"}`);
  console.log(`Incomplete [1]: ${!incomplete.correct ? "✓" : "✕"}`);
}

// Test TF checking
console.log("\n=== Test 4: True/False Checking ===");
if (result1.ok) {
  const tfQ = result1.worksheet.questions[2];
  const trueCheck = checkAnswer(tfQ, true);
  const falseCheck = checkAnswer(tfQ, false);
  console.log(`True (correct): ${trueCheck.correct ? "✓" : "✕"}`);
  console.log(`False (incorrect): ${!falseCheck.correct ? "✓" : "✕"}`);
}

// Test Short Answer with normalization
console.log("\n=== Test 5: Short Answer with normalization ===");
if (result1.ok) {
  const shortQ = result1.worksheet.questions[3];
  const exactMatch = checkAnswer(shortQ, "injective");
  const caseVariation = checkAnswer(shortQ, "INJECTIVE");
  const whitespace = checkAnswer(shortQ, "  injective  ");
  const alternate = checkAnswer(shortQ, "injeksi");
  const wrong = checkAnswer(shortQ, "surjective");
  console.log(`Exact match "injective": ${exactMatch.correct ? "✓" : "✕"}`);
  console.log(`Case variation "INJECTIVE": ${caseVariation.correct ? "✓" : "✕"}`);
  console.log(`Whitespace "  injective  ": ${whitespace.correct ? "✓" : "✕"}`);
  console.log(`Alternate "injeksi": ${alternate.correct ? "✓" : "✕"}`);
  console.log(`Wrong "surjective": ${!wrong.correct ? "✓" : "✕"}`);
}

// Test invalid worksheets
console.log("\n=== Test 6: Invalid worksheet - missing title ===");
const noTitle = `@worksheet
@question
 type: mc
 question: What?
 options:
  - A
  - B
 answer: 1
@end
`;
const result2 = parseWorksheet(noTitle);
console.log(`Should fail: ${!result2.ok ? "✓" : "✕"}`);
if (!result2.ok) {
  console.log(`  Error: ${result2.errors[0].message}`);
}

console.log("\n=== Test 7: Invalid MC - answer ref doesn't exist ===");
const badMcAnswer = `@worksheet
 title: Test
@question
 type: mc
 question: What?
 options:
  - A
  - B
 answer: 7
@end
`;
const result3 = parseWorksheet(badMcAnswer);
console.log(`Should fail: ${!result3.ok ? "✓" : "✕"}`);
if (!result3.ok) {
  console.log(`  Error: ${result3.errors[0].message}`);
}

console.log("\n=== Test 8: Invalid TF - bad value ===");
const badTf = `@worksheet
 title: Test
@question
 type: tf
 question: Is this true?
 answer: maybe
@end
`;
const result4 = parseWorksheet(badTf);
console.log(`Should fail: ${!result4.ok ? "✓" : "✕"}`);
if (!result4.ok) {
  console.log(`  Error: ${result4.errors[0].message}`);
}

console.log("\n=== Test 9: Invalid short answer - no answers ===");
const badShort = `@worksheet
 title: Test
@question
 type: short
 question: What?
@end
`;
const result5 = parseWorksheet(badShort);
console.log(`Should fail: ${!result5.ok ? "✓" : "✕"}`);
if (!result5.ok) {
  console.log(`  Error: ${result5.errors[0].message}`);
}

console.log("\n=== All tests complete ===");
