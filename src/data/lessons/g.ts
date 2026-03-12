import type { Lesson } from '../../types';

// G — Geometry
export const gLessons: Lesson[] = [
  {
    skillId: 'identify-2d-shapes',
    steps: [
      {
        type: 'concept',
        title: 'Flat Shapes',
        content: 'Flat shapes have sides and corners. Count them to know the shape! A triangle has 3 sides. A rectangle has 4 sides. A circle has no straight sides.',
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
        content: 'This shape has 4 equal sides and 4 square corners. It is a square! A square is a special kind of rectangle.',
        visual: [
          { type: 'text', value: '□ has 4 equal sides, 4 corners' },
          { type: 'text', value: '= Square (a special rectangle)' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: 3 Sides',
        content: 'This shape has 3 straight sides and 3 corners. It is a triangle! Any shape with 3 sides is a triangle.',
        visual: [
          { type: 'text', value: '△ has 3 sides, 3 corners' },
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
        content: 'Solid shapes take up space. You can hold them! They have flat faces, edges, and corners.',
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
        content: 'A cube has 6 flat square faces and 8 corners. A dice or a box is shaped like a cube!',
        visual: [
          { type: 'text', value: 'Cube: 6 faces, 8 corners' },
          { type: 'text', value: 'All faces are squares' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: A Cylinder',
        content: 'A cylinder has 2 flat circles on the top and bottom. The side is curved. A can is a cylinder!',
        visual: [
          { type: 'text', value: 'Cylinder: 2 flat circles, 1 curved side' },
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
          { type: 'text', value: '( ◐ ) 2 equal halves' },
          { type: 'text', value: 'Each piece = one half' },
        ],
      },
      {
        type: 'example',
        title: 'Watch: Half a Rectangle',
        content: 'Cut a rectangle right down the middle. Both pieces are the same. That is 2 halves!',
        visual: [
          { type: 'text', value: '[████|████] 2 equal halves' },
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
          { type: 'text', value: '( ◔ ) 4 equal parts' },
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

];
