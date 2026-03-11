import type { Skill } from '../types';

export const skills: Skill[] = [
  // ================================================================
  // DOMAIN: Operations & Algebraic Thinking (1.OA)
  // ================================================================

  // K prerequisites
  {
    id: 'addition-within-5',
    name: 'Addition Within 5',
    description: 'Add two numbers with sums up to 5',
    domain: 'OA',
    standardCode: 'K.OA.A.5',
    prerequisites: [],
    curriculumOrder: 1,
  },
  {
    id: 'subtraction-within-5',
    name: 'Subtraction Within 5',
    description: 'Subtract within 5',
    domain: 'OA',
    standardCode: 'K.OA.A.5',
    prerequisites: [],
    curriculumOrder: 2,
  },

  // Sums and differences to 10
  {
    id: 'addition-within-10',
    name: 'Addition Within 10',
    description: 'Add two numbers with sums up to 10',
    domain: 'OA',
    standardCode: '1.OA.C.6',
    prerequisites: ['addition-within-5'],
    curriculumOrder: 3,
  },
  {
    id: 'subtraction-within-10',
    name: 'Subtraction Within 10',
    description: 'Subtract within 10',
    domain: 'OA',
    standardCode: '1.OA.C.6',
    prerequisites: ['subtraction-within-5'],
    curriculumOrder: 4,
  },
  {
    id: 'addition-fluency-10',
    name: 'Addition Fluency (to 10)',
    displayName: 'Fast Addition to 10',
    description: 'Quickly and accurately add within 10',
    domain: 'OA',
    standardCode: '1.OA.C.6',
    prerequisites: ['addition-within-10'],
    curriculumOrder: 5,
  },
  {
    id: 'subtraction-fluency-10',
    name: 'Subtraction Fluency (to 10)',
    displayName: 'Fast Subtraction to 10',
    description: 'Quickly and accurately subtract within 10',
    domain: 'OA',
    standardCode: '1.OA.C.6',
    prerequisites: ['subtraction-within-10'],
    curriculumOrder: 6,
  },

  // Word problems
  {
    id: 'word-problems-add-to',
    name: 'Word Problems: Add To',
    description: 'Solve "add to" word problems (result unknown)',
    domain: 'OA',
    standardCode: '1.OA.A.1',
    prerequisites: ['addition-within-10'],
    curriculumOrder: 7,
  },
  {
    id: 'word-problems-take-from',
    name: 'Word Problems: Take From',
    description: 'Solve "take from" word problems (result unknown)',
    domain: 'OA',
    standardCode: '1.OA.A.1',
    prerequisites: ['subtraction-within-10'],
    curriculumOrder: 8,
  },
  {
    id: 'word-problems-put-together',
    name: 'Word Problems: Put Together',
    description: 'Solve "put together / take apart" word problems',
    domain: 'OA',
    standardCode: '1.OA.A.1',
    prerequisites: ['addition-within-10', 'subtraction-within-10'],
    curriculumOrder: 9,
  },
  {
    id: 'word-problems-compare',
    name: 'Word Problems: Compare',
    description: 'Solve comparison word problems (how many more/fewer)',
    domain: 'OA',
    standardCode: '1.OA.A.1',
    prerequisites: ['addition-within-10', 'subtraction-within-10'],
    curriculumOrder: 10,
  },

  // Word problems: Change Unknown and Start Unknown (CCSS Table 1)
  {
    id: 'word-problems-add-to-change',
    name: 'Word Problems: Add To (Change Unknown)',
    displayName: 'Stories: How Many Were Added?',
    description: 'Solve "add to" word problems where the change is unknown (3 + ? = 8)',
    domain: 'OA',
    standardCode: '1.OA.A.1',
    prerequisites: ['word-problems-add-to'],
    curriculumOrder: 11,
  },
  {
    id: 'word-problems-add-to-start',
    name: 'Word Problems: Add To (Start Unknown)',
    displayName: 'Stories: How Many at First?',
    description: 'Solve "add to" word problems where the start is unknown (? + 3 = 7)',
    domain: 'OA',
    standardCode: '1.OA.A.1',
    prerequisites: ['word-problems-add-to-change'],
    curriculumOrder: 12,
  },
  {
    id: 'word-problems-take-from-change',
    name: 'Word Problems: Take From (Change Unknown)',
    displayName: 'Stories: How Many Were Taken?',
    description: 'Solve "take from" word problems where the change is unknown (9 - ? = 4)',
    domain: 'OA',
    standardCode: '1.OA.A.1',
    prerequisites: ['word-problems-take-from'],
    curriculumOrder: 13,
  },
  {
    id: 'word-problems-take-from-start',
    name: 'Word Problems: Take From (Start Unknown)',
    displayName: 'Stories: Find the Start',
    description: 'Solve "take from" word problems where the start is unknown (? - 3 = 5)',
    domain: 'OA',
    standardCode: '1.OA.A.1',
    prerequisites: ['word-problems-take-from-change'],
    curriculumOrder: 14,
  },
  {
    id: 'word-problems-compare-bigger',
    name: 'Word Problems: Compare (Bigger Unknown)',
    displayName: 'Stories: Find the Bigger Number',
    description: 'Solve comparison word problems where the bigger quantity is unknown',
    domain: 'OA',
    standardCode: '1.OA.A.1',
    prerequisites: ['word-problems-compare'],
    curriculumOrder: 15,
  },
  {
    id: 'word-problems-compare-smaller',
    name: 'Word Problems: Compare (Smaller Unknown)',
    displayName: 'Stories: Find the Smaller Number',
    description: 'Solve comparison word problems where the smaller quantity is unknown',
    domain: 'OA',
    standardCode: '1.OA.A.1',
    prerequisites: ['word-problems-compare-bigger'],
    curriculumOrder: 16,
  },

  // Properties and strategies
  {
    id: 'commutative-property',
    name: 'Commutative Property',
    displayName: 'Order Does Not Matter',
    description: 'Understand that a + b = b + a',
    domain: 'OA',
    standardCode: '1.OA.B.3',
    prerequisites: ['addition-within-10'],
    curriculumOrder: 17,
  },
  {
    id: 'subtraction-as-unknown-addend',
    name: 'Subtraction as Unknown Addend',
    displayName: 'Think Addition to Subtract',
    description: 'Understand subtraction as finding a missing addend (10 - 8 = ? means 8 + ? = 10)',
    domain: 'OA',
    standardCode: '1.OA.B.4',
    prerequisites: ['subtraction-within-10'],
    curriculumOrder: 18,
  },
  {
    id: 'counting-on-strategy',
    name: 'Counting On',
    description: 'Use counting on as a strategy to add (start from larger number)',
    domain: 'OA',
    standardCode: '1.OA.C.5',
    prerequisites: ['addition-within-10'],
    curriculumOrder: 19,
  },
  {
    id: 'making-ten-strategy',
    name: 'Making Ten',
    displayName: 'Make a 10',
    description: 'Use making ten as a strategy (e.g., 8 + 6 = 8 + 2 + 4 = 10 + 4)',
    domain: 'OA',
    standardCode: '1.OA.C.6',
    prerequisites: ['addition-fluency-10', 'subtraction-fluency-10'],
    curriculumOrder: 20,
  },

  // Addition and subtraction to 20
  {
    id: 'addition-within-20',
    name: 'Addition Within 20',
    description: 'Add two numbers with sums up to 20',
    domain: 'OA',
    standardCode: '1.OA.C.6',
    prerequisites: ['making-ten-strategy'],
    curriculumOrder: 21,
  },
  {
    id: 'subtraction-within-20',
    name: 'Subtraction Within 20',
    description: 'Subtract within 20',
    domain: 'OA',
    standardCode: '1.OA.C.6',
    prerequisites: ['making-ten-strategy'],
    curriculumOrder: 22,
  },
  {
    id: 'add-three-numbers',
    name: 'Add Three Numbers',
    description: 'Add three whole numbers with sum ≤ 20',
    domain: 'OA',
    standardCode: '1.OA.A.2',
    prerequisites: ['addition-within-20'],
    curriculumOrder: 23,
  },

  // Equations
  {
    id: 'equal-sign-meaning',
    name: 'Equal Sign Meaning',
    displayName: 'What Does = Mean?',
    description: 'Understand = means "the same as" and determine if equations are true or false',
    domain: 'OA',
    standardCode: '1.OA.D.7',
    prerequisites: ['addition-within-10', 'subtraction-within-10'],
    curriculumOrder: 24,
  },
  {
    id: 'missing-number-equations',
    name: 'Missing Number Equations',
    displayName: 'Find the Missing Number',
    description: 'Find the unknown in equations like 8 + ? = 11',
    domain: 'OA',
    standardCode: '1.OA.D.8',
    prerequisites: ['equal-sign-meaning'],
    curriculumOrder: 25,
  },

  // ================================================================
  // DOMAIN: Number & Operations in Base Ten (1.NBT)
  // ================================================================
  {
    id: 'count-to-120',
    name: 'Count to 120',
    description: 'Count to 120 starting from any number; read and write numerals',
    domain: 'NBT',
    standardCode: '1.NBT.A.1',
    prerequisites: [],
    curriculumOrder: 26,
  },
  {
    id: 'read-write-numerals-120',
    name: 'Read & Write Numerals to 120',
    displayName: 'Number Names',
    description: 'Read and write numerals up to 120',
    domain: 'NBT',
    standardCode: '1.NBT.A.1',
    prerequisites: ['count-to-120'],
    curriculumOrder: 27,
  },
  {
    id: 'understand-tens-ones',
    name: 'Understand Tens and Ones',
    description: 'Understand that a two-digit number is made of tens and ones',
    domain: 'NBT',
    standardCode: '1.NBT.B.2',
    prerequisites: ['count-to-120'],
    curriculumOrder: 28,
  },
  {
    id: 'teen-numbers-composition',
    name: 'Teen Numbers Composition',
    displayName: 'Teen Numbers',
    description: 'Understand teen numbers as one ten and some ones (e.g., 14 = 10 + 4)',
    domain: 'NBT',
    standardCode: '1.NBT.B.2',
    prerequisites: ['understand-tens-ones'],
    curriculumOrder: 29,
  },
  {
    id: 'decade-numbers',
    name: 'Decade Numbers',
    description: 'Understand decade numbers (10, 20, 30, ..., 90) as groups of tens',
    domain: 'NBT',
    standardCode: '1.NBT.B.2',
    prerequisites: ['understand-tens-ones'],
    curriculumOrder: 30,
  },
  {
    id: 'compare-two-digit',
    name: 'Compare Two-Digit Numbers',
    description: 'Compare two two-digit numbers using >, =, and <',
    domain: 'NBT',
    standardCode: '1.NBT.B.3',
    prerequisites: ['understand-tens-ones'],
    curriculumOrder: 31,
  },
  {
    id: 'add-two-digit-plus-one',
    name: 'Add Two-Digit + One-Digit',
    description: 'Add a two-digit number and a one-digit number within 100',
    domain: 'NBT',
    standardCode: '1.NBT.C.4',
    prerequisites: ['addition-within-20', 'understand-tens-ones'],
    curriculumOrder: 32,
  },
  {
    id: 'add-two-digit-plus-tens',
    name: 'Add Two-Digit + Multiple of 10',
    description: 'Add a two-digit number and a multiple of 10',
    domain: 'NBT',
    standardCode: '1.NBT.C.4',
    prerequisites: ['decade-numbers', 'addition-within-20'],
    curriculumOrder: 33,
  },
  {
    id: 'mental-ten-more-less',
    name: 'Mental: 10 More / 10 Less',
    displayName: '10 More and 10 Less',
    description: 'Mentally find 10 more or 10 less than a two-digit number',
    domain: 'NBT',
    standardCode: '1.NBT.C.5',
    prerequisites: ['understand-tens-ones'],
    curriculumOrder: 34,
  },
  {
    id: 'subtract-multiples-of-ten',
    name: 'Subtract Multiples of 10',
    description: 'Subtract multiples of 10 (e.g., 80 - 30 = 50)',
    domain: 'NBT',
    standardCode: '1.NBT.C.6',
    prerequisites: ['decade-numbers', 'subtraction-within-20'],
    curriculumOrder: 35,
  },

  // ================================================================
  // DOMAIN: Measurement & Data (1.MD)
  // ================================================================
  {
    id: 'order-objects-by-length',
    name: 'Order by Length',
    description: 'Order three objects by length; compare lengths indirectly',
    domain: 'MD',
    standardCode: '1.MD.A.1',
    prerequisites: [],
    curriculumOrder: 36,
  },
  {
    id: 'measure-nonstandard-units',
    name: 'Measure with Units',
    displayName: 'Measuring Things',
    description: 'Measure length using same-size non-standard units (e.g., paper clips)',
    domain: 'MD',
    standardCode: '1.MD.A.2',
    prerequisites: ['order-objects-by-length', 'count-to-120'],
    curriculumOrder: 37,
  },
  {
    id: 'tell-time-hour',
    name: 'Tell Time: Hour',
    description: 'Tell and write time to the hour using analog and digital clocks',
    domain: 'MD',
    standardCode: '1.MD.B.3',
    prerequisites: [],
    curriculumOrder: 38,
  },
  {
    id: 'tell-time-half-hour',
    name: 'Tell Time: Half Hour',
    description: 'Tell and write time to the half-hour',
    domain: 'MD',
    standardCode: '1.MD.B.3',
    prerequisites: ['tell-time-hour'],
    curriculumOrder: 39,
  },
  {
    id: 'organize-data-categories',
    name: 'Organize Data',
    displayName: 'Sorting into Groups',
    description: 'Organize and represent data with up to three categories',
    domain: 'MD',
    standardCode: '1.MD.C.4',
    prerequisites: ['count-to-120'],
    curriculumOrder: 40,
  },
  {
    id: 'interpret-data',
    name: 'Interpret Data',
    displayName: 'Questions About Data',
    description: 'Answer questions about data: totals, comparisons, how many more/fewer',
    domain: 'MD',
    standardCode: '1.MD.C.4',
    prerequisites: ['organize-data-categories', 'addition-within-10', 'subtraction-within-10'],
    curriculumOrder: 41,
  },

  // ================================================================
  // DOMAIN: Geometry (1.G)
  // ================================================================
  {
    id: 'identify-2d-shapes',
    name: 'Identify 2D Shapes',
    displayName: 'Flat Shapes',
    description: 'Identify shapes by defining attributes (sides, corners)',
    domain: 'G',
    standardCode: '1.G.A.1',
    prerequisites: [],
    curriculumOrder: 42,
  },
  {
    id: 'identify-3d-shapes',
    name: 'Identify 3D Shapes',
    displayName: 'Solid Shapes',
    description: 'Identify 3D shapes: cubes, rectangular prisms, cones, cylinders',
    domain: 'G',
    standardCode: '1.G.A.1',
    prerequisites: ['identify-2d-shapes'],
    curriculumOrder: 43,
  },
  {
    id: 'compose-shapes',
    name: 'Compose Shapes',
    displayName: 'Building Shapes',
    description: 'Put shapes together to make new shapes',
    domain: 'G',
    standardCode: '1.G.A.2',
    prerequisites: ['identify-2d-shapes'],
    curriculumOrder: 44,
  },
  {
    id: 'partition-halves',
    name: 'Partition into Halves',
    displayName: 'Halves',
    description: 'Split circles and rectangles into two equal parts (halves)',
    domain: 'G',
    standardCode: '1.G.A.3',
    prerequisites: [],
    curriculumOrder: 45,
  },
  {
    id: 'partition-fourths',
    name: 'Partition into Fourths',
    displayName: 'Fourths',
    description: 'Split circles and rectangles into four equal parts (fourths/quarters)',
    domain: 'G',
    standardCode: '1.G.A.3',
    prerequisites: ['partition-halves'],
    curriculumOrder: 46,
  },
  {
    id: 'describe-shares-wholes',
    name: 'Describe Shares & Wholes',
    displayName: 'Shares and Wholes',
    description: 'Describe shares using words like "half of" and "quarter of"; understand the whole',
    domain: 'G',
    standardCode: '1.G.A.3',
    prerequisites: ['partition-halves', 'partition-fourths'],
    curriculumOrder: 47,
  },

  // ================================================================
  // 2ND GRADE EXTENSIONS
  // ================================================================

  // OA
  {
    id: 'fluency-add-sub-20',
    name: 'Fluency: Add & Subtract Within 20',
    displayName: 'Fast Facts to 20',
    description: 'Fluently add and subtract within 20 using mental strategies',
    domain: 'OA',
    standardCode: '2.OA.B.2',
    prerequisites: ['addition-within-20', 'subtraction-within-20'],
    curriculumOrder: 48,
  },
  {
    id: 'word-problems-within-100',
    name: 'Word Problems Within 100',
    displayName: 'Stories with Big Numbers',
    description: 'Use addition and subtraction within 100 to solve one- and two-step word problems',
    domain: 'OA',
    standardCode: '2.OA.A.1',
    prerequisites: ['word-problems-add-to-start', 'word-problems-take-from-start', 'add-two-digit-plus-one'],
    curriculumOrder: 49,
  },

  // NBT
  {
    id: 'understand-hundreds',
    name: 'Understand Hundreds',
    description: 'Understand that three-digit numbers represent hundreds, tens, and ones',
    domain: 'NBT',
    standardCode: '2.NBT.A.1',
    prerequisites: ['understand-tens-ones'],
    curriculumOrder: 50,
  },
  {
    id: 'add-subtract-within-100',
    name: 'Add & Subtract Within 100',
    displayName: 'Add and Subtract Big Numbers',
    description: 'Fluently add and subtract within 100 using strategies based on place value',
    domain: 'NBT',
    standardCode: '2.NBT.B.5',
    prerequisites: ['add-two-digit-plus-one', 'add-two-digit-plus-tens', 'subtract-multiples-of-ten'],
    curriculumOrder: 51,
  },

  // MD
  {
    id: 'tell-time-five-minutes',
    name: 'Tell Time: Five Minutes',
    description: 'Tell and write time to the nearest five minutes using analog and digital clocks',
    domain: 'MD',
    standardCode: '2.MD.C.7',
    prerequisites: ['tell-time-half-hour'],
    curriculumOrder: 52,
  },

  // G
  {
    id: 'draw-shapes-attributes',
    name: 'Draw Shapes by Attributes',
    displayName: 'Draw Shapes',
    description: 'Recognize and draw shapes having specified attributes like angles and equal faces',
    domain: 'G',
    standardCode: '2.G.A.1',
    prerequisites: ['identify-2d-shapes', 'identify-3d-shapes'],
    curriculumOrder: 53,
  },
];

// Build a lookup map for quick access
export const skillMap = new Map<string, Skill>(skills.map(s => [s.id, s]));

// Get skills by domain
export function getSkillsByDomain(domain: Skill['domain']): Skill[] {
  return skills.filter(s => s.domain === domain);
}

// Get skills sorted by curriculum order
export function getSkillsInOrder(): Skill[] {
  return [...skills].sort((a, b) => a.curriculumOrder - b.curriculumOrder);
}

// Get skills that depend on a given skill
export function getDependentSkills(skillId: string): Skill[] {
  return skills.filter(s => s.prerequisites.includes(skillId));
}

// Domain display names
export const domainNames: Record<Skill['domain'], string> = {
  OA: 'Operations & Algebraic Thinking',
  NBT: 'Number & Operations in Base Ten',
  MD: 'Measurement & Data',
  G: 'Geometry',
};
