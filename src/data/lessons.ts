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
          { type: 'equation', value: '5 − 2 = 3' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Try some subtraction. Picture taking objects away!',
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
          { type: 'equation', value: '6 + 3 = 9' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Try adding numbers up to 10. Count on from the bigger number!',
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
          { type: 'equation', value: '8 − 3 = 5' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Try subtracting. Count back from the bigger number!',
      },
    ],
  },
  {
    skillId: 'addition-fluency-10',
    steps: [
      {
        type: 'concept',
        title: 'Know Your Facts!',
        content: 'Fluency means answering quickly and correctly. You should know facts like 3 + 7, 4 + 5, and 6 + 4 by heart.',
        tip: 'Try to answer without counting on your fingers.',
      },
      {
        type: 'example',
        title: 'Quick Recall',
        content: 'When you see 4 + 6, you should just know it is 10. When you see 3 + 5, you should just know it is 8.',
        visual: [
          { type: 'equation', value: '4 + 6 = 10' },
        ],
      },
      {
        type: 'try_it',
        title: 'Speed Round!',
        content: 'Answer these as quickly as you can. Try not to count — just recall the answer!',
      },
    ],
  },
  {
    skillId: 'subtraction-fluency-10',
    steps: [
      {
        type: 'concept',
        title: 'Quick Subtraction!',
        content: 'Just like addition, you should know subtraction facts by heart. Think: 10 − 6 = 4, 9 − 3 = 6.',
        tip: 'Use addition to check: if 10 − 6 = 4, then 4 + 6 = 10.',
      },
      {
        type: 'example',
        title: 'Quick Recall',
        content: 'When you see 9 − 4, think: what plus 4 makes 9? Answer: 5. So 9 − 4 = 5.',
        visual: [
          { type: 'equation', value: '9 − 4 = 5' },
        ],
      },
      {
        type: 'try_it',
        title: 'Speed Round!',
        content: 'Answer quickly! Use addition facts to help you subtract.',
      },
    ],
  },
  {
    skillId: 'word-problems-add-to',
    steps: [
      {
        type: 'concept',
        title: 'Story Problems: Adding',
        content: 'In "add to" stories, you start with some, then get more. You need to find the total.',
        tip: 'Look for words like "more", "in all", "total", or "altogether".',
      },
      {
        type: 'example',
        title: 'Watch: Solving a Story',
        content: 'Sam has 3 apples. He picks 4 more. How many does he have now? Start: 3. Gets more: 4. Add: 3 + 4 = 7 apples.',
        visual: [
          { type: 'equation', value: '3 + 4 = 7' },
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
        content: 'In "take from" stories, you start with some, then some go away. Find what is left.',
        tip: 'Look for words like "left", "remaining", "went away", or "ate".',
      },
      {
        type: 'example',
        title: 'Watch: Solving a Story',
        content: 'There are 8 birds. 3 fly away. How many are left? Start: 8. Go away: 3. Subtract: 8 − 3 = 5 birds.',
        visual: [
          { type: 'equation', value: '8 − 3 = 5' },
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
        content: 'Sometimes you have two groups and need to find the total. Or you know the total and one part, and need to find the other part.',
        tip: 'Draw a picture: two groups joining together.',
      },
      {
        type: 'example',
        title: 'Watch: Two Groups',
        content: 'There are 5 red balls and 3 blue balls. How many balls in all? Two parts: 5 and 3. Total: 5 + 3 = 8.',
        visual: [
          { type: 'equation', value: '5 + 3 = 8' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Find the two groups and put them together!',
      },
    ],
  },
  {
    skillId: 'word-problems-compare',
    steps: [
      {
        type: 'concept',
        title: 'Story Problems: Comparing',
        content: 'Compare problems ask "how many more" or "how many fewer." Subtract to find the difference.',
        tip: '"How many more" = subtract the smaller from the bigger.',
      },
      {
        type: 'example',
        title: 'Watch: How Many More?',
        content: 'Ana has 7 stickers. Ben has 4 stickers. How many more does Ana have? 7 − 4 = 3 more stickers.',
        visual: [
          { type: 'equation', value: '7 − 4 = 3' },
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
          { type: 'equation', value: '2 + 7 = 7 + 2 = 9' },
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
        content: 'Instead of counting all the dots from 1, start from the bigger number and count up. It is much faster!',
        tip: 'Always start from the bigger number.',
      },
      {
        type: 'example',
        title: 'Watch: 7 + 3',
        content: 'Don\'t count from 1. Start at 7 and count up 3: "7 ... 8, 9, 10." Answer: 10.',
        visual: [
          { type: 'text', value: '7 → 8 → 9 → 10' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Start from the bigger number and count on!',
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
        content: 'Use making ten or counting on to add numbers with sums up to 20.',
        tip: 'Make a 10 first, then add the rest.',
      },
      {
        type: 'example',
        title: 'Watch: 7 + 8',
        content: '7 + 8: Break 8 into 3 + 5. 7 + 3 = 10. 10 + 5 = 15.',
        visual: [
          { type: 'equation', value: '7 + 8 = 7 + 3 + 5 = 15' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Add these numbers. Use making ten to help!',
      },
    ],
  },
  {
    skillId: 'subtraction-within-20',
    steps: [
      {
        type: 'concept',
        title: 'Subtracting Up to 20',
        content: 'To subtract bigger numbers, think about the related addition fact. If 7 + 8 = 15, then 15 − 8 = 7.',
        tip: 'Think: what do I add to get back to the big number?',
      },
      {
        type: 'example',
        title: 'Watch: 14 − 6',
        content: 'Think: 6 + ? = 14. Count up from 6: 6 → 10 is 4 more. 10 → 14 is 4 more. Total: 4 + 4 = 8. So 14 − 6 = 8.',
        visual: [
          { type: 'equation', value: '14 − 6 = 8' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Use addition facts or count up from the smaller number!',
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
          { type: 'equation', value: '3 + 5 = 8' },
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
        content: 'You can count past 100, all the way to 120! After 99 comes 100, then 101, 102, and so on.',
        tip: 'The pattern repeats: ...8, 9, then the next ten. Like 18, 19, 20.',
      },
      {
        type: 'example',
        title: 'Watch: What Comes Next?',
        content: 'After 47 comes 48. After 99 comes 100. After 109 comes 110. The ones digit goes up by 1.',
        visual: [
          { type: 'text', value: '47 → 48 → 49 → 50' },
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
        content: '52 has a 5 in the tens place and a 2 in the ones place. That means 5 tens (= 50) and 2 ones (= 2). 50 + 2 = 52.',
        visual: [
          { type: 'dots', value: '▮▮▮▮▮', count: 5 },
          { type: 'text', value: '5 tens' },
          { type: 'dots', value: '●●', count: 2 },
          { type: 'text', value: '2 ones' },
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
          { type: 'text', value: '(ten)' },
          { type: 'dots', value: '●●●●●●', count: 6 },
          { type: 'text', value: '(six)' },
          { type: 'equation', value: '10 + 6 = 16' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'What is 10 plus the extra ones?',
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
        content: '3 tens = 30. Count: 10, 20, 30. Three groups of ten makes thirty.',
        visual: [
          { type: 'dots', value: '▮▮▮', count: 3 },
          { type: 'equation', value: '3 tens = 30' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'How many tens? Multiply by 10 or count by 10s!',
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
        content: '56 has 5 tens. 61 has 6 tens. 5 < 6, so 56 < 61.',
        visual: [
          { type: 'equation', value: '56 < 61' },
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
        content: 'Tens: 5 (stays the same). Ones: 2 + 3 = 5. Answer: 55.',
        visual: [
          { type: 'equation', value: '52 + 3 = 55' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Keep the tens, add the ones!',
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
        content: 'Tens: 4 + 3 = 7. Ones: 5 (stays). Answer: 75.',
        visual: [
          { type: 'equation', value: '45 + 30 = 75' },
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
        content: '67 has 6 tens. Add one ten: 7 tens. Ones stay 7. Answer: 77.',
        visual: [
          { type: 'equation', value: '67 + 10 = 77' },
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
        content: '8 tens − 5 tens = 3 tens = 30.',
        visual: [
          { type: 'equation', value: '80 − 50 = 30' },
        ],
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Subtract the tens, then multiply by 10!',
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
        content: 'To compare lengths, line objects up at one end. The one that sticks out further is longer.',
        tip: 'Always start measuring from the same point!',
      },
      {
        type: 'example',
        title: 'Which Is Longer?',
        content: 'A pencil and a crayon. Line them up at the left. The pencil sticks out more on the right, so it is longer.',
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
        content: 'You can measure how long something is by laying small objects end to end. Count how many fit along the length.',
        tip: 'No gaps, no overlaps! Line them up carefully.',
      },
      {
        type: 'example',
        title: 'Watch: Measure a Book',
        content: 'Lay paper clips along the book. Count: 1, 2, 3, 4, 5, 6. The book is 6 paper clips long.',
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Count the units carefully. How many fit?',
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
        title: 'Watch: What Time?',
        content: 'The short hand points to 3. The long hand points to 12. It is 3 o\'clock (3:00).',
        visual: [
          { type: 'image', value: 'clock:3:00' },
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
        title: 'Watch: What Time?',
        content: 'The long hand points to 6. The short hand is between 3 and 4. It is 3:30 (half past 3).',
        visual: [
          { type: 'image', value: 'clock:3:30' },
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
        tip: 'Count carefully! Check each item goes in the right group.',
      },
      {
        type: 'example',
        title: 'Watch: Favorite Fruits',
        content: 'Ask friends their favorite fruit: apple, banana, apple, orange, apple, banana. Apples: 3. Bananas: 2. Oranges: 1.',
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Read the data and count each category!',
      },
    ],
  },
  {
    skillId: 'interpret-data',
    steps: [
      {
        type: 'concept',
        title: 'Answering Questions About Data',
        content: 'Once data is organized, you can answer questions: Which has the most? How many total? How many more?',
        tip: 'Use addition for totals. Use subtraction for "how many more."',
      },
      {
        type: 'example',
        title: 'Watch: Using Data',
        content: 'Apples: 5, Bananas: 3. Which has more? Apples (5 > 3). How many more? 5 − 3 = 2 more.',
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
        content: 'Shapes have sides and corners. A triangle has 3 sides. A rectangle has 4 sides. A circle has 0 straight sides.',
        tip: 'Count the sides to identify the shape!',
      },
      {
        type: 'example',
        title: 'Watch: Name the Shape',
        content: 'This shape has 4 equal sides and 4 corners. It is a square! A square is a special rectangle.',
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
        content: '3D shapes are not flat — they take up space. A cube has flat faces. A sphere is round like a ball. A cylinder is like a can.',
        tip: 'Flat faces? Curved surface? That helps you identify it!',
      },
      {
        type: 'example',
        title: 'Watch: A Cube',
        content: 'A cube has 6 flat square faces, 8 corners, and 12 edges. A dice is shaped like a cube.',
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Look at the description. What 3D shape matches?',
      },
    ],
  },
  {
    skillId: 'compose-shapes',
    steps: [
      {
        type: 'concept',
        title: 'Building New Shapes',
        content: 'You can put small shapes together to make bigger shapes. Two triangles can make a rectangle!',
        tip: 'Think about what shapes fit together.',
      },
      {
        type: 'example',
        title: 'Watch: Two Squares',
        content: 'Put two squares side by side. You get a rectangle!',
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'What shape do you get when you combine these?',
      },
    ],
  },
  {
    skillId: 'partition-halves',
    steps: [
      {
        type: 'concept',
        title: 'Splitting in Half',
        content: 'A half means 2 equal parts. Each part is the same size. Cut a circle or rectangle right down the middle.',
        tip: 'Both parts must be the same size!',
      },
      {
        type: 'example',
        title: 'Watch: Half a Circle',
        content: 'Draw a line through the middle of a circle. Now you have 2 equal halves. Each half is the same.',
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Is this shape split into equal halves?',
      },
    ],
  },
  {
    skillId: 'partition-fourths',
    steps: [
      {
        type: 'concept',
        title: 'Splitting into Fourths',
        content: 'A fourth (or quarter) means 4 equal parts. Each part is the same size.',
        tip: 'Four equal parts. You can split halves in half!',
      },
      {
        type: 'example',
        title: 'Watch: Quarters of a Rectangle',
        content: 'Cut a rectangle in half, then cut each half in half. Now you have 4 equal pieces — fourths!',
      },
      {
        type: 'try_it',
        title: 'Your Turn!',
        content: 'Does this show equal fourths?',
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
