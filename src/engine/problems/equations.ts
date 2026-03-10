import type { Problem, ProblemGenerator, ScaffoldingLevel, QuestionPart } from '../../types';

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let problemCounter = 0;
function generateId(): string {
  return `prob-${Date.now()}-${++problemCounter}-${randomInt(1000, 9999)}`;
}

function dots(n: number): string {
  return '●'.repeat(n);
}

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function generateWrongAnswers(correct: number, count: number, min: number, max: number): number[] {
  const wrong = new Set<number>();
  const candidates = [correct + 1, correct - 1, correct + 2, correct - 2];
  for (const c of candidates) {
    if (c !== correct && c >= min && c <= max) {
      wrong.add(c);
    }
  }
  let attempts = 0;
  while (wrong.size < count && attempts < 50) {
    const w = randomInt(min, max);
    if (w !== correct) {
      wrong.add(w);
    }
    attempts++;
  }
  return shuffle([...wrong].slice(0, count));
}

function makeChoices(correct: number, min: number, max: number): string[] {
  const wrongAnswers = generateWrongAnswers(correct, 3, min, max);
  return shuffle([correct.toString(), ...wrongAnswers.map(String)]);
}

// ============================================
// Equal Sign Meaning
// ============================================
const equalSignMeaning: ProblemGenerator = {
  skillId: 'equal-sign-meaning',
  generate(scaffolding: ScaffoldingLevel): Problem {
    // Generate equations to test if both sides are equal
    const a = randomInt(1, 8);
    const b = randomInt(1, 10 - a);
    const sum = a + b;

    // Decide if we show a true or false equation
    const isTrue = Math.random() > 0.4;
    let rightSide: number;

    if (isTrue) {
      rightSide = sum;
    } else {
      // Pick a wrong right side
      rightSide = sum + (Math.random() > 0.5 ? 1 : -1) * randomInt(1, 2);
      if (rightSide < 0) rightSide = sum + 1;
    }

    const correctAnswer = isTrue ? 'true' : 'false';

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `Is this true? ${dots(a)} + ${dots(b)} = ${dots(rightSide)}`;
        questionParts = [
          { type: 'dots', value: dots(a), count: a },
          { type: 'text', value: '+' },
          { type: 'dots', value: dots(b), count: b },
          { type: 'text', value: '=' },
          { type: 'dots', value: dots(rightSide), count: rightSide },
        ];
        hint = `Count the dots on each side. Are there the same number?`;
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
          question = `${dots(a)} + ${dots(b)} = ? Count all the dots.`;
          questionParts = [
            { type: 'dots', value: dots(a), count: a },
            { type: 'text', value: '+' },
            { type: 'dots', value: dots(b), count: b },
            { type: 'text', value: '= ?' },
          ];
          hint = `Count all the dots together.`;
        } else if (position === 0) {
          question = `? + ${dots(b)} = ${dots(c)}. How many dots are missing from the first group?`;
          questionParts = [
            { type: 'blank', value: '?' },
            { type: 'text', value: '+' },
            { type: 'dots', value: dots(b), count: b },
            { type: 'text', value: '=' },
            { type: 'dots', value: dots(c), count: c },
          ];
          hint = `You need ${c} dots total. You already have ${b}. How many more do you need?`;
        } else {
          question = `${dots(a)} + ? = ${dots(c)}. How many dots are missing?`;
          questionParts = [
            { type: 'dots', value: dots(a), count: a },
            { type: 'text', value: '+ ?' },
            { type: 'text', value: '=' },
            { type: 'dots', value: dots(c), count: c },
          ];
          hint = `You have ${a} dots and need ${c} total. How many more?`;
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
      choices: makeChoices(answer, 0, 10),
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
