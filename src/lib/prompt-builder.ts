import type { PromptConfig, PromptConfigErrors } from "@/types/prompt";

export function validatePromptConfig(config: PromptConfig): PromptConfigErrors {
  const errors: PromptConfigErrors = {};

  if (config.questionCount < 1 || config.questionCount > 100) {
    errors.questionCount = "Question count must be between 1 and 100";
  }

  if (config.questionTypes.length === 0) {
    errors.questionTypes = "Select at least one question type";
  }

  if (!config.topic.trim()) {
    errors.topic =
      config.source === "user-material"
        ? "Provide material description or topic"
        : "Provide a topic";
  }

  return errors;
}

export function isValidPromptConfig(config: PromptConfig): boolean {
  const errors = validatePromptConfig(config);
  return Object.keys(errors).length === 0;
}

export function generatePrompt(config: PromptConfig): string {
  const questionTypeLabels: Record<string, string> = {
    mc: "Multiple Choice",
    multi: "Multiple Select",
    tf: "True / False",
    short: "Short Answer",
  };

  const selectedTypes = config.questionTypes
    .map((type) => questionTypeLabels[type])
    .join(", ");

  const sourceInstruction =
    config.source === "user-material"
      ? `Base questions on the provided material. Prioritize the provided material and avoid inventing material-specific facts that are unsupported by the source. Preserve the intended academic topic.`
      : `Create questions using generally available knowledge about the requested topic.`;

  const difficultyDescription: Record<string, string> = {
    Simple:
      "Questions should primarily test recall, recognition, definitions, direct application, or basic understanding.",
    Normal:
      "Questions should require normal course-level understanding and application, with some reasoning.",
    HOTS:
      "Questions should require deeper reasoning, interpretation, comparison, multi-step thinking, or application to unfamiliar situations.",
    Mixed: "Questions may combine Simple, Normal, and HOTS difficulty levels.",
  };

  const prompt = `You are creating a practice worksheet for the Answering web application.

Create ${config.questionCount} questions about:
${config.topic}

Difficulty: ${config.difficulty}
${difficultyDescription[config.difficulty]}

Allowed question types:
${selectedTypes}

Source policy:
${sourceInstruction}

Requirements:
- Make the questions academically useful, not trivial unless the selected difficulty is Simple.
- You may mix the allowed question types.
- Include the correct answer for every question.
- For multiple choice, provide exactly one correct option.
- For multiple select, provide all correct option numbers.
- For true/false, provide true or false.
- For short answer, provide one or more accepted answers.
- Include a concise explanation when useful.
- Do not create unsupported question types.
- Do not omit answers.
- Preserve the meaning of the requested topic/material.

Output strictly in Answering Worksheet Format v1.
Do not wrap the worksheet in Markdown code fences.
Do not add commentary before or after the worksheet.`;

  return prompt;
}
