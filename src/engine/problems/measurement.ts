import type { Problem, ProblemGenerator, ScaffoldingLevel, QuestionPart } from '../../types';

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let problemCounter = 0;
function generateId(): string {
  return `prob-${Date.now()}-${++problemCounter}-${randomInt(1000, 9999)}`;
}

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

interface LengthObject {
  name: string;
  typicalLength: number; // in relative units
}

const SHORT_OBJECTS: LengthObject[] = [
  { name: 'paper clip', typicalLength: 1 },
  { name: 'eraser', typicalLength: 2 },
  { name: 'key', typicalLength: 2 },
  { name: 'crayon', typicalLength: 3 },
];

const MEDIUM_OBJECTS: LengthObject[] = [
  { name: 'pencil', typicalLength: 5 },
  { name: 'book', typicalLength: 7 },
  { name: 'ruler', typicalLength: 8 },
  { name: 'shoe', typicalLength: 6 },
];

const LONG_OBJECTS: LengthObject[] = [
  { name: 'desk', typicalLength: 12 },
  { name: 'door', typicalLength: 15 },
  { name: 'table', typicalLength: 10 },
  { name: 'window', typicalLength: 9 },
];

const MEASURE_UNITS = ['paper clips', 'cubes', 'blocks', 'erasers'];

// ============================================
// Order Objects by Length
// ============================================
const orderObjectsByLength: ProblemGenerator = {
  skillId: 'order-objects-by-length',
  generate(scaffolding: ScaffoldingLevel): Problem {
    // Pick 3 objects of different sizes
    const shortObj = SHORT_OBJECTS[randomInt(0, SHORT_OBJECTS.length - 1)];
    const medObj = MEDIUM_OBJECTS[randomInt(0, MEDIUM_OBJECTS.length - 1)];
    const longObj = LONG_OBJECTS[randomInt(0, LONG_OBJECTS.length - 1)];

    const objects = shuffle([shortObj, medObj, longObj]);
    const sortedByLength = [...objects].sort((a, b) => a.typicalLength - b.typicalLength);
    const shortestName = sortedByLength[0].name;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete': {
        const visuals = objects.map(o => `${o.name}: ${'━'.repeat(o.typicalLength)}`).join('\n');
        question = `Look at these objects:\n${visuals}\n\nWhich one is the shortest?`;
        questionParts = [
          { type: 'text', value: 'Which is shortest?' },
          ...objects.map(o => ({
            type: 'text' as const,
            value: `${o.name}: ${'━'.repeat(o.typicalLength)}`,
          })),
        ];
        hint = `Compare the lines. The shortest line shows the shortest object.`;
        break;
      }
      case 'representational':
        question = `These objects have different lengths:\n${objects.map(o => `${o.name}: ${o.typicalLength} units long`).join(', ')}.\n\nWhich is the shortest?`;
        questionParts = [
          { type: 'text', value: 'Which is shortest?' },
          ...objects.map(o => ({
            type: 'text' as const,
            value: `${o.name}: ${o.typicalLength} units`,
          })),
        ];
        hint = `Compare the numbers. The smallest number is the shortest.`;
        break;
      case 'abstract':
        question = `Order from shortest to longest: ${objects.map(o => o.name).join(', ')}. Which is shortest?`;
        questionParts = [
          { type: 'text', value: `Which is shortest: ${objects.map(o => o.name).join(', ')}?` },
        ];
        hint = `Think about each object. Which one is the smallest in real life?`;
        break;
    }

    const choices = shuffle(objects.map(o => o.name));

    return {
      id: generateId(),
      skillId: 'order-objects-by-length',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: shortestName,
      choices,
      hint,
      explanation: `The ${shortestName} is the shortest. In order from shortest to longest: ${sortedByLength.map(o => o.name).join(', ')}.`,
    };
  },
};

// ============================================
// Measure with Nonstandard Units
// ============================================
const measureNonstandardUnits: ProblemGenerator = {
  skillId: 'measure-nonstandard-units',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const unit = MEASURE_UNITS[randomInt(0, MEASURE_UNITS.length - 1)];
    const object = MEDIUM_OBJECTS[randomInt(0, MEDIUM_OBJECTS.length - 1)];
    const length = randomInt(3, 10);

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete': {
        const unitVisual = '▢'.repeat(length);
        const objectVisual = '━'.repeat(length * 2);
        question = `The ${object.name} is this long: ${objectVisual}\nEach ${unit.slice(0, -1)} is: ▢\nCount the ${unit}: ${unitVisual}\nHow many ${unit} long is the ${object.name}?`;
        questionParts = [
          { type: 'text', value: `${object.name}:` },
          { type: 'text', value: objectVisual },
          { type: 'text', value: `Measured in ${unit}:` },
          { type: 'text', value: unitVisual },
          { type: 'text', value: `How many ${unit}?` },
        ];
        hint = `Count each ▢ one by one.`;
        break;
      }
      case 'representational':
        question = `A ${object.name} is measured using ${unit}. It takes ${length} ${unit} laid end to end. How many ${unit} long is it?`;
        questionParts = [
          { type: 'text', value: `${object.name} = ? ${unit}` },
          { type: 'text', value: `You used ${length} ${unit}.` },
        ];
        hint = `How many ${unit} did you line up?`;
        break;
      case 'abstract':
        question = `A ${object.name} is ${length} ${unit} long. How many ${unit} long is the ${object.name}?`;
        questionParts = [
          { type: 'text', value: `${object.name} = ? ${unit}` },
        ];
        hint = `The answer is already in the problem!`;
        break;
    }

    const wrong1 = Math.max(1, length - 1);
    const wrong2 = length + 1;
    const wrong3 = length + 2;
    const choices = shuffle([
      length.toString(),
      wrong1.toString(),
      wrong2.toString(),
      wrong3.toString(),
    ]);

    return {
      id: generateId(),
      skillId: 'measure-nonstandard-units',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: length.toString(),
      choices,
      hint,
      explanation: `The ${object.name} is ${length} ${unit} long. When we measure, we line up ${unit} end to end and count them.`,
    };
  },
};

export const measurementGenerators: ProblemGenerator[] = [
  orderObjectsByLength,
  measureNonstandardUnits,
];
