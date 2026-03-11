import type { Lesson } from '../types';

// Each lesson follows: concept → example(s) → try_it
// concept: Explain the idea with visuals
// example: Worked model showing step-by-step
// try_it: Prompt the student before guided practice problems

const lessons: Lesson[] = [
  // ============================================
  // OA — Operations & Algebraic Thinking
  // ============================================
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
        content: 'You can use strategies to add fast. Doubles: 3+3=6, 4+4=8, 5+5=10. Near doubles: 3+4 is just one more than 3+3. And pairs that make 10: 6+4, 7+3, 8+2.',
        visual: [
          { type: 'equation', value: '5 + 5 = 10' },
          { type: 'equation', value: '6 + 4 = 10' },
        ],
        tip: 'Learn the doubles first — they help you solve nearby facts!',
      },
      {
        type: 'example',
        title: 'Watch: Doubles Help!',
        content: 'What is 3 + 4? Think: I know 3 + 3 = 6. Since 4 is one more than 3, the answer is one more: 7. So 3 + 4 = 7.',
        visual: [
          { type: 'equation', value: '3 + 3 = 6' },
          { type: 'equation', value: '3 + 4 = 6 + 1 = 7' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Make a 10!',
        content: 'What is 7 + 3? These are partners that make 10! If you know your ten-pairs, you can answer right away: 10.',
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
        content: 'Think addition to subtract fast! If you know 4 + 6 = 10, then you also know 10 − 6 = 4. Every subtraction fact has a matching addition fact.',
        visual: [
          { type: 'equation', value: '4 + 6 = 10' },
          { type: 'equation', value: '10 − 6 = 4' },
        ],
        tip: 'Think: "what plus this number equals that number?"',
      },
      {
        type: 'example',
        title: 'Watch: Think Addition!',
        content: 'What is 9 − 4? Think: 4 + ? = 9. I know 4 + 5 = 9, so 9 − 4 = 5.',
        visual: [
          { type: 'equation', value: '4 + ? = 9' },
          { type: 'equation', value: '4 + 5 = 9, so 9 − 4 = 5' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Subtract From 10',
        content: 'What is 10 − 7? Think: 7 + ? = 10. I know 7 + 3 = 10, so 10 − 7 = 3.',
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
        content: 'In "add to" stories, you start with some, then get more. You need to find the total. Think: Start + More = Total.',
        visual: [
          { type: 'text', value: 'Start + More = Total' },
          { type: 'equation', value: '3 + 4 = ?' },
        ],
        tip: 'Look for words like "more", "in all", "total", or "altogether".',
      },
      {
        type: 'example',
        title: 'Watch: Apples',
        content: 'Sam has 3 apples. He picks 4 more. How many now? Start: 3. More: 4. Total: 3 + 4 = 7 apples.',
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
        content: 'There are 5 birds in a tree. 3 more land. How many birds now? Start: 5. More: 3. Total: 5 + 3 = 8 birds.',
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
        content: 'In "take from" stories, you start with some, then some go away. Find what is left. Think: Start − Gone = Left.',
        visual: [
          { type: 'text', value: 'Start − Gone = Left' },
          { type: 'equation', value: '8 − 3 = ?' },
        ],
        tip: 'Look for words like "left", "remaining", "went away", or "ate".',
      },
      {
        type: 'example',
        title: 'Watch: Birds',
        content: 'There are 8 birds. 3 fly away. How many are left? Start: 8. Gone: 3. Left: 8 − 3 = 5 birds.',
        visual: [
          { type: 'dots', value: '●●●●●●●●', count: 8 },
          { type: 'text', value: '− 3 →' },
          { type: 'dots', value: '●●●●●', count: 5 },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Cookies',
        content: 'There are 7 cookies. You eat 2. How many are left? Start: 7. Gone: 2. Left: 7 − 2 = 5 cookies.',
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
        content: 'Sometimes you have two groups and need to find the total. Think: Part + Part = Whole.',
        visual: [
          { type: 'text', value: 'Part + Part = Whole' },
          { type: 'equation', value: '5 + 3 = ?' },
        ],
        tip: 'Draw a picture: two groups joining together.',
      },
      {
        type: 'example',
        title: 'Watch: Balls',
        content: 'There are 5 red balls and 3 blue balls. How many balls in all? Part: 5. Part: 3. Whole: 5 + 3 = 8 balls.',
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
        content: 'There are 4 dogs and 6 cats. How many pets in all? Part: 4. Part: 6. Whole: 4 + 6 = 10 pets.',
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
        content: 'Compare problems ask "how many more" or "how many fewer." Line up both groups and see the difference. Subtract to find it.',
        visual: [
          { type: 'dots', value: '●●●●●●●', count: 7 },
          { type: 'text', value: 'vs' },
          { type: 'dots', value: '●●●●', count: 4 },
          { type: 'text', value: '→ difference = 3' },
        ],
        tip: '"How many more" = subtract the smaller from the bigger.',
      },
      {
        type: 'example',
        title: 'Watch: Stickers',
        content: 'Ana has 7 stickers. Ben has 4. How many more does Ana have? Line them up: 7 − 4 = 3 more.',
        visual: [
          { type: 'text', value: 'Ana: ●●●●●●● (7)' },
          { type: 'text', value: 'Ben: ●●●●       (4)' },
          { type: 'equation', value: '7 − 4 = 3 more' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Books',
        content: 'Mia read 9 books. Leo read 6. How many fewer did Leo read? 9 − 6 = 3 fewer.',
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
        content: 'When you add, you can swap the numbers and get the same answer. 3 + 5 = 5 + 3. This is called the commutative property.',
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
          { type: 'text', value: 'start here → count on 3' },
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
        content: '8 needs 2 more to make 10. Break 5 into 2 + 3. Now: 8 + 2 = 10, then 10 + 3 = 13.',
        visual: [
          { type: 'equation', value: '8 + 5' },
          { type: 'equation', value: '= 8 + 2 + 3' },
          { type: 'equation', value: '= 10 + 3 = 13' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 9 + 6',
        content: '9 needs 1 more to make 10. Break 6 into 1 + 5. Now: 9 + 1 = 10, then 10 + 5 = 15.',
        visual: [
          { type: 'equation', value: '9 + 6 = 9 + 1 + 5 = 10 + 5 = 15' },
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
        content: '7 needs 3 more to make 10. Break 8 into 3 + 5. Now: 7 + 3 = 10, then 10 + 5 = 15.',
        visual: [
          { type: 'equation', value: '7 + 8' },
          { type: 'equation', value: '= 7 + 3 + 5' },
          { type: 'equation', value: '= 10 + 5 = 15' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 6 + 9',
        content: '9 needs 1 more to make 10. Break 6 into 1 + 5. Now: 9 + 1 = 10, then 10 + 5 = 15.',
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
        content: 'To subtract bigger numbers, count up from the smaller number to the bigger one. This is called "counting up to subtract."',
        visual: [
          { type: 'equation', value: '14 − 6 = ?' },
          { type: 'text', value: 'Think: 6 + ? = 14' },
        ],
        tip: 'Count up through 10 — it makes subtraction easier!',
      },
      {
        type: 'example',
        title: 'Watch: 14 − 6',
        content: 'Think: 6 + ? = 14. Count up: 6 → 10 is 4 more. 10 → 14 is 4 more. 4 + 4 = 8. So 14 − 6 = 8.',
        visual: [
          { type: 'text', value: '6 → 10 (+4) → 14 (+4)' },
          { type: 'equation', value: '4 + 4 = 8, so 14 − 6 = 8' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 15 − 7',
        content: 'Think: 7 + ? = 15. Count up: 7 → 10 is 3 more. 10 → 15 is 5 more. 3 + 5 = 8. So 15 − 7 = 8.',
        visual: [
          { type: 'text', value: '7 → 10 (+3) → 15 (+5)' },
          { type: 'equation', value: '3 + 5 = 8, so 15 − 7 = 8' },
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
        content: '5 + 2 = 7. Left side: 5 + 2 = 7. Right side: 7. Same? Yes! This is TRUE.',
        visual: [
          { type: 'equation', value: '5 + 2 = 7 ✓' },
        ],
      },
      {
        type: 'example',
        title: 'Another One',
        content: '3 + 4 = 8. Left side: 3 + 4 = 7. Right side: 8. Same? No! This is FALSE.',
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
        content: 'Think: 3 plus what equals 8? Count up from 3: 4, 5, 6, 7, 8. That is 5 more. So ? = 5.',
        visual: [
          { type: 'text', value: '3 → 4 → 5 → 6 → 7 → 8 (5 jumps)' },
          { type: 'equation', value: '3 + 5 = 8 ✓' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: ? − 4 = 6',
        content: 'Think: what minus 4 equals 6? Turn it into addition: 6 + 4 = 10. So ? = 10.',
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

  // ============================================
  // NBT — Number & Operations in Base Ten
  // ============================================
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
        content: '52 has 5 in the tens place and 2 in the ones place. That means 5 tens (= 50) and 2 ones (= 2). 50 + 2 = 52.',
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
        content: '37 has 3 in the tens place and 7 in the ones place. 3 tens (= 30) and 7 ones (= 7). 30 + 7 = 37.',
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
          { type: 'text', value: '10 more than 34 → 44' },
          { type: 'text', value: '10 less than 34 → 24' },
        ],
        tip: 'Only the tens digit changes!',
      },
      {
        type: 'example',
        title: 'Watch: 10 More Than 67',
        content: '67 has 6 tens. Add one more ten: 7 tens. Ones stay 7. Answer: 77.',
        visual: [
          { type: 'text', value: '67 → tens go up by 1 → 77' },
          { type: 'equation', value: '67 + 10 = 77' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 10 Less Than 53',
        content: '53 has 5 tens. Take away one ten: 4 tens. Ones stay 3. Answer: 43.',
        visual: [
          { type: 'text', value: '53 → tens go down by 1 → 43' },
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
        tip: 'Think in tens, then multiply by 10.',
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

  // ============================================
  // MD — Measurement & Data
  // ============================================
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
          { type: 'text', value: 'Shortest → Longest: Blue, Green, Red' },
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
          { type: 'image', value: 'clock:3:00' },
        ],
        tip: 'Short hand = hour. Long hand on 12 = o\'clock.',
      },
      {
        type: 'example',
        title: 'Watch: 3 O\'Clock',
        content: 'The short hand points to 3. The long hand points to 12. It is 3 o\'clock (3:00).',
        visual: [
          { type: 'image', value: 'clock:3:00' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 8 O\'Clock',
        content: 'The short hand points to 8. The long hand points to 12. It is 8 o\'clock (8:00).',
        visual: [
          { type: 'image', value: 'clock:8:00' },
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
          { type: 'image', value: 'clock:3:30' },
        ],
        tip: 'Long hand on 6 = half past (or :30).',
      },
      {
        type: 'example',
        title: 'Watch: Half Past 3',
        content: 'The long hand points to 6. The short hand is between 3 and 4. It is 3:30 (half past 3).',
        visual: [
          { type: 'image', value: 'clock:3:30' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Half Past 7',
        content: 'The long hand points to 6. The short hand is between 7 and 8. It is 7:30 (half past 7).',
        visual: [
          { type: 'image', value: 'clock:7:30' },
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

  // ============================================
  // G — Geometry
  // ============================================
  {
    skillId: 'identify-2d-shapes',
    steps: [
      {
        type: 'concept',
        title: 'Flat Shapes',
        content: 'Flat shapes have sides and corners. Count them to identify the shape! Triangle = 3 sides. Rectangle = 4 sides. Circle = 0 straight sides.',
        visual: [
          { type: 'text', value: '△ Triangle: 3 sides, 3 corners' },
          { type: 'text', value: '□ Rectangle: 4 sides, 4 corners' },
          { type: 'text', value: '○ Circle: 0 sides, 0 corners' },
        ],
        tip: 'Count the sides to identify the shape!',
      },
      {
        type: 'example',
        title: 'Watch: 4 Equal Sides',
        content: 'This shape has 4 equal sides and 4 square corners. It is a square! A square is a special rectangle where all sides are equal.',
        visual: [
          { type: 'text', value: '□ → 4 equal sides, 4 corners' },
          { type: 'text', value: '= Square (a special rectangle)' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 3 Sides',
        content: 'This shape has 3 straight sides and 3 corners. It is a triangle! Any shape with 3 sides is a triangle.',
        visual: [
          { type: 'text', value: '△ → 3 sides, 3 corners' },
          { type: 'text', value: '= Triangle' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Count the sides and corners. What shape is it?',
      },
    ],
  },
  {
    skillId: 'identify-3d-shapes',
    steps: [
      {
        type: 'concept',
        title: 'Solid Shapes',
        content: '3D shapes take up space — you can hold them. They have faces (flat sides), edges (where faces meet), and vertices (corners).',
        visual: [
          { type: 'text', value: '🧊 Cube: 6 flat faces, like a dice' },
          { type: 'text', value: '⚽ Sphere: round like a ball, no flat faces' },
          { type: 'text', value: '🥫 Cylinder: like a can, 2 flat circles' },
        ],
        tip: 'Flat faces? Curved surface? That helps you identify it!',
      },
      {
        type: 'example',
        title: 'Watch: A Cube',
        content: 'A cube has 6 flat square faces, 8 corners, and 12 edges. A dice or a box is shaped like a cube.',
        visual: [
          { type: 'text', value: 'Cube → 6 faces, 8 corners, 12 edges' },
          { type: 'text', value: 'All faces are squares' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: A Cylinder',
        content: 'A cylinder has 2 flat circle faces on top and bottom, and 1 curved surface around the side. A can is a cylinder.',
        visual: [
          { type: 'text', value: 'Cylinder → 2 flat circles + 1 curved side' },
          { type: 'text', value: 'It can roll!' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Read the description. Does it have flat faces or curved surfaces? What 3D shape is it?',
      },
    ],
  },
  {
    skillId: 'compose-shapes',
    steps: [
      {
        type: 'concept',
        title: 'Building New Shapes',
        content: 'You can put small shapes together to make bigger shapes. Think about how shapes fit together like puzzle pieces.',
        visual: [
          { type: 'text', value: '△ + △ = □ (two triangles make a rectangle)' },
        ],
        tip: 'Try rotating or flipping shapes to make them fit!',
      },
      {
        type: 'example',
        title: 'Watch: Two Squares',
        content: 'Put two squares side by side. You get a rectangle! The rectangle is 2 squares wide and 1 square tall.',
        visual: [
          { type: 'text', value: '□ + □ = ▬ (rectangle)' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Two Triangles',
        content: 'Put two right triangles together along their long side. You get a rectangle!',
        visual: [
          { type: 'text', value: '◣ + ◥ = □ (rectangle)' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'What bigger shape can you make from these smaller shapes?',
      },
    ],
  },
  {
    skillId: 'partition-halves',
    steps: [
      {
        type: 'concept',
        title: 'Splitting in Half',
        content: 'A half means 2 equal parts. Each part must be the same size. The key word is EQUAL — both pieces must match!',
        visual: [
          { type: 'text', value: '[ Left half | Right half ] ← equal halves ✓' },
          { type: 'text', value: '[ Big part | Small ] ← NOT halves ✗' },
        ],
        tip: 'Both parts must be the same size!',
      },
      {
        type: 'example',
        title: 'Watch: Half a Circle',
        content: 'Draw a line through the middle of a circle. Now you have 2 equal halves. Each half is the same size.',
        visual: [
          { type: 'text', value: '( ◐ ) → 2 equal halves ✓' },
          { type: 'text', value: 'Each piece = one half' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Half a Rectangle',
        content: 'Cut a rectangle right down the middle. Both pieces are the same. That is 2 halves!',
        visual: [
          { type: 'text', value: '[████|████] → 2 equal halves ✓' },
          { type: 'text', value: 'Each piece = one half' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Is this shape split into 2 equal parts? Are they halves?',
      },
    ],
  },
  {
    skillId: 'partition-fourths',
    steps: [
      {
        type: 'concept',
        title: 'Splitting into Fourths',
        content: 'A fourth (or quarter) means 4 equal parts. You can make fourths by splitting halves in half!',
        visual: [
          { type: 'text', value: '[█|█|█|█] ← 4 equal fourths ✓' },
        ],
        tip: 'Four equal parts. Split halves in half to make fourths!',
      },
      {
        type: 'example',
        title: 'Watch: Fourths of a Rectangle',
        content: 'Cut a rectangle in half. Then cut each half in half again. Now you have 4 equal pieces — fourths!',
        visual: [
          { type: 'text', value: 'Step 1: [████|████] (2 halves)' },
          { type: 'text', value: 'Step 2: [██|██|██|██] (4 fourths)' },
          { type: 'text', value: 'Each piece = one fourth' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Fourths of a Circle',
        content: 'Draw one line across the middle. Then draw another line top to bottom. Four equal slices — fourths!',
        visual: [
          { type: 'text', value: '( ◔ ) → 4 equal parts' },
          { type: 'text', value: 'Each piece = one fourth (quarter)' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Does this show 4 equal parts? Are they all fourths?',
      },
    ],
  },
  // ============================================
  // MISSING OA — New Lessons
  // ============================================
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
        content: 'Subtraction can be thought of as "what do I add?" If you see 12 − 5 = ?, think: 5 + ? = 12.',
        visual: [
          { type: 'equation', value: '12 − 5 = ?' },
          { type: 'text', value: 'Think: 5 + ? = 12' },
        ],
        tip: 'Turn subtraction into an addition question!',
      },
      {
        type: 'example',
        title: 'Watch: 9 − 4',
        content: 'Think: 4 + ? = 9. Count up from 4: 5, 6, 7, 8, 9. That is 5 jumps. So 9 − 4 = 5.',
        visual: [
          { type: 'equation', value: '4 + ? = 9' },
          { type: 'text', value: '4 → 5 → 6 → 7 → 8 → 9 (5 jumps)' },
          { type: 'equation', value: '9 − 4 = 5' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 15 − 7',
        content: 'Think: 7 + ? = 15. Count up: 7 → 10 is 3, then 10 → 15 is 5. Total: 3 + 5 = 8. So 15 − 7 = 8.',
        visual: [
          { type: 'equation', value: '7 + ? = 15' },
          { type: 'text', value: '7 → 10 (+3) → 15 (+5) = 8' },
          { type: 'equation', value: '15 − 7 = 8' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Turn it into addition: what plus the smaller number equals the bigger number?',
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
          { type: 'text', value: '42 → "forty-two"' },
          { type: 'text', value: '85 → "eighty-five"' },
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
        content: 'Sometimes you know the start and end, but not how much was added. Think: Start + ? = End. So ? = End − Start.',
        visual: [
          { type: 'text', value: 'Start + ? = End' },
          { type: 'equation', value: '5 + ? = 12' },
        ],
        tip: 'Subtract to find the missing change!',
      },
      {
        type: 'example',
        title: 'Watch: Toys',
        content: 'Sam had 5 toys. He got some more. Now he has 12. How many did he get? 12 − 5 = 7 toys.',
        visual: [
          { type: 'equation', value: '5 + ? = 12' },
          { type: 'equation', value: '12 − 5 = 7' },
          { type: 'text', value: 'He got 7 more toys.' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Birds',
        content: 'There were 8 birds. More came. Now there are 14. How many came? 14 − 8 = 6 birds.',
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
        content: 'Sometimes you know how much was added and the total, but not the start. Think: ? + Added = Total. So ? = Total − Added.',
        visual: [
          { type: 'text', value: '? + Added = Total' },
          { type: 'equation', value: '? + 4 = 11' },
        ],
        tip: 'Subtract to find the start!',
      },
      {
        type: 'example',
        title: 'Watch: Playing',
        content: 'Some kids were playing. 4 more came. Now there are 11. How many at first? 11 − 4 = 7 kids.',
        visual: [
          { type: 'equation', value: '? + 4 = 11' },
          { type: 'equation', value: '11 − 4 = 7' },
          { type: 'text', value: '7 kids were playing at first.' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Flowers',
        content: 'There were some flowers. 6 more bloomed. Now there are 13. How many at first? 13 − 6 = 7 flowers.',
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
        content: 'You know the start and what is left. Find how much was taken away. Think: Start − ? = Left. So ? = Start − Left.',
        visual: [
          { type: 'text', value: 'Start − ? = Left' },
          { type: 'equation', value: '15 − ? = 9' },
        ],
        tip: 'Subtract what is left from the start to find what was taken!',
      },
      {
        type: 'example',
        title: 'Watch: Cookies',
        content: 'There were 15 cookies. Some were eaten. Now there are 9. How many were eaten? 15 − 9 = 6 cookies.',
        visual: [
          { type: 'equation', value: '15 − ? = 9' },
          { type: 'equation', value: '15 − 9 = 6' },
          { type: 'text', value: '6 cookies were eaten.' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Marbles',
        content: 'You had 12 marbles. You lost some. Now you have 5. How many did you lose? 12 − 5 = 7 marbles.',
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
        content: 'You know what was taken and what is left. Find the start. Think: ? − Taken = Left. So ? = Left + Taken.',
        visual: [
          { type: 'text', value: '? − Taken = Left' },
          { type: 'equation', value: '? − 3 = 8' },
        ],
        tip: 'Add what is left and what was taken to find the start!',
      },
      {
        type: 'example',
        title: 'Watch: Apples',
        content: 'Some apples were on the table. 3 were eaten. Now there are 8. How many at first? 8 + 3 = 11 apples.',
        visual: [
          { type: 'equation', value: '? − 3 = 8' },
          { type: 'equation', value: '8 + 3 = 11' },
          { type: 'text', value: '11 apples at first.' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Books',
        content: 'There were some books on the shelf. 5 were borrowed. Now there are 7. How many at first? 7 + 5 = 12 books.',
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
        content: 'When someone has "more than" another, add the difference. Think: Smaller + Difference = Bigger.',
        visual: [
          { type: 'text', value: 'Smaller + Difference = Bigger' },
          { type: 'equation', value: '6 + 4 = ?' },
        ],
        tip: '"More than" means add!',
      },
      {
        type: 'example',
        title: 'Watch: Marbles',
        content: 'Ben has 6 marbles. Ana has 4 more than Ben. How many does Ana have? 6 + 4 = 10 marbles.',
        visual: [
          { type: 'text', value: 'Ben: ●●●●●● (6)' },
          { type: 'text', value: 'Ana: ●●●●●●●●●● (6 + 4 = 10)' },
          { type: 'equation', value: '6 + 4 = 10' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Ribbons',
        content: 'The blue ribbon is 8 inches. The red ribbon is 3 inches longer. How long is the red ribbon? 8 + 3 = 11 inches.',
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
        content: 'When someone has "more than" another, and you know the bigger amount, subtract to find the smaller one. Bigger − Difference = Smaller.',
        visual: [
          { type: 'text', value: 'Bigger − Difference = Smaller' },
          { type: 'equation', value: '11 − 5 = ?' },
        ],
        tip: 'Subtract the difference from the bigger amount!',
      },
      {
        type: 'example',
        title: 'Watch: Stickers',
        content: 'Ana has 11 stickers. She has 5 more than Ben. How many does Ben have? 11 − 5 = 6 stickers.',
        visual: [
          { type: 'text', value: 'Ana: ●●●●●●●●●●● (11)' },
          { type: 'text', value: 'Ben: ●●●●●●            (11 − 5 = 6)' },
          { type: 'equation', value: '11 − 5 = 6' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Plants',
        content: 'The tall plant is 15 inches. It is 7 inches taller than the short one. How tall is the short plant? 15 − 7 = 8 inches.',
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
        content: 'Equal shares make up a whole. Two halves = 1 whole. Four fourths = 1 whole. The more parts you make, the smaller each part gets.',
        visual: [
          { type: 'text', value: '[ half | half ] = 1 whole' },
          { type: 'text', value: '[¼|¼|¼|¼] = 1 whole' },
        ],
        tip: 'More equal parts = smaller pieces. Fewer parts = bigger pieces.',
      },
      {
        type: 'example',
        title: 'Watch: Pizza Halves',
        content: 'A pizza is cut into 2 equal pieces. Each piece is a half. Put both halves together and you have 1 whole pizza. 2 halves = 1 whole.',
        visual: [
          { type: 'text', value: '( ◐ ) = half + half' },
          { type: 'equation', value: '2 halves = 1 whole' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Sandwich Fourths',
        content: 'A sandwich is cut into 4 equal parts. Each part is a fourth (quarter). Put all 4 together = 1 whole. A fourth is smaller than a half!',
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

  // ============================================
  // MISSING 2nd Grade Extensions — New Lessons
  // ============================================
  {
    skillId: 'fluency-add-sub-20',
    steps: [
      {
        type: 'concept',
        title: 'Facts Within 20',
        content: 'You should know addition and subtraction facts within 20 quickly. Use strategies: doubles, make a 10, or think-addition-for-subtraction.',
        visual: [
          { type: 'equation', value: '8 + 7 = 15' },
          { type: 'equation', value: '16 − 9 = 7' },
        ],
        tip: 'Use the strategy that feels fastest for each problem!',
      },
      {
        type: 'example',
        title: 'Watch: 9 + 6',
        content: 'Use make-a-ten: 9 + 1 = 10, then 10 + 5 = 15. So 9 + 6 = 15.',
        visual: [
          { type: 'equation', value: '9 + 6' },
          { type: 'equation', value: '= 9 + 1 + 5' },
          { type: 'equation', value: '= 10 + 5 = 15' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 17 − 8',
        content: 'Think addition: 8 + ? = 17. Count up: 8 → 10 is 2, 10 → 17 is 7. Total: 2 + 7 = 9. So 17 − 8 = 9.',
        visual: [
          { type: 'equation', value: '8 + ? = 17' },
          { type: 'text', value: '8 → 10 (+2) → 17 (+7)' },
          { type: 'equation', value: '2 + 7 = 9, so 17 − 8 = 9' },
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
        content: 'The same word problem types work with bigger numbers up to 100. Use place value: add tens and ones separately.',
        visual: [
          { type: 'equation', value: '34 + 28 = ?' },
          { type: 'text', value: 'Break into tens and ones to solve.' },
        ],
        tip: 'Add tens first, then add ones, then combine!',
      },
      {
        type: 'example',
        title: 'Watch: Bus Problem',
        content: '34 kids on a bus. 28 more get on. How many now? Tens: 30 + 20 = 50. Ones: 4 + 8 = 12. Total: 50 + 12 = 62 kids.',
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
        content: 'Had 75 stickers, gave away 38. How many left? 75 − 38: break it down. 70 − 30 = 40. 5 − 8... need to regroup: borrow 1 ten. 15 − 8 = 7. 30 + 7 = 37.',
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
        content: '400 = 4 hundreds. That is also 40 tens, or 400 ones.',
        visual: [
          { type: 'text', value: '4 hundreds = 400' },
          { type: 'text', value: '40 tens = 400' },
          { type: 'equation', value: '400 = 4 × 100' },
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
        content: 'Tens: 40 + 30 = 70. Ones: 7 + 5 = 12. Combine: 70 + 12 = 82.',
        visual: [
          { type: 'text', value: 'Tens: 40 + 30 = 70' },
          { type: 'text', value: 'Ones: 7 + 5 = 12' },
          { type: 'equation', value: '70 + 12 = 82' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 83 − 26',
        content: 'Ones: 3 − 6... not enough! Regroup: borrow 1 ten. 13 − 6 = 7. Tens: 70 − 20 = 50. Answer: 57.',
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
          { type: 'image', value: 'clock:2:15' },
          { type: 'text', value: 'Count by 5s: 5, 10, 15 minutes' },
        ],
        tip: 'Long hand on 1 = :05, on 2 = :10, on 3 = :15, and so on.',
      },
      {
        type: 'example',
        title: 'Watch: 2:15',
        content: 'Short hand near 2 = 2 hours. Long hand on 3. Count by 5s: 5, 10, 15 minutes. It is 2:15.',
        visual: [
          { type: 'image', value: 'clock:2:15' },
          { type: 'equation', value: '2:15' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 7:40',
        content: 'Short hand past 7 = 7 hours. Long hand on 8. Count by 5s: 5, 10, 15, 20, 25, 30, 35, 40 minutes. It is 7:40.',
        visual: [
          { type: 'image', value: 'clock:7:40' },
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
        content: 'Shapes have attributes: number of sides, number of corners, whether sides are equal, and whether corners are square. You can draw a shape from its description.',
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
          { type: 'text', value: '3 sides → △ Triangle' },
          { type: 'text', value: 'Any triangle works!' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 4 Equal Sides, Square Corners',
        content: '"Draw a shape with 4 equal sides and 4 square corners." That is a square! All sides the same length, all corners 90 degrees.',
        visual: [
          { type: 'text', value: '4 equal sides + 4 square corners → □ Square' },
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

// Build lookup map
const lessonMap = new Map<string, Lesson>(lessons.map(l => [l.skillId, l]));

export function getLesson(skillId: string): Lesson | undefined {
  return lessonMap.get(skillId);
}

export { lessons };
