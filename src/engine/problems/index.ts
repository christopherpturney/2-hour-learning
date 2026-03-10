import type { Problem, ProblemGenerator, ScaffoldingLevel } from '../../types';

import { additionGenerators } from './addition';
import { subtractionGenerators } from './subtraction';
import { placeValueGenerators } from './placeValue';
import { wordProblemGenerators } from './wordProblems';
import { equationGenerators } from './equations';
import { measurementGenerators } from './measurement';
import { timeGenerators } from './time';
import { geometryGenerators } from './geometry';
import { dataGenerators } from './data';

// ============================================
// Registry: skillId -> ProblemGenerator
// ============================================

const registry = new Map<string, ProblemGenerator>();

function registerGenerators(generators: ProblemGenerator[]): void {
  for (const generator of generators) {
    if (registry.has(generator.skillId)) {
      console.warn(`Duplicate generator registration for skillId: ${generator.skillId}`);
    }
    registry.set(generator.skillId, generator);
  }
}

// Register all generators
registerGenerators(additionGenerators);
registerGenerators(subtractionGenerators);
registerGenerators(placeValueGenerators);
registerGenerators(wordProblemGenerators);
registerGenerators(equationGenerators);
registerGenerators(measurementGenerators);
registerGenerators(timeGenerators);
registerGenerators(geometryGenerators);
registerGenerators(dataGenerators);

// ============================================
// Public API
// ============================================

/**
 * Get the ProblemGenerator for a given skillId.
 * Throws if no generator is registered for the skillId.
 */
export function getGenerator(skillId: string): ProblemGenerator {
  const generator = registry.get(skillId);
  if (!generator) {
    throw new Error(`No problem generator found for skillId: "${skillId}". Available skills: ${[...registry.keys()].join(', ')}`);
  }
  return generator;
}

/**
 * Generate a single problem for a given skillId and scaffolding level.
 * Throws if no generator is registered for the skillId.
 */
export function generateProblem(skillId: string, scaffolding: ScaffoldingLevel): Problem {
  const generator = getGenerator(skillId);
  return generator.generate(scaffolding);
}

/**
 * Get all registered skill IDs.
 */
export function getRegisteredSkillIds(): string[] {
  return [...registry.keys()];
}
