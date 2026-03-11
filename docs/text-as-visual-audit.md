# Text-as-Visual Audit: Problem Generators

Every instance where visual/graphical content is represented as text strings instead of structured visual components.

## Summary

**50+ instances** across 8 files. The core pattern: problem generators embed visual information as unicode strings in the question text, when they should produce structured data that the renderer displays as proper visual components.

| File | Unicode Chars | Visual Type | Corrective Action |
|------|--------------|-------------|-------------------|
| placeValue.ts | `▮` `●` `■` | Place value blocks | New `Base10Blocks` SVG component |
| data.ts | `\|\|\|\|̸` `\|` `█` | Tally marks, bar charts | New `TallyMarks` SVG + `BarChart` SVG component |
| measurement.ts | `━` `▢` | Length bars, rulers | New `MeasurementBar` SVG component |
| addition.ts | `●` | Counting objects | New `CounterGroup` div component |
| subtraction.ts | `●` `✕` | Take-away models | Extend `CounterGroup` with crossed-out state |
| wordProblems.ts | `●` `✕` | Subtraction models | Reuse `CounterGroup` |
| geometry.ts | `○` `△` `□` `▭` `⏢` `⬡` | 2D shapes | Use existing `ShapeVisual` (already exists, just wire it up) |
| equations.ts | `●` | Counting dots | Reuse `CounterGroup` |
| utils.ts | `●` `✕` | Shared dot utilities | Deprecate once components are in place |

---

## New Components Needed

All components follow the existing pattern: SVG-based, accept a `size` prop, use the project color palette (`#4338ca` primary, `#e0e7ff` fill, `#1e293b` text), and are routed via `questionParts` with `type: 'image'` + a parseable value string.

### 1. `CounterGroup` — Colored circle counters

**Replaces:** `dots()`, `crossedDots()` from utils.ts
**Used by:** addition.ts, subtraction.ts, wordProblems.ts
**Rendering:**
- Div-based grid of colored circles (Tailwind `rounded-full`)
- Two groups with distinct colors (e.g., blue `#6366f1` + amber `#f59e0b`) for addition
- Crossed-out state: gray circles with a red `✕` SVG overlay for subtraction
- Arrange in rows of 5 for easy counting (like a ten-frame row)
- Label each group with its count

**Value format:** `counters-5-3` (two groups), `counters-8-cross-3` (8 total, 3 crossed out)

**Example rendering:**
```
┌─────────────────────────────┐
│  ●  ●  ●  ●  ●             │  ← blue group (5)
│  ○  ○  ○                    │  ← amber group (3)
└─────────────────────────────┘
```

### 2. `Base10Blocks` — Place value block visualization

**Replaces:** `tensBlock()`, `onesBlock()`, `■.repeat()` from placeValue.ts
**Rendering:**
- SVG component
- **Hundreds:** 10x10 grid squares (flat), filled `#c7d2fe`
- **Tens:** Tall narrow rectangles (10x1 bars), filled `#818cf8`
- **Ones:** Small unit squares, filled `#e0e7ff`
- Grouped with labels underneath ("3 hundreds", "4 tens", "2 ones")
- Stroke: `#4338ca`

**Value format:** `base10-3-4-2` (hundreds-tens-ones), `base10-0-5-7` (tens and ones only)

**Example rendering:**
```
┌──────┐ ┌──────┐ ┌──────┐   ▮ ▮ ▮ ▮   □ □ □ □ □
│██████│ │██████│ │██████│                □ □
│██████│ │██████│ │██████│
│██████│ │██████│ │██████│   4 tens       7 ones
│██████│ │██████│ │██████│
│██████│ │██████│ │██████│
  3 hundreds
```

### 3. `TallyMarks` — Proper tally mark rendering

**Replaces:** `tallies()` from data.ts
**Rendering:**
- SVG with vertical lines grouped in 5s, diagonal slash through each group
- Spacing between groups for easy counting
- Stroke: `#334155`, stroke-width 2, rounded caps

**Value format:** `tally-7` (renders one group of 5 + 2 singles)

**Example rendering:**
```
  |||| ̸   ||
 (group)  (2)
```

### 4. `BarChart` — SVG bar chart

**Replaces:** `barChart()` from data.ts
**Rendering:**
- SVG with proper axes, gridlines, and labeled bars
- Horizontal or vertical bars with rounded ends
- Category labels on x-axis, count labels on y-axis
- Bar colors: alternating from palette (`#818cf8`, `#f59e0b`, `#34d399`, `#f87171`)
- Light gridlines: `#e2e8f0`

**Value format:** `barchart-Cats:3,Dogs:5,Fish:2` (category:value pairs)

### 5. `MeasurementBar` — Length comparison and ruler

**Replaces:** `━.repeat()`, `▢.repeat()` from measurement.ts
**Rendering:**
- SVG horizontal bars with proportional lengths
- Ruler mode: tick marks at each unit with numbers
- Comparison mode: two labeled bars stacked vertically
- Object label on the left, length value on the right
- Fill: `#e0e7ff`, stroke: `#4338ca`

**Value format:** `measure-pencil:6-inches` or `compare-pencil:6,crayon:3-inches`

### 6. Wire up existing `ShapeVisual` for geometry.ts

**Replaces:** Unicode characters `○ △ □ ▭ ⏢ ⬡` from geometry.ts
**Action:** No new component needed. Change geometry.ts to emit `questionParts` with `type: 'image'` and `value: 'shape-circle'` etc., instead of embedding unicode in the question string. The existing `ShapeVisual` component + `parseShapeValue()` already handles these.

---

## Integration Pattern

All new components follow the existing architecture:

1. **Generator side** (engine/problems/): Emit `questionParts` with `type: 'image'` and a parseable value string instead of embedding unicode in the question text.

2. **Parser side** (new component file): Export a `parse[Component]Value()` function that returns structured data or `null`.

3. **Renderer side** (ProblemDisplay.tsx): Add parser to the `image` render chain:
```ts
// Existing
const clock = parseClockValue(part.value);
if (clock) return <ClockFace .../>;
const shape = parseShapeValue(part.value);
if (shape) return <ShapeVisual .../>;

// New
const counters = parseCounterValue(part.value);
if (counters) return <CounterGroup .../>;
const blocks = parseBase10Value(part.value);
if (blocks) return <Base10Blocks .../>;
const tally = parseTallyValue(part.value);
if (tally) return <TallyMarks .../>;
const chart = parseBarChartValue(part.value);
if (chart) return <BarChart .../>;
const measurement = parseMeasurementValue(part.value);
if (measurement) return <MeasurementBar .../>;
```

4. **WorksheetGenerator** (print view): The same components render in the print worksheet, using smaller `size` props.

---

## Detailed Findings

### `src/engine/problems/placeValue.ts` (30+ instances)

**Tens and ones block functions (lines 4-10):**
```ts
function tensBlock(tens: number): string {
  return '▮'.repeat(tens);
}
function onesBlock(ones: number): string {
  return '●'.repeat(ones);
}
```
Used extensively throughout for all place value problems at the concrete level.

**Hundreds blocks (line 710-712):**
```ts
{ type: 'text', value: `${'■'.repeat(hundreds)} hundreds` },
{ type: 'text', value: `${'▮'.repeat(tens)} tens` },
{ type: 'text', value: `${'●'.repeat(ones)} ones` },
```

**Fix:** Replace all usages with `{ type: 'image', value: 'base10-H-T-O' }` and render via `Base10Blocks`.

**Affected lines:** 109-114, 210, 214-217, 279, 282-285, 335-339, 401, 403-408, 463-468, 522-527, 583, 585-586, 643, 645-650, 710-712

---

### `src/engine/problems/data.ts` (5 instances)

**Tally marks (lines 34-42):**
```ts
function tallies(n: number): string { ... }
```
**Fix:** Replace with `{ type: 'image', value: 'tally-N' }`, render via `TallyMarks`.

**Bar charts (lines 45-50):**
```ts
function barChart(data: Record<string, number>): string { ... }
```
**Fix:** Replace with `{ type: 'image', value: 'barchart-Cat:3,Dog:5' }`, render via `BarChart`.

---

### `src/engine/problems/measurement.ts` (2 instances)

**Length comparison (lines 53, 59) and ruler units (lines 118-120):**
```ts
const visuals = objects.map(o => `${o.name}: ${'━'.repeat(o.typicalLength)}`).join('\n');
const unitVisual = '▢'.repeat(length);
```
**Fix:** Replace with `{ type: 'image', value: 'compare-...' }` or `{ type: 'image', value: 'measure-...' }`, render via `MeasurementBar`.

---

### `src/engine/problems/addition.ts` (4 instances)

**Dot counting (lines 20, 28, 78, 85):**
```ts
question = `Count all the dots: ${dots(a)} and ${dots(b)}. How many in all?`;
```
**Fix:** Move dots out of question string. Use `{ type: 'image', value: 'counters-A-B' }`, render via `CounterGroup` with two color-coded groups.

---

### `src/engine/problems/subtraction.ts` (4 instances)

**Take-away model (lines 20, 25, 77, 82):**
```ts
question = `You have ${dots(a)}. Take away ${b}. How many are left? ${crossedDots(a, b)}`;
```
**Fix:** Use `{ type: 'image', value: 'counters-A-cross-B' }`, render via `CounterGroup` with crossed-out circles.

---

### `src/engine/problems/wordProblems.ts` (3 instances)

**Crossed dots (line 110):**
```ts
const visual = '●'.repeat(remaining) + '✕'.repeat(removed);
```
**Fix:** Same as subtraction — use `CounterGroup` with crossed-out state.

**Text-only strategy references (lines 799, 803):**
```ts
{ type: 'text', value: 'Use tens and ones to help.' },
```
**Fix:** Replace with a `Base10Blocks` visual showing the relevant decomposition.

---

### `src/engine/problems/equations.ts` (4+ instances)

**Dots in equal sign and missing number problems (lines 35, 115, 117, 124, 129, 134, 139):**
```ts
question = `${dots(a)} + ${dots(b)} = ${dots(rightSide)}`;
question = `${dots(a)} + ${dots(b)} = ? Count all the dots.`;
{ type: 'dots', value: dots(a) }
```
**Fix:** Same as addition — use `CounterGroup` via `{ type: 'image', value: 'counters-A-B' }`.

---

### `src/engine/problems/geometry.ts` (2 instances)

**Unicode shape characters (lines 22-27):**
```ts
{ name: 'circle', visual: '○' },
{ name: 'triangle', visual: '△' },
```
**Fix:** Already solved — `ShapeVisual` component exists. Change generator to emit `{ type: 'image', value: 'shape-circle' }` instead of putting unicode in question text.

---

### `src/engine/problems/utils.ts` (shared utilities)

**Dots and crossed dots (lines 19-25):**
```ts
export function dots(n: number): string { return '●'.repeat(n); }
export function crossedDots(total: number, crossed: number): string { ... }
```
**Fix:** Deprecate these functions once `CounterGroup` is in place. They can remain temporarily for the `question` string (which becomes text-only at abstract level) but should not be used at concrete/representational levels.

---

## Priority Order

1. **CounterGroup** — Highest impact. Fixes addition, subtraction, and word problems (11+ instances). Simplest to build (div + Tailwind circles).
2. **Base10Blocks** — Fixes all place value problems (30+ instances). Most instances but more complex SVG.
3. **Wire up ShapeVisual** — Zero new code, just change geometry.ts generator output. Quick win.
4. **TallyMarks** — Small SVG component, fixes data.ts tally problems.
5. **BarChart** — More complex SVG, fixes data visualization problems.
6. **MeasurementBar** — Fixes measurement.ts, lower instance count.
