export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let problemCounter = 0;
export function generateId(): string {
  return `prob-${Date.now()}-${++problemCounter}-${randomInt(1000, 9999)}`;
}

export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function dots(n: number): string {
  return '●'.repeat(n);
}

export function crossedDots(total: number, crossed: number): string {
  const remaining = total - crossed;
  return '●'.repeat(remaining) + '✕'.repeat(crossed);
}

export function generateWrongAnswers(correct: number, count: number, min: number, max: number): number[] {
  const wrong = new Set<number>();
  const candidates = [correct + 1, correct - 1, correct + 2, correct - 2, correct + 10, correct - 10];
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

export function makeChoices(correct: number, min: number, max: number): string[] {
  const wrongAnswers = generateWrongAnswers(correct, 3, min, max);
  return shuffle([correct.toString(), ...wrongAnswers.map(String)]);
}
