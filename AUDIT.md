# Problem Generator & Rendering Audit

Systematic review of every skill's worksheet and in-app rendering.
All 41 skills tested across all 3 scaffolding levels (concrete, representational, abstract).

**Testing method:** Generated problems programmatically via `generateProblem()` in the live app
for all 123 combinations (41 skills x 3 levels). Then generated worksheets in the preview app
for each skill domain at both abstract and concrete scaffolding levels, and screenshotted results.
Also verified in-app rendering by starting an assessment session and confirming ProblemDisplay output.
Tested `parseClockValue()` against all image value patterns to confirm which render and which don't.

**Result:** 0 generation errors. 10 issues found. 8 of 41 skills have broken rendering.

---

## Severity Legend

- **CRITICAL** — Feature is broken/unusable; student cannot complete the activity
- **MAJOR** — Answer is revealed, visuals are missing, or behavior is misleading
- **MODERATE** — Rendering inconsistency or UX issue that impacts usability
- **MINOR** — Edge case, cosmetic, or pedagogical nit

---

## CRITICAL Issues

### 1. Geometry `image` types render nothing (6 generators)

**Affected skills:** `identify-2d-shapes`, `identify-3d-shapes`, `compose-shapes`, `partition-halves`, `partition-fourths`, `describe-shares-wholes`

**Problem:** These generators emit `{ type: 'image', value: 'shape-circle' }`, `'shape3d-cube'`, `'compose-triangle-to-rectangle'`, `'circle-halves'`, `'pizza-2-parts'`, etc. ProblemDisplay only parses `clock-*` image values — everything else returns `null`. So the image part is silently dropped.

- **In-app:** No shape visual appears at all. Concrete scaffolding is supposed to show a shape but nothing renders.
- **Worksheet:** The `question` text includes Unicode shape chars (○, △, □, ▭, ⏢, ⬡) for 2D shapes, which is a partial workaround. But 3D shapes, composed shapes, partitions, and shares have NO visual in either context.

**Fix:** Create SVG shape components (similar to ClockFace) for each image pattern, or use simple inline SVGs for basic shapes. Wire them into both ProblemDisplay and WorksheetGenerator.

### 2. Time worksheets show no clock visual

**Affected skills:** `tell-time-hour`, `tell-time-half-hour`

**Problem:** After fixing the answer-reveal bug, the `question` text now says "What time does this clock show?" with no visual. The clock image is only in `questionParts` as `{ type: 'image' }`. The WorksheetGenerator only renders `problem.question` text, not questionParts, so worksheets display the question with nothing to look at.

- **In-app:** FIXED — ClockFace component now renders via ProblemDisplay.
- **Worksheet inline preview:** No clock shown.
- **Worksheet print view:** No clock shown.

**Fix:** Wire the `renderClockFaces()` helper (already added to WorksheetGenerator) into both the inline preview and print view for each problem. The helper is defined but not yet called.

---

## MAJOR Issues

### 3. `measure-nonstandard-units` abstract question gives away the answer

**Affected skill:** `measure-nonstandard-units`

**Problem:** Abstract scaffolding generates: *"A pencil is 5 paper clips long. How many paper clips long is the pencil?"* — the answer (5) is literally stated in the question. The student just reads the number.

- **In-app:** Same issue — question text contains the answer.
- **Worksheet:** Same.

**Fix:** Rewrite the abstract question to remove the direct answer. Options:
- Show only the visual measurement and ask the student to count
- Ask a different question type (e.g., "Which object is longer: the pencil or the book?")
- Change to: "A pencil was measured with paper clips. The paper clips are shown below. How many paper clips long is the pencil?"

### 4. Worksheet does NOT render questionParts — only `question` text

**Affected:** All generators, but especially those that rely on visual questionParts.

**Problem:** Both the inline preview (line 539) and print view (line 224) of WorksheetGenerator only render `problem.question` as plain text. QuestionParts like dots, number lines, equations, and images are completely ignored on worksheets.

For most generators this is OK because the `question` text duplicates the content. But for skills that depend on visual elements (clocks, shapes, dots groupings, number lines), the worksheet is a degraded experience.

**Currently impacted most:**
- Time skills (no clock images in question text)
- Geometry skills (only Unicode chars in question text)
- Concrete scaffolding (dots in question text render as `●` chars, which is acceptable but not great)

**Fix:** Optionally render questionParts on worksheets when they contain `image` or `dots` types. At minimum, render clock faces and shape images.

---

## MODERATE Issues

### 5. `fill_blank` type inconsistency between app and worksheet

**Affected skills:** `subtraction-as-unknown-addend`, `missing-number-equations`

**Problem:** These generators use `type: 'fill_blank'` but also set `choices` array. In ProblemDisplay, `fill_blank` renders as a text input — the choices are ignored. On worksheets, the choices ARE rendered as multiple-choice options.

- **In-app:** Student types answer freely.
- **Worksheet:** Student picks from multiple choice options.

This inconsistency means a student could practice differently in-app vs. on paper.

**Fix:** Either:
- Remove `choices` from fill_blank generators (worksheet renders "Answer: ___" line instead)
- Or change type to `multiple_choice` if choices are intended

### 6. Unicode characters may not render on all printers

**Affected generators:** Most generators using concrete scaffolding

**Characters at risk:**
- `▮` (tens blocks in placeValue.ts) — may show as empty box
- `●` (dots) — generally OK but could fail on some fonts
- `━` (length lines in measurement.ts) — box-drawing character
- `▢` (unit blocks in measurement.ts) — may not render
- `█` (bar chart blocks in data.ts) — generally OK
- `||||̸` (tally marks in data.ts) — uses combining long solidus overlay, often misrenders
- `○△□▭⏢⬡` (2D shapes in geometry.ts) — mixed support
- `✕` (crossed-out dots in subtraction.ts) — generally OK

**Impact:** Worksheets printed from certain browsers/printers may show empty boxes or garbled characters instead of the intended visuals.

**Fix:**
- Replace Unicode chars with SVG-rendered visuals for worksheet print view
- At minimum, replace the most problematic ones (▮, ▢, ||||̸, ⏢, ⬡)
- Or accept the tradeoff for now and document font requirements

### 7. Number line component is hardcoded to 0-10

**Affected:** ProblemDisplay `renderQuestionParts()` line 60-69

**Problem:** The `number_line` case always renders 11 entries (0-10), regardless of the `value` field. Generators specify ranges like `'0-5'`, `'0-20'`, `'0-90'`, `'0-15'`, but all get rendered as 0-10.

- `additionWithin5` specifies `'0-5'` but gets 0-10 (extra ticks, confusing)
- `additionWithin20` specifies `'0-20'` but only shows 0-10 (can't see answer)
- `decadeNumbers` specifies `'0-90'` but shows 0-10 (completely wrong range)
- `countTo120` specifies custom ranges that are ignored

**Fix:** Parse the `value` field (format: `"min-max"`) and render the correct range of ticks.

---

## MINOR Issues

### 8. Data interpretation "how-many-more" can be misleading when categories tie

**Affected skill:** `interpret-data`

**Problem:** When generating random data, two categories can end up with the same count. The code sorts and picks `sorted[0]` as "least" and `sorted[last]` as "most". If they tie, the question "How many more votes did X get than Y?" is misleading (answer would be 0, but the phrasing implies X got more).

**Fix:** Ensure `most[1] > least[1]` by regenerating if they're equal, or skip the `how-many-more` question type when the difference is 0.

### 9. Tally marks rendering

**Affected skill:** `organize-data-categories`

**Problem:** The `tallies()` function uses `'||||̸ '` with a Unicode combining character. This renders inconsistently:
- Chrome: Usually OK
- Safari: Sometimes shows as `||||/` or `||||` + floating slash
- Print: Unpredictable

**Fix:** Use a different tally representation or render as SVG for reliability.

### 10. Dots for tens blocks look identical to ones dots

**Affected:** PlaceValue generators at concrete scaffolding

**Problem:** `renderDots()` in ProblemDisplay renders ALL dot types as identical small blue circles. So `{ type: 'dots', count: 3 }` for "3 tens" looks the same as `{ type: 'dots', count: 3 }` for "3 ones" — just 3 blue dots either way. The text labels ("tens" / "ones") help but the visual doesn't distinguish base-ten groups.

**Fix:** Support a `style` or `size` option on dot parts, or create a separate `tens_blocks` question part type that renders differently (e.g., rectangles instead of circles).

---

## Per-Generator Summary Table

| # | Skill ID | Worksheet | In-App | Issues |
|---|----------|-----------|--------|--------|
| 1 | addition-within-5 | OK | OK | — |
| 2 | addition-within-10 | OK | OK | — |
| 3 | addition-fluency-10 | OK | OK | — |
| 4 | addition-within-20 | OK | OK | — |
| 5 | add-three-numbers | OK | OK | — |
| 6 | commutative-property | OK | OK | — |
| 7 | counting-on-strategy | OK | OK | Number line hardcoded (#7) |
| 8 | making-ten-strategy | OK | OK | — |
| 9 | subtraction-within-5 | OK | OK | — |
| 10 | subtraction-within-10 | OK | OK | — |
| 11 | subtraction-fluency-10 | OK | OK | — |
| 12 | subtraction-within-20 | OK | OK | — |
| 13 | subtraction-as-unknown-addend | Shows choices | Shows text input | fill_blank inconsistency (#5) |
| 14 | count-to-120 | OK | OK | Number line hardcoded (#7) |
| 15 | read-write-numerals-120 | OK (Unicode) | OK | Unicode risk (#6) |
| 16 | understand-tens-ones | OK (Unicode) | OK | Dots look identical (#10) |
| 17 | teen-numbers-composition | OK (Unicode) | OK | Dots look identical (#10) |
| 18 | decade-numbers | OK (Unicode) | OK | Dots look identical (#10), number line wrong (#7) |
| 19 | compare-two-digit | OK (Unicode) | OK | Unicode risk (#6) |
| 20 | add-two-digit-plus-one | OK (Unicode) | OK | Unicode risk (#6) |
| 21 | add-two-digit-plus-tens | OK (Unicode) | OK | Unicode risk (#6) |
| 22 | mental-ten-more-less | OK (Unicode) | OK | Unicode risk (#6) |
| 23 | subtract-multiples-of-ten | OK (Unicode) | OK | Unicode risk (#6) |
| 24 | word-problems-add-to | OK | OK | — |
| 25 | word-problems-take-from | OK | OK | — |
| 26 | word-problems-put-together | OK | OK | — |
| 27 | word-problems-compare | OK | OK | — |
| 28 | equal-sign-meaning | OK | OK | — |
| 29 | missing-number-equations | Shows choices | Shows text input | fill_blank inconsistency (#5) |
| 30 | order-objects-by-length | OK (Unicode) | OK | Unicode risk (#6) |
| 31 | measure-nonstandard-units | OK (Unicode) | OK | Answer in question (#3), Unicode risk (#6) |
| 32 | **tell-time-hour** | **BROKEN** — no clock | **FIXED** | No clock on worksheet (#2) |
| 33 | **tell-time-half-hour** | **BROKEN** — no clock | **FIXED** | No clock on worksheet (#2) |
| 34 | organize-data-categories | OK | OK | Tally rendering (#9) |
| 35 | interpret-data | OK | OK | Tie ambiguity (#8) |
| 36 | **identify-2d-shapes** | Partial (Unicode) | **BROKEN** — no image | No shape visual (#1) |
| 37 | **identify-3d-shapes** | **BROKEN** — no visual | **BROKEN** — no image | No shape visual (#1) |
| 38 | **compose-shapes** | **BROKEN** — no visual | **BROKEN** — no image | No shape visual (#1) |
| 39 | **partition-halves** | **BROKEN** — no visual | **BROKEN** — no image | No shape visual (#1) |
| 40 | **partition-fourths** | **BROKEN** — no visual | **BROKEN** — no image | No shape visual (#1) |
| 41 | **describe-shares-wholes** | **BROKEN** — no visual | **BROKEN** — no image | No shape visual (#1) |

---

## Priority Fix Order

1. **Wire ClockFace into WorksheetGenerator** (#2) — already coded, just needs calling
2. **Create shape SVG components** (#1) — 6 generators completely broken
3. **Fix number line range parsing** (#7) — wrong ranges shown
4. **Fix measurement answer-in-question** (#3) — trivially exploitable
5. **Resolve fill_blank/choices inconsistency** (#5) — confusing UX
6. **Replace problematic Unicode chars** (#6) — print reliability
7. Address minor issues (#8, #9, #10) as time allows
