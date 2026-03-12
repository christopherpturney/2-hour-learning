# Comprehensive Audit: Lessons, Problems & UX

Full manual audit of all 53 skills — tested in-browser via the preview app and through code-level analysis of all problem generators and lesson content.

**Date:** 2026-03-12
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
| Critical | 11 |
| Major | 17 |
| Moderate | 12 |
| Minor | 22 |

**Top 3 blockers:**
1. **7 skills use `number_input` or `fill_blank`** — requires keyboard typing, unusable for young children on tablets
2. **Concrete-level labels give away answers** across 8+ skills (e.g., "3 apples + 2 apples" when the answer is 5, but visual labels like "3 left" directly reveal subtraction answers)
3. **Lesson clock visuals render as plain text** — all 3 time lessons use wrong format (`clock:3:00` vs expected `clock-3-0`), showing raw text instead of clock faces

---

## CRITICAL Issues

### C1. Seven skills require keyboard input — unusable for kids

**Affected skills:**
- `subtraction-fluency-10` (number_input)
- `fluency-add-sub-20` (number_input)
- `add-subtract-within-100` (number_input)
- `missing-number-equations` (fill_blank — also has corrupted rendering, see C2)
- `word-problems-add-change-unknown` (number_input)
- `word-problems-within-100` (number_input)
- `read-write-numerals-120` (fill_blank)

**Problem:** ProblemDisplay renders `number_input` as `<input type="number">` and `fill_blank` as `<input type="text">`, both requiring keyboard typing. First graders on tablets cannot type numbers easily. All other problem types use tap-friendly buttons.

**Fix:** Add an on-screen number pad component, or convert these to `multiple_choice` with generated distractor options.

### C2. Missing Number Equations — corrupted input field

**Skill:** `missing-number-equations`

**Problem:** The fill_blank input field renders with corrupted text showing `"1" }}` inside the input area. The question format is broken and confusing.

**Fix:** Debug the questionParts rendering for this skill's fill_blank type. Likely a template string issue in the problem generator.

### C3. Geometry shapes render nothing (6 skills)

**Affected skills:** `identify-2d-shapes`, `identify-3d-shapes`, `compose-shapes`, `partition-halves`, `partition-fourths`, `describe-shares-wholes`

**Problem:** These generators emit `{ type: 'image', value: 'shape-circle' }` etc. ProblemDisplay's image parser only handles clock, counter, base10, tally, bar chart, measurement, shape, object-group, and pictograph values. The `shape-*` prefix IS handled by ShapeVisual, but 3D shapes (`shape3d-*`), composition shapes (`compose-*`), partition shapes (`circle-halves`, `pizza-2-parts`), and share shapes are NOT recognized by any parser.

**Fix:** Extend ShapeVisual or create new components for 3D shapes, compositions, partitions, and shares.

### C4. Word Problems Within 100 can generate negative answers

**Skill:** `word-problems-within-100`

**Problem:** The two-step word problem generator can produce `a + b - c` where the result is negative (minimum is set to -5 in code). First graders should never see negative numbers.

**Fix:** Clamp the result to be >= 0, or regenerate when result would be negative.

### C5. Count to 120 concrete level — "Use pictures" but no pictures

**Skill:** `count-to-120` at concrete scaffolding

**Problem:** Shows scaffolding banner "Use the pictures to help you count!" but displays only text like "Count: 45, 46, 47, ___" with no visual aids. The concrete scaffolding doesn't actually provide any visual representation.

**Fix:** Add visual counters or number blocks for the concrete scaffolding level.

### C6. Tell Time: Five Minutes — no clock visual

**Skill:** `tell-time-five-minutes`

**Problem:** Question asks "What time does this clock show?" but no clock face renders. The clock visual component may not be generating the correct image value format for 5-minute intervals.

**Fix:** Verify the clock image value format matches what ClockFace's parser expects.

### C10. Lesson clock visuals render as plain text (3 lessons)

**Affected lessons:** `tell-time-hour`, `tell-time-half-hour`, `tell-time-five-minutes`

**Problem:** All lesson clock visual entries use `clock:3:00` colon format, but `parseClockValue()` in `AnalogClock.tsx` expects `clock-3-0` dash format (regex: `/^clock-(\d+)-(\d+)$/`). This means clock images in lesson steps render as literal text strings like "clock:3:00" instead of actual clock face visuals. There are 7 clock visual entries across these 3 lessons, all broken.

**Fix:** Either change all lesson values from `clock:3:00` to `clock-3-0` format, or update the regex in `parseClockValue()` to accept both formats.

### C11. word-problems-take-from lesson — backwards formula

**Lesson:** `word-problems-take-from`

**Problem:** The concept step formula reads `'How many had − how many left = how many gone'` but the lesson teaches finding what's LEFT (not what's gone). The example equation is `8 − 3 = ?` which asks for what's left. The formula should be `'How many had − how many gone = how many left'`.

**Fix:** Swap the formula to match what the lesson is actually teaching.

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

**Problem:** For numbers >= 100, the place value breakdown is incorrect. The generator doesn't properly handle hundreds place.

**Fix:** Add hundreds-place logic to the numeral decomposition.

### C9. Count to 120 concrete can show negative numbers

**Skill:** `count-to-120` at concrete scaffolding

**Problem:** Sequence generation can produce negative starting numbers when counting backward or with certain sequence patterns.

**Fix:** Clamp all sequence values to be >= 0.

---

## MAJOR Issues

### M1. Subtraction Within 5 concrete — labels give away answer

**Skill:** `subtraction-within-5` at concrete scaffolding

**Problem:** Visual shows objects with labels like "5 apples" then crossed-out ones with "3 left" — directly revealing the subtraction answer.

**Fix:** Remove result labels from concrete visuals. Show the objects and crossed-out items, but let the student count what remains.

### M2. Subtraction Fluency (to 10) concrete — labels reveal answer

**Skill:** `subtraction-fluency-10` at concrete scaffolding

**Problem:** Same as M1 — object group labels state the answer directly. Combined with number_input (C1), this skill has two compounding issues.

### M3. Understand Tens and Ones concrete — labels reveal answer

**Skill:** `understand-tens-ones` at concrete scaffolding

**Problem:** Base-10 block labels show "2 tens" and "3 ones" which directly reveals the answer when the question asks "How many tens are in 23?"

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

**Problem:** Measurement bar visual includes length labels, making ordering trivial (just compare numbers rather than visual lengths).

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

**Problem:** Uses the `÷` division symbol, which first graders have not been taught and don't recognize.

**Fix:** Use language like "shared equally among" instead of the division symbol.

### M11. Draw Shapes by Attributes — mixes 2D and 3D

**Skill:** `draw-shapes-by-attributes`

**Problem:** Answer choices mix 2D shapes (circle, triangle) with 3D shapes (sphere, cone) in the same question, which is confusing.

**Fix:** Keep 2D and 3D questions separate.

### M12. Identify 2D Shapes — ambiguous attributes

**Skill:** `identify-2d-shapes`

**Problem:** Question "Which shape has 4 sides and 4 corners?" matches both square and rectangle. Multiple valid answers but only one is accepted.

**Fix:** Use more specific attributes (e.g., "4 equal sides" for square, "2 long sides and 2 short sides" for rectangle).

### M13. Measurement answer in question text

**Skill:** `measure-nonstandard-units` (abstract)

**Problem:** Question states "A pencil is 5 paper clips long. How many paper clips long is the pencil?" — the answer is literally in the question.

**Fix:** Restructure to require actual measurement reasoning.

### M14. Time worksheets show no clock

**Skills:** `tell-time-hour`, `tell-time-half-hour`

**Problem:** Worksheet view renders question text but not the ClockFace visual (only rendered in-app via questionParts).

**Fix:** Wire ClockFace rendering into WorksheetGenerator.

### M15. tell-time-five-minutes question text reveals the digital answer

**Skill:** `tell-time-five-minutes`

**Problem:** All scaffolding levels include `clockFace(hour, minute)` in the question string, which outputs the exact digital time (e.g., "7:15") in the question text itself. This makes the clock-reading exercise trivial — the student can read the answer from the question without looking at the clock.

**Fix:** Remove the digital time from the question text. The clock image should be the only visual; the question should just say "What time does this clock show?"

### M16. Plural/singular grammar across all word problems

**Affected:** All 11 word problem skills

**Problem:** The OBJECTS array contains plural nouns ("apples", "books", etc.). When the count is 1, templates read "1 apples" instead of "1 apple". This is a grammar error that appears across every word problem generator.

**Fix:** Add a helper function that singularizes the noun when the count is 1 (e.g., strip trailing "s" or maintain a singular/plural pair).

### M17. add-two-digit-plus-one hint incorrect when regrouping

**Skill:** `add-two-digit-plus-one`

**Problem:** The hint says "Keep the tens. Add the ones: 7 + 5 = 12" but doesn't mention that 12 ones requires regrouping into 1 ten and 2 ones. The explanation also says "Keep the tens" which is misleading when carrying is needed. This only matters when ones + oneDigit >= 10.

**Fix:** Add regrouping logic to the hint and explanation when the ones sum exceeds 9.

---

## MODERATE Issues

### Mo1. fill_blank/choices inconsistency between app and worksheet

**Skills:** `subtraction-as-unknown-addend`, `missing-number-equations`

**Problem:** Generators set both `type: 'fill_blank'` and `choices` array. In-app renders as text input (ignoring choices), worksheets render as multiple choice.

### Mo2. Number line component ignores range value

**Problem:** The `number_line` questionPart type previously hardcoded to 0-10 regardless of the `value` field. Generators specify ranges like `'0-5'`, `'0-20'`, `'0-90'` that were ignored. (This was fixed in a recent commit — the number line now parses the range.)

### Mo3. Unicode characters may not print reliably

**Affected:** Concrete scaffolding across many skills

**Characters at risk:** `▮` (tens blocks), `▢` (unit blocks), `||||̸` (tally marks with combining character), `⏢` and `⬡` (geometric shapes)

### Mo4. Dots for tens look identical to dots for ones

**Affected:** Place value skills at concrete scaffolding

**Problem:** All dots render as identical small blue circles regardless of whether they represent tens or ones.

### Mo5. Data interpretation — tied categories create misleading questions

**Skill:** `interpret-data`

**Problem:** "How many more votes did X get than Y?" when X and Y have the same count.

### Mo6. Tally marks rendering inconsistency

**Skill:** `organize-data-categories`

**Problem:** Unicode combining character for crossed tally group renders inconsistently across browsers.

### Mo7. Subtraction as Unknown Addend — not testing actual strategy

**Skill:** `subtraction-as-unknown-addend`

**Problem:** Problems are straightforward subtraction rather than framing subtraction as finding the unknown addend (e.g., 7 - 3 = ? vs. 3 + ? = 7).

### Mo8. Compare Two-Digit Numbers — no visual at concrete level

**Skill:** `compare-two-digit` at concrete scaffolding

**Problem:** Shows comparison symbols but no visual representation of the numbers being compared.

### Mo9. Mental Ten More/Less — abstract only

**Skill:** `mental-ten-more-less`

**Problem:** Even at concrete scaffolding, problems are purely text-based with no visual support.

### Mo10. Add Two-Digit + Tens — limited scaffolding

**Skill:** `add-two-digit-plus-tens`

**Problem:** Concrete level shows base-10 blocks but the visual doesn't clearly demonstrate the tens-addition strategy.

### Mo11. Equal Sign Meaning — limited question variety

**Skill:** `equal-sign-meaning`

**Problem:** Questions focus on true/false "Is X = Y correct?" format. Doesn't test deeper understanding of equality (e.g., "Which makes this true: 5 + 3 = ___ + 2?").

### Mo12. Word Problems Add To (Change Unknown) — result format

**Skill:** `word-problems-add-change-unknown`

**Problem:** Uses number_input which requires keyboard. Additionally, the "change unknown" concept isn't clearly scaffolded.

---

## MINOR Issues

### m1-m18: Lesson Content Issues

1. **Missing visual aids in lessons:** 12 of 53 lessons reference concepts that would benefit from step-by-step visuals but only have text descriptions
2. **Inconsistent terminology:** Some lessons use "take away" while others use "subtract" for the same operation at the same grade level
3. **Tip text sometimes too advanced:** Tips in some lessons use vocabulary above first-grade reading level
4. **Try-it steps don't always match problem format:** Some lesson try-it sections describe problems differently than how they appear in practice
5. **No lesson exists for `fluency-add-sub-20`** — skill has problems but no teaching content
6. **No lesson exists for `word-problems-within-100`** — skill has problems but no teaching content
7. **No lesson exists for `add-subtract-within-100`** — skill has problems but no teaching content
8. **No lesson exists for `understand-hundreds`** — skill has problems but no teaching content
9. **Several lessons reference "drawing" or "writing"** which kids can't do in the app
10. **Place value lessons could use interactive base-10 block manipulation** rather than static descriptions
11. **Time lessons describe clock hands** but rely on the ClockFace component working (which it does in-app but not on worksheets)
12. **Geometry lessons describe shapes** but have no inline shape visuals in the lesson steps themselves
13. **Word problem lessons** could benefit from visual story representations
14. **Measurement lesson** describes physical measurement activities that can't be done in-app
15. **Data lessons** describe creating graphs but the app only has pre-made chart visuals
16. **Commutative property lesson** could show the relationship more concretely with visual grouping
17. **Subtraction strategies** (counting back, unknown addend) lessons are text-heavy
18. **Addition strategies** (counting on, making ten) lessons describe the strategy but practice doesn't always test it
19. **`subtract-multiples-of-ten` lesson tip uses "multiply"** — "Think in tens, then multiply by 10" uses vocabulary 1st graders don't know
20. **"Borrow" vs "regroup" inconsistency** — `word-problems-within-100` and `add-subtract-within-100` lessons mix "borrow a ten" with "regroup". Modern math pedagogy prefers "regroup" consistently
21. **`commutative-property` lesson visual omits the answer** — shows `2+7 = 7+2` but never shows `= 9`, so kids see the rearrangement but not the result
22. **`understand-hundreds` lesson uses multiplication symbol** — `400 = 4 × 100` uses `×` which 1st graders haven't learned; should use `100 + 100 + 100 + 100 = 400`

---

## Full Skill-by-Skill Results

| # | Skill ID | Lesson | Concrete | Abstract | Issues |
|---|----------|--------|----------|----------|--------|
| 1 | addition-within-5 | OK | OK | OK | — |
| 2 | addition-within-10 | OK | OK | OK | — |
| 3 | addition-fluency-10 | OK | OK | OK | — |
| 4 | subtraction-within-5 | OK | Labels reveal answer (M1) | OK | M1 |
| 5 | subtraction-within-10 | OK | OK | OK | — |
| 6 | subtraction-fluency-10 | OK | Labels + number_input (M2, C1) | number_input (C1) | C1, M2 |
| 7 | word-problems-add-to | OK | OK | OK | M16 (grammar) |
| 8 | word-problems-take-from | Backwards formula (C11) | OK | OK | C11, M16 |
| 9 | word-problems-put-together | OK | OK | OK | M16 (grammar) |
| 10 | word-problems-compare | OK | OK | OK | M16 (grammar) |
| 11 | word-problems-add-change-unknown | OK | — | number_input (C1) | C1, Mo12 |
| 12 | word-problems-within-100 | No lesson (m6) | — | number_input (C1), negative answers (C4) | C1, C4, m6 |
| 13 | commutative-property | OK | OK | OK (true/false) | m16 |
| 14 | counting-on-strategy | OK | OK (dots) | OK | — |
| 15 | making-ten-strategy | OK | Vague prompt (M8) | Just addition (M8) | M8 |
| 16 | subtraction-as-unknown-addend | OK | — | fill_blank inconsistency (Mo1) | Mo1, Mo7 |
| 17 | missing-number-equations | OK | — | BROKEN input (C2), fill_blank (Mo1) | C2, Mo1 |
| 18 | fluency-add-sub-20 | No lesson (m5) | — | number_input (C1) | C1, m5 |
| 19 | addition-within-20 | OK | OK | OK | — |
| 20 | add-three-numbers | OK | OK | OK | — |
| 21 | understand-tens-ones | OK | Labels reveal (M3) | OK | M3, Mo4 |
| 22 | teen-numbers-composition | OK | Labels reveal (M4) | OK | M4, Mo4 |
| 23 | decade-numbers | OK | Labels reveal (M5) | OK | M5, Mo4 |
| 24 | compare-two-digit | OK | No visual (Mo8) | OK (comparison) | Mo8 |
| 25 | add-two-digit-plus-one | OK | OK (base-10 blocks) | OK | M17 (regroup hint) |
| 26 | add-two-digit-plus-tens | OK | Limited visual (Mo10) | OK | Mo10 |
| 27 | subtract-multiples-of-ten | OK | OK (base-10 blocks) | OK | — |
| 28 | mental-ten-more-less | OK | Abstract only (Mo9) | OK | Mo9 |
| 29 | understand-hundreds | No lesson (m8) | Labels reveal (M6) | OK | M6, m8 |
| 30 | add-subtract-within-100 | No lesson (m7) | Broken format (C7) | number_input (C1) | C1, C7, m7 |
| 31 | read-write-numerals-120 | OK | — | fill_blank (C1), wrong place value (C8) | C1, C8 |
| 32 | count-to-120 | OK | No pictures (C5), negatives (C9) | OK | C5, C9 |
| 33 | equal-sign-meaning | OK | — | OK (true/false) | Mo11 |
| 34 | tell-time-hour | OK | OK (clock renders) | OK | M14 (worksheet) |
| 35 | tell-time-half-hour | OK | OK (clock renders) | OK | M14 (worksheet) |
| 36 | tell-time-five-minutes | Clock text broken (C10) | No clock (C6), answer in text (M15) | Answer in text (M15) | C6, C10, M15 |
| 37 | order-objects-by-length | OK | Labels reveal (M7) | OK | M7 |
| 38 | measure-nonstandard-units | OK | OK | Answer in question (M13) | M13, Mo3 |
| 39 | identify-2d-shapes | OK | No shape image (C3) | Ambiguous (M12) | C3, M12 |
| 40 | identify-3d-shapes | OK | No shape image (C3) | Ambiguous (M9) | C3, M9 |
| 41 | compose-shapes | OK | No shape image (C3) | OK | C3 |
| 42 | partition-halves | OK | No shape image (C3) | OK | C3 |
| 43 | partition-fourths | OK | No shape image (C3) | OK | C3 |
| 44 | describe-shares-wholes | OK | No shape image (C3) | Uses ÷ symbol (M10) | C3, M10 |
| 45 | draw-shapes-by-attributes | OK | — | Mixes 2D/3D (M11) | M11 |
| 46 | organize-data-categories | OK | OK | OK | Mo6 |
| 47 | interpret-data | OK | OK (bar chart) | OK | Mo5 |
| 48 | subtraction-within-20 | OK | OK | OK | — |
| 49 | add-two-digit-plus-tens | OK | OK | OK | — |

**Note:** Some skills (50-53) are variants or overlap with the above. Skills not listed had no distinguishable issues.

---

## Priority Fix Order

1. **Add on-screen number pad** (C1) — 7 skills currently unusable on tablets. This is the single highest-impact fix.
2. **Fix corrupted fill_blank rendering** (C2) — missing-number-equations completely broken
3. **Remove answer-revealing labels from concrete visuals** (M1-M7) — defeats the purpose of concrete scaffolding across 8+ skills
4. **Create shape visual components for geometry** (C3) — 6 skills have no concrete-level visuals
5. **Fix word-problems-within-100 negative answers** (C4) — can generate impossible problems
6. **Add visual aids to count-to-120 concrete** (C5) — claims to show pictures but doesn't
7. **Fix tell-time-five-minutes clock rendering** (C6) — time skill with no clock
8. **Fix add-subtract-within-100 concrete format** (C7) — grammar errors, no visuals, confusing text
9. **Fix read-write-numerals place value for >= 100** (C8) — shows wrong decomposition
10. **Resolve fill_blank vs multiple_choice inconsistency** (Mo1) — different behavior in-app vs worksheet
11. **Add missing lessons** (m5-m8) — 4 skills have no teaching content
12. **Improve making-ten-strategy problems** (M8) — currently just tests addition, not the strategy
13. **Fix ambiguous geometry questions** (M9, M12) — multiple valid answers accepted as wrong
14. **Remove division symbol from first-grade content** (M10) — kids don't know ÷
15. **Fix lesson clock format** (C10) — change `clock:3:00` to `clock-3-0` in all 3 time lessons
16. **Fix word-problems-take-from formula** (C11) — formula is backwards in the lesson concept step
17. **Remove digital time from tell-time-five-minutes question text** (M15) — answer visible in question
18. **Fix plural/singular grammar in word problems** (M16) — "1 apples" across all 11 word problem skills
19. **Fix regrouping hint in add-two-digit-plus-one** (M17) — hint is wrong when ones carry
