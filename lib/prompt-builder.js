export function validatePromptConfig(config) {
    const errors = {};
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
export function isValidPromptConfig(config) {
    const errors = validatePromptConfig(config);
    return Object.keys(errors).length === 0;
}
export function generatePrompt(config) {
    const questionTypeLabels = {
        mc: "Multiple Choice",
        multi: "Multiple Select",
        tf: "True / False",
        short: "Short Answer",
    };
    const selectedTypes = config.questionTypes
        .map((type) => questionTypeLabels[type])
        .join(", ");
    const sourceInstruction = config.source === "user-material"
        ? `Base questions on the provided material. Prioritize the provided material and avoid inventing material-specific facts that are unsupported by the source. Preserve the intended academic topic.`
        : `Create questions using generally available knowledge about the requested topic.`;
    const difficultyDescription = {
        Simple: "Questions should primarily test recall, recognition, definitions, direct application, or basic understanding.",
        Normal: "Questions should require normal course-level understanding and application, with some reasoning.",
        HOTS: "Questions should require deeper reasoning, interpretation, comparison, multi-step thinking, or application to unfamiliar situations.",
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

Answering Worksheet Format v1 Specification:
- Worksheet starts with @worksheet and requires a title (optional description).
- Each question starts with @question and ends with @end.
- Supported question types:
  1. Multiple Choice (mc):
     - Exactly one correct option.
     - Options are listed with '-'.
     - Answer is the 1-based option number.
     - Example:
       @question
         type: mc
         question: What is 2+2?
         options:
          - 3
          - 4
          - 5
         answer: 2
       @end
  2. Multiple Select (multi):
     - One or more correct options.
     - Answer is comma-separated 1-based option numbers (order does not matter).
     - Example:
       @question
         type: multi
         question: Which are even?
         options:
          - 2
          - 3
          - 4
          - 5
         answer: 1,3
       @end
  3. True/False (tf):
     - Answer is either true or false (lowercase).
     - Example:
       @question
         type: tf
         question: The sky is blue.
         answer: true
       @end
  4. Short Answer (short):
     - One or more accepted answers, each on a new line with '-'.
     - Example:
       @question
         type: short
         question: What is the opposite of hot?
         answer:
          - cold
          - chilly
       @end
- Explanation is optional and added with \`explanation: ...\` inside a question block.
- Syntax rules:
  * @worksheet appears once at the start.
  * title is required after @worksheet.
  * Every question must have type, question, and answer (appropriate to type).
  * Every question block must end with @end.
  * Unsupported question types are forbidden.
  * Required fields must not be omitted.
  * Option references are one-based and must point to existing options.
- Output restrictions:
  * Output ONLY the worksheet.
  * Begin with @worksheet and end after the final @end.
  * Do not add commentary before or after the worksheet.
  * Do not wrap the worksheet in Markdown code fences.
  * Do not use JSON or Markdown headings in the worksheet.`;
    return prompt;
}
