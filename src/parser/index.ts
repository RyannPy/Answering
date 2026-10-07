import type { Worksheet, Question } from "@/types/worksheet";

export type ParseResult =
  | { ok: true; worksheet: Worksheet }
  | { ok: false; errors: ParseError[] };

export type ParseError = {
  question?: number; // 1-based question number
  message: string;
};

export function parseWorksheet(input: string): ParseResult {
  const errors: ParseError[] = [];
  const lines = input.split("\n");

  let title: string | undefined;
  let description: string | undefined;
  const questions: Question[] = [];

  let i = 0;

  // Find @worksheet
  while (i < lines.length && !lines[i].trim().startsWith("@worksheet")) {
    i++;
  }

  if (i >= lines.length) {
    return { ok: false, errors: [{ message: "No @worksheet found" }] };
  }

  i++; // skip @worksheet line

  // Parse worksheet metadata
  while (i < lines.length && !lines[i].trim().startsWith("@question")) {
    const line = lines[i].trim();
    if (line.startsWith("title:")) {
      title = line.slice(6).trim();
    } else if (line.startsWith("description:")) {
      description = line.slice(12).trim();
    }
    i++;
  }

  if (!title) {
    errors.push({ message: "Worksheet title is required" });
  }

  // Parse questions
  while (i < lines.length) {
    if (lines[i].trim().startsWith("@question")) {
      const result = parseQuestion(lines, i);
      if (result.ok) {
        questions.push(result.question);
        i = result.nextIndex;
      } else {
        errors.push(...result.errors);
        i = result.nextIndex;
      }
    } else {
      i++;
    }
  }

  if (questions.length === 0) {
    errors.push({ message: "At least one question is required" });
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    worksheet: {
      title: title!,
      description,
      questions,
    },
  };
}

type QuestionParseResult =
  | { ok: true; question: Question; nextIndex: number }
  | { ok: false; errors: ParseError[]; nextIndex: number };

function parseQuestion(lines: string[], start: number): QuestionParseResult {
  const errors: ParseError[] = [];
  let i = start + 1; // skip @question

  let type: string | undefined;
  let question: string | undefined;
  const options: string[] = [];
  let answer: string | undefined;
  let explanation: string | undefined;
  const answerList: string[] = [];

  while (i < lines.length && !lines[i].trim().startsWith("@end")) {
    const line = lines[i].trim();

    if (line.startsWith("type:")) {
      type = line.slice(5).trim();
    } else if (line.startsWith("question:")) {
      question = line.slice(9).trim();
    } else if (line.startsWith("options:")) {
      // Parse options list
      i++;
      while (i < lines.length && lines[i].trim().startsWith("-")) {
        options.push(lines[i].trim().slice(1).trim());
        i++;
      }
      continue; // skip i++ at end of loop
    } else if (line.startsWith("answer:")) {
      const answerValue = line.slice(7).trim();
      if (answerValue === "") {
        // Multi-line answer list for short type
        i++;
        while (i < lines.length && lines[i].trim().startsWith("-")) {
          answerList.push(lines[i].trim().slice(1).trim());
          i++;
        }
        continue;
      } else {
        answer = answerValue;
      }
    } else if (line.startsWith("explanation:")) {
      explanation = line.slice(12).trim();
    }

    i++;
  }

  // Move past @end
  if (i < lines.length && lines[i].trim().startsWith("@end")) {
    i++;
  }

  // Validation
  const questionNumber = start + 1; // approximate for error reporting

  if (!type) {
    errors.push({
      question: questionNumber,
      message: "Question type is required",
    });
    return { ok: false, errors, nextIndex: i };
  }

  if (!question) {
    errors.push({
      question: questionNumber,
      message: "Question text is required",
    });
    return { ok: false, errors, nextIndex: i };
  }

  const supportedTypes = ["mc", "multi", "tf", "short"];
  if (!supportedTypes.includes(type)) {
    errors.push({
      question: questionNumber,
      message: `Unsupported question type: ${type}`,
    });
    return { ok: false, errors, nextIndex: i };
  }

  // Type-specific validation
  if (type === "mc") {
    if (options.length < 2) {
      errors.push({
        question: questionNumber,
        message: "Multiple Choice requires at least 2 options",
      });
    }
    if (!answer) {
      errors.push({
        question: questionNumber,
        message: "Multiple Choice requires an answer",
      });
    } else {
      const answerNum = parseInt(answer, 10);
      if (isNaN(answerNum)) {
        errors.push({
          question: questionNumber,
          message: `Multiple Choice answer must be a number, got: ${answer}`,
        });
      } else if (answerNum < 1 || answerNum > options.length) {
        errors.push({
          question: questionNumber,
          message: `Multiple Choice answer ${answerNum} refers to non-existent option`,
        });
      } else {
        return {
          ok: true,
          question: {
            id: `q-${questionNumber}`,
            type: "mc",
            question,
            options,
            answer: answerNum,
            explanation,
          },
          nextIndex: i,
        };
      }
    }
  } else if (type === "multi") {
    if (options.length < 2) {
      errors.push({
        question: questionNumber,
        message: "Multiple Select requires at least 2 options",
      });
    }
    if (!answer) {
      errors.push({
        question: questionNumber,
        message: "Multiple Select requires at least one correct answer",
      });
    } else {
      const indices = answer.split(",").map((s) => parseInt(s.trim(), 10));
      const invalidIndices = indices.filter(
        (n) => isNaN(n) || n < 1 || n > options.length
      );
      if (invalidIndices.length > 0) {
        errors.push({
          question: questionNumber,
          message: `Multiple Select answer contains invalid option reference(s): ${invalidIndices.join(", ")}`,
        });
      } else {
        return {
          ok: true,
          question: {
            id: `q-${questionNumber}`,
            type: "multi",
            question,
            options,
            answer: indices,
            explanation,
          },
          nextIndex: i,
        };
      }
    }
  } else if (type === "tf") {
    if (!answer) {
      errors.push({
        question: questionNumber,
        message: "True/False requires an answer",
      });
    } else if (answer !== "true" && answer !== "false") {
      errors.push({
        question: questionNumber,
        message: `True/False answer must be "true" or "false", got: ${answer}`,
      });
    } else {
      return {
        ok: true,
        question: {
          id: `q-${questionNumber}`,
          type: "tf",
          question,
          answer: answer === "true",
          explanation,
        },
        nextIndex: i,
      };
    }
  } else if (type === "short") {
    const answers = answerList.length > 0 ? answerList : answer ? [answer] : [];
    if (answers.length === 0) {
      errors.push({
        question: questionNumber,
        message: "Short Answer requires at least one accepted answer",
      });
    } else {
      return {
        ok: true,
        question: {
          id: `q-${questionNumber}`,
          type: "short",
          question,
          answer: answers,
          explanation,
        },
        nextIndex: i,
      };
    }
  }

  return { ok: false, errors, nextIndex: i };
}
