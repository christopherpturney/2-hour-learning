import type { Problem, ProblemGenerator, ScaffoldingLevel, QuestionPart } from '../../types';
import { randomInt, generateId, makeChoices } from './utils';

const NAMES = ['Emma', 'Liam', 'Noah', 'Olivia', 'Ava', 'Mia', 'Lucas', 'Sophia', 'Ethan', 'Isabella', 'Aiden', 'Zoe', 'Jack', 'Lily', 'Ben', 'Chloe'];

const OBJECTS = ['apples', 'books', 'stickers', 'crayons', 'toy cars', 'cookies', 'marbles', 'pencils', 'flowers', 'stars', 'blocks', 'balloons', 'fish', 'buttons', 'shells'];

function pickName(exclude?: string): string {
  const available = exclude ? NAMES.filter(n => n !== exclude) : NAMES;
  return available[randomInt(0, available.length - 1)];
}

function pickObject(): string {
  return OBJECTS[randomInt(0, OBJECTS.length - 1)];
}

// ============================================
// Word Problems: Add To
// ============================================
const wordProblemsAddTo: ProblemGenerator = {
  skillId: 'word-problems-add-to',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const name = pickName();
    const object = pickObject();
    const start = randomInt(1, 10);
    const added = randomInt(1, 10);
    const answer = start + added;

    // Vary the word problem template
    const templates = [
      `${name} has ${start} ${object}. ${name} gets ${added} more ${object}. How many ${object} does ${name} have now?`,
      `There are ${start} ${object} on the table. ${name} puts ${added} more ${object} on the table. How many ${object} are on the table now?`,
      `${name} found ${start} ${object}. Then ${name} found ${added} more. How many ${object} did ${name} find in all?`,
    ];
    const template = templates[randomInt(0, templates.length - 1)];

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `${template}\n\nUse counters to help: ${start} + ${added}`;
        questionParts = [
          { type: 'text', value: template },
          { type: 'image', value: `counters-${start}-${added}` },
        ];
        hint = `Count the first group (${start}), then count on the second group (${added}).`;
        break;
      case 'representational':
        question = template;
        questionParts = [
          { type: 'text', value: template },
          { type: 'equation', value: `${start} + ${added} = ?` },
        ];
        hint = `Write the number sentence: ${start} + ${added} = ?`;
        break;
      case 'abstract':
        question = template;
        questionParts = [
          { type: 'text', value: template },
        ];
        hint = `Read the story carefully. What happens to the number of ${object}?`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'word-problems-add-to',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, 0, 20),
      hint,
      explanation: `${name} started with ${start} ${object} and got ${added} more. ${start} + ${added} = ${answer}. ${name} has ${answer} ${object} now.`,
    };
  },
};

// ============================================
// Word Problems: Take From
// ============================================
const wordProblemsTakeFrom: ProblemGenerator = {
  skillId: 'word-problems-take-from',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const name = pickName();
    const object = pickObject();
    const start = randomInt(5, 15);
    const removed = randomInt(1, start);
    const answer = start - removed;

    const templates = [
      `${name} has ${start} ${object}. ${name} gives away ${removed} ${object}. How many ${object} does ${name} have left?`,
      `There are ${start} ${object} on a shelf. ${name} takes ${removed} ${object}. How many ${object} are left on the shelf?`,
      `${name} had ${start} ${object}. ${removed} ${object} fell down. How many ${object} are left?`,
    ];
    const template = templates[randomInt(0, templates.length - 1)];

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete': {
        question = `${template}\n\nCross out ${removed}:`;
        questionParts = [
          { type: 'text', value: template },
          { type: 'image', value: `counters-${start}-cross-${removed}` },
          { type: 'text', value: `Cross out ${removed}.` },
        ];
        hint = `Start with ${start} counters. Cross out ${removed}. Count what is left.`;
        break;
      }
      case 'representational':
        question = template;
        questionParts = [
          { type: 'text', value: template },
          { type: 'equation', value: `${start} - ${removed} = ?` },
        ];
        hint = `Write the number sentence: ${start} - ${removed} = ?`;
        break;
      case 'abstract':
        question = template;
        questionParts = [
          { type: 'text', value: template },
        ];
        hint = `Read the story carefully. What happens to the number of ${object}?`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'word-problems-take-from',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, 0, 20),
      hint,
      explanation: `${name} started with ${start} ${object} and ${removed} were taken away. ${start} - ${removed} = ${answer}. There are ${answer} ${object} left.`,
    };
  },
};

// ============================================
// Word Problems: Put Together / Take Apart
// ============================================
const wordProblemsPutTogether: ProblemGenerator = {
  skillId: 'word-problems-put-together',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const name = pickName();
    const object = pickObject();
    const groupA = randomInt(1, 10);
    const groupB = randomInt(1, 10);
    const answer = groupA + groupB;

    // Sometimes ask for total, sometimes ask for one part (unknown addend)
    const askTotal = Math.random() > 0.5;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;
    let correctAnswer: number;

    if (askTotal) {
      correctAnswer = answer;
      const adjA = ['red', 'big', 'round', 'new'][randomInt(0, 3)];
      const adjB = ['blue', 'small', 'square', 'old'][randomInt(0, 3)];
      const templates = [
        `${name} has ${groupA} ${adjA} ${object} and ${groupB} ${adjB} ${object}. How many ${object} does ${name} have in all?`,
        `In a bag there are ${groupA} ${adjA} ${object} and ${groupB} ${adjB} ${object}. How many ${object} are in the bag?`,
      ];
      const template = templates[randomInt(0, templates.length - 1)];

      switch (scaffolding) {
        case 'concrete':
          question = `${template}\n\n${groupA} and ${groupB}`;
          questionParts = [
            { type: 'text', value: template },
            { type: 'image', value: `counters-${groupA}` },
            { type: 'text', value: 'and' },
            { type: 'image', value: `counters-${groupB}` },
          ];
          hint = `Put both groups together and count them all.`;
          break;
        case 'representational':
          question = template;
          questionParts = [
            { type: 'text', value: template },
            { type: 'equation', value: `${groupA} + ${groupB} = ?` },
          ];
          hint = `Add the two groups: ${groupA} + ${groupB} = ?`;
          break;
        case 'abstract':
          question = template;
          questionParts = [
            { type: 'text', value: template },
          ];
          hint = `How can you find the total number of ${object}?`;
          break;
      }
    } else {
      // Unknown addend version: tell total and one part, ask for other part
      correctAnswer = groupB;
      const template = `${name} has ${answer} ${object}. ${groupA} are on the table. The rest are in a box. How many ${object} are in the box?`;

      switch (scaffolding) {
        case 'concrete':
          question = `${template}\n\nTotal: ${answer}. On table: ${groupA}. In box: ?`;
          questionParts = [
            { type: 'text', value: template },
            { type: 'text', value: `Total: ${answer}` },
            { type: 'image', value: `counters-${answer}` },
            { type: 'text', value: `On table: ${groupA}` },
          ];
          hint = `Start with ${answer} total. Take away the ${groupA} on the table. What is left?`;
          break;
        case 'representational':
          question = template;
          questionParts = [
            { type: 'text', value: template },
            { type: 'equation', value: `${groupA} + ? = ${answer}` },
          ];
          hint = `${groupA} + ? = ${answer}. What goes in the blank?`;
          break;
        case 'abstract':
          question = template;
          questionParts = [
            { type: 'text', value: template },
          ];
          hint = `You know the total and one part. How can you find the other part?`;
          break;
      }
    }

    return {
      id: generateId(),
      skillId: 'word-problems-put-together',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: correctAnswer.toString(),
      choices: makeChoices(correctAnswer, 0, 20),
      hint,
      explanation: askTotal
        ? `Put the groups together: ${groupA} + ${groupB} = ${answer}. There are ${answer} ${object} in all.`
        : `${answer} total - ${groupA} on the table = ${groupB} in the box. ${groupA} + ${groupB} = ${answer}.`,
    };
  },
};

// ============================================
// Word Problems: Compare
// ============================================
const wordProblemsCompare: ProblemGenerator = {
  skillId: 'word-problems-compare',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const name1 = pickName();
    const name2 = pickName(name1);
    const object = pickObject();
    const bigger = randomInt(5, 15);
    const smaller = randomInt(1, bigger - 1);
    const difference = bigger - smaller;

    // Vary the question type
    const questionType = randomInt(0, 2);
    let template: string;
    let correctAnswer: number;

    switch (questionType) {
      case 0:
        // How many more?
        template = `${name1} has ${bigger} ${object}. ${name2} has ${smaller} ${object}. How many more ${object} does ${name1} have than ${name2}?`;
        correctAnswer = difference;
        break;
      case 1:
        // How many fewer?
        template = `${name1} has ${bigger} ${object}. ${name2} has ${smaller} ${object}. How many fewer ${object} does ${name2} have than ${name1}?`;
        correctAnswer = difference;
        break;
      default:
        // Who has more and by how much?
        template = `${name1} has ${bigger} ${object}. ${name2} has ${smaller} ${object}. What is the difference?`;
        correctAnswer = difference;
        break;
    }

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `${template}\n\n${name1}: ${bigger}\n${name2}: ${smaller}`;
        questionParts = [
          { type: 'text', value: template },
          { type: 'text', value: `${name1}:` },
          { type: 'image', value: `counters-${bigger}` },
          { type: 'text', value: `${name2}:` },
          { type: 'image', value: `counters-${smaller}` },
        ];
        hint = `Line up the counters and see how many extra ${name1} has.`;
        break;
      case 'representational':
        question = template;
        questionParts = [
          { type: 'text', value: template },
          { type: 'equation', value: `${bigger} - ${smaller} = ?` },
        ];
        hint = `Subtract to find the difference: ${bigger} - ${smaller} = ?`;
        break;
      case 'abstract':
        question = template;
        questionParts = [
          { type: 'text', value: template },
        ];
        hint = `Think about the difference between the two amounts.`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'word-problems-compare',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: correctAnswer.toString(),
      choices: makeChoices(correctAnswer, 0, 15),
      hint,
      explanation: `${name1} has ${bigger} and ${name2} has ${smaller}. The difference is ${bigger} - ${smaller} = ${difference}. ${name1} has ${difference} more ${object}.`,
    };
  },
};

// ============================================
// Word Problems: Add To (Change Unknown)
// ============================================
const wordProblemsAddToChange: ProblemGenerator = {
  skillId: 'word-problems-add-to-change',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const name = pickName();
    const object = pickObject();
    const start = randomInt(1, 10);
    const total = randomInt(start + 1, start + 10);
    const answer = total - start;

    const templates = [
      `${name} has ${start} ${object}. ${name} gets some more ${object}. Now ${name} has ${total} ${object}. How many ${object} did ${name} get?`,
      `There are ${start} ${object} on a table. ${name} puts some more on the table. Now there are ${total} ${object}. How many did ${name} put on the table?`,
      `${name} had ${start} ${object} in a bag. After getting some more, ${name} has ${total}. How many more ${object} did ${name} get?`,
    ];
    const template = templates[randomInt(0, templates.length - 1)];

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `${template}\n\nStarted with: ${start}\nEnded with: ${total}`;
        questionParts = [
          { type: 'text', value: template },
          { type: 'text', value: 'Started with:' },
          { type: 'image', value: `counters-${start}` },
          { type: 'text', value: 'Ended with:' },
          { type: 'image', value: `counters-${total}` },
        ];
        hint = `You started with ${start}. You ended with ${total}. Count up from ${start} to ${total}.`;
        break;
      case 'representational':
        question = template;
        questionParts = [
          { type: 'text', value: template },
          { type: 'equation', value: `${start} + ? = ${total}` },
        ];
        hint = `${start} + ? = ${total}. What number goes in the blank?`;
        break;
      case 'abstract':
        question = template;
        questionParts = [
          { type: 'text', value: template },
        ];
        hint = `Think about what changed between the beginning and end of the story.`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'word-problems-add-to-change',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, 0, 20),
      hint,
      explanation: `${name} started with ${start} and ended with ${total}. ${total} - ${start} = ${answer}. ${name} got ${answer} more ${object}.`,
    };
  },
};

// ============================================
// Word Problems: Add To (Start Unknown)
// ============================================
const wordProblemsAddToStart: ProblemGenerator = {
  skillId: 'word-problems-add-to-start',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const name = pickName();
    const object = pickObject();
    const added = randomInt(1, 10);
    const total = randomInt(added + 1, added + 10);
    const answer = total - added;

    const templates = [
      `${name} had some ${object}. ${name} got ${added} more. Now ${name} has ${total}. How many did ${name} have at first?`,
      `Some ${object} were on a shelf. ${name} put ${added} more on the shelf. Now there are ${total} ${object}. How many were on the shelf at first?`,
      `There were some ${object} in a box. ${name} added ${added} more. Now there are ${total}. How many were in the box at first?`,
    ];
    const template = templates[randomInt(0, templates.length - 1)];

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `${template}\n\nAdded: ${added}\nTotal: ${total}`;
        questionParts = [
          { type: 'text', value: template },
          { type: 'text', value: 'Added:' },
          { type: 'image', value: `counters-${added}` },
          { type: 'text', value: 'Total:' },
          { type: 'image', value: `counters-${total}` },
        ];
        hint = `The total is ${total}. If ${added} were added, how many were there before?`;
        break;
      case 'representational':
        question = template;
        questionParts = [
          { type: 'text', value: template },
          { type: 'equation', value: `? + ${added} = ${total}` },
        ];
        hint = `? + ${added} = ${total}. What number goes in the blank?`;
        break;
      case 'abstract':
        question = template;
        questionParts = [
          { type: 'text', value: template },
        ];
        hint = `You know the end and what was added. Think about how many there were before.`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'word-problems-add-to-start',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, 0, 20),
      hint,
      explanation: `${name} ended with ${total} and ${added} were added. ${total} - ${added} = ${answer}. ${name} had ${answer} ${object} at first.`,
    };
  },
};

// ============================================
// Word Problems: Take From (Change Unknown)
// ============================================
const wordProblemsTakeFromChange: ProblemGenerator = {
  skillId: 'word-problems-take-from-change',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const name = pickName();
    const object = pickObject();
    const start = randomInt(5, 15);
    const remainder = randomInt(1, start - 1);
    const answer = start - remainder;

    const templates = [
      `${name} had ${start} ${object}. ${name} gave some away. Now ${name} has ${remainder} ${object}. How many did ${name} give away?`,
      `There were ${start} ${object} on a shelf. Some fell off. Now there are ${remainder}. How many fell off?`,
      `${name} had ${start} ${object}. After losing some, ${name} has ${remainder} left. How many did ${name} lose?`,
    ];
    const template = templates[randomInt(0, templates.length - 1)];

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `${template}\n\nStarted with: ${start}\nNow: ${remainder}`;
        questionParts = [
          { type: 'text', value: template },
          { type: 'text', value: 'Started with:' },
          { type: 'image', value: `counters-${start}` },
          { type: 'text', value: 'Now:' },
          { type: 'image', value: `counters-${remainder}` },
        ];
        hint = `Start with ${start}. Now there are ${remainder}. How many are gone?`;
        break;
      case 'representational':
        question = template;
        questionParts = [
          { type: 'text', value: template },
          { type: 'equation', value: `${start} - ? = ${remainder}` },
        ];
        hint = `${start} - ? = ${remainder}. What number goes in the blank?`;
        break;
      case 'abstract':
        question = template;
        questionParts = [
          { type: 'text', value: template },
        ];
        hint = `Think about how many are missing between the start and what is left.`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'word-problems-take-from-change',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, 0, 20),
      hint,
      explanation: `${name} started with ${start} and now has ${remainder}. ${start} - ${remainder} = ${answer}. ${name} gave away ${answer} ${object}.`,
    };
  },
};

// ============================================
// Word Problems: Take From (Start Unknown)
// ============================================
const wordProblemsTakeFromStart: ProblemGenerator = {
  skillId: 'word-problems-take-from-start',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const name = pickName();
    const object = pickObject();
    const removed = randomInt(1, 10);
    const remainder = randomInt(1, 10);
    const answer = removed + remainder;

    const templates = [
      `${name} had some ${object}. ${name} gave away ${removed}. Now ${name} has ${remainder} left. How many did ${name} have at first?`,
      `Some ${object} were in a box. ${name} took out ${removed}. Now there are ${remainder} left. How many were in the box at first?`,
      `${name} had some ${object}. After ${removed} broke, ${name} has ${remainder} left. How many did ${name} start with?`,
    ];
    const template = templates[randomInt(0, templates.length - 1)];

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `${template}\n\nLeft: ${remainder} Gone: ${removed}`;
        questionParts = [
          { type: 'text', value: template },
          { type: 'text', value: 'Left:' },
          { type: 'image', value: `counters-${remainder}` },
          { type: 'text', value: 'Gone:' },
          { type: 'image', value: `counters-${removed}` },
        ];
        hint = `Put back together what is left (${remainder}) and what was taken away (${removed}).`;
        break;
      case 'representational':
        question = template;
        questionParts = [
          { type: 'text', value: template },
          { type: 'equation', value: `? - ${removed} = ${remainder}` },
        ];
        hint = `? - ${removed} = ${remainder}. What number goes in the blank?`;
        break;
      case 'abstract':
        question = template;
        questionParts = [
          { type: 'text', value: template },
        ];
        hint = `You know what was taken away and what is left. Think about how many there were before.`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'word-problems-take-from-start',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, 0, 20),
      hint,
      explanation: `${removed} were taken away and ${remainder} are left. ${removed} + ${remainder} = ${answer}. ${name} had ${answer} ${object} at first.`,
    };
  },
};

// ============================================
// Word Problems: Compare (Bigger Unknown)
// ============================================
const wordProblemsCompareBigger: ProblemGenerator = {
  skillId: 'word-problems-compare-bigger',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const name1 = pickName();
    const name2 = pickName(name1);
    const object = pickObject();
    const smaller = randomInt(1, 10);
    const difference = randomInt(1, 8);
    const answer = smaller + difference;

    const templates = [
      `${name2} has ${smaller} ${object}. ${name1} has ${difference} more ${object} than ${name2}. How many ${object} does ${name1} have?`,
      `${name2} found ${smaller} ${object}. ${name1} found ${difference} more than ${name2}. How many did ${name1} find?`,
      `${name1} has ${difference} more ${object} than ${name2}. ${name2} has ${smaller} ${object}. How many ${object} does ${name1} have?`,
    ];
    const template = templates[randomInt(0, templates.length - 1)];

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `${template}\n\n${name2}: ${smaller}\n${name1}: ${smaller} + ${difference}`;
        questionParts = [
          { type: 'text', value: template },
          { type: 'text', value: `${name2}:` },
          { type: 'image', value: `counters-${smaller}` },
          { type: 'text', value: `${name1}: same as ${name2}, plus ${difference} more` },
          { type: 'image', value: `counters-${smaller}-${difference}` },
        ];
        hint = `${name1} has all that ${name2} has, plus ${difference} more.`;
        break;
      case 'representational':
        question = template;
        questionParts = [
          { type: 'text', value: template },
          { type: 'equation', value: `${smaller} + ${difference} = ?` },
        ];
        hint = `${name2} has ${smaller}. ${name1} has ${difference} more. ${smaller} + ${difference} = ?`;
        break;
      case 'abstract':
        question = template;
        questionParts = [
          { type: 'text', value: template },
        ];
        hint = `One person has more than the other. Think about how to find the bigger amount.`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'word-problems-compare-bigger',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, 0, 20),
      hint,
      explanation: `${name2} has ${smaller} and ${name1} has ${difference} more. ${smaller} + ${difference} = ${answer}. ${name1} has ${answer} ${object}.`,
    };
  },
};

// ============================================
// Word Problems: Compare (Smaller Unknown)
// ============================================
const wordProblemsCompareSmaller: ProblemGenerator = {
  skillId: 'word-problems-compare-smaller',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const name1 = pickName();
    const name2 = pickName(name1);
    const object = pickObject();
    const bigger = randomInt(5, 15);
    const difference = randomInt(1, bigger - 1);
    const answer = bigger - difference;

    const templates = [
      `${name1} has ${bigger} ${object}. ${name1} has ${difference} more than ${name2}. How many ${object} does ${name2} have?`,
      `${name1} collected ${bigger} ${object}. ${name2} collected ${difference} fewer. How many did ${name2} collect?`,
      `${name2} has ${difference} fewer ${object} than ${name1}. ${name1} has ${bigger} ${object}. How many does ${name2} have?`,
    ];
    const template = templates[randomInt(0, templates.length - 1)];

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete': {
        question = `${template}\n\n${name1}: ${bigger}\n${name2}: ?`;
        questionParts = [
          { type: 'text', value: template },
          { type: 'text', value: `${name1}:` },
          { type: 'image', value: `counters-${bigger}` },
          { type: 'text', value: `${name2} has ${difference} fewer` },
        ];
        hint = `${name1} has ${bigger}. ${name2} has ${difference} fewer. Take away ${difference} from ${bigger}.`;
        break;
      }
      case 'representational':
        question = template;
        questionParts = [
          { type: 'text', value: template },
          { type: 'equation', value: `${bigger} - ${difference} = ?` },
        ];
        hint = `${name1} has ${bigger}. ${name2} has ${difference} fewer. ${bigger} - ${difference} = ?`;
        break;
      case 'abstract':
        question = template;
        questionParts = [
          { type: 'text', value: template },
        ];
        hint = `One person has fewer than the other. Think about how to find the smaller amount.`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'word-problems-compare-smaller',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, 0, 15),
      hint,
      explanation: `${name1} has ${bigger} and ${name2} has ${difference} fewer. ${bigger} - ${difference} = ${answer}. ${name2} has ${answer} ${object}.`,
    };
  },
};

// ============================================
// Word Problems Within 100 (2.OA.A.1)
// ============================================
const wordProblemsWithin100: ProblemGenerator = {
  skillId: 'word-problems-within-100',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const name = pickName();
    const object = pickObject();
    const isTwoStep = Math.random() > 0.5;

    let template: string;
    let answer: number;

    if (isTwoStep) {
      // Two-step: add then subtract, or add then add
      const a = randomInt(10, 40);
      const b = randomInt(5, 30);
      const c = randomInt(5, 20);
      const addThenSubtract = Math.random() > 0.5;
      if (addThenSubtract) {
        answer = a + b - c;
        template = `${name} has ${a} ${object}. ${name} gets ${b} more. Then ${name} gives away ${c}. How many ${object} does ${name} have now?`;
      } else {
        answer = a + b + c;
        template = `${name} has ${a} ${object}. ${name} finds ${b} more. Then ${name} gets ${c} more as a gift. How many ${object} does ${name} have now?`;
      }
    } else {
      // One-step with larger numbers
      const isAddition = Math.random() > 0.5;
      if (isAddition) {
        const a = randomInt(20, 60);
        const b = randomInt(10, 100 - a);
        answer = a + b;
        template = `${name} has ${a} ${object}. ${name} gets ${b} more. How many ${object} does ${name} have now?`;
      } else {
        const a = randomInt(30, 90);
        const b = randomInt(10, a);
        answer = a - b;
        template = `${name} has ${a} ${object}. ${name} gives away ${b}. How many ${object} does ${name} have left?`;
      }
    }

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = template;
        questionParts = [
          { type: 'text', value: template },
          { type: 'text', value: 'Use tens and ones to help.' },
        ];
        hint = isTwoStep
          ? `This is a two-step problem. Solve one part first, then use that answer for the next part.`
          : `Break the numbers into tens and ones to help you add or subtract.`;
        break;
      case 'representational':
        question = template;
        questionParts = [
          { type: 'text', value: template },
          { type: 'text', value: 'Write a number sentence to solve.' },
        ];
        hint = isTwoStep
          ? `Write two number sentences, one for each step.`
          : `Write a number sentence for this story. What operation do you need?`;
        break;
      case 'abstract':
        question = template;
        questionParts = [
          { type: 'text', value: template },
        ];
        hint = isTwoStep
          ? `Read carefully. There are two things happening in this story.`
          : `What is happening in this story? Is the number getting bigger or smaller?`;
        break;
    }

    return {
      id: generateId(),
      skillId: 'word-problems-within-100',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, Math.max(0, answer - 10), Math.min(100, answer + 10)),
      hint,
      explanation: `The answer is ${answer}. ${isTwoStep ? 'This was a two-step problem. Solve each step one at a time.' : ''}`,
    };
  },
};

export const wordProblemGenerators: ProblemGenerator[] = [
  wordProblemsAddTo,
  wordProblemsAddToChange,
  wordProblemsAddToStart,
  wordProblemsTakeFrom,
  wordProblemsTakeFromChange,
  wordProblemsTakeFromStart,
  wordProblemsPutTogether,
  wordProblemsCompare,
  wordProblemsCompareBigger,
  wordProblemsCompareSmaller,
  wordProblemsWithin100,
];
