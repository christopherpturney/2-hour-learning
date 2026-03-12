import type { Problem, ProblemGenerator, ScaffoldingLevel, QuestionPart } from '../../types';
import { randomInt, generateId, shuffle } from './utils';

interface Shape2D {
  name: string;
  sides: number;
  corners: number;
  description: string;
  visual: string;
}

interface Shape3D {
  name: string;
  faces: number;
  edges: number;
  vertices: number;
  description: string;
  realWorldExample: string;
}

const SHAPES_2D: Shape2D[] = [
  { name: 'circle', sides: 0, corners: 0, description: 'round with no sides or corners', visual: '○' },
  { name: 'triangle', sides: 3, corners: 3, description: '3 sides and 3 corners', visual: '△' },
  { name: 'square', sides: 4, corners: 4, description: '4 equal sides and 4 square corners', visual: '□' },
  { name: 'rectangle', sides: 4, corners: 4, description: '4 sides with 2 long sides and 2 short sides', visual: '▭' },
  { name: 'trapezoid', sides: 4, corners: 4, description: '4 sides with only one pair of parallel sides', visual: '⏢' },
  { name: 'hexagon', sides: 6, corners: 6, description: '6 sides and 6 corners', visual: '⬡' },
];

const SHAPES_3D: Shape3D[] = [
  { name: 'cube', faces: 6, edges: 12, vertices: 8, description: '6 square faces, all the same size', realWorldExample: 'a dice or a block' },
  { name: 'rectangular prism', faces: 6, edges: 12, vertices: 8, description: '6 faces, some long and some short, like a box', realWorldExample: 'a cereal box or a brick' },
  { name: 'cone', faces: 1, edges: 0, vertices: 1, description: 'a flat circle on the bottom and a point on top', realWorldExample: 'an ice cream cone or a party hat' },
  { name: 'cylinder', faces: 2, edges: 0, vertices: 0, description: '2 flat circles and a curved surface', realWorldExample: 'a can or a roll of paper towels' },
  { name: 'sphere', faces: 0, edges: 0, vertices: 0, description: 'perfectly round like a ball, no flat faces', realWorldExample: 'a basketball or a globe' },
];

// ============================================
// Identify 2D Shapes
// ============================================
const identify2DShapes: ProblemGenerator = {
  skillId: 'identify-2d-shapes',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const shape = SHAPES_2D[randomInt(0, SHAPES_2D.length - 1)];

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `Look at this shape. What is this shape called?`;
        questionParts = [
          { type: 'image', value: `shape-${shape.name}` },
          { type: 'text', value: 'What shape is this?' },
        ];
        hint = `Count the sides and corners. This shape has ${shape.sides === 0 ? 'no sides' : `${shape.sides} sides`} and ${shape.corners === 0 ? 'no corners' : `${shape.corners} corners`}.`;
        break;
      case 'representational':
        question = `This shape has ${shape.description}. What is it called?`;
        questionParts = [
          { type: 'text', value: `This shape is ${shape.description}.` },
          { type: 'text', value: 'What is it?' },
        ];
        hint = `Think about shapes you know. Which one is ${shape.description}?`;
        break;
      case 'abstract': {
        // Use the full description to avoid ambiguity when multiple shapes
        // share the same number of sides and corners (e.g. square, rectangle, trapezoid).
        const isUniqueBySidesAndCorners = SHAPES_2D.filter(
          s => s.sides === shape.sides && s.corners === shape.corners
        ).length === 1;

        if (isUniqueBySidesAndCorners) {
          question = shape.sides === 0
            ? `Which shape has no sides and no corners?`
            : `Which shape has ${shape.sides} sides and ${shape.corners} corners?`;
        } else {
          question = `Which shape is ${shape.description}?`;
        }
        questionParts = [
          { type: 'text', value: question },
        ];
        hint = `Think about the shapes you know. How many sides and corners does each one have?`;
        break;
      }
    }

    const otherShapes = SHAPES_2D.filter(s => s.name !== shape.name);
    const wrongChoices = shuffle(otherShapes).slice(0, 3).map(s => s.name);
    const choices = shuffle([shape.name, ...wrongChoices]);

    return {
      id: generateId(),
      skillId: 'identify-2d-shapes',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: shape.name,
      choices,
      hint,
      explanation: `This is a ${shape.name}. A ${shape.name} is ${shape.description}.`,
    };
  },
};

// ============================================
// Identify 3D Shapes
// ============================================
const identify3DShapes: ProblemGenerator = {
  skillId: 'identify-3d-shapes',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const shape = SHAPES_3D[randomInt(0, SHAPES_3D.length - 1)];

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `Think about ${shape.realWorldExample}. What 3D shape is it?`;
        questionParts = [
          { type: 'image', value: `shape3d-${shape.name.replace(' ', '-')}` },
          { type: 'text', value: `Think about ${shape.realWorldExample}.` },
          { type: 'text', value: 'What 3D shape is this?' },
        ];
        hint = `This shape has ${shape.description}. It looks like ${shape.realWorldExample}.`;
        break;
      case 'representational':
        question = `This 3D shape has ${shape.description}. It looks like ${shape.realWorldExample}. What is it?`;
        questionParts = [
          { type: 'text', value: `This 3D shape has ${shape.description}.` },
          { type: 'text', value: `Example: ${shape.realWorldExample}.` },
        ];
        hint = `It has ${shape.description}.`;
        break;
      case 'abstract':
        question = `Which 3D shape has ${shape.description}?`;
        questionParts = [
          { type: 'text', value: question },
        ];
        hint = `Think about 3D shapes: cube, cone, cylinder, sphere, rectangular prism.`;
        break;
    }

    const otherShapes = SHAPES_3D.filter(s => s.name !== shape.name);
    const wrongChoices = shuffle(otherShapes).slice(0, 3).map(s => s.name);
    const choices = shuffle([shape.name, ...wrongChoices]);

    return {
      id: generateId(),
      skillId: 'identify-3d-shapes',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: shape.name,
      choices,
      hint,
      explanation: `This is a ${shape.name}. A ${shape.name} has ${shape.description}. An example is ${shape.realWorldExample}.`,
    };
  },
};

// ============================================
// Compose Shapes
// ============================================
const composeShapes: ProblemGenerator = {
  skillId: 'compose-shapes',
  generate(scaffolding: ScaffoldingLevel): Problem {
    // Composing shapes from smaller shapes
    const compositions = [
      { result: 'rectangle', parts: ['2 squares'], partCount: 2, partShape: 'square' },
      { result: 'square', parts: ['2 triangles'], partCount: 2, partShape: 'triangle' },
      { result: 'hexagon', parts: ['6 triangles'], partCount: 6, partShape: 'triangle' },
      { result: 'bigger square', parts: ['4 squares'], partCount: 4, partShape: 'square' },
      { result: 'bigger rectangle', parts: ['2 rectangles'], partCount: 2, partShape: 'rectangle' },
    ];
    const comp = compositions[randomInt(0, compositions.length - 1)];

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `If you put ${comp.partCount} ${comp.partShape}s together, what bigger shape can you make?`;
        questionParts = [
          { type: 'image', value: `compose-${comp.partShape}-to-${comp.result}` },
          { type: 'text', value: `Put ${comp.partCount} ${comp.partShape}s together.` },
          { type: 'text', value: 'What shape do you get?' },
        ];
        hint = `Imagine placing ${comp.partCount} ${comp.partShape}s side by side. What bigger shape do they make?`;
        break;
      case 'representational':
        question = `${comp.partCount} ${comp.partShape}s put together can make a ___. What shape?`;
        questionParts = [
          { type: 'text', value: `${comp.partCount} ${comp.partShape}s = ?` },
        ];
        hint = `When you combine ${comp.partCount} ${comp.partShape}s, they form a larger shape.`;
        break;
      case 'abstract':
        question = `What shape can you make with ${comp.partCount} ${comp.partShape}s?`;
        questionParts = [
          { type: 'text', value: question },
        ];
        hint = `Think about putting ${comp.partShape}s together.`;
        break;
    }

    const allResults = ['rectangle', 'square', 'triangle', 'hexagon', 'circle', 'bigger square', 'bigger rectangle'];
    const wrongChoices = shuffle(allResults.filter(r => r !== comp.result)).slice(0, 3);
    const choices = shuffle([comp.result, ...wrongChoices]);

    return {
      id: generateId(),
      skillId: 'compose-shapes',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: comp.result,
      choices,
      hint,
      explanation: `When you put ${comp.partCount} ${comp.partShape}s together, you can make a ${comp.result}.`,
    };
  },
};

// ============================================
// Partition into Halves
// ============================================
const partitionHalves: ProblemGenerator = {
  skillId: 'partition-halves',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const shapes = ['circle', 'square', 'rectangle'];
    const shape = shapes[randomInt(0, shapes.length - 1)];
    // Ask if something is split into equal halves
    const isEqualHalves = Math.random() > 0.4;

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    if (isEqualHalves) {
      switch (scaffolding) {
        case 'concrete':
          question = `This ${shape} is cut into 2 equal parts. Each part is called a ___. What do we call each part?`;
          questionParts = [
            { type: 'image', value: `${shape}-halves` },
            { type: 'text', value: `Cut into 2 equal parts.` },
            { type: 'text', value: 'What is each part called?' },
          ];
          hint = `When you cut something into 2 equal parts, each part is one...`;
          break;
        case 'representational':
          question = `A ${shape} is divided into 2 equal parts. What is each part called?`;
          questionParts = [
            { type: 'text', value: `${shape} split into 2 equal parts.` },
            { type: 'text', value: 'Each part is called a ___.' },
          ];
          hint = `Two equal parts = two ___`;
          break;
        case 'abstract':
          question = `When a shape is split into 2 equal parts, each part is called a ___.`;
          questionParts = [
            { type: 'text', value: '2 equal parts. Each part = ?' },
          ];
          hint = `Half of something = one of two equal parts.`;
          break;
      }

      const choices = shuffle(['half', 'fourth', 'third', 'whole']);
      return {
        id: generateId(),
        skillId: 'partition-halves',
        type: 'multiple_choice',
        scaffolding,
        question,
        questionParts,
        correctAnswer: 'half',
        choices,
        hint,
        explanation: `When a shape is divided into 2 equal parts, each part is called a half. Two halves make a whole.`,
      };
    } else {
      // Ask true/false about equal vs unequal halves
      switch (scaffolding) {
        case 'concrete':
          question = `This ${shape} is cut into 2 parts, but the parts are NOT the same size. Are these halves?`;
          questionParts = [
            { type: 'image', value: `${shape}-unequal-parts` },
            { type: 'text', value: 'The parts are different sizes.' },
            { type: 'text', value: 'Are these halves?' },
          ];
          hint = `Halves must be equal parts. Are these parts the same size?`;
          break;
        case 'representational':
          question = `A ${shape} is cut into 2 parts, but the parts are different sizes. Are these halves?`;
          questionParts = [
            { type: 'text', value: '2 parts, different sizes.' },
            { type: 'text', value: 'Halves? True or false.' },
          ];
          hint = `For parts to be halves, they must be equal.`;
          break;
        case 'abstract':
          question = `True or false: If a shape is split into 2 unequal parts, each part is a half.`;
          questionParts = [
            { type: 'text', value: '2 unequal parts = halves?' },
          ];
          hint = `Halves means 2 EQUAL parts.`;
          break;
      }

      return {
        id: generateId(),
        skillId: 'partition-halves',
        type: 'true_false',
        scaffolding,
        question,
        questionParts,
        correctAnswer: 'false',
        choices: ['true', 'false'],
        hint,
        explanation: `False! Halves must be 2 EQUAL parts. If the parts are different sizes, they are not halves.`,
      };
    }
  },
};

// ============================================
// Partition into Fourths
// ============================================
const partitionFourths: ProblemGenerator = {
  skillId: 'partition-fourths',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const shapes = ['circle', 'square', 'rectangle'];
    const shape = shapes[randomInt(0, shapes.length - 1)];

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    // Ask how many equal parts
    const askPartsName = Math.random() > 0.5;

    if (askPartsName) {
      switch (scaffolding) {
        case 'concrete':
          question = `This ${shape} is cut into 4 equal parts. What do we call each part?`;
          questionParts = [
            { type: 'image', value: `${shape}-fourths` },
            { type: 'text', value: '4 equal parts.' },
            { type: 'text', value: 'Each part is called a ___.' },
          ];
          hint = `When something is split into 4 equal parts, each part is called a...`;
          break;
        case 'representational':
          question = `A ${shape} is divided into 4 equal parts. Each part is called a ___.`;
          questionParts = [
            { type: 'text', value: `${shape}: 4 equal parts.` },
            { type: 'text', value: 'Each part = ?' },
          ];
          hint = `4 equal parts. Each part is one-___`;
          break;
        case 'abstract':
          question = `When a shape is split into 4 equal parts, each part is called a ___.`;
          questionParts = [
            { type: 'text', value: '4 equal parts. Each part = ?' },
          ];
          hint = `One out of four equal parts.`;
          break;
      }

      const choices = shuffle(['fourth', 'half', 'third', 'whole']);
      return {
        id: generateId(),
        skillId: 'partition-fourths',
        type: 'multiple_choice',
        scaffolding,
        question,
        questionParts,
        correctAnswer: 'fourth',
        choices,
        hint,
        explanation: `When a shape is divided into 4 equal parts, each part is called a fourth (or a quarter). Four fourths make a whole.`,
      };
    } else {
      // Ask how many fourths make a whole
      switch (scaffolding) {
        case 'concrete':
          question = `A ${shape} is cut into fourths. How many fourths make the whole ${shape}?`;
          questionParts = [
            { type: 'image', value: `${shape}-fourths` },
            { type: 'text', value: 'How many fourths in the whole?' },
          ];
          hint = `Count all the equal parts.`;
          break;
        case 'representational':
          question = `How many fourths are in one whole ${shape}?`;
          questionParts = [
            { type: 'text', value: `How many fourths = 1 whole?` },
          ];
          hint = `If each part is a fourth, how many parts make the whole?`;
          break;
        case 'abstract':
          question = `How many fourths make a whole?`;
          questionParts = [
            { type: 'text', value: '___ fourths = 1 whole' },
          ];
          hint = `"Fourths" means the shape is split into how many parts?`;
          break;
      }

      const choices = shuffle(['4', '2', '3', '6']);
      return {
        id: generateId(),
        skillId: 'partition-fourths',
        type: 'multiple_choice',
        scaffolding,
        question,
        questionParts,
        correctAnswer: '4',
        choices,
        hint,
        explanation: `4 fourths make a whole. When you split something into fourths, you get 4 equal parts. Put them all together and you get the whole thing back.`,
      };
    }
  },
};

// ============================================
// Describe Shares and Wholes
// ============================================
const describeSharesWholes: ProblemGenerator = {
  skillId: 'describe-shares-wholes',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const items = ['pizza', 'sandwich', 'pie', 'cake', 'cookie'];
    const item = items[randomInt(0, items.length - 1)];
    const numPeople = randomInt(0, 1) === 0 ? 2 : 4;
    const partName = numPeople === 2 ? 'half' : 'fourth';

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `${numPeople} friends want to share 1 ${item} equally. The ${item} is cut into ${numPeople} equal pieces. How much does each friend get?`;
        questionParts = [
          { type: 'image', value: `${item}-${numPeople}-parts` },
          { type: 'text', value: `${numPeople} friends share 1 ${item}.` },
          { type: 'text', value: 'How much does each get?' },
        ];
        hint = `The ${item} is split into ${numPeople} equal parts. Each person gets 1 part.`;
        break;
      case 'representational':
        question = `1 ${item} is shared equally among ${numPeople} friends. Each friend gets one ___ of the ${item}.`;
        questionParts = [
          { type: 'text', value: `1 ${item} shared by ${numPeople} = ?` },
          { type: 'text', value: `Each person gets one ___.` },
        ];
        hint = `${numPeople} equal shares of 1 whole. What is each share called?`;
        break;
      case 'abstract':
        question = `If 1 whole is shared equally among ${numPeople}, each share is called a ___.`;
        questionParts = [
          { type: 'text', value: `1 whole shared equally among ${numPeople} = ?` },
        ];
        hint = `Splitting into ${numPeople} equal parts gives ${numPeople === 2 ? 'halves' : 'fourths'}.`;
        break;
    }

    const choices = shuffle(['half', 'fourth', 'third', 'whole']);
    return {
      id: generateId(),
      skillId: 'describe-shares-wholes',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: partName,
      choices,
      hint,
      explanation: `When 1 ${item} is shared equally among ${numPeople} friends, each person gets one ${partName}. ${numPeople} ${partName}s make a whole.`,
    };
  },
};

// ============================================
// Draw Shapes by Attributes (2.G.A.1)
// ============================================

interface ShapeAttribute {
  shapeName: string;
  attribute: string;
  question: string;
}

const SHAPE_ATTRIBUTES: ShapeAttribute[] = [
  { shapeName: 'triangle', attribute: '3 sides and 3 angles', question: 'Which shape has exactly 3 sides and 3 angles?' },
  { shapeName: 'square', attribute: '4 equal sides and 4 right angles', question: 'Which shape has 4 equal sides and 4 right angles?' },
  { shapeName: 'rectangle', attribute: '4 sides, 4 right angles, opposite sides equal', question: 'Which shape has 4 right angles and opposite sides that are equal?' },
  { shapeName: 'hexagon', attribute: '6 sides and 6 angles', question: 'Which shape has exactly 6 sides and 6 angles?' },
  { shapeName: 'trapezoid', attribute: '4 sides with exactly one pair of parallel sides', question: 'Which shape has 4 sides with exactly one pair of parallel sides?' },
  { shapeName: 'cube', attribute: '6 square faces, all the same size', question: 'Which 3D shape has 6 faces that are all squares?' },
  { shapeName: 'cone', attribute: 'a flat circular base and a point on top', question: 'Which 3D shape has a circular base and comes to a point?' },
  { shapeName: 'cylinder', attribute: '2 flat circular faces and a curved surface', question: 'Which 3D shape has 2 circular faces and a curved surface?' },
];

const drawShapesAttributes: ProblemGenerator = {
  skillId: 'draw-shapes-attributes',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const item = SHAPE_ATTRIBUTES[randomInt(0, SHAPE_ATTRIBUTES.length - 1)];

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete':
        question = `Look at these shapes. ${item.question}`;
        questionParts = [
          { type: 'text', value: item.question },
          { type: 'text', value: `Attributes: ${item.attribute}` },
        ];
        hint = `Look carefully at each shape. Which one matches all the attributes listed?`;
        break;
      case 'representational':
        question = `A shape has these attributes: ${item.attribute}. What shape is it?`;
        questionParts = [
          { type: 'text', value: `Attributes: ${item.attribute}` },
          { type: 'text', value: 'What shape matches?' },
        ];
        hint = `Think about each shape you know and check if it matches all the attributes.`;
        break;
      case 'abstract':
        question = item.question;
        questionParts = [
          { type: 'text', value: item.question },
        ];
        hint = `Think about the defining attributes of each shape.`;
        break;
    }

    const is3D = ['cube', 'cone', 'cylinder', 'sphere', 'rectangular prism'].includes(item.shapeName);
    const sameTypeNames = SHAPE_ATTRIBUTES.filter(s => {
      const s3D = ['cube', 'cone', 'cylinder', 'sphere', 'rectangular prism'].includes(s.shapeName);
      return s3D === is3D;
    }).map(s => s.shapeName);
    const wrongChoices = shuffle(sameTypeNames.filter(n => n !== item.shapeName)).slice(0, 3);
    const choices = shuffle([item.shapeName, ...wrongChoices]);

    return {
      id: generateId(),
      skillId: 'draw-shapes-attributes',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: item.shapeName,
      choices,
      hint,
      explanation: `A ${item.shapeName} has ${item.attribute}. Recognizing shapes by their attributes helps us understand their properties.`,
    };
  },
};

export const geometryGenerators: ProblemGenerator[] = [
  identify2DShapes,
  identify3DShapes,
  composeShapes,
  partitionHalves,
  partitionFourths,
  describeSharesWholes,
  drawShapesAttributes,
];
