import type { Lesson } from '../../types';

// 2nd Grade Extensions
export const grade2Lessons: Lesson[] = [
  {
    skillId: 'fluency-add-sub-20',
    steps: [
      {
        type: 'concept',
        title: 'Facts Within 20',
        content: 'Now you can add and subtract up to 20 super fast! Use your tricks: doubles, make a 10, or think addition.',
        visual: [
          { type: 'equation', value: '8 + 7 = 15' },
          { type: 'equation', value: '16 − 9 = 7' },
        ],
        tip: 'Use the strategy that feels fastest for each problem!',
      },
      {
        type: 'example',
        title: 'Watch: 9 + 6',
        content: 'Make a 10 first! 9 plus 1 is 10. Then 10 plus 5 is 15. So 9 plus 6 is 15!',
        visual: [
          { type: 'equation', value: '9 + 6' },
          { type: 'equation', value: '= 9 + 1 + 5' },
          { type: 'equation', value: '= 10 + 5 = 15' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 17 − 8',
        content: 'Ask: 8 plus what is 17? Count from 8 to 10 — that is 2. Then 10 to 17 — that is 7. So 2 plus 7 is 9!',
        visual: [
          { type: 'equation', value: '8 + ? = 17' },
          { type: 'text', value: '8 to 10 is 2' },
          { type: 'text', value: '10 to 17 is 7' },
          { type: 'equation', value: '2 + 7 = 9' },
          { type: 'equation', value: '17 − 8 = 9' },
        ],
      },
      {
        type: 'try_it',
        title: 'Speed Round!',
        content: 'Use your best strategy to answer quickly!',
      },
    ],
  },
  {
    skillId: 'word-problems-within-100',
    steps: [
      {
        type: 'concept',
        title: 'Word Problems with Big Numbers',
        content: 'You can solve stories with bigger numbers too! Break the numbers into tens and ones to make it easier.',
        visual: [
          { type: 'equation', value: '34 + 28 = ?' },
          { type: 'text', value: 'Break into tens and ones to solve.' },
        ],
        tip: 'Add tens first, then add ones, then combine!',
      },
      {
        type: 'example',
        title: 'Watch: Bus Problem',
        content: '34 kids on a bus. 28 more get on. How many now? Add tens: 30 plus 20 is 50. Add ones: 4 plus 8 is 12. Then 50 plus 12 is 62!',
        visual: [
          { type: 'equation', value: '34 + 28' },
          { type: 'text', value: 'Tens: 30 + 20 = 50' },
          { type: 'text', value: 'Ones: 4 + 8 = 12' },
          { type: 'equation', value: '50 + 12 = 62' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Sticker Problem',
        content: 'You had 75 stickers and gave away 38. How many left? The ones: 5 minus 8 is tricky! Regroup a ten. 15 minus 8 is 7. The tens: 60 minus 30 is 30. So 30 plus 7 is 37!',
        visual: [
          { type: 'equation', value: '75 − 38' },
          { type: 'text', value: '15 − 8 = 7 (regroup 1 ten)' },
          { type: 'text', value: '60 − 30 = 30' },
          { type: 'equation', value: '30 + 7 = 37' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Break the numbers into tens and ones to solve!',
      },
    ],
  },
  {
    skillId: 'understand-hundreds',
    steps: [
      {
        type: 'concept',
        title: 'What is a Hundred?',
        content: '100 is 10 groups of ten. A hundred is a big bundle! Numbers like 300 mean 3 hundreds.',
        visual: [
          { type: 'text', value: '10 tens = 1 hundred = 100' },
          { type: 'dots', value: '▮▮▮▮▮▮▮▮▮▮', count: 10 },
          { type: 'text', value: '10 ten-sticks = 100' },
        ],
        tip: '10 tens = 1 hundred. Count by hundreds: 100, 200, 300...',
      },
      {
        type: 'example',
        title: 'Watch: 10 Tens = 100',
        content: 'Count the ten-sticks: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100. Ten groups of ten makes one hundred!',
        visual: [
          { type: 'text', value: '▮▮▮▮▮ ▮▮▮▮▮ = 10 tens' },
          { type: 'equation', value: '10 tens = 100' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 400',
        content: '400 is 4 hundreds. That is 4 big bundles of 100!',
        visual: [
          { type: 'text', value: '4 hundreds = 400' },
          { type: 'text', value: '40 tens = 400' },
          { type: 'equation', value: '100 + 100 + 100 + 100 = 400' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'How many hundreds? How many tens? Think about the bundles!',
      },
    ],
  },
  {
    skillId: 'add-subtract-within-100',
    steps: [
      {
        type: 'concept',
        title: 'Adding and Subtracting Big Numbers',
        content: 'Add or subtract two-digit numbers by breaking them into tens and ones. Add the tens, add the ones, then combine.',
        visual: [
          { type: 'equation', value: '47 + 35 = ?' },
          { type: 'text', value: '= (40 + 30) + (7 + 5)' },
        ],
        tip: 'Break numbers into tens and ones, then work with each place.',
      },
      {
        type: 'example',
        title: 'Watch: 47 + 35',
        content: 'Add tens: 40 plus 30 is 70. Add ones: 7 plus 5 is 12. Now 70 plus 12 is 82!',
        visual: [
          { type: 'text', value: 'Tens: 40 + 30 = 70' },
          { type: 'text', value: 'Ones: 7 + 5 = 12' },
          { type: 'equation', value: '70 + 12 = 82' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 83 − 26',
        content: 'Ones first: 3 minus 6? Not enough! Regroup a ten. Now 13 minus 6 is 7. Tens: 70 minus 20 is 50. So 50 plus 7 is 57!',
        visual: [
          { type: 'text', value: 'Ones: 13 − 6 = 7 (regroup 1 ten)' },
          { type: 'text', value: 'Tens: 70 − 20 = 50' },
          { type: 'equation', value: '83 − 26 = 57' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Break into tens and ones. Watch for regrouping!',
      },
    ],
  },
  {
    skillId: 'tell-time-five-minutes',
    steps: [
      {
        type: 'concept',
        title: 'Reading Minutes',
        content: 'Each number on the clock means 5 minutes. Count by 5s from 12 to read the minutes. The short hand is the hour. The long hand is the minutes.',
        visual: [
          { type: 'image', value: 'clock-2-15' },
          { type: 'text', value: 'Count by 5s: 5, 10, 15 minutes' },
        ],
        tip: 'Long hand on 1 = :05, on 2 = :10, on 3 = :15, and so on.',
      },
      {
        type: 'example',
        title: 'Watch: 2:15',
        content: 'Short hand near 2 = 2 hours. Long hand on 3. Count by 5s: 5, 10, 15 minutes. It is 2:15.',
        visual: [
          { type: 'image', value: 'clock-2-15' },
          { type: 'equation', value: '2:15' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 7:40',
        content: 'Short hand past 7 = 7 hours. Long hand on 8. Count by 5s: 5, 10, 15, 20, 25, 30, 35, 40 minutes. It is 7:40.',
        visual: [
          { type: 'image', value: 'clock-7-40' },
          { type: 'equation', value: '7:40' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Find the hour with the short hand. Count by 5s with the long hand for the minutes!',
      },
    ],
  },
  {
    skillId: 'draw-shapes-attributes',
    steps: [
      {
        type: 'concept',
        title: 'Shape Attributes',
        content: 'Shapes have sides and corners. Count the sides and look at the corners to know what shape to draw!',
        visual: [
          { type: 'text', value: 'Triangle: 3 sides, 3 corners' },
          { type: 'text', value: 'Square: 4 equal sides, 4 square corners' },
          { type: 'text', value: 'Hexagon: 6 sides, 6 corners' },
        ],
        tip: 'Read the description carefully — count sides and check corners!',
      },
      {
        type: 'example',
        title: 'Watch: 3 Sides',
        content: '"Draw a shape with 3 sides." Any shape with 3 sides is a triangle. It can be tall, flat, or tilted — just needs 3 sides!',
        visual: [
          { type: 'text', value: '3 sides = △ Triangle' },
          { type: 'text', value: 'Any triangle works!' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 4 Equal Sides, Square Corners',
        content: 'Draw a shape with 4 equal sides and 4 square corners. That is a square! All sides are the same.',
        visual: [
          { type: 'text', value: '4 equal sides + 4 square corners = □ Square' },
          { type: 'text', value: 'A square is a special rectangle.' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Read the description. How many sides? What kind of corners? Draw the matching shape!',
      },
    ],
  },

];
