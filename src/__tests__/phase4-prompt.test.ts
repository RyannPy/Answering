import { generatePrompt, validatePromptConfig, isValidPromptConfig } from "@/lib/prompt-builder";
import type { PromptConfig } from "@/types/prompt";

console.log("=== Phase 4 Prompt Builder Test ===\n");

// Test 1: Valid configuration
console.log("Test 1: Valid configuration");
const validConfig: PromptConfig = {
  questionCount: 10,
  difficulty: "Normal",
  questionTypes: ["mc", "tf"],
  source: "general-knowledge",
  topic: "Discrete Mathematics",
};
console.log(isValidPromptConfig(validConfig) ? "✓" : "✕", "Valid config accepted");

// Test 2: Invalid question count
console.log("\nTest 2: Invalid question count");
const invalidCount: PromptConfig = {
  ...validConfig,
  questionCount: 0,
};
const errors1 = validatePromptConfig(invalidCount);
console.log(errors1.questionCount ? "✓" : "✕", "Zero count rejected");

const tooMany: PromptConfig = {
  ...validConfig,
  questionCount: 101,
};
const errors2 = validatePromptConfig(tooMany);
console.log(errors2.questionCount ? "✓" : "✕", "Count > 100 rejected");

// Test 3: Empty question types
console.log("\nTest 3: Empty question types");
const noTypes: PromptConfig = {
  ...validConfig,
  questionTypes: [],
};
const errors3 = validatePromptConfig(noTypes);
console.log(errors3.questionTypes ? "✓" : "✕", "Empty question types rejected");

// Test 4: Missing topic
console.log("\nTest 4: Missing topic");
const noTopic: PromptConfig = {
  ...validConfig,
  topic: "",
};
const errors4 = validatePromptConfig(noTopic);
console.log(errors4.topic ? "✓" : "✕", "Empty topic rejected");

// Test 5: User material requires topic
console.log("\nTest 5: User material topic requirement");
const userMaterial: PromptConfig = {
  ...validConfig,
  source: "user-material",
  topic: "",
};
const errors5 = validatePromptConfig(userMaterial);
console.log(errors5.topic ? "✓" : "✕", "User material requires topic");

// Test 6: Generate prompt with MC only
console.log("\nTest 6: Generate prompt (MC only, Simple)");
const mcConfig: PromptConfig = {
  questionCount: 5,
  difficulty: "Simple",
  questionTypes: ["mc"],
  source: "general-knowledge",
  topic: "Basic arithmetic",
};
const prompt1 = generatePrompt(mcConfig);
console.log(prompt1.includes("5 questions") ? "✓" : "✕", "Question count in prompt");
console.log(prompt1.includes("Simple") ? "✓" : "✕", "Difficulty in prompt");
console.log(prompt1.includes("Multiple Choice") ? "✓" : "✕", "Question type in prompt");
console.log(prompt1.includes("Basic arithmetic") ? "✓" : "✕", "Topic in prompt");
console.log(
  prompt1.includes("Answering Worksheet Format v1") ? "✓" : "✕",
  "Format instruction in prompt"
);

// Test 7: Generate prompt with all types, HOTS
console.log("\nTest 7: Generate prompt (all types, HOTS)");
const hotsConfig: PromptConfig = {
  questionCount: 20,
  difficulty: "HOTS",
  questionTypes: ["mc", "multi", "tf", "short"],
  source: "general-knowledge",
  topic: "Advanced calculus concepts",
};
const prompt2 = generatePrompt(hotsConfig);
console.log(prompt2.includes("20 questions") ? "✓" : "✕", "Question count correct");
console.log(prompt2.includes("HOTS") ? "✓" : "✕", "HOTS difficulty");
console.log(prompt2.includes("Multiple Choice") ? "✓" : "✕", "MC type");
console.log(prompt2.includes("Multiple Select") ? "✓" : "✕", "Multi type");
console.log(prompt2.includes("True / False") ? "✓" : "✕", "TF type");
console.log(prompt2.includes("Short Answer") ? "✓" : "✕", "Short type");

// Test 8: User-provided material source
console.log("\nTest 8: User-provided material source");
const materialConfig: PromptConfig = {
  questionCount: 10,
  difficulty: "Normal",
  questionTypes: ["mc", "short"],
  source: "user-material",
  topic: "Chapter 3: Pigeonhole Principle from textbook",
};
const prompt3 = generatePrompt(materialConfig);
console.log(
  prompt3.includes("provided material") ? "✓" : "✕",
  "User material instruction"
);
console.log(
  prompt3.includes("Pigeonhole Principle") ? "✓" : "✕",
  "Material topic in prompt"
);

// Test 9: General knowledge source
console.log("\nTest 9: General knowledge source");
const generalConfig: PromptConfig = {
  questionCount: 15,
  difficulty: "Mixed",
  questionTypes: ["mc", "multi"],
  source: "general-knowledge",
  topic: "World History: Renaissance period",
};
const prompt4 = generatePrompt(generalConfig);
console.log(
  prompt4.includes("generally available knowledge") ? "✓" : "✕",
  "General knowledge instruction"
);
console.log(prompt4.includes("Mixed") ? "✓" : "✕", "Mixed difficulty");

// Test 10: Determinism
console.log("\nTest 10: Deterministic generation");
const prompt1a = generatePrompt(validConfig);
const prompt1b = generatePrompt(validConfig);
console.log(prompt1a === prompt1b ? "✓" : "✕", "Same config produces same prompt");

// Test 11: Prompt requirements
console.log("\nTest 11: Prompt requirements present");
const testPrompt = generatePrompt(validConfig);
const requirements = [
  "Include the correct answer",
  "multiple choice, provide exactly one correct option",
  "multiple select, provide all correct option numbers",
  "true/false, provide true or false",
  "short answer, provide one or more accepted answers",
  "Do not create unsupported question types",
  "Do not omit answers",
  "Answering Worksheet Format v1",
  "Do not wrap the worksheet in Markdown code fences",
];
requirements.forEach((req) => {
  const present = testPrompt.toLowerCase().includes(req.toLowerCase());
  console.log(present ? "✓" : "✕", `Requirement: "${req.substring(0, 40)}..."`);
});

console.log("\n=== Phase 4 Prompt Builder Test Complete ===");
