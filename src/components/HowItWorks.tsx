import { useState } from 'react';
import {
  BookOpen, Target, Brain, TrendingUp, BarChart3,
  ChevronDown, ChevronUp, Clock, Layers, RefreshCw,
  CheckCircle2, AlertCircle, Zap, GraduationCap,
} from 'lucide-react';

type SectionId = 'overview' | 'assessment' | 'sessions' | 'mastery' | 'scaffolding' | 'zpd' | 'review';

interface SectionProps {
  id: SectionId;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  openSections: Set<SectionId>;
  toggle: (id: SectionId) => void;
}

function Section({ id, title, icon, children, openSections, toggle }: SectionProps) {
  const isOpen = openSections.has(id);
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <button
        onClick={() => toggle(id)}
        className="w-full flex items-center gap-3 p-5 text-left active:bg-slate-50 transition-colors min-h-[56px]"
      >
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <span className="flex-1 text-lg font-bold text-slate-800">{title}</span>
        {isOpen
          ? <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
          : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
        }
      </button>
      {isOpen && (
        <div className="px-5 pb-5 space-y-4 text-slate-600 text-sm leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

function LevelBadge({ level, color, children }: { level: string; color: string; children: React.ReactNode }) {
  return (
    <div className={`flex items-start gap-3 p-3 rounded-xl ${color}`}>
      <span className="font-bold text-sm shrink-0 mt-0.5">{level}</span>
      <span className="text-sm">{children}</span>
    </div>
  );
}

function PhaseCard({ phase, label, color, icon, children }: {
  phase: string; label: string; color: string; icon: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className={`rounded-xl p-4 ${color}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="font-bold text-sm">{label}</span>
        <span className="text-xs opacity-70 ml-auto">{phase}</span>
      </div>
      <p className="text-sm opacity-90">{children}</p>
    </div>
  );
}

export default function HowItWorks() {
  const [openSections, setOpenSections] = useState<Set<SectionId>>(new Set(['overview']));

  function toggle(id: SectionId) {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function expandAll() {
    setOpenSections(new Set<SectionId>(['overview', 'assessment', 'sessions', 'mastery', 'scaffolding', 'zpd', 'review']));
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-6 text-white shadow-sm">
        <GraduationCap className="w-10 h-10 mx-auto mb-2 opacity-90" />
        <h2 className="text-2xl font-bold text-center">How It Works</h2>
        <p className="text-indigo-100 text-center mt-1 text-sm">
          Everything about how Math Mastery teaches, tracks, and adapts
        </p>
      </div>

      <button
        onClick={expandAll}
        className="text-sm text-indigo-600 font-semibold active:text-indigo-800 transition-colors px-1"
      >
        Expand all sections
      </button>

      {/* 1. Overview */}
      <Section id="overview" title="Overview" icon={<BookOpen className="w-5 h-5 text-indigo-600" />} openSections={openSections} toggle={toggle}>
        <p>
          Math Mastery is an adaptive math learning platform aligned to Common Core standards
          for grades K-2. It teaches <strong>53 skills</strong> across four domains:
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <p className="font-bold text-blue-700 text-lg">25</p>
            <p className="text-xs text-blue-600 font-medium">Operations & Algebraic Thinking</p>
          </div>
          <div className="bg-emerald-50 rounded-lg p-3 text-center">
            <p className="font-bold text-emerald-700 text-lg">8</p>
            <p className="text-xs text-emerald-600 font-medium">Number & Base Ten</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-3 text-center">
            <p className="font-bold text-amber-700 text-lg">6</p>
            <p className="text-xs text-amber-600 font-medium">Measurement & Data</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 text-center">
            <p className="font-bold text-purple-700 text-lg">7</p>
            <p className="text-xs text-purple-600 font-medium">Geometry</p>
          </div>
        </div>
        <p>
          Skills form a <strong>prerequisite graph</strong> — a student must master foundational
          skills before unlocking dependent ones. For example, "Addition Within 5" must be mastered
          before "Addition Within 10", which unlocks word problems and fluency skills.
        </p>
        <p>
          The system automatically selects what to teach next based on each student's
          <strong> Zone of Proximal Development</strong> — the skills they're ready to learn.
        </p>
      </Section>

      {/* 2. Initial Assessment */}
      <Section id="assessment" title="Initial Assessment" icon={<Target className="w-5 h-5 text-indigo-600" />} openSections={openSections} toggle={toggle}>
        <p>
          New students start with a diagnostic assessment to determine what they already know.
        </p>

        <div className="bg-slate-50 rounded-xl p-4 space-y-3">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            <span><strong>3 questions per skill</strong> — tests each skill in curriculum order, from K prerequisites through Grade 2</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            <span><strong>Abstract level only</strong> — pure numbers, no visual aids, to get a true baseline</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            <span><strong>Adaptive skipping</strong> — if a student gets 0-1 correct on a skill, all its dependent skills are automatically skipped</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            <span><strong>No feedback shown</strong> — the student isn't told right or wrong during the assessment</span>
          </div>
        </div>

        <p className="text-slate-500 text-xs">
          Example: If a student can't do "Addition Within 5", the assessment skips
          "Addition Within 10", "Addition Fluency", word problems, and all other skills
          that depend on it — saving time and avoiding frustration.
        </p>

        <div className="bg-indigo-50 rounded-xl p-4">
          <p className="font-semibold text-indigo-700 text-sm mb-2">Assessment Results</p>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span><strong>3/3 correct</strong> → Proficient</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span><strong>2/3 correct</strong> → Developing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <span><strong>0-1/3 correct</strong> → Not Started (dependents skipped)</span>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. Daily Sessions */}
      <Section id="sessions" title="Daily Session Flow" icon={<Clock className="w-5 h-5 text-indigo-600" />} openSections={openSections} toggle={toggle}>
        <p>
          Each daily session follows a structured four-phase flow designed around how students
          learn best: review, teach, practice with support, then practice independently.
        </p>

        <div className="space-y-3">
          <PhaseCard
            phase="Phase 1"
            label="Warm Up"
            color="bg-orange-50 text-orange-800"
            icon={<RefreshCw className="w-4 h-4 text-orange-600" />}
          >
            6 review problems from <strong>mastered skills</strong> that are due for spaced review.
            Keeps old knowledge fresh. Uses abstract scaffolding since these are already mastered.
            Skipped if no skills are due for review.
          </PhaseCard>

          <PhaseCard
            phase="Phase 2"
            label="Lesson"
            color="bg-indigo-50 text-indigo-800"
            icon={<BookOpen className="w-4 h-4 text-indigo-600" />}
          >
            Teaches <strong>1-2 new skills</strong> using a three-step lesson:
            <strong> Concept</strong> (explain the idea),
            <strong> Example</strong> (work through a problem step-by-step), and
            <strong> Try It</strong> (encourage the student to apply it).
            Each step can include visual aids like dot arrays, equations, and number lines.
          </PhaseCard>

          <PhaseCard
            phase="Phase 3"
            label="Guided Practice"
            color="bg-violet-50 text-violet-800"
            icon={<Brain className="w-4 h-4 text-violet-600" />}
          >
            <strong>4 problems per skill</strong> immediately after its lesson.
            This is where <strong>adaptive scaffolding</strong> kicks in — if the student
            struggles, problems drop to easier visual formats. Feedback is shown after each answer.
          </PhaseCard>

          <PhaseCard
            phase="Phase 4"
            label="Independent Practice"
            color="bg-emerald-50 text-emerald-800"
            icon={<Zap className="w-4 h-4 text-emerald-600" />}
          >
            <strong>8 mixed problems</strong> from the skills just learned plus recent
            developing/proficient skills. Abstract scaffolding only — the student works
            without visual aids, building true fluency.
          </PhaseCard>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-500">
          <p className="font-semibold text-slate-700 mb-1">How skills for each phase are chosen:</p>
          <ul className="space-y-1 list-disc ml-4">
            <li><strong>Warm Up:</strong> Mastered skills past their spaced review date, most overdue first</li>
            <li><strong>Lesson:</strong> Skills in the student's Zone of Proximal Development (see below)</li>
            <li><strong>Guided Practice:</strong> The skill(s) just taught in the lesson</li>
            <li><strong>Independent:</strong> Learning skills + other recent developing/proficient skills</li>
          </ul>
        </div>
      </Section>

      {/* 4. Mastery System */}
      <Section id="mastery" title="Mastery Levels" icon={<TrendingUp className="w-5 h-5 text-indigo-600" />} openSections={openSections} toggle={toggle}>
        <p>
          Every skill has a mastery level based on the student's <strong>last 10 attempts</strong> (a
          sliding window). A minimum of 3 attempts is required before any level beyond "Not Started".
        </p>

        <div className="space-y-2">
          <LevelBadge level="Not Started" color="bg-slate-50 text-slate-700">
            Fewer than 3 attempts, or below 50% accuracy on recent attempts. The student hasn't
            meaningfully engaged with this skill yet.
          </LevelBadge>

          <LevelBadge level="Developing" color="bg-amber-50 text-amber-800">
            <strong>50%-79% accuracy</strong> on last 10 attempts. The student understands the concept
            but needs more practice. This skill will appear in independent practice sessions.
          </LevelBadge>

          <LevelBadge level="Proficient" color="bg-blue-50 text-blue-800">
            <strong>80%-89% accuracy</strong>, or <strong>90%+ for the first time</strong>.
            When a student first hits 90%+, they reach Proficient (not Mastered) and a timestamp
            is recorded. This ensures mastery requires sustained performance.
          </LevelBadge>

          <LevelBadge level="Mastered" color="bg-emerald-50 text-emerald-800">
            <strong>90%+ accuracy</strong> and the student has <strong>previously achieved 90%+</strong> in
            an earlier session. This two-session requirement proves the knowledge is retained,
            not just a one-time performance.
          </LevelBadge>
        </div>

        <div className="bg-indigo-50 rounded-xl p-4">
          <p className="font-semibold text-indigo-700 text-sm mb-2">Path to Mastery (Example)</p>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <span className="bg-indigo-200 text-indigo-800 font-bold px-2 py-0.5 rounded text-[10px] shrink-0 mt-0.5">SESSION 1</span>
              <span>Student gets 9/10 correct (90%) → moves to <strong>Proficient</strong>. A "first mastered" timestamp is saved internally.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-indigo-200 text-indigo-800 font-bold px-2 py-0.5 rounded text-[10px] shrink-0 mt-0.5">SESSION 2</span>
              <span>Skill comes up in warm-up review or practice. Student gets 9/10 again → now <strong>Mastered</strong>, because they've sustained 90%+ across multiple sessions.</span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 bg-amber-50 rounded-xl p-3">
          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-800">
            <strong>Mastery can be lost.</strong> If accuracy on recent attempts drops below 90%,
            the student moves back to Proficient or Developing. The system will re-teach the skill
            in future sessions.
          </p>
        </div>
      </Section>

      {/* 5. Adaptive Scaffolding */}
      <Section id="scaffolding" title="Adaptive Scaffolding" icon={<Layers className="w-5 h-5 text-indigo-600" />} openSections={openSections} toggle={toggle}>
        <p>
          During <strong>guided practice only</strong>, the system adjusts problem difficulty
          in real-time based on how the student is doing. This follows the
          Concrete-Representational-Abstract (CRA) instructional model.
        </p>

        <div className="space-y-2">
          <div className="bg-emerald-50 rounded-xl p-4">
            <p className="font-bold text-emerald-700 text-sm mb-1">Abstract (Default)</p>
            <p className="text-xs text-emerald-700">
              Pure numbers and symbols. No visual aids. Example: "What is 7 + 5?"
            </p>
            <p className="text-[10px] text-emerald-600 mt-1">Used when: student is answering correctly</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4">
            <p className="font-bold text-blue-700 text-sm mb-1">Representational</p>
            <p className="text-xs text-blue-700">
              Diagrams, number lines, and visual models. Example: "Use the number line to find 7 + 5."
            </p>
            <p className="text-[10px] text-blue-600 mt-1">Used when: 1 wrong answer in a row</p>
          </div>

          <div className="bg-purple-50 rounded-xl p-4">
            <p className="font-bold text-purple-700 text-sm mb-1">Concrete</p>
            <p className="text-xs text-purple-700">
              Physical/visual manipulatives like dot arrays and counting objects.
              Example: "Count the dots: ●●●●●●● + ●●●●●"
            </p>
            <p className="text-[10px] text-purple-600 mt-1">Used when: 2+ wrong answers in a row</p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-600">
          <p className="font-semibold text-slate-700 mb-1">How it resets</p>
          <p>
            As soon as the student answers correctly, the scaffolding resets back to
            <strong> Abstract</strong>. This encourages the student to work without aids whenever
            possible while providing support exactly when they need it.
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-600">
          <p className="font-semibold text-slate-700 mb-1">Where scaffolding is NOT used</p>
          <ul className="list-disc ml-4 space-y-1 mt-1">
            <li><strong>Assessment</strong> — always abstract (to get a true baseline)</li>
            <li><strong>Warm Up</strong> — always abstract (these are mastered skills)</li>
            <li><strong>Independent Practice</strong> — always abstract (building fluency)</li>
          </ul>
        </div>
      </Section>

      {/* 6. Zone of Proximal Development */}
      <Section id="zpd" title="Zone of Proximal Development" icon={<Target className="w-5 h-5 text-indigo-600" />} openSections={openSections} toggle={toggle}>
        <p>
          The system picks what to teach next using the <strong>Zone of Proximal Development (ZPD)</strong> —
          skills the student is ready to learn based on their current mastery.
        </p>

        <div className="bg-slate-50 rounded-xl p-4 space-y-3 text-xs">
          <p className="font-semibold text-slate-700">A skill is "ready" when:</p>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
            <span>All its prerequisite skills are <strong>mastered</strong></span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
            <span>The skill itself is <strong>not yet mastered</strong></span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
            <span>A problem generator exists for the skill</span>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-xl p-4">
          <p className="font-semibold text-indigo-700 text-sm mb-2">Selection Priority</p>
          <p className="text-xs text-indigo-700 mb-2">
            When multiple skills are ready, the system picks <strong>2 skills</strong> per session
            using this priority order:
          </p>
          <ol className="list-decimal ml-4 text-xs text-indigo-700 space-y-1">
            <li><strong>Developing</strong> — skills the student has started but hasn't solidified (highest priority)</li>
            <li><strong>Not Started</strong> — brand new skills the student hasn't seen yet</li>
            <li><strong>Proficient</strong> — skills close to mastery that need one more push</li>
          </ol>
          <p className="text-xs text-indigo-600 mt-2">
            Within the same priority level, skills are sorted by curriculum order (earlier topics first).
          </p>
        </div>
      </Section>

      {/* 7. Spaced Review */}
      <Section id="review" title="Spaced Review" icon={<RefreshCw className="w-5 h-5 text-indigo-600" />} openSections={openSections} toggle={toggle}>
        <p>
          Once a skill reaches <strong>Mastered</strong>, it enters a spaced review cycle
          to ensure long-term retention. Mastered skills appear in the <strong>Warm Up</strong> phase
          when they're due for review.
        </p>

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="font-semibold text-slate-700 text-sm mb-3">Review Schedule</p>
          <div className="space-y-2">
            {[
              { days: '3 days', desc: 'First review after mastery' },
              { days: '7 days', desc: 'Second review' },
              { days: '14 days', desc: 'Third review' },
              { days: '30 days', desc: 'Fourth review, then every 30 days' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-16 text-right font-bold text-indigo-600 text-xs shrink-0">{item.days}</span>
                <div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                <span className="text-xs text-slate-600">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-600">
          <p className="font-semibold text-slate-700 mb-1">What happens during review</p>
          <p>
            Mastered skills that are past their review date are selected for Warm Up,
            with the most overdue skills prioritized first. The student answers up to 6
            review problems. If they do well, the review interval continues. If accuracy
            drops below 90%, the skill loses its Mastered status and re-enters the
            learning rotation.
          </p>
        </div>

        <div className="flex items-start gap-2 bg-emerald-50 rounded-xl p-3">
          <BarChart3 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
          <p className="text-xs text-emerald-800">
            This expanding interval system is based on spaced repetition research —
            reviewing at increasing intervals is one of the most effective ways to
            move knowledge into long-term memory.
          </p>
        </div>
      </Section>

      {/* Attempt tracking note */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h3 className="font-bold text-slate-800 mb-2">How Attempts Are Tracked</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Every problem a student answers — whether in the assessment, warm up,
          guided practice, or independent practice — counts toward their skill score.
          The system keeps a sliding window of the <strong>last 10 attempts</strong> per skill
          and uses that accuracy to determine mastery level. Total lifetime attempts
          and correct counts are also tracked for progress reporting.
        </p>
      </div>
    </div>
  );
}
