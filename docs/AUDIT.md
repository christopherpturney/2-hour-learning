# Comprehensive Audit: Lessons, Problems & UX

Full manual audit of all 53 skills — tested in-browser via the preview app and through code-level analysis of all problem generators and lesson content.

**Date:** 2026-03-12 (verified)
**Testing method:** Browser-based testing of every skill at all scaffolding levels (concrete, representational, abstract) via the Problems preview page, plus code-level review of all 53 lessons and all problem generators.

---

## Severity Legend

- **CRITICAL** — Feature is broken/unusable; student cannot complete the activity
- **MAJOR** — Answer is revealed, wrong input type, or behavior is misleading
- **MODERATE** — UX issue, pedagogical concern, or rendering inconsistency
- **MINOR** — Edge case, cosmetic, or small improvement opportunity

---

## Executive Summary

| Severity | Count |
|----------|-------|
| Critical | 9 |
| Major | 16 |
| Moderate | 5 |
| Minor | 8 |

**Top 3 blockers:**
1. **4 skills use `number_input` and 3 use `fill_blank`** — requires keyboard typing, unusable for young children on tablets
2. **Concrete-level labels give away answers** across 8+ skills (e.g., counter labels like "3 left" directly reveal subtraction answers, base-10 block labels like "2 tens" reveal place value answers)
3. **Lesson clock visuals render as plain text** — all 3 time lessons use wrong format (`clock:3:00` vs expected `clock-3-0`), showing raw text instead of clock faces

---

## CRITICAL Issues

### C1. Seven skills require keyboard input — unusable for kids

**Affected skills:**
- `subtraction-fluency-10` (number_input)
- `fluency-add-sub-20` (number_input)
- `add-subtract-within-100` (number_input)
- `missing-number-equations` (fill_blank)
- `mental-ten-more-less` (number_input)
- `addition-fluency-10` (number_input)
- `subtraction-as-unknown-addend` (fill_blank)

**Problem:** ProblemDisplay renders `number_input` as `<input type="number">` and `fill_blank` as `<input type="text">`, both requiring keyboard typing. First graders on tablets cannot type numbers easily. All other problem types use tap-friendly buttons.

**Fix:** Add an on-screen number pad component, or convert these to `multiple_choice` with generated distractor options.

### C4. Word Problems Within 100 can generate negative answers

**Skill:** `word-problems-within-100`

**Problem:** The two-step word problem generator computes `a + b - c` where a=10, b=5, c=20 can yield -5. First graders should never see negative numbers.

**Fix:** Clamp the result to be >= 0, or regenerate when result would be negative.

### C5. Count to 120 concrete level — "Use pictures" but no pictures

**Skill:** `count-to-120` at concrete scaffolding

**Problem:** Shows scaffolding banner "Use the pictures to help you count!" but displays only text like "Count: 45, 46, 47, ___" with no visual aids. The concrete scaffolding doesn't actually provide any visual representation.

**Fix:** Add visual counters or number blocks for the concrete scaffolding level.

### C6. Tell Time: Five Minutes — no clock visual

**Skill:** `tell-time-five-minutes`

**Problem:** Question asks "What time does this clock show?" but no clock face renders. `parseClockValue()` regex `/^clock-(\d+)-(\d+)$/` only accepts minute values of 0 or 30 (line checks `minute !== 0 && minute !== 30`), so 5-minute intervals like `clock-3-15` are rejected.

**Fix:** Remove the minute-value restriction in `parseClockValue()` to accept any valid minute value.

### C7. Add & Subtract Within 100 concrete — confusing format

**Skill:** `add-subtract-within-100` at concrete scaffolding

**Problem:** Multiple issues compound:
1. Uses `number_input` (keyboard required)
2. Shows text like "4 tens 1 ones + 3 tens 2 ones" — grammatically wrong ("1 ones")
3. Claims to show pictures but shows only text
4. No actual base-10 block visuals despite being "concrete" scaffolding

**Fix:** Use proper base-10 block visuals, fix grammar ("1 one" vs "1 ones"), convert to multiple_choice.

### C8. Read & Write Numerals shows wrong place value for >= 100

**Skill:** `read-write-numerals-120`

**Problem:** For numbers >= 100, `Math.floor(number / 10)` gives 11 for number=115 instead of the correct tens digit (1). The generator doesn't properly handle hundreds place.

**Fix:** Add hundreds-place logic to the numeral decomposition (e.g., `tens = Math.floor((number % 100) / 10)`).

### C9. Count to 120 concrete can show negative numbers

**Skill:** `count-to-120` at concrete scaffolding

**Problem:** Sequence pattern `...${start - 2}, ${start - 1}, ${start}, ?` with start=1 produces "-1, 0, 1, ?" showing negative numbers to first graders.

**Fix:** Clamp all sequence values to be >= 0.

### C10. Lesson clock visuals render as plain text (3 lessons)

**Affected lessons:** `tell-time-hour`, `tell-time-half-hour`, `tell-time-five-minutes`

**Problem:** All lesson clock visual entries use `clock:3:00` colon format, but `parseClockValue()` expects `clock-3-0` dash format (regex: `/^clock-(\d+)-(\d+)$/`). There are 7+ clock visual entries across these 3 lessons in `md.ts` and `grade2.ts`, all broken.

**Fix:** Change all lesson values from `clock:3:00` to `clock-3-0` format.

### C11. word-problems-take-from lesson — backwards formula

**Lesson:** `word-problems-take-from`

**Problem:** The concept step formula in `oa.ts` reads `'How many had − how many left = how many gone'` but the lesson teaches finding what's LEFT (not what's gone). The example equation is `8 − 3 = ?` which asks for what's left. The formula should be `'How many had − how many gone = how many left'`.

**Fix:** Swap the formula to match what the lesson is actually teaching.

---

## MAJOR Issues

### M1. Subtraction Within 5 concrete — labels give away answer

**Skill:** `subtraction-within-5` at concrete scaffolding

**Problem:** CounterGroup labels show "{remaining} left" and "{crossedOut} taken away" — directly revealing the subtraction answer.

**Fix:** Remove result labels from concrete visuals. Show the objects and crossed-out items, but let the student count what remains.

### M2. Subtraction Fluency (to 10) concrete — labels reveal answer

**Skill:** `subtraction-fluency-10` at concrete scaffolding

**Problem:** Same as M1 — CounterGroup labels state the answer directly. Combined with number_input (C1), this skill has two compounding issues.

### M3. Understand Tens and Ones concrete — labels reveal answer

**Skill:** `understand-tens-ones` at concrete scaffolding

**Problem:** Base10Blocks labels show "2 tens" and "3 ones" which directly reveals the answer when the question asks "How many tens are in 23?"

**Fix:** Show unlabeled base-10 blocks and let the student count.

### M4. Teen Numbers Composition concrete — labels reveal answer

**Skill:** `teen-numbers-composition` at concrete scaffolding

**Problem:** Labels on the visual directly state "1 ten" and "4 ones" when asking what 14 is composed of.

### M5. Decade Numbers concrete — labels reveal answer

**Skill:** `decade-numbers` at concrete scaffolding

**Problem:** Same pattern — visual labels give away the tens/ones decomposition.

### M6. Understand Hundreds concrete — labels reveal answer

**Skill:** `understand-hundreds` at concrete scaffolding

**Problem:** Base-10 blocks are labeled with exact counts, revealing the answer.

### M7. Order by Length concrete — labels reveal ordering

**Skill:** `order-objects-by-length` at concrete scaffolding

**Problem:** MeasurementBar includes numeric length labels in compare mode, making ordering trivial (just compare numbers rather than visual lengths).

**Fix:** Remove numeric labels from measurement visuals at concrete level.

### M8. Making Ten strategy — vague prompts

**Skill:** `making-ten-strategy`

**Problem:**
- Concrete level: Shows dots with prompt "Make a ten!" but doesn't clearly explain what the student should do
- Abstract level: Problems are just basic addition (8 + 5 = ?), not actually testing the "making ten" strategy

**Fix:** Add explicit prompts like "How would you break apart 5 to make a ten with 8?" and structure problems to test the decomposition strategy.

### M9. Identify 3D Shapes — ambiguous questions

**Skill:** `identify-3d-shapes`

**Problem:** Question "Which shape has 6 rectangular faces?" is ambiguous — both a cube (6 square faces, squares are rectangles) and a rectangular prism match this description.

**Fix:** Use more distinguishing attributes, or be more specific (e.g., "6 faces that are all the same size" for cube).

### M10. Describe Shares & Wholes — uses division symbol

**Skill:** `describe-shares-wholes`

**Problem:** Abstract level uses the `÷` division symbol, which first graders have not been taught and don't recognize.

**Fix:** Use language like "shared equally among" instead of the division symbol.

### M11. Draw Shapes by Attributes — mixes 2D and 3D

**Skill:** `draw-shapes-by-attributes`

**Problem:** SHAPE_ATTRIBUTES array mixes 2D shapes (circle, triangle) with 3D shapes (sphere, cone) in the same question, which is confusing.

**Fix:** Keep 2D and 3D questions separate.

### M12. Identify 2D Shapes — ambiguous attributes

**Skill:** `identify-2d-shapes`

**Problem:** Abstract level question "Which shape has 4 sides and 4 corners?" matches square, rectangle, and trapezoid. Multiple valid answers but only one is accepted.

**Fix:** Use more specific attributes (e.g., "4 equal sides" for square, "2 long sides and 2 short sides" for rectangle).

### M13. Measurement answer in question text

**Skill:** `measure-nonstandard-units` (representational level)

**Problem:** Question states "It takes ${length} ${unit}" then asks "How many?" — the answer is literally in the question.

**Fix:** Restructure to require actual measurement reasoning.

### M15. tell-time-five-minutes question text reveals the digital answer

**Skill:** `tell-time-five-minutes`

**Problem:** All scaffolding levels include `clockFace(hour, minute)` in the question string, which outputs the exact digital time (e.g., "7:15") in the question text itself. This makes the clock-reading exercise trivial.

**Fix:** Remove the digital time from the question text. The clock image should be the only visual; the question should just say "What time does this clock show?"

### M16. Plural/singular grammar across all word problems

**Affected:** All 11 word problem skills

**Problem:** The OBJECTS array contains only plural nouns ("apples", "books", etc.). When the count is 1, templates read "1 apples" instead of "1 apple".

**Fix:** Add a helper function that singularizes the noun when the count is 1.

### M17. add-two-digit-plus-one hint incorrect when regrouping

**Skill:** `add-two-digit-plus-one`

**Problem:** The hint says "Keep the ${tens} tens" which is wrong when ones + oneDigit >= 10 (requires regrouping). For example, 37 + 5: hint says "Keep the 3 tens" but the answer is 42 (4 tens).

**Fix:** Add regrouping logic to the hint and explanation when the ones sum exceeds 9.

---

## MODERATE Issues

### Mo3. Unicode characters may not print reliably

**Affected:** Concrete scaffolding across many skills

**Characters at risk:** `▮` (tens blocks), `▢` (unit blocks), `||||̸` (tally marks with combining character), `⏢` and `⬡` (geometric shapes)

### Mo4. Dots for tens look identical to dots for ones

**Affected:** Place value skills at concrete scaffolding

**Problem:** All dots render as identical small blue circles regardless of whether they represent tens or ones.

### Mo6. Tally marks rendering inconsistency

**Skill:** `organize-data-categories`

**Problem:** Unicode combining character for crossed tally group renders inconsistently across browsers.

### Mo11. Equal Sign Meaning — limited question variety

**Skill:** `equal-sign-meaning`

**Problem:** Questions focus on true/false "Is X = Y correct?" format. Doesn't test deeper understanding of equality (e.g., "Which makes this true: 5 + 3 = ___ + 2?").

### Mo5. Worksheet visuals limited to clock and shape only

**Affected:** All skills with visuals beyond clock/shape

**Problem:** `WorksheetGenerator.tsx` `renderVisuals` only handles clock and shape visuals. Counter groups, base-10 blocks, object groups, pictographs, tally marks, bar charts, and measurement bars are not rendered on worksheets.

**Fix:** Add rendering support for all visual types in WorksheetGenerator, or at minimum show a placeholder message.

---

## MINOR Issues

### m19. `subtract-multiples-of-ten` lesson tip uses "multiply"

**Lesson:** `subtract-multiples-of-ten` in `nbt.ts`

**Problem:** Tip says "Think in tens, then multiply by 10" — uses vocabulary 1st graders don't know.

**Fix:** Rephrase to avoid multiplication language.

### m20. "Borrow" vs "regroup" inconsistency

**Lessons:** `word-problems-within-100`, `add-subtract-within-100`

**Problem:** Mix "borrow a ten" with "regroup". Modern math pedagogy prefers "regroup" consistently.

**Fix:** Standardize on "regroup" throughout.

### m21. `commutative-property` lesson visual omits the answer

**Lesson:** `commutative-property` in `oa.ts`

**Problem:** Shows `2+7 = 7+2` but never shows `= 9`, so kids see the rearrangement but not the result.

**Fix:** Add `= 9` to complete the equation.

### m22. `understand-hundreds` lesson uses multiplication symbol

**Lesson:** `understand-hundreds` in `grade2.ts`

**Problem:** `400 = 4 × 100` uses `×` which 1st graders haven't learned.

**Fix:** Use `100 + 100 + 100 + 100 = 400` instead.

### m2. Inconsistent terminology

**Problem:** Some lessons use "take away" while others use "subtract" for the same operation at the same grade level.

### m9. Several lessons reference "drawing" or "writing"

**Problem:** Kids can't draw or write in the app, making these instructions misleading.

### m12. Geometry lessons have no inline shape visuals

**Problem:** Geometry lessons describe shapes in text but have no inline shape visuals in the lesson steps themselves.

### m14. Measurement lesson describes physical activities

**Problem:** Measurement lesson describes physical measurement activities that can't be done in-app.

---

## Full Skill-by-Skill Results

| # | Skill ID | Lesson | Concrete | Abstract | Issues |
|---|----------|--------|----------|----------|--------|
| 1 | addition-within-5 | OK | OK | OK | — |
| 2 | addition-within-10 | OK | OK | OK | — |
| 3 | addition-fluency-10 | OK | OK | number_input (C1) | C1 |
| 4 | subtraction-within-5 | OK | Labels reveal answer (M1) | OK | M1 |
| 5 | subtraction-within-10 | OK | OK | OK | — |
| 6 | subtraction-fluency-10 | OK | Labels + number_input (M2, C1) | number_input (C1) | C1, M2 |
| 7 | word-problems-add-to | OK | OK | OK | M16 (grammar) |
| 8 | word-problems-take-from | Backwards formula (C11) | OK | OK | C11, M16 |
| 9 | word-problems-put-together | OK | OK | OK | M16 (grammar) |
| 10 | word-problems-compare | OK | OK | OK | M16 (grammar) |
| 11 | word-problems-add-change-unknown | OK | — | multiple_choice | M16 (grammar) |
| 12 | word-problems-within-100 | OK | — | multiple_choice, negative answers (C4) | C4, M16 |
| 13 | commutative-property | Visual omits answer (m21) | OK | OK (true/false) | m21 |
| 14 | counting-on-strategy | OK | OK (dots) | OK | — |
| 15 | making-ten-strategy | OK | Vague prompt (M8) | Just addition (M8) | M8 |
| 16 | subtraction-as-unknown-addend | OK | — | fill_blank (C1) | C1 |
| 17 | missing-number-equations | OK | — | fill_blank (C1) | C1 |
| 18 | fluency-add-sub-20 | OK | — | number_input (C1) | C1 |
| 19 | addition-within-20 | OK | OK | OK | — |
| 20 | add-three-numbers | OK | OK | OK | — |
| 21 | understand-tens-ones | OK | Labels reveal (M3) | OK | M3, Mo4 |
| 22 | teen-numbers-composition | OK | Labels reveal (M4) | OK | M4, Mo4 |
| 23 | decade-numbers | OK | Labels reveal (M5) | OK | M5, Mo4 |
| 24 | compare-two-digit | OK | OK | OK (comparison) | — |
| 25 | add-two-digit-plus-one | OK | OK (base-10 blocks) | OK | M17 (regroup hint) |
| 26 | add-two-digit-plus-tens | OK | OK | OK | — |
| 27 | subtract-multiples-of-ten | Tip uses "multiply" (m19) | OK (base-10 blocks) | OK | m19 |
| 28 | mental-ten-more-less | OK | number_input (C1) | number_input (C1) | C1 |
| 29 | understand-hundreds | Uses × symbol (m22) | Labels reveal (M6) | OK | M6, m22 |
| 30 | add-subtract-within-100 | Mixes borrow/regroup (m20) | Broken format (C7) | number_input (C1) | C1, C7, m20 |
| 31 | read-write-numerals-120 | OK | — | multiple_choice, wrong place value (C8) | C8 |
| 32 | count-to-120 | OK | No pictures (C5), negatives (C9) | OK | C5, C9 |
| 33 | equal-sign-meaning | OK | — | OK (true/false) | Mo11 |
| 34 | tell-time-hour | Clock text broken (C10) | OK (clock renders) | OK | C10 |
| 35 | tell-time-half-hour | Clock text broken (C10) | OK (clock renders) | OK | C10 |
| 36 | tell-time-five-minutes | Clock text broken (C10) | No clock (C6), answer in text (M15) | Answer in text (M15) | C6, C10, M15 |
| 37 | order-objects-by-length | OK | Labels reveal (M7) | OK | M7 |
| 38 | measure-nonstandard-units | OK | OK | Answer in question (M13) | M13, Mo3 |
| 39 | identify-2d-shapes | OK | OK (shapes render) | Ambiguous (M12) | M12 |
| 40 | identify-3d-shapes | OK | OK (shapes render) | Ambiguous (M9) | M9 |
| 41 | compose-shapes | OK | OK (shapes render) | OK | — |
| 42 | partition-halves | OK | OK (shapes render) | OK | — |
| 43 | partition-fourths | OK | OK (shapes render) | OK | — |
| 44 | describe-shares-wholes | OK | OK (shapes render) | Uses ÷ symbol (M10) | M10 |
| 45 | draw-shapes-by-attributes | OK | — | Mixes 2D/3D (M11) | M11 |
| 46 | organize-data-categories | OK | OK | OK | Mo6 |
| 47 | interpret-data | OK | OK (bar chart) | OK | — |
| 48 | subtraction-within-20 | OK | OK | OK | — |

**Note:** Some skills (49-53) are variants or overlap with the above. Skills not listed had no distinguishable issues.

---

## Priority Fix Order

1. **Add on-screen number pad** (C1) — 7 skills currently unusable on tablets. This is the single highest-impact fix.
2. **Remove answer-revealing labels from concrete visuals** (M1-M7) — defeats the purpose of concrete scaffolding across 8+ skills
3. **Fix word-problems-within-100 negative answers** (C4) — can generate impossible problems
4. **Add visual aids to count-to-120 concrete** (C5) — claims to show pictures but doesn't
5. **Fix tell-time-five-minutes clock rendering** (C6) — time skill with no clock
6. **Fix add-subtract-within-100 concrete format** (C7) — grammar errors, no visuals, confusing text
7. **Fix read-write-numerals place value for >= 100** (C8) — shows wrong decomposition
8. **Fix count-to-120 negative sequence values** (C9) — first graders see -1
9. **Fix lesson clock format** (C10) — change `clock:3:00` to `clock-3-0` in all 3 time lessons
10. **Fix word-problems-take-from formula** (C11) — formula is backwards in the lesson concept step
11. **Remove digital time from tell-time-five-minutes question text** (M15) — answer visible in question
12. **Fix plural/singular grammar in word problems** (M16) — "1 apples" across all 11 word problem skills
13. **Fix regrouping hint in add-two-digit-plus-one** (M17) — hint is wrong when ones carry
14. **Improve making-ten-strategy problems** (M8) — currently just tests addition, not the strategy
15. **Fix ambiguous geometry questions** (M9, M12) — multiple valid answers accepted as wrong
16. **Remove division symbol from first-grade content** (M10) — kids don't know ÷
17. **Add worksheet visual support** (Mo5) — worksheets only render clock + shape visuals
18. **Fix lesson content issues** (m19-m22) — incorrect vocabulary, missing answers, wrong symbols
