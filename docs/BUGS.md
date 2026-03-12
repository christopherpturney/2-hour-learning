# Known Bugs

All previously listed bugs have been fixed. This file documents what was fixed and how.

## Fixed

### 1. Empty warmup skills causes instant session completion
**Fix**: `session.ts` skips warmup phase when no review skills are available. `SessionManager` advances phase instead of ending session when `getNextProblem` returns null.

### 2. `subtractionWithin20` hint reveals the answer
**Fix**: Hint now uses `?` placeholder instead of embedding the answer variable: `"Can you use a related addition fact? ? + ${b} = ${a}."`.

### 3. `measureNonstandardUnits` wrong answer can equal correct answer
**Fix**: Minimum length changed from 1 to 3 (`randomInt(3, 10)`), so `wrong1 = length - 1` is always distinct from the correct answer.

### 4. Mastery below 50% accuracy returns `'developing'`
**Fix**: Below 50% accuracy with 3+ attempts now returns `'not_started'` instead of `'developing'`.

### 5. `countingOnStrategy` hint enumerates the full answer
**Fix**: Hint now says generic instruction (`"Say X in your head, then count on Y more. Use the dots to help!"`) without enumerating the counting sequence.

### 6. `selectWarmupSkills` / `selectPracticeSkills` don't filter for generator existence
**Fix**: Both functions now check `generatorSkillIds.has(s.id)` before selecting skills.

### 7. `interpretData` ties produce ambiguous correctness
**Fix**: `generateDataSet` now guarantees unique values across all categories by sampling without replacement from the available range, eliminating ties.

### 8. `measureNonstandardUnits` abstract level is a tautology
**Fix**: Abstract level now always generates two objects with different lengths and asks a comparison question ("How much longer is X than Y?"), requiring actual subtraction.

### 9. `addThreeNumbers` hint gives away partial answer
**Fix**: Hint changed to generic guidance: `"Try adding two numbers first, then add the third."`.

### 10. `makingTenStrategy` representational scaffolding shows full working
**Fix**: Hint simplified to prompt-style: `"${a} + ${needToMakeTen} = 10. Then 10 + ${leftover} = ?"` without revealing the final answer.

### 11. `additionWithin5` can generate `0 + 0 = 0`
**Fix**: First operand minimum changed from 0 to 1 (`randomInt(1, 5)`), ensuring at least one meaningful number.

### 12. `subtractionWithin5` can generate `a - 0 = a`
**Fix**: Minuend minimum changed to 2 and subtrahend minimum changed to 1, ensuring actual subtraction occurs.

### 13. `additionFluency10` / `subtractionFluency10` abstract level has no hint
**Fix**: Both abstract cases now assign meaningful hints (`"Think: what is X plus/minus Y?"`).

### 14. `equalSignMeaning` false case could theoretically produce negative right side
**Fix**: Guard `if (rightSide < 0) rightSide = sum + 1` prevents negative values. With min sum of 2 and max offset of 2, negative values are mathematically impossible, but guard remains as safety net.

### 15. Phase transitions override by time
**Fix**: `determinePhase` now uses only problem completion counts, not elapsed time. Time-based override removed.

### 16. `randomEncouragement` called on every render
**Fix**: Encouragement is now set once in `handleAnswer` and passed as a prop, not recalculated on every render.

### 17. Utility functions duplicated across 7+ problem files
**Fix**: Shared utilities (`randomInt`, `generateId`, `shuffle`, `dots`, `crossedDots`, `generateWrongAnswers`, `makeChoices`) extracted to `src/engine/problems/utils.ts`. All 9 problem generator files now import from this shared module.

### 18. No teaching/instruction content
**Fix**: Full lesson system added in `src/data/lessons.ts` with multi-step lessons (concept, example, try_it). Session flow includes a 'teach' phase with `LessonDisplay` component before guided practice.
