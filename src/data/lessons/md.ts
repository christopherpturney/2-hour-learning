import type { Lesson } from '../../types';

// MD — Measurement & Data
export const mdLessons: Lesson[] = [
  {
    skillId: 'order-objects-by-length',
    steps: [
      {
        type: 'concept',
        title: 'Comparing Lengths',
        content: 'To compare lengths, line objects up at one end. The one that sticks out further is longer. The one that ends first is shorter.',
        visual: [
          { type: 'text', value: '████████ (long)' },
          { type: 'text', value: '█████       (short)' },
        ],
        tip: 'Always line them up at the same starting point!',
      },
      {
        type: 'example',
        title: 'Watch: Two Pencils',
        content: 'Line up both pencils at the left. Pencil A sticks out further on the right. Pencil A is longer. Pencil B is shorter.',
        visual: [
          { type: 'text', value: 'A: ████████████' },
          { type: 'text', value: 'B: ████████' },
          { type: 'text', value: 'A is longer. B is shorter.' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Three Crayons',
        content: 'Line up all three. Red is longest. Blue is shortest. Green is in the middle. Order: Blue, Green, Red.',
        visual: [
          { type: 'text', value: 'Red:   ██████████' },
          { type: 'text', value: 'Green: ███████' },
          { type: 'text', value: 'Blue:  ████' },
          { type: 'text', value: 'Shortest to Longest: Blue, Green, Red' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Compare the objects. Which is longest? Which is shortest?',
      },
    ],
  },
  {
    skillId: 'measure-nonstandard-units',
    steps: [
      {
        type: 'concept',
        title: 'Measuring with Units',
        content: 'You can measure how long something is by laying small objects end to end with no gaps and no overlaps. Count how many fit.',
        visual: [
          { type: 'text', value: '█████████████████' },
          { type: 'text', value: '[□][□][□][□][□] = 5 units long' },
        ],
        tip: 'No gaps, no overlaps! Line them up carefully.',
      },
      {
        type: 'example',
        title: 'Watch: Measure a Book',
        content: 'Lay paper clips along the book end to end. Count: 1, 2, 3, 4, 5, 6. The book is 6 paper clips long.',
        visual: [
          { type: 'text', value: '[📎][📎][📎][📎][📎][📎]' },
          { type: 'equation', value: '6 paper clips long' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Measure a Desk',
        content: 'Lay cubes along the desk. Count: 1, 2, 3... 9. The desk is 9 cubes long.',
        visual: [
          { type: 'text', value: '[□][□][□][□][□][□][□][□][□]' },
          { type: 'equation', value: '9 cubes long' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Count the units carefully. How many fit along the object?',
      },
    ],
  },
  {
    skillId: 'tell-time-hour',
    steps: [
      {
        type: 'concept',
        title: 'Reading the Hour',
        content: 'A clock has two hands. The short hand points to the hour. When the long hand points to 12, it is exactly on the hour.',
        visual: [
          { type: 'image', value: 'clock-3-00' },
        ],
        tip: 'Short hand = hour. Long hand on 12 = o\'clock.',
      },
      {
        type: 'example',
        title: 'Watch: 3 O\'Clock',
        content: 'The short hand points to 3. The long hand points to 12. It is 3 o\'clock (3:00).',
        visual: [
          { type: 'image', value: 'clock-3-00' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 8 O\'Clock',
        content: 'The short hand points to 8. The long hand points to 12. It is 8 o\'clock (8:00).',
        visual: [
          { type: 'image', value: 'clock-8-00' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Look at the short hand. What number is it pointing to?',
      },
    ],
  },
  {
    skillId: 'tell-time-half-hour',
    steps: [
      {
        type: 'concept',
        title: 'Half Past the Hour',
        content: 'When the long hand points to 6, it is half past the hour. The short hand will be between two numbers.',
        visual: [
          { type: 'image', value: 'clock-3-30' },
        ],
        tip: 'Long hand on 6 = half past (or :30).',
      },
      {
        type: 'example',
        title: 'Watch: Half Past 3',
        content: 'The long hand points to 6. The short hand is between 3 and 4. It is 3:30 (half past 3).',
        visual: [
          { type: 'image', value: 'clock-3-30' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Half Past 7',
        content: 'The long hand points to 6. The short hand is between 7 and 8. It is 7:30 (half past 7).',
        visual: [
          { type: 'image', value: 'clock-7-30' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Is the long hand on 12 or 6? That tells you the hour or half hour!',
      },
    ],
  },
  {
    skillId: 'organize-data-categories',
    steps: [
      {
        type: 'concept',
        title: 'Sorting into Groups',
        content: 'Data means information. We can sort things into groups (categories) and count how many are in each group.',
        visual: [
          { type: 'text', value: 'Apples: ●●● (3)' },
          { type: 'text', value: 'Bananas: ●● (2)' },
          { type: 'text', value: 'Oranges: ● (1)' },
        ],
        tip: 'Count carefully! Make sure each item goes in the right group.',
      },
      {
        type: 'example',
        title: 'Watch: Favorite Fruits',
        content: 'Friends picked: apple, banana, apple, orange, apple, banana. Sort them: Apples: 3. Bananas: 2. Oranges: 1.',
        visual: [
          { type: 'text', value: 'Apple: ●●● = 3' },
          { type: 'text', value: 'Banana: ●● = 2' },
          { type: 'text', value: 'Orange: ● = 1' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Color of Cars',
        content: 'Cars in the lot: red, blue, red, red, blue, white. Sort: Red: 3. Blue: 2. White: 1.',
        visual: [
          { type: 'text', value: 'Red: ●●● = 3' },
          { type: 'text', value: 'Blue: ●● = 2' },
          { type: 'text', value: 'White: ● = 1' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Sort the items into groups and count each one!',
      },
    ],
  },
  {
    skillId: 'interpret-data',
    steps: [
      {
        type: 'concept',
        title: 'Answering Questions About Data',
        content: 'Once data is sorted, you can answer questions: Which has the most? How many total? How many more does one have than another?',
        visual: [
          { type: 'text', value: 'Dogs: ●●●●● (5)' },
          { type: 'text', value: 'Cats: ●●● (3)' },
          { type: 'text', value: 'Fish: ●● (2)' },
        ],
        tip: 'Use addition for totals. Use subtraction for "how many more."',
      },
      {
        type: 'example',
        title: 'Watch: Which Has Most?',
        content: 'Dogs: 5, Cats: 3, Fish: 2. Which has the most? Dogs (5 is the biggest). How many total? 5 + 3 + 2 = 10.',
        visual: [
          { type: 'text', value: 'Most: Dogs (5)' },
          { type: 'equation', value: '5 + 3 + 2 = 10 total' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: How Many More?',
        content: 'Dogs: 5, Cats: 3. How many more dogs than cats? Subtract: 5 − 3 = 2 more dogs.',
        visual: [
          { type: 'text', value: 'Dogs: ●●●●● (5)' },
          { type: 'text', value: 'Cats: ●●●       (3)' },
          { type: 'equation', value: '5 − 3 = 2 more' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Read the data, then answer the question!',
      },
    ],
  },

];
