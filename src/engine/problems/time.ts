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

// ============================================
// Tell Time to the Hour
// ============================================
const tellTimeHour: ProblemGenerator = {
  skillId: 'tell-time-hour',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const hour = randomInt(1, 12);
    const correctTime = `${hour}:00`;

    let question: string;
    let questionParts: QuestionPart[];
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `Look at the clock. The short hand points to a number and the long hand points to 12. What time is it?`;
        questionParts = [
          { type: 'image', value: `clock-${hour}-00` },
          { type: 'text', value: 'The short hand shows the hour.' },
          { type: 'text', value: 'The long hand on 12 means "o\'clock."' },
          { type: 'text', value: 'What time is it?' },
        ];
        hint = `The short hand (hour hand) tells the hour. The long hand on 12 means "o'clock."`;
        break;
      case 'representational':
        question = `Look at the clock. The minute hand is on 12. What time is it?`;
        questionParts = [
          { type: 'image', value: `clock-${hour}-00` },
          { type: 'text', value: 'What time?' },
        ];
        hint = `When the minute hand is on 12, it is "something o'clock." What number is the hour hand on?`;
        break;
      case 'abstract':
        question = `What time does this clock show?`;
        questionParts = [
          { type: 'image', value: `clock-${hour}-00` },
        ];
        hint = `Read the hour hand first, then the minute hand.`;
        break;
    }

    // Generate wrong time choices
    const wrongHour1 = hour === 12 ? 1 : hour + 1;
    const wrongHour2 = hour === 1 ? 12 : hour - 1;
    const wrongHour3 = hour > 6 ? hour - 6 : hour + 6;
    const choices = shuffle([
      correctTime,
      `${wrongHour1}:00`,
      `${wrongHour2}:00`,
      `${wrongHour3}:00`,
    ]);

    return {
      id: generateId(),
      skillId: 'tell-time-hour',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: correctTime,
      choices,
      hint,
      explanation: `The time is ${hour}:00 (${hour} o'clock). The short hand (hour hand) points to ${hour}, and the long hand (minute hand) points to 12, which means zero minutes.`,
    };
  },
};

// ============================================
// Tell Time to the Half Hour
// ============================================
const tellTimeHalfHour: ProblemGenerator = {
  skillId: 'tell-time-half-hour',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const hour = randomInt(1, 12);
    const correctTime = `${hour}:30`;
    const nextHour = hour === 12 ? 1 : hour + 1;

    let question: string;
    let questionParts: QuestionPart[];
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `Look at the clock. The short hand is between two numbers. The long hand points to 6. What time is it?`;
        questionParts = [
          { type: 'image', value: `clock-${hour}-30` },
          { type: 'text', value: 'The long hand on 6 means "thirty" or "half past."' },
          { type: 'text', value: 'What time is it?' },
        ];
        hint = `The long hand on 6 means "thirty" or "half past." Look at which hour the short hand just passed.`;
        break;
      case 'representational':
        question = `Look at the clock. The minute hand is on 6. What time is it?`;
        questionParts = [
          { type: 'image', value: `clock-${hour}-30` },
          { type: 'text', value: 'What time?' },
        ];
        hint = `Minute hand on 6 = half past the hour. What hour is it?`;
        break;
      case 'abstract':
        question = `What time does this clock show?`;
        questionParts = [
          { type: 'image', value: `clock-${hour}-30` },
        ];
        hint = `The minute hand is on 6 (half past).`;
        break;
    }

    const prevHour = hour === 1 ? 12 : hour - 1;
    const choices = shuffle([
      correctTime,
      `${nextHour}:30`,
      `${hour}:00`,
      `${prevHour}:30`,
    ]);

    return {
      id: generateId(),
      skillId: 'tell-time-half-hour',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: correctTime,
      choices,
      hint,
      explanation: `The time is ${hour}:30 (half past ${hour}). The short hand is between ${hour} and ${nextHour}, and the long hand points to 6, which means 30 minutes.`,
    };
  },
};

export const timeGenerators: ProblemGenerator[] = [
  tellTimeHour,
  tellTimeHalfHour,
];
