# Visual Audit: Generic Visuals vs Contextual Images

## Summary

Multiple problem generators use generic visual representations (colored dots, tally lines) instead of images matching the objects discussed in the problem text. This creates a disconnect for young learners who need concrete, recognizable visuals.

---

## Issues Found

### 1. Word Problems — Dots Instead of Object Images

**File:** `src/engine/problems/wordProblems.ts`

All 10 word problem generators (concrete scaffolding level) use `counters-X` or `counters-X-Y` which renders as **generic colored circles**, even though the problem text mentions specific objects from this list:
`apples, books, stickers, crayons, toy cars, cookies, marbles, pencils, flowers, stars, blocks, balloons, fish, buttons, shells`

| Generator | Lines | Example Problem Text | Current Visual |
|---|---|---|---|
| `wordProblemsAddTo` | 46-47 | "Emma has 3 crayons. Gets 2 more." | `counters-3-2` (dots) |
| `wordProblemsTakeFrom` | 110 | "5 cookies on shelf. Takes 2." | `counters-5-cross-2` (dots with X) |
| `wordProblemsPutTogether` | 183-185 | "3 red apples and 2 blue apples" | `counters-3` + `counters-2` (dots) |
| `wordProblemsCompare` | 302, 304 | "Emma has 8 marbles, Noah has 5" | `counters-8` + `counters-5` (dots) |
| `wordProblemsAddToChange` | 369, 371 | "Started with 4 flowers, ended with 9" | `counters-4` + `counters-9` (dots) |
| `wordProblemsAddToStart` | 436, 438 | "Added 3 books, total 7" | `counters-3` + `counters-7` (dots) |
| `wordProblemsTakeFromChange` | 503, 505 | "Had 8 pencils, now has 3" | `counters-8` + `counters-3` (dots) |
| `wordProblemsTakeFromStart` | 570, 572 | "Left 4, gone 3 stickers" | `counters-4` + `counters-3` (dots) |
| `wordProblemsCompareBigger` | 638, 640 | "Noah has 5 shells, Emma has 3 more" | `counters-5` + `counters-5-3` (dots) |
| `wordProblemsCompareSmaller` | 706 | "Emma has 10 balloons" | `counters-10` (dots) |

**Fix needed:** Pass the object name to the image value so the visual component renders SVG images of the actual object (e.g., crayon icons, apple icons). New format: `objects-{objectName}-{count}` and `objects-{objectName}-{countA}-{countB}`.

---

### 2. Data Problems — Tally Lines Instead of Category Images

**File:** `src/engine/problems/data.ts`

The `organizeDataCategories` generator (concrete level, line 67) uses `tally-X` which renders as **vertical lines**, while the categories are specific items that should be shown as pictures.

**Categories affected:**
- `favorite fruit`: apples, bananas, oranges → should show fruit icons
- `favorite pet`: dog, cat, fish → should show pet icons
- `favorite color`: red, blue, green → tally marks OK (colors are abstract)
- `favorite season`: spring, summer, winter → tally marks OK (seasons are abstract)
- `favorite sport`: soccer, basketball, swimming → should show sport icons
- `favorite snack`: cookies, crackers, fruit → should show snack icons

**Fix needed:** For concrete level, replace `tally-{count}` with `pictograph-{category}-{count}` which renders repeated small icons of the category item.

---

### 3. ProblemDisplay Hardcoded Scaffolding Text

**File:** `src/components/session/ProblemDisplay.tsx`, line 177

The concrete scaffolding banner always says: **"Use the dots to help you count!"**

This is wrong for:
- Word problems (should reference the objects)
- Data problems (should say "Use the pictures" or "Count the pictures")
- Base10 problems (should say "Use the blocks")
- Clock problems (should say "Look at the clock")
- Shape problems (should say "Look at the shape")

**Fix needed:** Either remove this generic message, or make it contextual based on the visual type. Simplest fix: change to "Use the pictures to help you count!" or remove entirely since each problem already has its own hint.

---

### 4. Geometry — Food Items Rendered as Abstract Shapes

**File:** `src/engine/problems/geometry.ts`

The `describeSharesWholes` generator (line 441) uses `{item}-{numPeople}-parts` format for food items (pizza, sandwich, pie, cake, cookie). These values are passed to `ShapeVisual` which likely doesn't handle food items and returns null.

**Fix needed:** Create simple food SVG icons for the partition problems, or use circle/rectangle shapes with food-themed labels since the partition concept is the focus.

---

## NOT Issues (Correctly Generic)

These generators use generic counters/blocks **appropriately**:

- **addition.ts**: All generators say "Count all the counters" — dots are correct since "counters" is the object
- **subtraction.ts**: All generators say "counters" — dots are correct
- **placeValue.ts**: Uses `base10-X-Y-Z` blocks — appropriate for place value
- **equations.ts**: Uses equations/number lines — no object visuals needed
- **time.ts**: Uses clock faces — appropriate
- **measurement.ts**: Uses measurement bars — these are fine as schematic comparisons

---

## Implementation Plan

### Step 1: Create Object SVG Icons Component
Create `src/components/visuals/ObjectIcons.tsx` with simple, recognizable SVG icons for each object in the word problems OBJECTS list and data categories.

### Step 2: Create ObjectGroup Component
Create `src/components/visuals/ObjectGroup.tsx` — similar to CounterGroup but renders object-specific SVGs. Supports formats:
- `objects-{name}-{count}` — single group of objects
- `objects-{name}-{countA}-{countB}` — two groups (addition)
- `objects-{name}-{total}-cross-{removed}` — crossed out (subtraction)

### Step 3: Create PictographRow Component
Create `src/components/visuals/PictographRow.tsx` — renders a row of small category icons for data/pictograph problems. Format: `pictograph-{category}-{count}`

### Step 4: Update ProblemDisplay.tsx
- Add ObjectGroup and PictographRow to the image parser chain
- Fix scaffolding banner text

### Step 5: Update Word Problem Generators
Update all 10 word problem generators in `wordProblems.ts` to pass object name in image value.

### Step 6: Update Data Problem Generator
Update `organizeDataCategories` in `data.ts` to use pictograph format for concrete level.

### Step 7: Test Each Generator
Test all generators across concrete, representational, and abstract levels.
