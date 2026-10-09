import { parseWorksheet } from "@/parser";

console.log("=== Math Rendering Integration Test ===\n");

// Test 1: Basic inline math parsing
console.log("Test 1: Worksheet with inline LaTeX");
const inlineMathWorksheet = `@worksheet
 title: Calculus Basics
 description: Functions with mathematical notation

@question
 type: mc
 question: What is \\(f(x)\\) when \\(f(x) = \\sqrt{x^2 + 4}\\) and \\(x = 3\\)?
 options:
  - \\(\\sqrt{13}\\)
  - \\(\\sqrt{10}\\)
  - 5
  - 7
 answer: 1
 explanation: Substitute \\(x = 3\\) into \\(f(x) = \\sqrt{x^2 + 4}\\) to get \\(f(3) = \\sqrt{9 + 4} = \\sqrt{13}\\).
@end
`;

const result1 = parseWorksheet(inlineMathWorksheet);
console.log(result1.ok ? "✓" : "✕", "Worksheet with inline math parses correctly");
if (result1.ok) {
  const question = result1.worksheet.questions[0];
  console.log(question.question.includes("\\(") ? "✓" : "✕", "Question contains LaTeX delimiters");
  if (question.type === "mc") {
    console.log(question.options[0].includes("\\(") ? "✓" : "✕", "Options contain LaTeX delimiters");
  }
  console.log(question.explanation?.includes("\\(") ? "✓" : "✕", "Explanation contains LaTeX delimiters");
}

// Test 2: Display math
console.log("\nTest 2: Display math equations");
const displayMathWorksheet = `@worksheet
 title: Algebra
 description: Quadratic formula

@question
 type: short
 question: What is the quadratic formula? \\[x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\]
 answer:
  - quadratic formula
  - \\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\)
@end
`;

const result2 = parseWorksheet(displayMathWorksheet);
console.log(result2.ok ? "✓" : "✕", "Worksheet with display math parses correctly");
if (result2.ok) {
  const question = result2.worksheet.questions[0];
  console.log(question.question.includes("\\[") ? "✓" : "✕", "Display math delimiters present");
}

// Test 3: Mixed plain text and math
console.log("\nTest 3: Mixed content");
const mixedWorksheet = `@worksheet
 title: Mixed Content
 description: Plain text and math together

@question
 type: tf
 question: The function \\(f(x) = x^2\\) is increasing on the interval \\((0, \\infty)\\).
 answer: true
 explanation: The derivative \\(f'(x) = 2x\\) is positive for all \\(x > 0\\), so the function is increasing on \\((0, \\infty)\\).
@end
`;

const result3 = parseWorksheet(mixedWorksheet);
console.log(result3.ok ? "✓" : "✕", "Mixed content worksheet parses correctly");

// Test 4: Multiple math expressions in one question
console.log("\nTest 4: Multiple math expressions");
const multiMathWorksheet = `@worksheet
 title: Inequalities
 description: Solving inequalities

@question
 type: mc
 question: Solve \\((x^2+1)^2-7(x^2+1)+10<0\\). Let \\(u = x^2 + 1\\).
 options:
  - \\(x \\in (-2, -1) \\cup (1, 2)\\)
  - \\(x \\in [-2, 2]\\)
  - \\(x \\in (-\\infty, -2) \\cup (2, \\infty)\\)
  - No solution
 answer: 1
 explanation: Substitute \\(u = x^2 + 1\\), solve \\(u^2 - 7u + 10 < 0\\), then back-substitute.
@end
`;

const result4 = parseWorksheet(multiMathWorksheet);
console.log(result4.ok ? "✓" : "✕", "Multiple math expressions parse correctly");

// Test 5: Backward compatibility - plain text without LaTeX
console.log("\nTest 5: Backward compatibility");
const plainWorksheet = `@worksheet
 title: Basic Arithmetic
 description: No LaTeX notation

@question
 type: mc
 question: What is 2 + 2?
 options:
  - 3
  - 4
  - 5
 answer: 2
@end

@question
 type: short
 question: What is the square root of 16?
 answer:
  - 4
  - four
@end
`;

const result5 = parseWorksheet(plainWorksheet);
console.log(result5.ok ? "✓" : "✕", "Plain text worksheet still parses correctly");
if (result5.ok) {
  console.log(result5.worksheet.questions.length === 2 ? "✓" : "✕", "Both questions parsed");
}

// Test 6: Complex LaTeX expressions
console.log("\nTest 6: Complex LaTeX expressions");
const complexMathWorksheet = `@worksheet
 title: Advanced Mathematics
 description: Complex notation

@question
 type: multi
 question: Which of the following are correct properties of summations?
 options:
  - \\(\\sum_{i=1}^{n} c = cn\\) for constant \\(c\\)
  - \\(\\sum_{i=1}^{n} (a_i + b_i) = \\sum_{i=1}^{n} a_i + \\sum_{i=1}^{n} b_i\\)
  - \\(\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}\\)
  - \\(\\sum_{i=1}^{n} i^2 = n^3\\)
 answer: 1,2,3
 explanation: The first three are standard summation properties. The fourth is incorrect; \\(\\sum_{i=1}^{n} i^2 = \\frac{n(n+1)(2n+1)}{6}\\).
@end
`;

const result6 = parseWorksheet(complexMathWorksheet);
console.log(result6.ok ? "✓" : "✕", "Complex LaTeX expressions parse correctly");
if (result6.ok && result6.worksheet.questions[0].type === "multi") {
  const q = result6.worksheet.questions[0];
  console.log(q.options.length === 4 ? "✓" : "✕", "All options with LaTeX preserved");
  console.log(q.answer.length === 3 ? "✓" : "✕", "Multiple correct answers preserved");
}

// Test 7: Greek letters and logical operators
console.log("\nTest 7: Greek letters and logic symbols");
const symbolWorksheet = `@worksheet
 title: Logic and Greek Letters
 description: Mathematical symbols

@question
 type: tf
 question: In propositional logic, \\(\\alpha \\land \\beta \\implies \\alpha\\) is a tautology.
 answer: true
 explanation: If both \\(\\alpha\\) and \\(\\beta\\) are true, then \\(\\alpha\\) must be true.
@end
`;

const result7 = parseWorksheet(symbolWorksheet);
console.log(result7.ok ? "✓" : "✕", "Greek letters and logic symbols parse correctly");

// Test 8: Piecewise functions
console.log("\nTest 8: Piecewise functions");
const piecewiseWorksheet = `@worksheet
 title: Piecewise Functions
 description: Functions defined in pieces

@question
 type: mc
 question: What is the value of \\(f(2)\\) for \\[f(x) = \\begin{cases} x^2 & \\text{if } x < 2 \\\\ 2x & \\text{if } x \\geq 2 \\end{cases}\\]
 options:
  - 2
  - 4
  - 8
  - undefined
 answer: 2
 explanation: Since \\(2 \\geq 2\\), we use the second case: \\(f(2) = 2(2) = 4\\).
@end
`;

const result8 = parseWorksheet(piecewiseWorksheet);
console.log(result8.ok ? "✓" : "✕", "Piecewise function notation parses correctly");

// Test 9: Answer checking remains unchanged
console.log("\nTest 9: Answer checking semantic preservation");
const answerCheckWorksheet = `@worksheet
 title: Answer Check Test

@question
 type: short
 question: What is \\(\\sqrt{4}\\)?
 answer:
  - 2
  - two
@end
`;

const result9 = parseWorksheet(answerCheckWorksheet);
console.log(result9.ok ? "✓" : "✕", "Worksheet parses");
if (result9.ok && result9.worksheet.questions[0].type === "short") {
  const answers = result9.worksheet.questions[0].answer;
  console.log(answers.includes("2") && answers.includes("two") ? "✓" : "✕", 
    "Multiple accepted answers preserved for checking");
}

// Test 10: Malformed LaTeX handling
console.log("\nTest 10: Malformed LaTeX doesn't break parsing");
const malformedWorksheet = `@worksheet
 title: Malformed LaTeX Test

@question
 type: mc
 question: This has incomplete LaTeX: \\(x^2 + unclosed
 options:
  - Option 1
  - Option 2
 answer: 1
@end
`;

const result10 = parseWorksheet(malformedWorksheet);
console.log(result10.ok ? "✓" : "✕", "Malformed LaTeX doesn't prevent parsing");
console.log("Note: Malformed LaTeX will fall back to raw text display in the renderer");

console.log("\n=== Math Rendering Integration Test Complete ===");
