import type { Problem, ProblemGenerator, ScaffoldingLevel, QuestionPart } from '../../types';
import { randomInt, generateId, shuffle } from './utils';

function clockFace(hour: number, minute: number): string {
  const mm = minute.toString().padStart(2, '0');
  return `${hour}:${mm}`;
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

// ============================================
// Tell Time to Five Minutes (2.MD.C.7)
// ============================================
const tellTimeFiveMinutes: ProblemGenerator = {
  skillId: 'tell-time-five-minutes',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const hour = randomInt(1, 12);
    // Minutes in 5-minute increments, excluding :00 and :30 (those are covered by other skills)
    const fiveMinOptions = [5, 10, 15, 20, 25, 35, 40, 45, 50, 55];
    const minute = fiveMinOptions[randomInt(0, fiveMinOptions.length - 1)];
    const minuteStr = minute < 10 ? `0${minute}` : `${minute}`;
    const correctTime = `${hour}:${minuteStr}`;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    // Which number the minute hand points to (minute / 5)
    const minuteNumber = minute / 5;

    switch (scaffolding) {
      case 'concrete':
        question = `Look at the clock: ${clockFace(hour, minute)}. The short hand is near ${hour}. The long hand points to ${minuteNumber}. What time is it?`;
        questionParts = [
          { type: 'image', value: `clock-${hour}-${minuteStr}` },
          { type: 'text', value: `Short hand: near ${hour}` },
          { type: 'text', value: `Long hand: on ${minuteNumber}` },
          { type: 'text', value: 'What time is it?' },
        ];
        hint = `The long hand on ${minuteNumber} means ${minute} minutes. Count by fives: 5, 10, 15... up to the ${minuteNumber}.`;
        break;
      case 'representational':
        question = `The clock shows ${clockFace(hour, minute)}. The minute hand is on ${minuteNumber}. What time is it?`;
        questionParts = [
          { type: 'image', value: `clock-${hour}-${minuteStr}` },
          { type: 'text', value: 'What time?' },
        ];
        hint = `Each number on the clock means 5 more minutes. Count by 5s from 12 to the minute hand.`;
        break;
      case 'abstract':
        question = `What time does this clock show? ${clockFace(hour, minute)}`;
        questionParts = [
          { type: 'image', value: `clock-${hour}-${minuteStr}` },
        ];
        hint = `Read the hour hand first, then count the minutes by fives.`;
        break;
    }

    // Generate wrong time choices
    const wrongTimes: string[] = [];
    const nextHour = hour === 12 ? 1 : hour + 1;
    const prevHour = hour === 1 ? 12 : hour - 1;
    const wrongMin1 = minute >= 55 ? minute - 10 : minute + 5;
    const wrongMin2 = minute <= 5 ? minute + 10 : minute - 5;
    wrongTimes.push(`${nextHour}:${minuteStr}`);
    wrongTimes.push(`${hour}:${wrongMin1 < 10 ? '0' + wrongMin1 : wrongMin1}`);
    wrongTimes.push(`${prevHour}:${wrongMin2 < 10 ? '0' + wrongMin2 : wrongMin2}`);
    const choices = shuffle([correctTime, ...wrongTimes]);

    return {
      id: generateId(),
      skillId: 'tell-time-five-minutes',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: correctTime,
      choices,
      hint,
      explanation: `The time is ${correctTime}. The hour hand is near ${hour} and the minute hand points to ${minuteNumber}, which means ${minute} minutes past the hour.`,
    };
  },
};

export const timeGenerators: ProblemGenerator[] = [
  tellTimeHour,
  tellTimeHalfHour,
  tellTimeFiveMinutes,
];
