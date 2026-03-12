import type { Lesson } from '../../types';
import { oaLessons } from './oa';
import { nbtLessons } from './nbt';
import { mdLessons } from './md';
import { gLessons } from './g';
import { oaExtendedLessons } from './oa-extended';
import { grade2Lessons } from './grade2';

const lessons: Lesson[] = [
  ...oaLessons,
  ...nbtLessons,
  ...mdLessons,
  ...gLessons,
  ...oaExtendedLessons,
  ...grade2Lessons,
];

const lessonMap = new Map<string, Lesson>(lessons.map(l => [l.skillId, l]));

export function getLesson(skillId: string): Lesson | undefined {
  return lessonMap.get(skillId);
}

export { lessons };
