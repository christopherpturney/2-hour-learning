import type { Problem, ProblemGenerator, ScaffoldingLevel, QuestionPart } from '../../types';
import { randomInt, generateId, shuffle, makeChoices, generateWrongAnswers } from './utils';

function tensBlock(tens: number): string {
  return '▮'.repeat(tens);
}

function onesBlock(ones: number): string {
  return '●'.repeat(ones);
}

// ============================================
// Count to 120
// ============================================
const countTo120: ProblemGenerator = {
  skillId: 'count-to-120',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const start = randomInt(1, 115);
    const answer = start + 1;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `What number comes after ${start}? Count: ...${start - 2}, ${start - 1}, ${start}, ?`;
        questionParts = [
          { type: 'text', value: `Count:` },
          { type: 'text', value: `...${start - 2}, ${start - 1}, ${start}, ?` },
        ];
        hint = `Say the numbers out loud: ${start - 2}, ${start - 1}, ${start}... what comes next?`;
        break;
      case 'representational':
        question = `On the number line, what comes right after ${start}?`;
        questionParts = [
          { type: 'number_line', value: `${start - 3}-${start + 3}`, count: 7 },
          { type: 'text', value: `What comes after ${start}?` },
        ];
        hint = `Look at the number line. Find ${start} and look one step to the right.`;
        break;
      case 'abstract':
        question = `What number comes right after ${start}?`;
        questionParts = [
          { type: 'text', value: `What number comes right after ${start}?` },
        ];
        hint = `${start} + 1 = ?`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'count-to-120',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, Math.max(1, answer - 3), Math.min(120, answer + 3)),
      hint,
      explanation: `The number right after ${start} is ${answer}. When we count, we say ...${start}, ${answer}.`,
    };
  },
};

// ============================================
// Read and Write Numerals to 120
// ============================================
const readWriteNumerals120: ProblemGenerator = {
  skillId: 'read-write-numerals-120',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const number = randomInt(10, 120);
    const ones = number % 10;
    const tens = Math.floor(number / 10);
    const numberWords: Record<number, string> = {
      0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five',
      6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten',
      11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen',
      16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen',
    };
    const tensWords: Record<number, string> = {
      2: 'twenty', 3: 'thirty', 4: 'forty', 5: 'fifty',
      6: 'sixty', 7: 'seventy', 8: 'eighty', 9: 'ninety',
    };
    function toWords(n: number): string {
      if (n <= 19) return numberWords[n];
      if (n < 100) {
        const t = Math.floor(n / 10);
        const o = n % 10;
        return o === 0 ? tensWords[t] : `${tensWords[t]}-${numberWords[o]}`;
      }
      if (n === 100) return 'one hundred';
      const remainder = n - 100;
      return `one hundred ${toWords(remainder)}`;
    }

    const word = toWords(number);
    // Randomly choose direction: number->word or word->number
    const numberToWord = Math.random() > 0.5;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    if (numberToWord) {
      const correctWord = word;
      switch (scaffolding) {
        case 'concrete':
          question = `Here are ${tens} tens ${tensBlock(tens)} and ${ones} ones ${onesBlock(ones)}. What number is this? Write it as a word.`;
          questionParts = [
            { type: 'text', value: `${tens} tens:` },
            { type: 'dots', value: tensBlock(tens), count: tens },
            { type: 'text', value: `${ones} ones:` },
            { type: 'dots', value: onesBlock(ones), count: ones },
          ];
          hint = `Count the tens: ${tens} tens = ${tens * 10}. Plus ${ones} ones = ${number}.`;
          break;
        case 'representational':
          question = `How do you say this number? ${number}`;
          questionParts = [
            { type: 'text', value: `How do you say: ${number}` },
          ];
          hint = `What is the word for ${number}?`;
          break;
        case 'abstract':
          question = `What is the word for the number ${number}?`;
          questionParts = [
            { type: 'text', value: `Word for ${number}?` },
          ];
          break;
      }

      // Generate wrong word choices
      const wrongNums = generateWrongAnswers(number, 3, Math.max(10, number - 10), Math.min(120, number + 10));
      const choices = shuffle([correctWord, ...wrongNums.map(n => toWords(n))]);

      return {
        id: generateId(),
        skillId: 'read-write-numerals-120',
        type: 'multiple_choice',
        scaffolding,
        question,
        questionParts,
        correctAnswer: correctWord,
        choices,
        hint,
        explanation: `The number ${number} is written as "${correctWord}".`,
      };
    } else {
      switch (scaffolding) {
        case 'concrete':
          question = `What number is "${word}"? Use the blocks to help.`;
          questionParts = [
            { type: 'text', value: `"${word}"` },
            { type: 'text', value: `Show with tens and ones.` },
          ];
          hint = `"${word}" - think about how many tens and ones.`;
          break;
        case 'representational':
          question = `Write the number for "${word}".`;
          questionParts = [
            { type: 'text', value: `Write the number: "${word}"` },
          ];
          hint = `Sound it out: "${word}". What number is it?`;
          break;
        case 'abstract':
          question = `"${word}" = ?`;
          questionParts = [
            { type: 'text', value: `"${word}" = ?` },
          ];
          break;
      }

      return {
        id: generateId(),
        skillId: 'read-write-numerals-120',
        type: 'multiple_choice',
        scaffolding,
        question,
        questionParts,
        correctAnswer: number.toString(),
        choices: makeChoices(number, Math.max(10, number - 10), Math.min(120, number + 10)),
        hint,
        explanation: `"${word}" is the number ${number}.`,
      };
    }
  },
};

// ============================================
// Understand Tens and Ones
// ============================================
const understandTensOnes: ProblemGenerator = {
  skillId: 'understand-tens-ones',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const tens = randomInt(1, 9);
    const ones = randomInt(0, 9);
    const number = tens * 10 + ones;
    // Ask about tens or ones digit
    const askTens = Math.random() > 0.5;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;
    const answer = askTens ? tens : ones;

    switch (scaffolding) {
      case 'concrete':
        question = askTens
          ? `Look at the blocks for ${number}: ${tensBlock(tens)} tens and ${onesBlock(ones)} ones. How many tens?`
          : `Look at the blocks for ${number}: ${tensBlock(tens)} tens and ${onesBlock(ones)} ones. How many ones?`;
        questionParts = [
          { type: 'text', value: `${number}` },
          { type: 'dots', value: tensBlock(tens), count: tens },
          { type: 'text', value: 'tens' },
          { type: 'dots', value: onesBlock(ones), count: ones },
          { type: 'text', value: 'ones' },
          { type: 'text', value: askTens ? 'How many tens?' : 'How many ones?' },
        ];
        hint = askTens
          ? `Count the long blocks (tens). Each ▮ = 10.`
          : `Count the small dots (ones). Each ● = 1.`;
        break;
      case 'representational':
        question = askTens
          ? `In the number ${number}, how many tens are there?`
          : `In the number ${number}, how many ones are there?`;
        questionParts = [
          { type: 'text', value: `${number} = ___ tens and ___ ones` },
          { type: 'text', value: askTens ? 'How many tens?' : 'How many ones?' },
        ];
        hint = askTens
          ? `The tens digit is the first digit in ${number}.`
          : `The ones digit is the last digit in ${number}.`;
        break;
      case 'abstract':
        question = askTens
          ? `How many tens in ${number}?`
          : `How many ones in ${number}?`;
        questionParts = [
          { type: 'text', value: question },
        ];
        hint = askTens
          ? `The tens place is on the left.`
          : `The ones place is on the right.`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'understand-tens-ones',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, 0, 9),
      hint,
      explanation: `${number} has ${tens} tens and ${ones} ones. ${tens} tens = ${tens * 10}, plus ${ones} ones = ${number}.`,
    };
  },
};

// ============================================
// Teen Numbers Composition
// ============================================
const teenNumbersComposition: ProblemGenerator = {
  skillId: 'teen-numbers-composition',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const ones = randomInt(1, 9);
    const number = 10 + ones;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `Here is a group of ten: ${tensBlock(1)} and ${ones} more: ${onesBlock(ones)}. What number is this?`;
        questionParts = [
          { type: 'text', value: 'One ten:' },
          { type: 'dots', value: tensBlock(1), count: 1 },
          { type: 'text', value: `and ${ones} ones:` },
          { type: 'dots', value: onesBlock(ones), count: ones },
        ];
        hint = `One group of ten is 10. Plus ${ones} more is?`;
        break;
      case 'representational':
        question = `10 + ${ones} = ? This is a teen number!`;
        questionParts = [
          { type: 'equation', value: `10 + ${ones} = ?` },
          { type: 'text', value: 'One ten and some ones.' },
        ];
        hint = `10 plus ${ones} more. What teen number is that?`;
        break;
      case 'abstract':
        question = `10 + ${ones} = ?`;
        questionParts = [
          { type: 'equation', value: `10 + ${ones} = ?` },
        ];
        hint = `A teen number is 10 + some ones.`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'teen-numbers-composition',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: number.toString(),
      choices: makeChoices(number, 10, 19),
      hint,
      explanation: `10 + ${ones} = ${number}. Teen numbers are made of one ten and some ones.`,
    };
  },
};

// ============================================
// Decade Numbers
// ============================================
const decadeNumbers: ProblemGenerator = {
  skillId: 'decade-numbers',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const tens = randomInt(1, 9);
    const number = tens * 10;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `How many is ${tens} groups of ten? ${tensBlock(tens)}`;
        questionParts = [
          { type: 'text', value: `${tens} groups of ten:` },
          { type: 'dots', value: tensBlock(tens), count: tens },
          { type: 'text', value: 'How many in all?' },
        ];
        hint = `Count by tens: 10, 20, 30... Count ${tens} groups.`;
        break;
      case 'representational':
        question = `${tens} tens = ? Count by tens.`;
        questionParts = [
          { type: 'text', value: `${tens} tens = ?` },
          { type: 'number_line', value: '0-90', count: 9 },
        ];
        hint = `Count by tens: 10, 20, 30... Stop when you reach ${tens} groups.`;
        break;
      case 'abstract':
        question = `${tens} tens = ?`;
        questionParts = [
          { type: 'text', value: `${tens} tens = ?` },
        ];
        hint = `Multiply by 10: ${tens} x 10 = ?`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'decade-numbers',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: number.toString(),
      choices: makeChoices(number, 10, 90),
      hint,
      explanation: `${tens} tens = ${number}. Counting by tens: ${Array.from({ length: tens }, (_, i) => (i + 1) * 10).join(', ')}.`,
    };
  },
};

// ============================================
// Compare Two-Digit Numbers
// ============================================
const compareTwoDigit: ProblemGenerator = {
  skillId: 'compare-two-digit',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const a = randomInt(10, 99);
    let b = randomInt(10, 99);
    // Occasionally make them equal
    if (Math.random() < 0.15) {
      b = a;
    }
    const correctSymbol = a > b ? '>' : a < b ? '<' : '=';
    const correctWord = a > b ? 'greater than' : a < b ? 'less than' : 'equal to';

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    const tensA = Math.floor(a / 10);
    const onesA = a % 10;
    const tensB = Math.floor(b / 10);
    const onesB = b % 10;

    switch (scaffolding) {
      case 'concrete':
        question = `Compare: ${tensBlock(tensA)}${onesBlock(onesA)} (${a}) and ${tensBlock(tensB)}${onesBlock(onesB)} (${b}). Which is greater?`;
        questionParts = [
          { type: 'dots', value: `${tensBlock(tensA)}${onesBlock(onesA)}`, count: a },
          { type: 'text', value: `(${a})` },
          { type: 'text', value: '___' },
          { type: 'dots', value: `${tensBlock(tensB)}${onesBlock(onesB)}`, count: b },
          { type: 'text', value: `(${b})` },
        ];
        hint = `Compare the tens first. ${a} has ${tensA} tens and ${b} has ${tensB} tens.`;
        break;
      case 'representational':
        question = `Compare ${a} and ${b}. Use >, <, or =.`;
        questionParts = [
          { type: 'text', value: `${a} ___ ${b}` },
          { type: 'text', value: `${a} = ${tensA} tens ${onesA} ones` },
          { type: 'text', value: `${b} = ${tensB} tens ${onesB} ones` },
        ];
        hint = `First compare the tens. If the tens are the same, compare the ones.`;
        break;
      case 'abstract':
        question = `${a} ___ ${b}. Fill in >, <, or =.`;
        questionParts = [
          { type: 'text', value: `${a} ___ ${b}` },
          { type: 'blank', value: '?' },
        ];
        hint = `Is ${a} bigger, smaller, or the same as ${b}?`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'compare-two-digit',
      type: 'comparison',
      scaffolding,
      question,
      questionParts,
      correctAnswer: correctSymbol,
      choices: ['>', '<', '='],
      hint,
      explanation: `${a} is ${correctWord} ${b}, so ${a} ${correctSymbol} ${b}. Compare tens first: ${tensA} tens vs ${tensB} tens.${tensA === tensB ? ` They are the same, so compare ones: ${onesA} vs ${onesB}.` : ''}`,
    };
  },
};

// ============================================
// Add Two-Digit Plus One-Digit
// ============================================
const addTwoDigitPlusOne: ProblemGenerator = {
  skillId: 'add-two-digit-plus-one',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const twoDigit = randomInt(10, 89);
    const oneDigit = randomInt(1, Math.min(9, 99 - twoDigit));
    const answer = twoDigit + oneDigit;
    const tens = Math.floor(twoDigit / 10);
    const ones = twoDigit % 10;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `${tensBlock(tens)}${onesBlock(ones)} + ${onesBlock(oneDigit)} = ? Add the ones together.`;
        questionParts = [
          { type: 'dots', value: `${tensBlock(tens)}${onesBlock(ones)}`, count: twoDigit },
          { type: 'text', value: '+' },
          { type: 'dots', value: onesBlock(oneDigit), count: oneDigit },
        ];
        hint = `Keep the ${tens} tens. Add the ones: ${ones} + ${oneDigit} = ${ones + oneDigit}.`;
        break;
      case 'representational':
        question = `${twoDigit} + ${oneDigit} = ? Think about tens and ones.`;
        questionParts = [
          { type: 'equation', value: `${twoDigit} + ${oneDigit} = ?` },
          { type: 'text', value: `${twoDigit} = ${tens} tens and ${ones} ones` },
        ];
        hint = `The tens stay the same (${tens} tens). Just add the ones: ${ones} + ${oneDigit}.`;
        break;
      case 'abstract':
        question = `${twoDigit} + ${oneDigit} = ?`;
        questionParts = [
          { type: 'equation', value: `${twoDigit} + ${oneDigit} = ?` },
        ];
        hint = `Add the ones digit: ${ones} + ${oneDigit}.`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'add-two-digit-plus-one',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, Math.max(10, answer - 5), Math.min(99, answer + 5)),
      hint,
      explanation: `${twoDigit} + ${oneDigit} = ${answer}. Keep the tens (${tens * 10}) and add the ones: ${ones} + ${oneDigit} = ${ones + oneDigit}.`,
    };
  },
};

// ============================================
// Add Two-Digit Plus Multiples of Ten
// ============================================
const addTwoDigitPlusTens: ProblemGenerator = {
  skillId: 'add-two-digit-plus-tens',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const twoDigit = randomInt(10, 80);
    const addTens = randomInt(1, Math.min(9, Math.floor((99 - twoDigit) / 10))) * 10;
    const answer = twoDigit + addTens;
    const tens = Math.floor(twoDigit / 10);
    const ones = twoDigit % 10;
    const addTensCount = addTens / 10;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `${tensBlock(tens)}${onesBlock(ones)} + ${tensBlock(addTensCount)} = ? Add the tens together.`;
        questionParts = [
          { type: 'dots', value: `${tensBlock(tens)}${onesBlock(ones)}`, count: twoDigit },
          { type: 'text', value: '+' },
          { type: 'dots', value: tensBlock(addTensCount), count: addTensCount },
          { type: 'text', value: 'tens' },
        ];
        hint = `Add the tens: ${tens} tens + ${addTensCount} tens = ${tens + addTensCount} tens. The ones stay the same (${ones}).`;
        break;
      case 'representational':
        question = `${twoDigit} + ${addTens} = ? Only the tens change!`;
        questionParts = [
          { type: 'equation', value: `${twoDigit} + ${addTens} = ?` },
          { type: 'text', value: `${tens} tens + ${addTensCount} tens = ? tens` },
        ];
        hint = `${tens} tens + ${addTensCount} tens = ${tens + addTensCount} tens. Keep the ${ones} ones.`;
        break;
      case 'abstract':
        question = `${twoDigit} + ${addTens} = ?`;
        questionParts = [
          { type: 'equation', value: `${twoDigit} + ${addTens} = ?` },
        ];
        hint = `Just add the tens: ${tens * 10} + ${addTens} = ${tens * 10 + addTens}. Then add ${ones}.`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'add-two-digit-plus-tens',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, Math.max(10, answer - 20), Math.min(120, answer + 20)),
      hint,
      explanation: `${twoDigit} + ${addTens} = ${answer}. Add the tens: ${tens} + ${addTensCount} = ${tens + addTensCount} tens = ${(tens + addTensCount) * 10}. The ones stay ${ones}. So ${answer}.`,
    };
  },
};

// ============================================
// Mentally Find 10 More / 10 Less
// ============================================
const mentalTenMoreLess: ProblemGenerator = {
  skillId: 'mental-ten-more-less',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const isMore = Math.random() > 0.5;
    const number = isMore ? randomInt(10, 110) : randomInt(20, 120);
    const answer = isMore ? number + 10 : number - 10;
    const tens = Math.floor(number / 10);
    const ones = number % 10;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    const action = isMore ? '10 more than' : '10 less than';

    switch (scaffolding) {
      case 'concrete':
        question = `What is ${action} ${number}? ${tensBlock(tens)}${onesBlock(ones)} ${isMore ? '+ ▮' : '- ▮'}`;
        questionParts = [
          { type: 'dots', value: `${tensBlock(tens)}${onesBlock(ones)}`, count: number },
          { type: 'text', value: isMore ? '+ 1 ten' : '- 1 ten' },
        ];
        hint = isMore
          ? `Add one more ten block. ${tens} tens becomes ${tens + 1} tens.`
          : `Take away one ten block. ${tens} tens becomes ${tens - 1} tens.`;
        break;
      case 'representational':
        question = `What is ${action} ${number}?`;
        questionParts = [
          { type: 'text', value: `${number} = ${tens} tens and ${ones} ones` },
          { type: 'text', value: isMore ? 'Add 1 more ten.' : 'Take away 1 ten.' },
        ];
        hint = isMore
          ? `${tens} tens + 1 ten = ${tens + 1} tens. Ones stay the same.`
          : `${tens} tens - 1 ten = ${tens - 1} tens. Ones stay the same.`;
        break;
      case 'abstract':
        question = `What is ${action} ${number}?`;
        questionParts = [
          { type: 'text', value: `${action} ${number} = ?` },
        ];
        hint = `Only the tens digit changes. The ones digit stays ${ones}.`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'mental-ten-more-less',
      type: 'number_input',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      hint,
      explanation: `${action} ${number} is ${answer}. ${isMore ? 'Adding' : 'Subtracting'} 10 changes the tens digit: ${tens} becomes ${isMore ? tens + 1 : tens - 1}. The ones (${ones}) stay the same.`,
    };
  },
};

// ============================================
// Subtract Multiples of Ten
// ============================================
const subtractMultiplesOfTen: ProblemGenerator = {
  skillId: 'subtract-multiples-of-ten',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const tensA = randomInt(2, 9);
    const tensB = randomInt(1, tensA);
    const a = tensA * 10;
    const b = tensB * 10;
    const answer = a - b;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `${tensBlock(tensA)} take away ${tensBlock(tensB)} = ? Each block is 10.`;
        questionParts = [
          { type: 'dots', value: tensBlock(tensA), count: tensA },
          { type: 'text', value: `(${a})` },
          { type: 'text', value: 'take away' },
          { type: 'dots', value: tensBlock(tensB), count: tensB },
          { type: 'text', value: `(${b})` },
        ];
        hint = `${tensA} tens take away ${tensB} tens = ${tensA - tensB} tens.`;
        break;
      case 'representational':
        question = `${a} - ${b} = ? Think in tens.`;
        questionParts = [
          { type: 'equation', value: `${a} - ${b} = ?` },
          { type: 'text', value: `${tensA} tens - ${tensB} tens = ? tens` },
        ];
        hint = `${tensA} tens - ${tensB} tens = ${tensA - tensB} tens = ?`;
        break;
      case 'abstract':
        question = `${a} - ${b} = ?`;
        questionParts = [
          { type: 'equation', value: `${a} - ${b} = ?` },
        ];
        hint = `Think: ${tensA} - ${tensB} = ${tensA - tensB}, then multiply by 10.`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'subtract-multiples-of-ten',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, 0, 90),
      hint,
      explanation: `${a} - ${b} = ${answer}. Think in tens: ${tensA} - ${tensB} = ${tensA - tensB}. So ${tensA - tensB} tens = ${answer}.`,
    };
  },
};

// ============================================
// Understand Hundreds (2.NBT.A.1)
// ============================================
const understandHundreds: ProblemGenerator = {
  skillId: 'understand-hundreds',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const hundreds = randomInt(1, 9);
    const tens = randomInt(0, 9);
    const ones = randomInt(0, 9);
    const number = hundreds * 100 + tens * 10 + ones;

    // Ask about hundreds, tens, or ones
    const askType = randomInt(0, 2); // 0=hundreds, 1=tens, 2=ones
    const answer = askType === 0 ? hundreds : askType === 1 ? tens : ones;
    const placeWord = askType === 0 ? 'hundreds' : askType === 1 ? 'tens' : 'ones';

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `The number ${number} has ${hundreds} hundreds, ${tens} tens, and ${ones} ones. How many ${placeWord}?`;
        questionParts = [
          { type: 'text', value: `${number}` },
          { type: 'text', value: `${'■'.repeat(hundreds)} hundreds` },
          { type: 'text', value: `${'▮'.repeat(tens)} tens` },
          { type: 'text', value: `${'●'.repeat(ones)} ones` },
          { type: 'text', value: `How many ${placeWord}?` },
        ];
        hint = `Count the ${placeWord} blocks.`;
        break;
      case 'representational':
        question = `In the number ${number}, how many ${placeWord} are there?`;
        questionParts = [
          { type: 'text', value: `${number} = ___ hundreds + ___ tens + ___ ones` },
          { type: 'text', value: `How many ${placeWord}?` },
        ];
        hint = askType === 0
          ? `The hundreds digit is the first digit.`
          : askType === 1
          ? `The tens digit is the middle digit.`
          : `The ones digit is the last digit.`;
        break;
      case 'abstract':
        question = `How many ${placeWord} in ${number}?`;
        questionParts = [
          { type: 'text', value: `How many ${placeWord} in ${number}?` },
        ];
        hint = `Think about each place: hundreds, tens, ones.`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'understand-hundreds',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, 0, 9),
      hint,
      explanation: `${number} = ${hundreds} hundreds + ${tens} tens + ${ones} ones. That is ${hundreds * 100} + ${tens * 10} + ${ones} = ${number}.`,
    };
  },
};

// ============================================
// Add & Subtract Within 100 (2.NBT.B.5)
// ============================================
const addSubtractWithin100: ProblemGenerator = {
  skillId: 'add-subtract-within-100',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const isAddition = Math.random() > 0.5;
    let a: number, b: number, answer: number, equation: string;

    if (isAddition) {
      a = randomInt(10, 89);
      b = randomInt(10, 100 - a);
      answer = a + b;
      equation = `${a} + ${b} = ?`;
    } else {
      a = randomInt(20, 99);
      b = randomInt(10, a);
      answer = a - b;
      equation = `${a} - ${b} = ?`;
    }

    const tensA = Math.floor(a / 10);
    const onesA = a % 10;
    const tensB = Math.floor(b / 10);
    const onesB = b % 10;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `${equation} Use tens and ones blocks.`;
        questionParts = [
          { type: 'text', value: `${a} = ${tensA} tens, ${onesA} ones` },
          { type: 'text', value: isAddition ? '+' : '-' },
          { type: 'text', value: `${b} = ${tensB} tens, ${onesB} ones` },
        ];
        hint = isAddition
          ? `Add the tens: ${tensA} + ${tensB}. Add the ones: ${onesA} + ${onesB}. Regroup if needed.`
          : `Subtract the tens: ${tensA} - ${tensB}. Subtract the ones: ${onesA} - ${onesB}. Regroup if needed.`;
        break;
      case 'representational':
        question = equation;
        questionParts = [
          { type: 'equation', value: equation },
          { type: 'text', value: `Break apart by place value.` },
        ];
        hint = isAddition
          ? `Add tens first, then add ones. Combine the results.`
          : `Subtract tens first, then subtract ones. Combine the results.`;
        break;
      case 'abstract':
        question = equation;
        questionParts = [
          { type: 'equation', value: equation },
        ];
        hint = `Use place value to help you solve this.`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'add-subtract-within-100',
      type: 'number_input',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      hint,
      explanation: isAddition
        ? `${a} + ${b} = ${answer}. Add the tens: ${tensA * 10} + ${tensB * 10} = ${(tensA + tensB) * 10}. Add the ones: ${onesA} + ${onesB} = ${onesA + onesB}.`
        : `${a} - ${b} = ${answer}.`,
    };
  },
};

export const placeValueGenerators: ProblemGenerator[] = [
  countTo120,
  readWriteNumerals120,
  understandTensOnes,
  teenNumbersComposition,
  decadeNumbers,
  compareTwoDigit,
  addTwoDigitPlusOne,
  addTwoDigitPlusTens,
  mentalTenMoreLess,
  subtractMultiplesOfTen,
  understandHundreds,
  addSubtractWithin100,
];
