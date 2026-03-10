import { useState, useRef, useCallback } from 'react';
import type { Problem, ScaffoldingLevel, Domain } from '../../types';
import { skills, domainNames } from '../../data/skills';
import { generateProblem, getRegisteredSkillIds } from '../../engine/problems/index';
import ProblemDisplay from '../session/ProblemDisplay';
import Feedback from '../session/Feedback';
import { ArrowLeft, RefreshCw } from 'lucide-react';

type View = 'list' | 'problem' | 'feedback';

const ENCOURAGEMENTS = ['Amazing!', 'You rock!', 'Fantastic!', 'Super star!', 'Way to go!', 'Brilliant!', 'Awesome!', 'Keep it up!'];

const scaffoldingOptions: { value: ScaffoldingLevel; label: string }[] = [
  { value: 'concrete', label: 'Concrete' },
  { value: 'representational', label: 'Representational' },
  { value: 'abstract', label: 'Abstract' },
];

const domains: Domain[] = ['OA', 'NBT', 'MD', 'G'];

export default function ProblemPreview() {
  const registeredIds = useRef(new Set(getRegisteredSkillIds()));
  const [scaffolding, setScaffolding] = useState<ScaffoldingLevel>('abstract');
  const [view, setView] = useState<View>('list');
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [encouragement, setEncouragement] = useState('');
  const [problemCount, setProblemCount] = useState(0);

  const activeSkill = activeSkillId ? skills.find(s => s.id === activeSkillId) : null;

  const generateNext = useCallback((skillId: string, level: ScaffoldingLevel) => {
    try {
      const p = generateProblem(skillId, level);
      setProblem(p);
      setView('problem');
      setProblemCount(c => c + 1);
    } catch {
      // Skill has no generator — shouldn't happen since we filter
    }
  }, []);

  function handleSelectSkill(skillId: string) {
    setActiveSkillId(skillId);
    setProblemCount(0);
    generateNext(skillId, scaffolding);
  }

  function handleAnswer(answer: string) {
    if (!problem) return;
    const correct = answer.toLowerCase().trim() === problem.correctAnswer.toLowerCase().trim();
    setLastAnswerCorrect(correct);
    if (correct) {
      setEncouragement(ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]);
    }
    setView('feedback');
  }

  function handleNextProblem() {
    if (activeSkillId) {
      generateNext(activeSkillId, scaffolding);
    }
  }

  function handleBack() {
    setView('list');
    setActiveSkillId(null);
    setProblem(null);
    setProblemCount(0);
  }

  function handleScaffoldingChange(level: ScaffoldingLevel) {
    setScaffolding(level);
    if (activeSkillId) {
      generateNext(activeSkillId, level);
    }
  }

  // Problem / Feedback view
  if (view !== 'list' && activeSkill && problem) {
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-2 rounded-xl text-slate-500 active:bg-slate-100 transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-slate-800 truncate">{activeSkill.name}</h2>
            <p className="text-xs text-slate-400">{activeSkill.standardCode} &middot; Problem #{problemCount}</p>
          </div>
          <button
            onClick={() => generateNext(activeSkillId!, scaffolding)}
            className="p-2 rounded-xl text-slate-500 active:bg-slate-100 transition-colors min-h-[44px]"
            title="New problem"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        {/* Scaffolding toggle */}
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
          {scaffoldingOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleScaffoldingChange(opt.value)}
              className={`flex-1 py-2 px-2 rounded-lg text-xs font-semibold transition-colors ${
                scaffolding === opt.value
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 active:text-slate-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Problem or Feedback */}
        {view === 'problem' ? (
          <ProblemDisplay problem={problem} onAnswer={handleAnswer} />
        ) : (
          <Feedback
            correct={lastAnswerCorrect}
            explanation={problem.explanation}
            correctAnswer={problem.correctAnswer}
            encouragement={encouragement}
            onNext={handleNextProblem}
          />
        )}
      </div>
    );
  }

  // Skill list view
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">Problem Preview</h2>
        <p className="text-sm text-slate-500 mt-1">Test any problem interactively</p>
      </div>

      {/* Scaffolding selector */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Scaffolding Level</p>
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
          {scaffoldingOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setScaffolding(opt.value)}
              className={`flex-1 py-2 px-2 rounded-lg text-xs font-semibold transition-colors ${
                scaffolding === opt.value
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 active:text-slate-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Skills by domain */}
      {domains.map(domain => {
        const domainSkills = skills.filter(s => s.domain === domain);
        return (
          <div key={domain} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
              <h3 className="font-bold text-slate-700 text-sm">{domainNames[domain]}</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {domainSkills.map(skill => {
                const hasGenerator = registeredIds.current.has(skill.id);
                return (
                  <div key={skill.id} className="flex items-center justify-between px-4 py-3">
                    <div className="min-w-0 flex-1 mr-3">
                      <p className={`text-sm font-medium truncate ${hasGenerator ? 'text-slate-800' : 'text-slate-400'}`}>
                        {skill.name}
                      </p>
                      <p className="text-xs text-slate-400">{skill.standardCode}</p>
                    </div>
                    {hasGenerator ? (
                      <button
                        onClick={() => handleSelectSkill(skill.id)}
                        className="shrink-0 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-600 text-xs font-bold active:bg-indigo-100 transition-colors min-h-[36px]"
                      >
                        Try It
                      </button>
                    ) : (
                      <span className="shrink-0 text-xs text-slate-300 font-medium">No generator</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
