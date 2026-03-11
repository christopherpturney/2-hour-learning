import type { Problem, ProblemGenerator, ScaffoldingLevel, QuestionPart } from '../../types';
import { randomInt, generateId, makeChoices } from './utils';

// ============================================
// Addition Within 5
// ============================================
const additionWithin5: ProblemGenerator = {
  skillId: 'addition-within-5',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const a = randomInt(1, 5);
    const b = randomInt(0, 5 - a);
    const answer = a + b;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `Count all the counters: ${a} and ${b}. How many in all?`;
        questionParts = [
          { type: 'text', value: 'Count all the counters. How many in all?' },
          { type: 'image', value: `counters-${a}-${b}` },
        ];
        hint = `Count each counter one by one.`;
        break;
      case 'representational':
        question = `Use the number line: Start at ${a}, jump ${b} more. Where do you land?`;
        questionParts = [
          { type: 'number_line', value: `0-5`, count: 5 },
          { type: 'text', value: `Start at ${a}, jump ${b} more.` },
        ];
        hint = `Start at ${a} on the number line and count ${b} jumps forward.`;
        break;
      case 'abstract':
        question = `${a} + ${b} = ?`;
        questionParts = [
          { type: 'equation', value: `${a} + ${b} = ?` },
        ];
        hint = `Think: what is ${a} plus ${b}?`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'addition-within-5',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, 0, 5),
      hint,
      explanation: `${a} + ${b} = ${answer}. When you put ${a} and ${b} together, you get ${answer}.`,
    };
  },
};

// ============================================
// Addition Within 10
// ============================================
const additionWithin10: ProblemGenerator = {
  skillId: 'addition-within-10',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const a = randomInt(1, 9);
    const b = randomInt(1, 10 - a);
    const answer = a + b;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `Count all the counters: ${a} and ${b}. How many altogether?`;
        questionParts = [
          { type: 'text', value: 'Count all the counters. How many altogether?' },
          { type: 'image', value: `counters-${a}-${b}` },
        ];
        hint = `Count each counter one by one.`;
        break;
      case 'representational':
        question = `Use the number line: Start at ${a}, jump ${b} more. Where do you land?`;
        questionParts = [
          { type: 'number_line', value: '0-10', count: 10 },
          { type: 'text', value: `Start at ${a}, jump ${b} more.` },
        ];
        hint = `Put your finger on ${a} and count forward ${b} spaces.`;
        break;
      case 'abstract':
        question = `${a} + ${b} = ?`;
        questionParts = [
          { type: 'equation', value: `${a} + ${b} = ?` },
        ];
        hint = `What is ${a} plus ${b}?`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'addition-within-10',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, 0, 10),
      hint,
      explanation: `${a} + ${b} = ${answer}. If you have ${a} and add ${b} more, you get ${answer}.`,
    };
  },
};

// ============================================
// Addition Fluency Within 10
// ============================================
const additionFluency10: ProblemGenerator = {
  skillId: 'addition-fluency-10',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const a = randomInt(1, 9);
    const b = randomInt(1, 10 - a);
    const answer = a + b;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `How many in all? ${a} + ${b}`;
        questionParts = [
          { type: 'text', value: 'How many in all?' },
          { type: 'image', value: `counters-${a}-${b}` },
        ];
        hint = `Count all the counters together.`;
        break;
      case 'representational':
        question = `What is ${a} + ${b}? Use the number line to help.`;
        questionParts = [
          { type: 'number_line', value: '0-10', count: 10 },
          { type: 'equation', value: `${a} + ${b} = ?` },
        ];
        hint = `Start at ${a} and count up ${b}.`;
        break;
      case 'abstract':
        question = `${a} + ${b} = ?`;
        questionParts = [
          { type: 'equation', value: `${a} + ${b} = ?` },
        ];
        hint = `Think: what is ${a} plus ${b}?`;
        break;
    }

    // Fluency uses number_input for speed practice
    return {
      id: generateId(),
      skillId: 'addition-fluency-10',
      type: 'number_input',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      hint,
      explanation: `${a} + ${b} = ${answer}.`,
    };
  },
};

// ============================================
// Addition Within 20
// ============================================
const additionWithin20: ProblemGenerator = {
  skillId: 'addition-within-20',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const a = randomInt(1, 19);
    const b = randomInt(1, 20 - a);
    const answer = a + b;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `Count all the counters: ${a} and ${b}. How many in all?`;
        questionParts = [
          { type: 'text', value: 'Count all the counters. How many in all?' },
          { type: 'image', value: `counters-${a}-${b}` },
        ];
        hint = `Try grouping by tens first, then count the rest.`;
        break;
      case 'representational':
        question = `Use the number line: Start at ${a}, jump ${b} more. Where do you land?`;
        questionParts = [
          { type: 'number_line', value: '0-20', count: 20 },
          { type: 'text', value: `Start at ${a}, jump ${b} more.` },
        ];
        hint = `Start at ${a} on the number line and count forward ${b}.`;
        break;
      case 'abstract':
        question = `${a} + ${b} = ?`;
        questionParts = [
          { type: 'equation', value: `${a} + ${b} = ?` },
        ];
        hint = `Can you break ${b} apart to make a ten first?`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'addition-within-20',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, 0, 20),
      hint,
      explanation: `${a} + ${b} = ${answer}.`,
    };
  },
};

// ============================================
// Add Three Numbers
// ============================================
const addThreeNumbers: ProblemGenerator = {
  skillId: 'add-three-numbers',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const a = randomInt(1, 6);
    const b = randomInt(1, 6);
    const c = randomInt(1, Math.min(6, 20 - a - b));
    const answer = a + b + c;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `Count all the counters: ${a} and ${b} and ${c}. How many in all?`;
        questionParts = [
          { type: 'text', value: 'Count all the counters. How many in all?' },
          { type: 'image', value: `counters-${a}-${b}` },
          { type: 'text', value: '+' },
          { type: 'image', value: `counters-${c}` },
        ];
        hint = `Count all the counters from left to right.`;
        break;
      case 'representational':
        question = `${a} + ${b} + ${c} = ? Use the number line.`;
        questionParts = [
          { type: 'number_line', value: '0-20', count: 20 },
          { type: 'equation', value: `${a} + ${b} + ${c} = ?` },
        ];
        hint = `Try adding two numbers first, then add the third.`;
        break;
      case 'abstract':
        question = `${a} + ${b} + ${c} = ?`;
        questionParts = [
          { type: 'equation', value: `${a} + ${b} + ${c} = ?` },
        ];
        hint = `Try adding two numbers first, then add the third.`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'add-three-numbers',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, 0, 20),
      hint,
      explanation: `${a} + ${b} + ${c} = ${answer}. First, ${a} + ${b} = ${a + b}. Then ${a + b} + ${c} = ${answer}.`,
    };
  },
};

// ============================================
// Commutative Property
// ============================================
const commutativeProperty: ProblemGenerator = {
  skillId: 'commutative-property',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const a = randomInt(1, 9);
    const b = randomInt(1, 10 - a);
    const answer = a + b;
    // We show both orders and ask if they are equal
    const useTrue = Math.random() > 0.5;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    if (useTrue) {
      // True case: a + b = b + a
      switch (scaffolding) {
        case 'concrete':
          question = `Is this true? ${a} + ${b} = ${b} + ${a}`;
          questionParts = [
            { type: 'text', value: 'Is this true?' },
            { type: 'image', value: `counters-${a}-${b}` },
            { type: 'text', value: '=' },
            { type: 'image', value: `counters-${b}-${a}` },
          ];
          hint = `Count the counters on each side.`;
          break;
        case 'representational':
          question = `Is ${a} + ${b} the same as ${b} + ${a}?`;
          questionParts = [
            { type: 'equation', value: `${a} + ${b}` },
            { type: 'text', value: 'same as' },
            { type: 'equation', value: `${b} + ${a}` },
          ];
          hint = `Add both sides. What do you get?`;
          break;
        case 'abstract':
          question = `True or False: ${a} + ${b} = ${b} + ${a}`;
          questionParts = [
            { type: 'equation', value: `${a} + ${b} = ${b} + ${a}` },
          ];
          hint = `You can add numbers in any order.`;
          break;
      }

      return {
        id: generateId(),
        skillId: 'commutative-property',
        type: 'true_false',
        scaffolding,
        question,
        questionParts,
        correctAnswer: 'true',
        choices: ['true', 'false'],
        hint,
        explanation: `True! ${a} + ${b} = ${answer} and ${b} + ${a} = ${answer}. You can add numbers in any order and get the same answer.`,
      };
    } else {
      // False case: a + b = c (where c != b + a result, we use a different sum)
      const wrongSecondA = a + randomInt(1, 2);
      const wrongSum = wrongSecondA + b;
      switch (scaffolding) {
        case 'concrete':
          question = `Is this true? ${a} + ${b} = ${b} + ${wrongSecondA}`;
          questionParts = [
            { type: 'text', value: 'Is this true?' },
            { type: 'image', value: `counters-${a}-${b}` },
            { type: 'text', value: '=' },
            { type: 'image', value: `counters-${b}-${wrongSecondA}` },
          ];
          hint = `Count the counters on each side carefully.`;
          break;
        case 'representational':
          question = `Is ${a} + ${b} the same as ${b} + ${wrongSecondA}?`;
          questionParts = [
            { type: 'equation', value: `${a} + ${b}` },
            { type: 'text', value: 'same as' },
            { type: 'equation', value: `${b} + ${wrongSecondA}` },
          ];
          hint = `Add both sides and compare.`;
          break;
        case 'abstract':
          question = `True or False: ${a} + ${b} = ${b} + ${wrongSecondA}`;
          questionParts = [
            { type: 'equation', value: `${a} + ${b} = ${b} + ${wrongSecondA}` },
          ];
          hint = `Check: does ${a} + ${b} equal ${b} + ${wrongSecondA}?`;
          break;
      }

      return {
        id: generateId(),
        skillId: 'commutative-property',
        type: 'true_false',
        scaffolding,
        question,
        questionParts,
        correctAnswer: 'false',
        choices: ['true', 'false'],
        hint,
        explanation: `False! ${a} + ${b} = ${answer}, but ${b} + ${wrongSecondA} = ${wrongSum}. The numbers being added must be the same for the sums to be equal.`,
      };
    }
  },
};

// ============================================
// Counting On Strategy
// ============================================
const countingOnStrategy: ProblemGenerator = {
  skillId: 'counting-on-strategy',
  generate(scaffolding: ScaffoldingLevel): Problem {
    // counting on: start with the bigger number and count up the smaller
    const bigger = randomInt(5, 9);
    const smaller = randomInt(1, 3);
    const answer = bigger + smaller;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `Start with ${bigger}. Now count on ${smaller} more. What number do you reach?`;
        questionParts = [
          { type: 'text', value: `Start with ${bigger}. Count on ${smaller} more:` },
          { type: 'image', value: `counters-${smaller}` },
        ];
        hint = `Say "${bigger}" in your head, then count on ${smaller} more. Use the counters to help!`;
        break;
      case 'representational':
        question = `Start at ${bigger} on the number line. Count on ${smaller}. Where do you land?`;
        questionParts = [
          { type: 'number_line', value: '0-15', count: 15 },
          { type: 'text', value: `Start at ${bigger}. Count on ${smaller}.` },
        ];
        hint = `Put your finger on ${bigger} and jump ${smaller} times.`;
        break;
      case 'abstract':
        question = `Use counting on: ${bigger} + ${smaller} = ?`;
        questionParts = [
          { type: 'equation', value: `${bigger} + ${smaller} = ?` },
        ];
        hint = `Start at ${bigger} and count up ${smaller}.`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'counting-on-strategy',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, 0, 15),
      hint,
      explanation: `${bigger} + ${smaller} = ${answer}. Start at ${bigger} and count on: ${Array.from({ length: smaller }, (_, i) => bigger + 1 + i).join(', ')}. You land on ${answer}!`,
    };
  },
};

// ============================================
// Making Ten Strategy
// ============================================
const makingTenStrategy: ProblemGenerator = {
  skillId: 'making-ten-strategy',
  generate(scaffolding: ScaffoldingLevel): Problem {
    // Pick two numbers that sum to more than 10 but less than 20
    // where one number can be decomposed to make 10 with the other
    const a = randomInt(6, 9);
    const b = randomInt(10 - a + 1, 9); // ensures a + b > 10
    const answer = a + b;
    const needToMakeTen = 10 - a; // how much of b goes to make 10
    const leftover = b - needToMakeTen;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `${a} + ${b} = ? Make a group of 10 first!`;
        questionParts = [
          { type: 'text', value: 'Make a ten!' },
          { type: 'image', value: `counters-${a}-${b}` },
        ];
        hint = `Move ${needToMakeTen} counters from the second group to the first to make 10. Then you have 10 + ${leftover}.`;
        break;
      case 'representational':
        question = `Make a 10 to solve: ${a} + ${b} = ? Break ${b} into ${needToMakeTen} and ${leftover}.`;
        questionParts = [
          { type: 'equation', value: `${a} + ${b}` },
          { type: 'text', value: `= ${a} + ${needToMakeTen} + ${leftover}` },
          { type: 'text', value: `= 10 + ${leftover}` },
          { type: 'text', value: '= ?' },
        ];
        hint = `${a} + ${needToMakeTen} = 10. Then 10 + ${leftover} = ?`;
        break;
      case 'abstract':
        question = `Use make-a-ten: ${a} + ${b} = ?`;
        questionParts = [
          { type: 'equation', value: `${a} + ${b} = ?` },
        ];
        hint = `Can you break apart one number to make a ten?`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'making-ten-strategy',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, 10, 20),
      hint,
      explanation: `${a} + ${b} = ${answer}. Make a ten: ${a} + ${needToMakeTen} = 10, and ${leftover} is left over. 10 + ${leftover} = ${answer}.`,
    };
  },
};

// ============================================
// Fluency: Add & Subtract Within 20 (2.OA.B.2)
// ============================================
const fluencyAddSub20: ProblemGenerator = {
  skillId: 'fluency-add-sub-20',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const isAddition = Math.random() > 0.5;
    let a: number, b: number, answer: number, equation: string;

    if (isAddition) {
      a = randomInt(1, 19);
      b = randomInt(1, 20 - a);
      answer = a + b;
      equation = `${a} + ${b} = ?`;
    } else {
      a = randomInt(2, 20);
      b = randomInt(1, a);
      answer = a - b;
      equation = `${a} - ${b} = ?`;
    }

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = isAddition
          ? `${a} + ${b} = ?`
          : `${a} take away ${b} = ?`;
        questionParts = isAddition
          ? [
              { type: 'image', value: `counters-${a}-${b}` },
            ]
          : [
              { type: 'image', value: `counters-${a}-cross-${b}` },
            ];
        hint = isAddition
          ? `Count all the counters together.`
          : `Start with ${a} counters and take away ${b}. Count what is left.`;
        break;
      case 'representational':
        question = `${equation} Use the number line.`;
        questionParts = [
          { type: 'number_line', value: '0-20', count: 20 },
          { type: 'equation', value: equation },
        ];
        hint = isAddition
          ? `Start at ${a} and count forward ${b}.`
          : `Start at ${a} and count back ${b}.`;
        break;
      case 'abstract':
        question = equation;
        questionParts = [
          { type: 'equation', value: equation },
        ];
        hint = isAddition
          ? `Think: what is ${a} plus ${b}?`
          : `Think: what is ${a} minus ${b}?`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'fluency-add-sub-20',
      type: 'number_input',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      hint,
      explanation: isAddition
        ? `${a} + ${b} = ${answer}.`
        : `${a} - ${b} = ${answer}.`,
    };
  },
};

export const additionGenerators: ProblemGenerator[] = [
  additionWithin5,
  additionWithin10,
  additionFluency10,
  additionWithin20,
  addThreeNumbers,
  commutativeProperty,
  countingOnStrategy,
  makingTenStrategy,
  fluencyAddSub20,
];
