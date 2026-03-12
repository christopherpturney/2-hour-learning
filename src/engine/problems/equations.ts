import type { Problem, ProblemGenerator, ScaffoldingLevel, QuestionPart } from '../../types';
import { randomInt, generateId, shuffle } from './utils';

// ============================================
// Equal Sign Meaning
// ============================================
const equalSignMeaning: ProblemGenerator = {
  skillId: 'equal-sign-meaning',
  generate(scaffolding: ScaffoldingLevel): Problem {
    // Randomly choose between true/false format and "find the missing number" format
    const useMissingNumber = Math.random() > 0.5;

    if (useMissingNumber) {
      // "Which number makes this true: 5 + 3 = ___ + 2?"
      const a = randomInt(1, 7);
      const b = randomInt(1, 9 - a);
      const sum = a + b;
      // Pick a number for one side, answer is what balances it
      const c = randomInt(1, sum - 1);
      const answer = sum - c;

      let question: string;
      let questionParts: QuestionPart[] | undefined;
      let hint: string | undefined;

      switch (scaffolding) {
        case 'concrete':
          question = `What number makes this true? ${a} + ${b} = ? + ${c}`;
          questionParts = [
            { type: 'image', value: `counters-${a}-${b}` },
            { type: 'text', value: '=' },
            { type: 'text', value: `? + ${c}` },
          ];
          hint = `Count the left side: ${a} + ${b} = ${sum}. What plus ${c} also equals ${sum}?`;
          break;
        case 'representational':
          question = `What number makes this true? ${a} + ${b} = ? + ${c}`;
          questionParts = [
            { type: 'equation', value: `${a} + ${b} = ? + ${c}` },
          ];
          hint = `Both sides must be equal. ${a} + ${b} = ${sum}. What + ${c} = ${sum}?`;
          break;
        case 'abstract':
          question = `Find the missing number: ${a} + ${b} = ? + ${c}`;
          questionParts = [
            { type: 'equation', value: `${a} + ${b} = ? + ${c}` },
          ];
          hint = `The = sign means both sides are the same. ${sum} = ? + ${c}. So ? = ${sum} - ${c}.`;
          break;
      }

      // Generate 4 unique wrong-ish choices, ensuring the correct answer is included
      const candidates = new Set([answer, answer + 1, answer > 1 ? answer - 1 : answer + 2, sum]);
      // Pad to 4 if duplicates were removed
      let pad = answer + 3;
      while (candidates.size < 4) {
        if (!candidates.has(pad)) candidates.add(pad);
        pad++;
      }
      const choices = shuffle([...candidates].slice(0, 4)).map(String);
      if (!choices.includes(String(answer))) choices[0] = String(answer);

      return {
        id: generateId(),
        skillId: 'equal-sign-meaning',
        type: 'multiple_choice',
        scaffolding,
        question,
        questionParts,
        correctAnswer: answer.toString(),
        choices: shuffle(choices),
        hint,
        explanation: `${a} + ${b} = ${sum}. We need ? + ${c} = ${sum}. So ? = ${answer}. Check: ${answer} + ${c} = ${sum}. Both sides are equal!`,
      };
    }

    // Original true/false format
    const a = randomInt(1, 8);
    const b = randomInt(1, 10 - a);
    const sum = a + b;

    const isTrue = Math.random() > 0.4;
    let rightSide: number;

    if (isTrue) {
      rightSide = sum;
    } else {
      rightSide = sum + (Math.random() > 0.5 ? 1 : -1) * randomInt(1, 2);
      if (rightSide < 0) rightSide = sum + 1;
    }

    const correctAnswer = isTrue ? 'true' : 'false';

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `Is this true? ${a} + ${b} = ${rightSide}`;
        questionParts = [
          { type: 'text', value: 'Is this true?' },
          { type: 'image', value: `counters-${a}-${b}` },
          { type: 'text', value: '=' },
          { type: 'image', value: `counters-${rightSide}` },
        ];
        hint = `Count the counters on each side. Are there the same number?`;
        break;
      case 'representational':
        question = `Is this true? ${a} + ${b} = ${rightSide}. Does the left side equal the right side?`;
        questionParts = [
          { type: 'equation', value: `${a} + ${b} = ${rightSide}` },
          { type: 'text', value: 'True or false?' },
        ];
        hint = `Add the left side: ${a} + ${b} = ?. Does it equal ${rightSide}?`;
        break;
      case 'abstract':
        question = `True or False: ${a} + ${b} = ${rightSide}`;
        questionParts = [
          { type: 'equation', value: `${a} + ${b} = ${rightSide}` },
        ];
        hint = `The = sign means "the same as." Is ${a} + ${b} the same as ${rightSide}?`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'equal-sign-meaning',
      type: 'true_false',
      scaffolding,
      question,
      questionParts,
      correctAnswer,
      choices: ['true', 'false'],
      hint,
      explanation: isTrue
        ? `True! ${a} + ${b} = ${sum}, and the right side is ${rightSide}. Both sides are equal. The = sign means "the same as."`
        : `False! ${a} + ${b} = ${sum}, but the right side shows ${rightSide}. ${sum} is not the same as ${rightSide}.`,
    };
  },
};

// ============================================
// Missing Number Equations
// ============================================
const missingNumberEquations: ProblemGenerator = {
  skillId: 'missing-number-equations',
  generate(scaffolding: ScaffoldingLevel): Problem {
    // Create equations with a missing number in different positions
    const position = randomInt(0, 2); // 0: _+b=c, 1: a+_=c, 2: a+b=_
    const a = randomInt(1, 9);
    const b = randomInt(1, 10 - a);
    const c = a + b;
    let answer: number;

    let equationStr: string;
    switch (position) {
      case 0:
        equationStr = `? + ${b} = ${c}`;
        answer = a;
        break;
      case 1:
        equationStr = `${a} + ? = ${c}`;
        answer = b;
        break;
      default:
        equationStr = `${a} + ${b} = ?`;
        answer = c;
        break;
    }

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        if (position === 2) {
          question = `${a} + ${b} = ? Count all the counters.`;
          questionParts = [
            { type: 'text', value: 'Count all the counters:' },
            { type: 'image', value: `counters-${a}-${b}` },
            { type: 'text', value: '= ?' },
          ];
          hint = `Count all the counters together.`;
        } else if (position === 0) {
          question = `? + ${b} = ${c}. How many are missing from the first group?`;
          questionParts = [
            { type: 'blank', value: '?' },
            { type: 'text', value: '+' },
            { type: 'image', value: `counters-${b}` },
            { type: 'text', value: '=' },
            { type: 'image', value: `counters-${c}` },
          ];
          hint = `You need ${c} total. You already have ${b}. How many more do you need?`;
        } else {
          question = `${a} + ? = ${c}. How many are missing?`;
          questionParts = [
            { type: 'image', value: `counters-${a}` },
            { type: 'text', value: '+ ?' },
            { type: 'text', value: '=' },
            { type: 'image', value: `counters-${c}` },
          ];
          hint = `You have ${a} and need ${c} total. How many more?`;
        }
        break;
      case 'representational':
        question = `Find the missing number: ${equationStr}`;
        questionParts = [
          { type: 'equation', value: equationStr },
          { type: 'blank', value: '?' },
          { type: 'number_line', value: '0-10', count: 10 },
        ];
        if (position === 2) {
          hint = `Add ${a} + ${b}. Use the number line.`;
        } else {
          hint = `Both sides must be equal. What number makes that true?`;
        }
        break;
      case 'abstract':
        question = `Find the missing number: ${equationStr}`;
        questionParts = [
          { type: 'equation', value: equationStr },
          { type: 'blank', value: '?' },
        ];
        if (position === 2) {
          hint = `${a} + ${b} = ?`;
        } else if (position === 0) {
          hint = `? + ${b} = ${c}. Think: ${c} - ${b} = ?`;
        } else {
          hint = `${a} + ? = ${c}. Think: ${c} - ${a} = ?`;
        }
        break;
    }

    return {
      id: generateId(),
      skillId: 'missing-number-equations',
      type: 'fill_blank',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      hint,
      explanation: position === 2
        ? `${a} + ${b} = ${c}. The missing number is ${c}.`
        : `The missing number is ${answer}. Check: ${a} + ${b} = ${c}. Both sides are equal!`,
    };
  },
};

export const equationGenerators: ProblemGenerator[] = [
  equalSignMeaning,
  missingNumberEquations,
];
