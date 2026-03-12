import type { Lesson } from '../../types';

// OA Extended — Additional Operations & Algebraic Thinking Lessons
export const oaExtendedLessons: Lesson[] = [
  {
    skillId: 'add-three-numbers',
    steps: [
      {
        type: 'concept',
        title: 'Adding 3 Numbers',
        content: 'When you add 3 numbers, look for pairs that make 10 first. It makes the problem much easier!',
        visual: [
          { type: 'equation', value: '4 + 3 + 6 = ?' },
          { type: 'text', value: 'Look: 4 + 6 = 10!' },
        ],
        tip: 'Find pairs that make 10, then add the leftover.',
      },
      {
        type: 'example',
        title: 'Watch: 4 + 3 + 6',
        content: 'Look for a pair that makes 10: 4 + 6 = 10! Now add the leftover: 10 + 3 = 13.',
        visual: [
          { type: 'equation', value: '4 + 3 + 6' },
          { type: 'equation', value: '= (4 + 6) + 3' },
          { type: 'equation', value: '= 10 + 3 = 13' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 2 + 5 + 8',
        content: 'Look for a pair that makes 10: 2 + 8 = 10! Now add the leftover: 10 + 5 = 15.',
        visual: [
          { type: 'equation', value: '2 + 5 + 8' },
          { type: 'equation', value: '= (2 + 8) + 5' },
          { type: 'equation', value: '= 10 + 5 = 15' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Look for a pair that makes 10 first, then add the other number!',
      },
    ],
  },
  {
    skillId: 'subtraction-as-unknown-addend',
    steps: [
      {
        type: 'concept',
        title: 'Think Addition to Subtract!',
        content: 'You can use adding to help you subtract! For 12 minus 5, ask: 5 plus what makes 12?',
        visual: [
          { type: 'equation', value: '12 − 5 = ?' },
          { type: 'text', value: '5 + ? = 12' },
        ],
        tip: 'Turn minus into a plus question!',
      },
      {
        type: 'example',
        title: 'Watch: 9 − 4',
        content: 'Ask: 4 plus what makes 9? Count up from 4. Say: 5, 6, 7, 8, 9. That is 5 jumps!',
        visual: [
          { type: 'equation', value: '4 + ? = 9' },
          { type: 'text', value: 'Count: 5, 6, 7, 8, 9' },
          { type: 'equation', value: '9 − 4 = 5' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 15 − 7',
        content: 'Ask: 7 plus what makes 15? Count up from 7 to 10. That is 3. Then 10 to 15. That is 5. So 3 plus 5 is 8!',
        visual: [
          { type: 'equation', value: '7 + ? = 15' },
          { type: 'text', value: '7 to 10 is 3' },
          { type: 'text', value: '10 to 15 is 5' },
          { type: 'equation', value: '3 + 5 = 8' },
          { type: 'equation', value: '15 − 7 = 8' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Turn it into adding! What plus the small number makes the big number?',
      },
    ],
  },
  {
    skillId: 'read-write-numerals-120',
    steps: [
      {
        type: 'concept',
        title: 'Number Names',
        content: 'Numbers have names. The tens digit tells the decade (twenty, thirty, forty...). The ones digit tells the rest.',
        visual: [
          { type: 'text', value: '42 is forty-two' },
          { type: 'text', value: '85 is eighty-five' },
        ],
        tip: 'Say the tens name first, then the ones name.',
      },
      {
        type: 'example',
        title: 'Watch: Write 67',
        content: '67 has 6 tens = sixty, and 7 ones = seven. Put them together: sixty-seven.',
        visual: [
          { type: 'text', value: '6 tens = sixty' },
          { type: 'text', value: '7 ones = seven' },
          { type: 'equation', value: '67 = sixty-seven' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: What Number?',
        content: '"Ninety-three" — ninety means 9 tens = 90. Three means 3 ones. Put together: 93.',
        visual: [
          { type: 'text', value: 'ninety = 90' },
          { type: 'text', value: 'three = 3' },
          { type: 'equation', value: 'ninety-three = 93' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Read the number name and write the number, or read the number and write its name!',
      },
    ],
  },
  {
    skillId: 'word-problems-add-to-change',
    steps: [
      {
        type: 'concept',
        title: 'Find How Much Was Added',
        content: 'Sometimes you know how many you had and how many you have now. But how many were added? Subtract to find out!',
        visual: [
          { type: 'text', value: 'had some + got more = have now' },
          { type: 'equation', value: '5 + ? = 12' },
        ],
        tip: 'Subtract to find the missing change!',
      },
      {
        type: 'example',
        title: 'Watch: Toys',
        content: 'Sam had 5 toys. He got more. Now he has 12. How many did he get? 12 minus 5 is 7. He got 7 toys!',
        visual: [
          { type: 'equation', value: '5 + ? = 12' },
          { type: 'equation', value: '12 − 5 = 7' },
          { type: 'text', value: 'He got 7 more toys.' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Birds',
        content: '8 birds were in a tree. More came. Now there are 14. How many came? 14 minus 8 is 6 birds!',
        visual: [
          { type: 'equation', value: '8 + ? = 14' },
          { type: 'equation', value: '14 − 8 = 6' },
          { type: 'text', value: '6 more birds came.' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'You know the start and end. Subtract to find how much was added!',
      },
    ],
  },
  {
    skillId: 'word-problems-add-to-start',
    steps: [
      {
        type: 'concept',
        title: 'Find the Start',
        content: 'Sometimes you know how many were added and the total. But how many did you start with? Subtract to find out!',
        visual: [
          { type: 'text', value: '? + how many more = total' },
          { type: 'equation', value: '? + 4 = 11' },
        ],
        tip: 'Subtract to find the start!',
      },
      {
        type: 'example',
        title: 'Watch: Playing',
        content: 'Some kids were playing. 4 more came. Now there are 11. How many at first? 11 minus 4 is 7 kids!',
        visual: [
          { type: 'equation', value: '? + 4 = 11' },
          { type: 'equation', value: '11 − 4 = 7' },
          { type: 'text', value: '7 kids were playing at first.' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Flowers',
        content: 'Some flowers were growing. 6 more bloomed. Now there are 13. How many at first? 13 minus 6 is 7 flowers!',
        visual: [
          { type: 'equation', value: '? + 6 = 13' },
          { type: 'equation', value: '13 − 6 = 7' },
          { type: 'text', value: '7 flowers at first.' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Subtract what was added from the total to find the start!',
      },
    ],
  },
  {
    skillId: 'word-problems-take-from-change',
    steps: [
      {
        type: 'concept',
        title: 'Find How Much Was Taken',
        content: 'You know how many you had and how many are left. How many were taken? Subtract what is left from what you started with!',
        visual: [
          { type: 'text', value: 'had some − ? = what is left' },
          { type: 'equation', value: '15 − ? = 9' },
        ],
        tip: 'Subtract what is left from the start to find what was taken!',
      },
      {
        type: 'example',
        title: 'Watch: Cookies',
        content: 'There were 15 cookies. Some were eaten. Now there are 9. How many were eaten? 15 minus 9 is 6 cookies!',
        visual: [
          { type: 'equation', value: '15 − ? = 9' },
          { type: 'equation', value: '15 − 9 = 6' },
          { type: 'text', value: '6 cookies were eaten.' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Marbles',
        content: 'You had 12 marbles. You lost some. Now you have 5. How many did you lose? 12 minus 5 is 7 marbles!',
        visual: [
          { type: 'equation', value: '12 − ? = 5' },
          { type: 'equation', value: '12 − 5 = 7' },
          { type: 'text', value: 'You lost 7 marbles.' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Subtract what is left from the start to find what was taken away!',
      },
    ],
  },
  {
    skillId: 'word-problems-take-from-start',
    steps: [
      {
        type: 'concept',
        title: 'Find the Start',
        content: 'You know what was taken and what is left. How many at the start? Add them back together!',
        visual: [
          { type: 'text', value: '? − how many taken = what is left' },
          { type: 'equation', value: '? − 3 = 8' },
        ],
        tip: 'Add what is left and what was taken to find the start!',
      },
      {
        type: 'example',
        title: 'Watch: Apples',
        content: 'Some apples were on the table. 3 were eaten. Now there are 8. How many at first? 8 plus 3 is 11 apples!',
        visual: [
          { type: 'equation', value: '? − 3 = 8' },
          { type: 'equation', value: '8 + 3 = 11' },
          { type: 'text', value: '11 apples at first.' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Books',
        content: 'Some books were on the shelf. 5 were borrowed. Now there are 7. How many at first? 7 plus 5 is 12 books!',
        visual: [
          { type: 'equation', value: '? − 5 = 7' },
          { type: 'equation', value: '7 + 5 = 12' },
          { type: 'text', value: '12 books at first.' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Add what is left and what was taken to find the start!',
      },
    ],
  },
  {
    skillId: 'word-problems-compare-bigger',
    steps: [
      {
        type: 'concept',
        title: 'Find the Bigger Amount',
        content: 'When someone has more than another, add to find the bigger amount!',
        visual: [
          { type: 'text', value: 'small number + how many more = big number' },
          { type: 'equation', value: '6 + 4 = ?' },
        ],
        tip: '"More than" means add!',
      },
      {
        type: 'example',
        title: 'Watch: Marbles',
        content: 'Ben has 6 marbles. Ana has 4 more than Ben. How many does Ana have? 6 plus 4 is 10 marbles!',
        visual: [
          { type: 'text', value: 'Ben: ●●●●●● (6)' },
          { type: 'text', value: 'Ana: ●●●●●●●●●● (6 + 4 = 10)' },
          { type: 'equation', value: '6 + 4 = 10' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Ribbons',
        content: 'The blue ribbon is 8 inches. The red one is 3 inches longer. How long is red? 8 plus 3 is 11 inches!',
        visual: [
          { type: 'text', value: 'Blue: ████████ (8)' },
          { type: 'text', value: 'Red:  ████████████ (8 + 3 = 11)' },
          { type: 'equation', value: '8 + 3 = 11' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Find the smaller amount and add the difference to get the bigger amount!',
      },
    ],
  },
  {
    skillId: 'word-problems-compare-smaller',
    steps: [
      {
        type: 'concept',
        title: 'Find the Smaller Amount',
        content: 'When you know the bigger amount, subtract to find the smaller one!',
        visual: [
          { type: 'text', value: 'big number − how many more = small number' },
          { type: 'equation', value: '11 − 5 = ?' },
        ],
        tip: 'Subtract the difference from the bigger amount!',
      },
      {
        type: 'example',
        title: 'Watch: Stickers',
        content: 'Ana has 11 stickers. She has 5 more than Ben. How many does Ben have? 11 minus 5 is 6 stickers!',
        visual: [
          { type: 'text', value: 'Ana: ●●●●●●●●●●● (11)' },
          { type: 'text', value: 'Ben: ●●●●●●            (11 − 5 = 6)' },
          { type: 'equation', value: '11 − 5 = 6' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Plants',
        content: 'The tall plant is 15 inches. It is 7 inches taller than the short one. How tall is the short plant? 15 minus 7 is 8 inches!',
        visual: [
          { type: 'text', value: 'Tall:  ███████████████ (15)' },
          { type: 'text', value: 'Short: ████████              (15 − 7 = 8)' },
          { type: 'equation', value: '15 − 7 = 8' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Subtract the difference from the bigger amount to find the smaller one!',
      },
    ],
  },
  {
    skillId: 'describe-shares-wholes',
    steps: [
      {
        type: 'concept',
        title: 'Shares and Wholes',
        content: 'Equal parts make up a whole. Two halves make one whole. Four fourths make one whole. More parts means smaller pieces!',
        visual: [
          { type: 'text', value: '[ half | half ] = 1 whole' },
          { type: 'text', value: '[¼|¼|¼|¼] = 1 whole' },
        ],
        tip: 'More equal parts = smaller pieces. Fewer parts = bigger pieces.',
      },
      {
        type: 'example',
        title: 'Watch: Pizza Halves',
        content: 'A pizza is cut into 2 equal pieces. Each piece is a half. Put both halves together and you have one whole pizza!',
        visual: [
          { type: 'text', value: '( ◐ ) = half + half' },
          { type: 'equation', value: '2 halves = 1 whole' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Sandwich Fourths',
        content: 'A sandwich is cut into 4 equal parts. Each part is a fourth. Put all 4 together and you have one whole. A fourth is smaller than a half!',
        visual: [
          { type: 'text', value: '[¼|¼|¼|¼] = 1 whole' },
          { type: 'text', value: 'A fourth < a half (more parts = smaller)' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'How many equal shares make up the whole?',
      },
    ],
  },

];
