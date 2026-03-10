# Known Bugs

## Critical

### 1. Empty warmup skills causes instant session completion
**Files**: `src/engine/session.ts` (lines 50-53), `src/components/session/SessionManager.tsx` (lines 66-72)
New students with no mastered skills have empty warmup lists. `getNextProblem` returns `null` on the first call, and `SessionManager` treats this as session-complete. The session ends before any problems are shown.
**Root cause**: No logic to skip empty phases and advance to the next one.

### 2. `subtractionWithin20` hint reveals the answer
**File**: `src/engine/problems/subtraction.ts` (line 259)
The abstract hint is `Can you use a related addition fact? ${answer} + ${b} = ${a}`. The `answer` variable is literally embedded in the hint text shown to the student.

### 3. `measureNonstandardUnits` wrong answer can equal correct answer
**File**: `src/engine/problems/measurement.ts` (lines 165-173)
When `length = 1`, `wrong1 = Math.max(1, length - 1) = 1`, which equals the correct answer. The student sees the correct answer listed twice.

### 4. Mastery below 50% accuracy returns `'developing'`
**File**: `src/engine/mastery.ts` (lines 40-45)
```typescript
if (accuracy >= 0.5) return 'developing';
return 'developing'; // dead code — same result regardless of accuracy
```
A student getting every answer wrong is classified as `'developing'`, same as 50-79% correct. There is no `'struggling'` state.

## High

### 5. `countingOnStrategy` hint enumerates the full answer
**File**: `src/engine/problems/addition.ts` (line 477)
The concrete hint generates the full counting sequence including the final answer (e.g., "Say 7, then count: 8, 9, 10" when the answer is 10).

### 6. `selectWarmupSkills` / `selectPracticeSkills` don't filter for generator existence
**Files**: `src/engine/zpd.ts` (lines 58-72, 74-103)
Unlike `isReady`, the warmup and practice skill selectors don't check `generatorSkillIds.has(skill.id)`. If a skill without a generator is selected, `getNextProblem` throws.

### 7. `interpretData` ties produce ambiguous correctness
**File**: `src/engine/problems/data.ts` (lines 178-180)
If two categories tie for most/least, only one is accepted as correct. The student could pick the other tied category and be marked wrong.

### 8. `measureNonstandardUnits` abstract level is a tautology
**File**: `src/engine/problems/measurement.ts` (lines 157-162)
The abstract question is "A pencil is 7 paper clips long. How many paper clips long is the pencil?" The answer is restated in the question.

### 9. `addThreeNumbers` hint gives away partial answer
**File**: `src/engine/problems/addition.ts` (line 314)
The representational hint reveals the intermediate sum: "First add 3 + 4 = 7, then add 2 more."

### 10. `makingTenStrategy` representational scaffolding shows full working
**File**: `src/engine/problems/addition.ts` (lines 541-548)
The question parts show the full decomposition and the hint restates it, making the problem trivial.

## Medium

### 11. `additionWithin5` can generate `0 + 0 = 0`
**File**: `src/engine/problems/addition.ts` (lines 57-58)
Pedagogically useless for young learners.

### 12. `subtractionWithin5` can generate `a - 0 = a`
**File**: `src/engine/problems/subtraction.ts` (line 61)
Does not test subtraction skill.

### 13. `additionFluency10` / `subtractionFluency10` abstract level has no hint
**Files**: `src/engine/problems/addition.ts` (lines 198-203), `src/engine/problems/subtraction.ts` (lines 198-203)
The `hint` variable is never assigned at abstract level, so it's `undefined`.

### 14. `equalSignMeaning` false case could theoretically produce negative right side
**File**: `src/engine/problems/equations.ts` (lines 64-70)
Guard only converts negative to `sum + 1`; fragile.

### 15. Phase transitions override by time
**File**: `src/engine/session.ts` (lines 128-135)
If a student takes 18+ minutes, the session jumps to `celebration` regardless of problems answered.

### 16. `randomEncouragement` called on every render
**File**: `src/components/session/Feedback.tsx` (line 45)
The encouragement text changes randomly on re-renders, causing flicker.

### 17. Utility functions duplicated across 7+ problem files
`randomInt`, `shuffle`, `generateWrongAnswers`, `makeChoices`, `generateId` are copied verbatim in every problem generator file.

## Architectural Gap

### 18. No teaching/instruction content
The app only has assessment (problems). There is no concept introduction, worked examples, visual explanations, or guided practice. The "lesson" is just a sequence of problems — step 4 of a 4-step learning flow with steps 1-3 missing.
