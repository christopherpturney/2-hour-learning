import type { Lesson } from '../../types';

// OA — Operations & Algebraic Thinking
export const oaLessons: Lesson[] = [
  {
    skillId: 'addition-within-5',
    steps: [
      {
        type: 'concept',
        title: 'What is Adding?',
        content: 'Adding means putting things together to find how many in all.',
        visual: [
          { type: 'dots', value: '●●', count: 2 },
          { type: 'text', value: 'and' },
          { type: 'dots', value: '●●●', count: 3 },
          { type: 'text', value: 'makes' },
          { type: 'dots', value: '●●●●●', count: 5 },
        ],
        tip: 'When you add, the number gets bigger!',
      },
      {
        type: 'example',
        title: 'Watch: 2 + 3',
        content: 'Start with 2 dots. Add 3 more dots. Now count them all: 1, 2, 3, 4, 5. So 2 + 3 = 5.',
        visual: [
          { type: 'equation', value: '2 + 3 = 5' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 1 + 4',
        content: 'Start with 1 dot. Add 4 more dots. Count them all: 1, 2, 3, 4, 5. So 1 + 4 = 5.',
        visual: [
          { type: 'dots', value: '●', count: 1 },
          { type: 'text', value: '+' },
          { type: 'dots', value: '●●●●', count: 4 },
          { type: 'text', value: '=' },
          { type: 'dots', value: '●●●●●', count: 5 },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Now you try some addition problems. Use the dots to count if you need help!',
      },
    ],
  },
  {
    skillId: 'subtraction-within-5',
    steps: [
      {
        type: 'concept',
        title: 'What is Subtracting?',
        content: 'Subtracting means taking some away. You start with a group and remove some.',
        visual: [
          { type: 'dots', value: '●●●●●', count: 5 },
          { type: 'text', value: 'take away 2' },
          { type: 'text', value: '→' },
          { type: 'dots', value: '●●●', count: 3 },
        ],
        tip: 'When you subtract, the number gets smaller!',
      },
      {
        type: 'example',
        title: 'Watch: 5 − 2',
        content: 'Start with 5 dots. Cross out 2. Count what is left: 1, 2, 3. So 5 − 2 = 3.',
        visual: [
          { type: 'dots', value: '●●●●●', count: 5 },
          { type: 'text', value: 'cross out 2 →' },
          { type: 'dots', value: '●●●', count: 3 },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 4 − 1',
        content: 'Start with 4 dots. Take away 1. Count what is left: 1, 2, 3. So 4 − 1 = 3.',
        visual: [
          { type: 'dots', value: '●●●●', count: 4 },
          { type: 'text', value: 'take away 1 →' },
          { type: 'dots', value: '●●●', count: 3 },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Try some subtraction. Picture taking objects away and counting what is left!',
      },
    ],
  },
  {
    skillId: 'addition-within-10',
    steps: [
      {
        type: 'concept',
        title: 'Adding Bigger Numbers',
        content: 'Now we add numbers that make up to 10. You can count on from the bigger number.',
        visual: [
          { type: 'dots', value: '●●●●●●', count: 6 },
          { type: 'text', value: '+' },
          { type: 'dots', value: '●●●', count: 3 },
          { type: 'text', value: '= 9' },
        ],
        tip: 'Start from the bigger number and count up!',
      },
      {
        type: 'example',
        title: 'Watch: 6 + 3',
        content: 'Start at 6. Count on 3 more: 7, 8, 9. So 6 + 3 = 9.',
        visual: [
          { type: 'text', value: '6 → 7 → 8 → 9' },
          { type: 'equation', value: '6 + 3 = 9' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 4 + 5',
        content: 'Start at 5 (the bigger number). Count on 4 more: 6, 7, 8, 9. So 4 + 5 = 9.',
        visual: [
          { type: 'text', value: '5 → 6 → 7 → 8 → 9' },
          { type: 'equation', value: '4 + 5 = 9' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Try adding numbers up to 10. Start from the bigger number and count on!',
      },
    ],
  },
  {
    skillId: 'subtraction-within-10',
    steps: [
      {
        type: 'concept',
        title: 'Subtracting to 10',
        content: 'Subtract bigger numbers by counting back or thinking about what you need to add.',
        visual: [
          { type: 'dots', value: '●●●●●●●●', count: 8 },
          { type: 'text', value: '− 3 =' },
          { type: 'dots', value: '●●●●●', count: 5 },
        ],
        tip: 'Count backwards from the first number!',
      },
      {
        type: 'example',
        title: 'Watch: 8 − 3',
        content: 'Start at 8. Count back 3: 7, 6, 5. So 8 − 3 = 5.',
        visual: [
          { type: 'text', value: '8 → 7 → 6 → 5' },
          { type: 'equation', value: '8 − 3 = 5' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 9 − 4',
        content: 'Start at 9. Count back 4: 8, 7, 6, 5. So 9 − 4 = 5.',
        visual: [
          { type: 'text', value: '9 → 8 → 7 → 6 → 5' },
          { type: 'equation', value: '9 − 4 = 5' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Try subtracting. Count back from the first number!',
      },
    ],
  },
  {
    skillId: 'addition-fluency-10',
    steps: [
      {
        type: 'concept',
        title: 'Fast Addition Tricks!',
        content: 'You can use tricks to add fast! Doubles are easy: 3 plus 3 is 6. And some numbers make 10 together, like 6 plus 4.',
        visual: [
          { type: 'equation', value: '5 + 5 = 10' },
          { type: 'equation', value: '6 + 4 = 10' },
        ],
        tip: 'Learn the doubles first — they help you solve nearby facts!',
      },
      {
        type: 'example',
        title: 'Watch: Doubles Help!',
        content: 'What is 3 plus 4? I know 3 plus 3 is 6. And 4 is one more than 3. So the answer is one more: 7!',
        visual: [
          { type: 'equation', value: '3 + 3 = 6' },
          { type: 'equation', value: '3 + 4 = 6 + 1 = 7' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Make a 10!',
        content: 'What is 7 plus 3? They are best friends that make 10! When you know your 10 pairs, you can answer super fast.',
        visual: [
          { type: 'dots', value: '●●●●●●●', count: 7 },
          { type: 'text', value: '+' },
          { type: 'dots', value: '●●●', count: 3 },
          { type: 'text', value: '= 10' },
        ],
      },
      {
        type: 'try_it',
        title: 'Speed Round!',
        content: 'Use your strategies — doubles, near doubles, or make a 10. Try to answer quickly!',
      },
    ],
  },
  {
    skillId: 'subtraction-fluency-10',
    steps: [
      {
        type: 'concept',
        title: 'Fast Subtraction Tricks!',
        content: 'Use adding to subtract fast! If you know 4 plus 6 is 10, you also know 10 minus 6 is 4!',
        visual: [
          { type: 'equation', value: '4 + 6 = 10' },
          { type: 'equation', value: '10 − 6 = 4' },
        ],
        tip: 'Think: "what plus this number equals that number?"',
      },
      {
        type: 'example',
        title: 'Watch: Think Addition!',
        content: 'What is 9 minus 4? Ask: 4 plus what is 9? I know 4 plus 5 is 9. So 9 minus 4 is 5!',
        visual: [
          { type: 'equation', value: '4 + ? = 9' },
          { type: 'equation', value: '4 + 5 = 9, so 9 − 4 = 5' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Subtract From 10',
        content: 'What is 10 minus 7? Ask: 7 plus what is 10? I know 7 plus 3 is 10. So 10 minus 7 is 3!',
        visual: [
          { type: 'equation', value: '7 + ? = 10' },
          { type: 'equation', value: '7 + 3 = 10, so 10 − 7 = 3' },
        ],
      },
      {
        type: 'try_it',
        title: 'Speed Round!',
        content: 'Use your addition facts to subtract fast!',
      },
    ],
  },
  {
    skillId: 'word-problems-add-to',
    steps: [
      {
        type: 'concept',
        title: 'Story Problems: Adding',
        content: 'In these stories, you start with some and get more. Add them to find how many in all!',
        visual: [
          { type: 'text', value: 'How many had + how many more = how many now' },
          { type: 'equation', value: '3 + 4 = ?' },
        ],
        tip: 'Look for words like "more", "in all", "total", or "altogether".',
      },
      {
        type: 'example',
        title: 'Watch: Apples',
        content: 'Sam has 3 apples. He picks 4 more. How many now? 3 plus 4 is 7 apples!',
        visual: [
          { type: 'dots', value: '●●●', count: 3 },
          { type: 'text', value: '+' },
          { type: 'dots', value: '●●●●', count: 4 },
          { type: 'text', value: '= 7' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Birds',
        content: '5 birds sit in a tree. 3 more land. How many now? 5 plus 3 is 8 birds!',
        visual: [
          { type: 'dots', value: '●●●●●', count: 5 },
          { type: 'text', value: '+' },
          { type: 'dots', value: '●●●', count: 3 },
          { type: 'text', value: '= 8' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Read the story carefully. Find the start number and the number added. Then add!',
      },
    ],
  },
  {
    skillId: 'word-problems-take-from',
    steps: [
      {
        type: 'concept',
        title: 'Story Problems: Taking Away',
        content: 'In these stories, you start with some and some go away. Subtract to find what is left!',
        visual: [
          { type: 'text', value: 'How many had − how many left = how many gone' },
          { type: 'equation', value: '8 − 3 = ?' },
        ],
        tip: 'Look for words like "left", "remaining", "went away", or "ate".',
      },
      {
        type: 'example',
        title: 'Watch: Birds',
        content: '8 birds sit on a branch. 3 fly away. How many are left? 8 minus 3 is 5 birds!',
        visual: [
          { type: 'dots', value: '●●●●●●●●', count: 8 },
          { type: 'text', value: '− 3 →' },
          { type: 'dots', value: '●●●●●', count: 5 },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Cookies',
        content: 'You have 7 cookies. You eat 2. How many are left? 7 minus 2 is 5 cookies!',
        visual: [
          { type: 'dots', value: '●●●●●●●', count: 7 },
          { type: 'text', value: '− 2 →' },
          { type: 'dots', value: '●●●●●', count: 5 },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Read the story. Find the start and what goes away. Then subtract!',
      },
    ],
  },
  {
    skillId: 'word-problems-put-together',
    steps: [
      {
        type: 'concept',
        title: 'Story Problems: Put Together',
        content: 'Sometimes you have two groups. Add them together to find how many in all!',
        visual: [
          { type: 'text', value: 'one group + other group = total' },
          { type: 'equation', value: '5 + 3 = ?' },
        ],
        tip: 'Draw a picture: two groups joining together.',
      },
      {
        type: 'example',
        title: 'Watch: Balls',
        content: 'There are 5 red balls and 3 blue balls. How many in all? 5 plus 3 is 8 balls!',
        visual: [
          { type: 'dots', value: '●●●●●', count: 5 },
          { type: 'text', value: '+' },
          { type: 'dots', value: '●●●', count: 3 },
          { type: 'text', value: '= 8' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Pets',
        content: 'There are 4 dogs and 6 cats. How many pets in all? 4 plus 6 is 10 pets!',
        visual: [
          { type: 'dots', value: '●●●●', count: 4 },
          { type: 'text', value: '+' },
          { type: 'dots', value: '●●●●●●', count: 6 },
          { type: 'text', value: '= 10' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Find the two groups and put them together to find the total!',
      },
    ],
  },
  {
    skillId: 'word-problems-compare',
    steps: [
      {
        type: 'concept',
        title: 'Story Problems: Comparing',
        content: 'Sometimes you need to find how many more one group has. Line them up and count the extra ones!',
        visual: [
          { type: 'dots', value: '●●●●●●●', count: 7 },
          { type: 'text', value: 'vs' },
          { type: 'dots', value: '●●●●', count: 4 },
          { type: 'text', value: 'difference is 3' },
        ],
        tip: '"How many more" = subtract the smaller from the bigger.',
      },
      {
        type: 'example',
        title: 'Watch: Stickers',
        content: 'Ana has 7 stickers. Ben has 4. How many more does Ana have? 7 minus 4 is 3. Ana has 3 more!',
        visual: [
          { type: 'text', value: 'Ana: ●●●●●●● (7)' },
          { type: 'text', value: 'Ben: ●●●●       (4)' },
          { type: 'equation', value: '7 − 4 = 3 more' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Books',
        content: 'Mia read 9 books. Leo read 6. How many fewer did Leo read? 9 minus 6 is 3. Leo read 3 fewer!',
        visual: [
          { type: 'text', value: 'Mia: ●●●●●●●●● (9)' },
          { type: 'text', value: 'Leo: ●●●●●●          (6)' },
          { type: 'equation', value: '9 − 6 = 3 fewer' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Find both amounts. Subtract to find the difference!',
      },
    ],
  },
  {
    skillId: 'commutative-property',
    steps: [
      {
        type: 'concept',
        title: 'Order Doesn\'t Matter!',
        content: 'When you add, you can swap the numbers! You get the same answer. 3 plus 5 and 5 plus 3 both make 8!',
        visual: [
          { type: 'equation', value: '3 + 5 = 8' },
          { type: 'equation', value: '5 + 3 = 8' },
        ],
        tip: 'This only works for addition, not subtraction!',
      },
      {
        type: 'example',
        title: 'Watch: Same Answer!',
        content: '2 + 7 = 9 and 7 + 2 = 9. The order changed but the answer stayed the same.',
        visual: [
          { type: 'dots', value: '●●', count: 2 },
          { type: 'text', value: '+' },
          { type: 'dots', value: '●●●●●●●', count: 7 },
          { type: 'text', value: '=' },
          { type: 'dots', value: '●●●●●●●', count: 7 },
          { type: 'text', value: '+' },
          { type: 'dots', value: '●●', count: 2 },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 4 + 6 and 6 + 4',
        content: '4 + 6 = 10 and 6 + 4 = 10. Same numbers, different order, same answer!',
        visual: [
          { type: 'equation', value: '4 + 6 = 10' },
          { type: 'equation', value: '6 + 4 = 10' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Check if the two sides are equal. Remember, addition order doesn\'t matter!',
      },
    ],
  },
  {
    skillId: 'counting-on-strategy',
    steps: [
      {
        type: 'concept',
        title: 'Counting On',
        content: 'Instead of counting all from 1, start from the bigger number and count up. It is much faster!',
        visual: [
          { type: 'dots', value: '●●●●●●●', count: 7 },
          { type: 'text', value: 'start here, count on 3' },
        ],
        tip: 'Always start from the bigger number.',
      },
      {
        type: 'example',
        title: 'Watch: 7 + 3',
        content: 'Don\'t count from 1. Start at 7 and count up 3: "7 ... 8, 9, 10." Answer: 10.',
        visual: [
          { type: 'text', value: '7 → 8 → 9 → 10' },
          { type: 'equation', value: '7 + 3 = 10' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 2 + 6',
        content: '6 is bigger, so start there. Count on 2: "6 ... 7, 8." Answer: 8.',
        visual: [
          { type: 'text', value: '6 → 7 → 8' },
          { type: 'equation', value: '2 + 6 = 8' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Find the bigger number, then count on!',
      },
    ],
  },
  {
    skillId: 'making-ten-strategy',
    steps: [
      {
        type: 'concept',
        title: 'Make a 10!',
        content: 'To add numbers bigger than 10, break one number apart to make a 10 first. Then add what is left.',
        tip: 'Find how many more you need to reach 10.',
      },
      {
        type: 'example',
        title: 'Watch: 8 + 5',
        content: '8 needs 2 more to make 10. Take 2 from the 5. Now you have 8 plus 2 is 10. Then 10 plus 3 is 13!',
        visual: [
          { type: 'equation', value: '8 + 5' },
          { type: 'equation', value: '= 8 + 2 + 3' },
          { type: 'equation', value: '= 10 + 3 = 13' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 9 + 6',
        content: '9 needs 1 more to make 10. Take 1 from the 6. Now you have 9 plus 1 is 10. Then 10 plus 5 is 15!',
        visual: [
          { type: 'equation', value: '9 + 1 = 10' },
          { type: 'equation', value: '10 + 5 = 15' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Break the smaller number to make a 10, then add the rest!',
      },
    ],
  },
  {
    skillId: 'addition-within-20',
    steps: [
      {
        type: 'concept',
        title: 'Adding Up to 20',
        content: 'Use making ten to add bigger numbers. Break one number apart so you can make a 10, then add the rest.',
        visual: [
          { type: 'equation', value: '7 + 8 = ?' },
          { type: 'text', value: 'Make 10 first, then add what is left.' },
        ],
        tip: 'Find how many more you need to reach 10.',
      },
      {
        type: 'example',
        title: 'Watch: 7 + 8',
        content: '7 needs 3 more to make 10. Take 3 from the 8. Now you have 7 plus 3 is 10. Then 10 plus 5 is 15!',
        visual: [
          { type: 'equation', value: '7 + 8' },
          { type: 'equation', value: '= 7 + 3 + 5' },
          { type: 'equation', value: '= 10 + 5 = 15' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 6 + 9',
        content: '9 needs 1 more to make 10. Take 1 from the 6. Now you have 9 plus 1 is 10. Then 10 plus 5 is 15!',
        visual: [
          { type: 'equation', value: '6 + 9' },
          { type: 'equation', value: '= 9 + 1 + 5' },
          { type: 'equation', value: '= 10 + 5 = 15' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Make a 10 first, then add the rest!',
      },
    ],
  },
  {
    skillId: 'subtraction-within-20',
    steps: [
      {
        type: 'concept',
        title: 'Subtracting Up to 20',
        content: 'To subtract big numbers, count up from the small number to the big one. Count how many jumps!',
        visual: [
          { type: 'equation', value: '14 − 6 = ?' },
          { type: 'text', value: 'Think: 6 + ? = 14' },
        ],
        tip: 'Count up through 10 — it makes subtraction easier!',
      },
      {
        type: 'example',
        title: 'Watch: 14 − 6',
        content: 'Ask: 6 plus what is 14? Count from 6 to 10. That is 4 jumps. Then count from 10 to 14. That is 4 more. So 4 plus 4 is 8!',
        visual: [
          { type: 'text', value: '6 to 10 is 4' },
          { type: 'text', value: '10 to 14 is 4' },
          { type: 'equation', value: '4 + 4 = 8' },
          { type: 'equation', value: '14 − 6 = 8' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 15 − 7',
        content: 'Ask: 7 plus what is 15? Count from 7 to 10. That is 3 jumps. Then count from 10 to 15. That is 5 more. So 3 plus 5 is 8!',
        visual: [
          { type: 'text', value: '7 to 10 is 3' },
          { type: 'text', value: '10 to 15 is 5' },
          { type: 'equation', value: '3 + 5 = 8' },
          { type: 'equation', value: '15 − 7 = 8' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Count up from the smaller number through 10!',
      },
    ],
  },
  {
    skillId: 'equal-sign-meaning',
    steps: [
      {
        type: 'concept',
        title: 'What Does = Mean?',
        content: 'The equal sign = means "is the same as." Both sides must have the same value.',
        visual: [
          { type: 'equation', value: '3 + 4 = 7' },
          { type: 'text', value: 'means "3 + 4 is the same as 7"' },
        ],
        tip: 'Check: does the left side equal the right side?',
      },
      {
        type: 'example',
        title: 'True or False?',
        content: 'Is 5 plus 2 equal to 7? Yes! Both sides are 7. This is true!',
        visual: [
          { type: 'equation', value: '5 + 2 = 7 ✓' },
        ],
      },
      {
        type: 'example',
        title: 'Another One',
        content: 'Is 3 plus 4 equal to 8? No way! 3 plus 4 is 7, not 8. This is false!',
        visual: [
          { type: 'equation', value: '3 + 4 ≠ 8 ✗' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Check if both sides are equal. Say True or False!',
      },
    ],
  },
  {
    skillId: 'missing-number-equations',
    steps: [
      {
        type: 'concept',
        title: 'Find the Missing Number',
        content: 'Sometimes the number is hidden! Use what you know to find it. Think: what number makes both sides equal?',
        visual: [
          { type: 'equation', value: '3 + ? = 8' },
        ],
        tip: 'Cover the missing number and think: what goes there?',
      },
      {
        type: 'example',
        title: 'Watch: 3 + ? = 8',
        content: 'Ask: 3 plus what is 8? Count up from 3. Say: 4, 5, 6, 7, 8. That is 5 jumps! The answer is 5.',
        visual: [
          { type: 'text', value: 'Count: 4, 5, 6, 7, 8 (5 jumps)' },
          { type: 'equation', value: '3 + 5 = 8 ✓' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: ? − 4 = 6',
        content: 'What minus 4 is 6? Flip it! 6 plus 4 is 10. So the missing number is 10!',
        visual: [
          { type: 'equation', value: '6 + 4 = 10' },
          { type: 'equation', value: '10 − 4 = 6 ✓' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Find the missing number that makes the equation true!',
      },
    ],
  },

];
