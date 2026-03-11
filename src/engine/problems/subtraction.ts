import type { Problem, ProblemGenerator, ScaffoldingLevel, QuestionPart } from '../../types';
import { randomInt, generateId, dots, crossedDots, makeChoices } from './utils';

// ============================================
// Subtraction Within 5
// ============================================
const subtractionWithin5: ProblemGenerator = {
  skillId: 'subtraction-within-5',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const a = randomInt(2, 5);
    const b = randomInt(1, a);
    const answer = a - b;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `You have ${dots(a)}. Take away ${b}. How many are left? ${crossedDots(a, b)}`;
        questionParts = [
          { type: 'text', value: `You have ${a} dots.` },
          { type: 'dots', value: dots(a), count: a },
          { type: 'text', value: `Take away ${b}.` },
          { type: 'dots', value: crossedDots(a, b), count: a },
        ];
        hint = `Start with ${a} dots and cross out ${b}. Count what is left.`;
        break;
      case 'representational':
        question = `Use the number line: Start at ${a}, jump back ${b}. Where do you land?`;
        questionParts = [
          { type: 'number_line', value: '0-5', count: 5 },
          { type: 'text', value: `Start at ${a}, jump back ${b}.` },
        ];
        hint = `Put your finger on ${a} and count back ${b}.`;
        break;
      case 'abstract':
        question = `${a} - ${b} = ?`;
        questionParts = [
          { type: 'equation', value: `${a} - ${b} = ?` },
        ];
        hint = `What is ${a} take away ${b}?`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'subtraction-within-5',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, 0, 5),
      hint,
      explanation: `${a} - ${b} = ${answer}. If you have ${a} and take away ${b}, you have ${answer} left.`,
    };
  },
};

// ============================================
// Subtraction Within 10
// ============================================
const subtractionWithin10: ProblemGenerator = {
  skillId: 'subtraction-within-10',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const a = randomInt(2, 10);
    const b = randomInt(1, a);
    const answer = a - b;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `You have ${dots(a)}. Take away ${b}. How many are left?`;
        questionParts = [
          { type: 'dots', value: dots(a), count: a },
          { type: 'text', value: `Take away ${b}. How many are left?` },
        ];
        hint = `Cross out ${b} dots from ${dots(a)} and count what is left.`;
        break;
      case 'representational':
        question = `Use the number line: Start at ${a}, jump back ${b}. Where do you land?`;
        questionParts = [
          { type: 'number_line', value: '0-10', count: 10 },
          { type: 'text', value: `Start at ${a}, jump back ${b}.` },
        ];
        hint = `Start at ${a} on the number line and count back ${b} spaces.`;
        break;
      case 'abstract':
        question = `${a} - ${b} = ?`;
        questionParts = [
          { type: 'equation', value: `${a} - ${b} = ?` },
        ];
        hint = `What is ${a} minus ${b}?`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'subtraction-within-10',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, 0, 10),
      hint,
      explanation: `${a} - ${b} = ${answer}. Starting with ${a} and taking away ${b} leaves ${answer}.`,
    };
  },
};

// ============================================
// Subtraction Fluency Within 10
// ============================================
const subtractionFluency10: ProblemGenerator = {
  skillId: 'subtraction-fluency-10',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const a = randomInt(2, 10);
    const b = randomInt(1, a);
    const answer = a - b;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `${dots(a)} take away ${dots(b)} = ?`;
        questionParts = [
          { type: 'dots', value: dots(a), count: a },
          { type: 'text', value: 'take away' },
          { type: 'dots', value: dots(b), count: b },
        ];
        hint = `Count what is left after removing ${b}.`;
        break;
      case 'representational':
        question = `${a} - ${b} = ? Use the number line.`;
        questionParts = [
          { type: 'number_line', value: '0-10', count: 10 },
          { type: 'equation', value: `${a} - ${b} = ?` },
        ];
        hint = `Start at ${a} and count back ${b}.`;
        break;
      case 'abstract':
        question = `${a} - ${b} = ?`;
        questionParts = [
          { type: 'equation', value: `${a} - ${b} = ?` },
        ];
        hint = `Think: what is ${a} minus ${b}?`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'subtraction-fluency-10',
      type: 'number_input',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      hint,
      explanation: `${a} - ${b} = ${answer}.`,
    };
  },
};

// ============================================
// Subtraction Within 20
// ============================================
const subtractionWithin20: ProblemGenerator = {
  skillId: 'subtraction-within-20',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const a = randomInt(11, 20);
    const b = randomInt(1, a);
    const answer = a - b;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete': {
        const groupA = `${dots(10)} ${dots(a - 10)}`;
        question = `You have ${a} dots: ${groupA}. Take away ${b}. How many are left?`;
        questionParts = [
          { type: 'text', value: `You have ${a} dots:` },
          { type: 'dots', value: groupA, count: a },
          { type: 'text', value: `Take away ${b}. How many are left?` },
        ];
        hint = `Think about groups of ten. ${a} = 10 + ${a - 10}. Now take away ${b}.`;
        break;
      }
      case 'representational':
        question = `Start at ${a} on the number line. Jump back ${b}. Where do you land?`;
        questionParts = [
          { type: 'number_line', value: '0-20', count: 20 },
          { type: 'text', value: `Start at ${a}, jump back ${b}.` },
        ];
        hint = `Try jumping back to 10 first, then jump the rest.`;
        break;
      case 'abstract':
        question = `${a} - ${b} = ?`;
        questionParts = [
          { type: 'equation', value: `${a} - ${b} = ?` },
        ];
        hint = `Can you use a related addition fact? ? + ${b} = ${a}.`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'subtraction-within-20',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, 0, 20),
      hint,
      explanation: `${a} - ${b} = ${answer}.`,
    };
  },
};

// ============================================
// Subtraction as Unknown Addend
// ============================================
const subtractionAsUnknownAddend: ProblemGenerator = {
  skillId: 'subtraction-as-unknown-addend',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const total = randomInt(3, 10);
    const known = randomInt(1, total - 1);
    const answer = total - known;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `You have ${dots(known)} dots. You need ${total} in all. How many more dots do you need?`;
        questionParts = [
          { type: 'text', value: `You have:` },
          { type: 'dots', value: dots(known), count: known },
          { type: 'text', value: `You need ${total} in all.` },
          { type: 'text', value: 'How many more?' },
        ];
        hint = `Count up from ${known} to ${total}.`;
        break;
      case 'representational':
        question = `${known} + ? = ${total}. What is the missing number?`;
        questionParts = [
          { type: 'number_line', value: '0-10', count: 10 },
          { type: 'equation', value: `${known} + ? = ${total}` },
        ];
        hint = `Start at ${known} on the number line. How many jumps to get to ${total}?`;
        break;
      case 'abstract':
        question = `${known} + ? = ${total}`;
        questionParts = [
          { type: 'equation', value: `${known} + ? = ${total}` },
          { type: 'blank', value: '?' },
        ];
        hint = `Think: ${total} - ${known} = ?`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'subtraction-as-unknown-addend',
      type: 'fill_blank',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      hint,
      explanation: `${known} + ${answer} = ${total}. You need ${answer} more to go from ${known} to ${total}. This is the same as ${total} - ${known} = ${answer}.`,
    };
  },
};

export const subtractionGenerators: ProblemGenerator[] = [
  subtractionWithin5,
  subtractionWithin10,
  subtractionFluency10,
  subtractionWithin20,
  subtractionAsUnknownAddend,
];
