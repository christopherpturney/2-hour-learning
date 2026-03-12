import type { Lesson } from '../../types';

// NBT — Number & Operations in Base Ten
export const nbtLessons: Lesson[] = [
  {
    skillId: 'count-to-120',
    steps: [
      {
        type: 'concept',
        title: 'Counting Higher!',
        content: 'You can count past 100, all the way to 120! The pattern repeats: ones go 1, 2, 3... 8, 9, then the tens go up.',
        visual: [
          { type: 'text', value: '98 → 99 → 100 → 101 → 102' },
        ],
        tip: 'After 9 ones, the next number starts a new ten.',
      },
      {
        type: 'example',
        title: 'Watch: Counting Past 100',
        content: 'After 99 comes 100. Then 101, 102, 103... The pattern keeps going just like before!',
        visual: [
          { type: 'text', value: '97 → 98 → 99 → 100 → 101' },
          { type: 'equation', value: '99 + 1 = 100' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: What Comes Next?',
        content: 'What comes after 109? The ones go from 9 to 0, and the tens go up: 110. After 119 comes 120.',
        visual: [
          { type: 'text', value: '108 → 109 → 110 → 111' },
          { type: 'text', value: '118 → 119 → 120' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'What number comes next? Think about the counting pattern!',
      },
    ],
  },
  {
    skillId: 'understand-tens-ones',
    steps: [
      {
        type: 'concept',
        title: 'Tens and Ones',
        content: 'Every two-digit number is made of tens and ones. The left digit tells you how many tens. The right digit tells you how many ones.',
        visual: [
          { type: 'text', value: '34 = 3 tens and 4 ones' },
        ],
        tip: 'The tens digit is on the left. The ones digit is on the right.',
      },
      {
        type: 'example',
        title: 'Watch: Break Apart 52',
        content: '52 has a 5 and a 2. The 5 means 5 tens, which is 50. The 2 means 2 ones. 50 plus 2 is 52!',
        visual: [
          { type: 'dots', value: '▮▮▮▮▮', count: 5 },
          { type: 'text', value: '5 tens' },
          { type: 'dots', value: '●●', count: 2 },
          { type: 'text', value: '2 ones' },
          { type: 'equation', value: '50 + 2 = 52' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Break Apart 37',
        content: '37 has a 3 and a 7. The 3 means 3 tens, which is 30. The 7 means 7 ones. 30 plus 7 is 37!',
        visual: [
          { type: 'dots', value: '▮▮▮', count: 3 },
          { type: 'text', value: '3 tens' },
          { type: 'dots', value: '●●●●●●●', count: 7 },
          { type: 'text', value: '7 ones' },
          { type: 'equation', value: '30 + 7 = 37' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'How many tens? How many ones? Look at each digit!',
      },
    ],
  },
  {
    skillId: 'teen-numbers-composition',
    steps: [
      {
        type: 'concept',
        title: 'Teen Numbers',
        content: 'Teen numbers (11-19) are special. They are all made of 1 ten and some extra ones.',
        visual: [
          { type: 'text', value: '14 = 10 + 4 (one ten and four ones)' },
        ],
        tip: 'Every teen number starts with 1 ten.',
      },
      {
        type: 'example',
        title: 'Watch: 16',
        content: '16 = 10 + 6. One group of ten, plus 6 extra ones.',
        visual: [
          { type: 'dots', value: '▮', count: 1 },
          { type: 'text', value: '(1 ten)' },
          { type: 'dots', value: '●●●●●●', count: 6 },
          { type: 'text', value: '(6 ones)' },
          { type: 'equation', value: '10 + 6 = 16' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 13',
        content: '13 = 10 + 3. One group of ten, plus 3 extra ones.',
        visual: [
          { type: 'dots', value: '▮', count: 1 },
          { type: 'text', value: '(1 ten)' },
          { type: 'dots', value: '●●●', count: 3 },
          { type: 'text', value: '(3 ones)' },
          { type: 'equation', value: '10 + 3 = 13' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Every teen number is 10 plus some ones. What is 10 plus the extra ones?',
      },
    ],
  },
  {
    skillId: 'decade-numbers',
    steps: [
      {
        type: 'concept',
        title: 'Counting by Tens',
        content: 'Decade numbers are 10, 20, 30, 40, 50, 60, 70, 80, 90. Each one is a group of tens with zero ones.',
        tip: 'Count by 10s: 10, 20, 30, 40, ...',
      },
      {
        type: 'example',
        title: 'Watch: 3 Tens',
        content: '3 tens = 30. Count by 10s: 10, 20, 30. Three groups of ten makes thirty.',
        visual: [
          { type: 'dots', value: '▮▮▮', count: 3 },
          { type: 'text', value: '10 → 20 → 30' },
          { type: 'equation', value: '3 tens = 30' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 7 Tens',
        content: '7 tens = 70. Count by 10s: 10, 20, 30, 40, 50, 60, 70.',
        visual: [
          { type: 'dots', value: '▮▮▮▮▮▮▮', count: 7 },
          { type: 'equation', value: '7 tens = 70' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Count by 10s to find the number!',
      },
    ],
  },
  {
    skillId: 'compare-two-digit',
    steps: [
      {
        type: 'concept',
        title: 'Comparing Numbers',
        content: 'To compare two numbers, first look at the tens digit. More tens = bigger number. If the tens are the same, check the ones.',
        visual: [
          { type: 'equation', value: '34 > 28' },
          { type: 'text', value: '3 tens > 2 tens, so 34 is bigger' },
        ],
        tip: 'Always compare tens first!',
      },
      {
        type: 'example',
        title: 'Watch: 56 vs 61',
        content: '56 has 5 tens. 61 has 6 tens. 5 tens < 6 tens, so 56 < 61.',
        visual: [
          { type: 'text', value: '56: 5 tens, 6 ones' },
          { type: 'text', value: '61: 6 tens, 1 one' },
          { type: 'equation', value: '56 < 61' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 43 vs 47',
        content: '43 and 47 both have 4 tens. Same tens! Check ones: 3 < 7, so 43 < 47.',
        visual: [
          { type: 'text', value: '43: 4 tens, 3 ones' },
          { type: 'text', value: '47: 4 tens, 7 ones' },
          { type: 'equation', value: '43 < 47' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Compare the tens first. If they match, compare the ones!',
      },
    ],
  },
  {
    skillId: 'add-two-digit-plus-one',
    steps: [
      {
        type: 'concept',
        title: 'Adding a Small Number',
        content: 'When you add a one-digit number to a two-digit number, only the ones change. The tens stay the same.',
        visual: [
          { type: 'equation', value: '34 + 5 = 39' },
          { type: 'text', value: 'Tens stay at 3. Ones: 4 + 5 = 9.' },
        ],
        tip: 'Just add the ones digits!',
      },
      {
        type: 'example',
        title: 'Watch: 52 + 3',
        content: 'Tens: 5 tens (stays the same). Ones: 2 + 3 = 5. Answer: 55.',
        visual: [
          { type: 'text', value: 'Tens: 5 → 5' },
          { type: 'text', value: 'Ones: 2 + 3 = 5' },
          { type: 'equation', value: '52 + 3 = 55' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 71 + 6',
        content: 'Tens: 7 tens (stays the same). Ones: 1 + 6 = 7. Answer: 77.',
        visual: [
          { type: 'text', value: 'Tens: 7 → 7' },
          { type: 'text', value: 'Ones: 1 + 6 = 7' },
          { type: 'equation', value: '71 + 6 = 77' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Keep the tens the same, just add the ones!',
      },
    ],
  },
  {
    skillId: 'add-two-digit-plus-tens',
    steps: [
      {
        type: 'concept',
        title: 'Adding Groups of Ten',
        content: 'When you add a multiple of 10, only the tens change. The ones stay the same.',
        visual: [
          { type: 'equation', value: '34 + 20 = 54' },
          { type: 'text', value: 'Tens: 3 + 2 = 5. Ones stay at 4.' },
        ],
        tip: 'Just add the tens digits!',
      },
      {
        type: 'example',
        title: 'Watch: 45 + 30',
        content: 'Tens: 4 + 3 = 7 tens. Ones: 5 (stays). Answer: 75.',
        visual: [
          { type: 'text', value: 'Tens: 4 + 3 = 7' },
          { type: 'text', value: 'Ones: 5 → 5' },
          { type: 'equation', value: '45 + 30 = 75' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 23 + 40',
        content: 'Tens: 2 + 4 = 6 tens. Ones: 3 (stays). Answer: 63.',
        visual: [
          { type: 'text', value: 'Tens: 2 + 4 = 6' },
          { type: 'text', value: 'Ones: 3 → 3' },
          { type: 'equation', value: '23 + 40 = 63' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Add the tens, keep the ones!',
      },
    ],
  },
  {
    skillId: 'mental-ten-more-less',
    steps: [
      {
        type: 'concept',
        title: '10 More, 10 Less',
        content: 'Adding 10 makes the tens digit go up by 1. Subtracting 10 makes it go down by 1. The ones digit never changes.',
        visual: [
          { type: 'text', value: '10 more than 34 is 44' },
          { type: 'text', value: '10 less than 34 is 24' },
        ],
        tip: 'Only the tens digit changes!',
      },
      {
        type: 'example',
        title: 'Watch: 10 More Than 67',
        content: '67 has 6 tens. Add one more ten: 7 tens. Ones stay 7. Answer: 77.',
        visual: [
          { type: 'text', value: '67: tens go up by 1 = 77' },
          { type: 'equation', value: '67 + 10 = 77' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 10 Less Than 53',
        content: '53 has 5 tens. Take away one ten: 4 tens. Ones stay 3. Answer: 43.',
        visual: [
          { type: 'text', value: '53: tens go down by 1 = 43' },
          { type: 'equation', value: '53 − 10 = 43' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Change the tens digit by 1. Leave the ones alone!',
      },
    ],
  },
  {
    skillId: 'subtract-multiples-of-ten',
    steps: [
      {
        type: 'concept',
        title: 'Subtracting Groups of Ten',
        content: 'When you subtract multiples of 10 (like 30 − 10 or 80 − 50), just subtract the tens.',
        visual: [
          { type: 'equation', value: '70 − 30 = 40' },
          { type: 'text', value: '7 tens − 3 tens = 4 tens' },
        ],
        tip: 'Think in tens: subtract the tens digits, then put a zero at the end.',
      },
      {
        type: 'example',
        title: 'Watch: 80 − 50',
        content: '8 tens − 5 tens = 3 tens. 3 tens = 30. So 80 − 50 = 30.',
        visual: [
          { type: 'text', value: '8 tens − 5 tens = 3 tens' },
          { type: 'equation', value: '80 − 50 = 30' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 60 − 20',
        content: '6 tens − 2 tens = 4 tens. 4 tens = 40. So 60 − 20 = 40.',
        visual: [
          { type: 'text', value: '6 tens − 2 tens = 4 tens' },
          { type: 'equation', value: '60 − 20 = 40' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Think in tens. Subtract the tens, then write the number!',
      },
    ],
  },

];
