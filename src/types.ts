// ============================================
// Skill & Curriculum Types
// ============================================

export type Domain =
  | 'OA'   // Operations & Algebraic Thinking
  | 'NBT'  // Number & Operations in Base Ten
  | 'MD'   // Measurement & Data
  | 'G';   // Geometry

export type MasteryLevel = 'not_started' | 'developing' | 'proficient' | 'mastered';

export type ScaffoldingLevel = 'concrete' | 'representational' | 'abstract';

export interface Skill {
  id: string;
  name: string;
  description: string;
  domain: Domain;
  standardCode: string;       // e.g. '1.OA.C.6'
  prerequisites: string[];    // skill IDs
  curriculumOrder: number;    // sequencing order (1-41)
}

// ============================================
// Student & Score Types
// ============================================

export interface Student {
  id: string;
  parentId: string;
  name: string;
  gradeLevel: number;
  assessmentComplete: boolean;
  createdAt: string;
}

export interface SkillScore {
  id?: string;
  studentId: string;
  skillId: string;
  mastery: MasteryLevel;
  totalAttempts: number;
  totalCorrect: number;
  recentAttempts: AttemptRecord[];  // last 10
  lastAttempted: string | null;
  firstMasteredAt: string | null;
  nextReviewAt: string | null;
}

export interface AttemptRecord {
  correct: boolean;
  timestamp: string;
}

// ============================================
// Session Types
// ============================================

export type SessionType = 'assessment' | 'daily';

export type SessionPhase = 'warmup' | 'learning' | 'practice' | 'celebration';

export interface Session {
  id?: string;
  studentId: string;
  sessionType: SessionType;
  startedAt: string;
  durationSeconds: number;
  problemsAttempted: number;
  problemsCorrect: number;
  skillBreakdown: SkillBreakdown[];
}

export interface SkillBreakdown {
  skillId: string;
  attempted: number;
  correct: number;
}

// ============================================
// Problem Types
// ============================================

export type ProblemType =
  | 'multiple_choice'
  | 'number_input'
  | 'true_false'
  | 'comparison'       // <, =, >
  | 'fill_blank';      // equation with blank

export interface Problem {
  id: string;
  skillId: string;
  type: ProblemType;
  scaffolding: ScaffoldingLevel;
  question: string;
  questionParts?: QuestionPart[];  // for visual/structured rendering
  correctAnswer: string;
  choices?: string[];              // for multiple choice
  hint?: string;
  explanation: string;
}

export interface QuestionPart {
  type: 'text' | 'dots' | 'image' | 'number_line' | 'equation' | 'blank';
  value: string;
  count?: number;   // for dots
}

// ============================================
// Problem Generator Interface
// ============================================

export interface ProblemGenerator {
  skillId: string;
  generate(scaffolding: ScaffoldingLevel): Problem;
}

// ============================================
// Assessment Types
// ============================================

export interface AssessmentState {
  currentSkillIndex: number;
  skillQueue: string[];       // skill IDs to test
  questionsPerSkill: number;
  currentQuestionIndex: number;
  results: Record<string, { attempted: number; correct: number }>;
  complete: boolean;
}

// ============================================
// Session Engine Types
// ============================================

export interface SessionPlan {
  warmupSkills: string[];     // mastered skills for review
  learningSkills: string[];   // 1-2 ZPD skills
  practiceSkills: string[];   // mix of learning + recent
  totalProblems: number;
}

export interface ActiveSession {
  plan: SessionPlan;
  phase: SessionPhase;
  startTime: number;
  elapsedSeconds: number;
  problemsCompleted: number;
  problemsCorrect: number;
  currentProblem: Problem | null;
  skillResults: Record<string, { attempted: number; correct: number }>;
  consecutiveWrong: number;   // for corrective feedback
}
