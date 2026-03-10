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
        question = `${template}\n\nUse dots to help: ${dots(start)} + ${dots(added)}`;
        questionParts = [
          { type: 'text', value: template },
          { type: 'dots', value: dots(start), count: start },
          { type: 'text', value: '+' },
          { type: 'dots', value: dots(added), count: added },
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
        hint = `This is an addition problem. ${start} + ${added} = ?`;
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
        const remaining = start - removed;
        const visual = '●'.repeat(remaining) + '✕'.repeat(removed);
        question = `${template}\n\nCross out ${removed}: ${visual}`;
        questionParts = [
          { type: 'text', value: template },
          { type: 'dots', value: dots(start), count: start },
          { type: 'text', value: `Cross out ${removed}.` },
        ];
        hint = `Start with ${start} dots. Cross out ${removed}. Count what is left.`;
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
        hint = `This is a subtraction problem. ${start} - ${removed} = ?`;
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
    const askTotal = Math.random() > 0.3;

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
          question = `${template}\n\n${dots(groupA)} and ${dots(groupB)}`;
          questionParts = [
            { type: 'text', value: template },
            { type: 'dots', value: dots(groupA), count: groupA },
            { type: 'text', value: 'and' },
            { type: 'dots', value: dots(groupB), count: groupB },
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
          hint = `${groupA} + ${groupB} = ?`;
          break;
      }
    } else {
      // Unknown addend version: tell total and one part, ask for other part
      correctAnswer = groupB;
      const template = `${name} has ${answer} ${object}. ${groupA} are on the table. The rest are in a box. How many ${object} are in the box?`;

      switch (scaffolding) {
        case 'concrete':
          question = `${template}\n\nTotal: ${dots(answer)}. On table: ${dots(groupA)}. In box: ?`;
          questionParts = [
            { type: 'text', value: template },
            { type: 'text', value: `Total: ${answer}` },
            { type: 'dots', value: dots(answer), count: answer },
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
          hint = `${answer} - ${groupA} = ? or ${groupA} + ? = ${answer}`;
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
        question = `${template}\n\n${name1}: ${dots(bigger)}\n${name2}: ${dots(smaller)}`;
        questionParts = [
          { type: 'text', value: template },
          { type: 'text', value: `${name1}:` },
          { type: 'dots', value: dots(bigger), count: bigger },
          { type: 'text', value: `${name2}:` },
          { type: 'dots', value: dots(smaller), count: smaller },
        ];
        hint = `Line up the dots and see how many extra ${name1} has.`;
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
        hint = `Compare by subtracting: ${bigger} - ${smaller} = ?`;
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

export const wordProblemGenerators: ProblemGenerator[] = [
  wordProblemsAddTo,
  wordProblemsTakeFrom,
  wordProblemsPutTogether,
  wordProblemsCompare,
];
