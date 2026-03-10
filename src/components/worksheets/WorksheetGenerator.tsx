import { useState, useRef, useCallback } from 'react';
import type { SkillScore, ScaffoldingLevel, Problem, Domain } from '../../types';
import { skills, domainNames } from '../../data/skills';
import { generateProblem, getRegisteredSkillIds } from '../../engine/problems/index';

interface WorksheetGeneratorProps {
  scores: Map<string, SkillScore>;
}

type ProblemCountOption = 10 | 15 | 20 | 25;

interface WorksheetConfig {
  selectedSkills: Set<string>;
  problemCount: ProblemCountOption;
  scaffolding: ScaffoldingLevel;
}

interface GeneratedWorksheet {
  title: string;
  date: string;
  scaffolding: ScaffoldingLevel;
  problems: Problem[];
}

const scaffoldingLabels: Record<ScaffoldingLevel, { name: string; description: string }> = {
  concrete: {
    name: 'Concrete',
    description: 'Uses visuals like dots and pictures to help solve problems',
  },
  representational: {
    name: 'Representational',
    description: 'Uses number lines and diagrams as support',
  },
  abstract: {
    name: 'Abstract',
    description: 'Numbers and equations only -- no visual aids',
  },
};

const domains: Domain[] = ['OA', 'NBT', 'MD', 'G'];

export default function WorksheetGenerator({ scores }: WorksheetGeneratorProps) {
  const registeredIds = useRef(new Set(getRegisteredSkillIds()));

  const [config, setConfig] = useState<WorksheetConfig>({
    selectedSkills: new Set<string>(),
    problemCount: 15,
    scaffolding: 'abstract',
  });

  const [worksheet, setWorksheet] = useState<GeneratedWorksheet | null>(null);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const printRef = useRef<HTMLDivElement>(null);

  const toggleSkill = useCallback((skillId: string) => {
    setConfig((prev) => {
      const next = new Set(prev.selectedSkills);
      if (next.has(skillId)) {
        next.delete(skillId);
      } else {
        next.add(skillId);
      }
      return { ...prev, selectedSkills: next };
    });
  }, []);

  const toggleDomain = useCallback(
    (domain: Domain) => {
      const domainSkills = skills
        .filter((s) => s.domain === domain && registeredIds.current.has(s.id));
      const domainIds = domainSkills.map((s) => s.id);

      setConfig((prev) => {
        const allSelected = domainIds.every((id) => prev.selectedSkills.has(id));
        const next = new Set(prev.selectedSkills);

        if (allSelected) {
          for (const id of domainIds) next.delete(id);
        } else {
          for (const id of domainIds) next.add(id);
        }

        return { ...prev, selectedSkills: next };
      });
    },
    [],
  );

  const selectAll = useCallback(() => {
    setConfig((prev) => ({
      ...prev,
      selectedSkills: new Set(
        skills.filter((s) => registeredIds.current.has(s.id)).map((s) => s.id),
      ),
    }));
  }, []);

  const selectNone = useCallback(() => {
    setConfig((prev) => ({ ...prev, selectedSkills: new Set() }));
  }, []);

  const generateWorksheet = useCallback(() => {
    setError(null);

    if (config.selectedSkills.size === 0) {
      setError('Please select at least one skill.');
      return;
    }

    const selectedArray = [...config.selectedSkills];
    const problems: Problem[] = [];

    // Distribute problems evenly across selected skills
    const perSkill = Math.ceil(config.problemCount / selectedArray.length);

    for (const skillId of selectedArray) {
      const count = Math.min(perSkill, config.problemCount - problems.length);
      for (let i = 0; i < count && problems.length < config.problemCount; i++) {
        try {
          const problem = generateProblem(skillId, config.scaffolding);
          problems.push(problem);
        } catch {
          // Skip skills that fail to generate
        }
      }
    }

    if (problems.length === 0) {
      setError('Could not generate any problems for the selected skills.');
      return;
    }

    // Shuffle problems so they are not grouped by skill
    for (let i = problems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [problems[i], problems[j]] = [problems[j], problems[i]];
    }

    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    setWorksheet({
      title: 'Math Practice Worksheet',
      date: dateStr,
      scaffolding: config.scaffolding,
      problems: problems.slice(0, config.problemCount),
    });

    setShowPrintPreview(false);
  }, [config]);

  const handlePrint = useCallback(() => {
    setShowPrintPreview(true);
    setTimeout(() => {
      window.print();
    }, 200);
  }, []);

  const getMasteryLabel = (skillId: string): string => {
    const score = scores.get(skillId);
    if (!score) return 'not started';
    return score.mastery.replace('_', ' ');
  };

  const getMasteryDotColor = (skillId: string): string => {
    const score = scores.get(skillId);
    if (!score || score.mastery === 'not_started') return 'bg-gray-300';
    if (score.mastery === 'developing') return 'bg-yellow-400';
    if (score.mastery === 'proficient') return 'bg-blue-400';
    return 'bg-green-400';
  };

  // ---- Render print view ----
  if (showPrintPreview && worksheet) {
    return (
      <div>
        {/* No-print controls bar */}
        <div className="print:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
          <button
            onClick={() => setShowPrintPreview(false)}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Back to Editor
          </button>
          <button
            onClick={() => window.print()}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Print
          </button>
        </div>

        {/* Printable worksheet */}
        <div ref={printRef} className="max-w-3xl mx-auto p-8 bg-white print:p-4">
          <div className="text-center mb-6 border-b-2 border-gray-300 pb-4">
            <h1 className="text-2xl font-bold text-gray-800">{worksheet.title}</h1>
            <p className="text-sm text-gray-500 mt-1">{worksheet.date}</p>
            <div className="mt-3 flex justify-center gap-8 text-sm text-gray-600">
              <span>
                Name: <span className="inline-block w-48 border-b border-gray-400" />
              </span>
              <span>
                Score: _____ / {worksheet.problems.length}
              </span>
            </div>
          </div>

          <div className="space-y-5">
            {worksheet.problems.map((problem, idx) => (
              <div
                key={problem.id}
                className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0"
              >
                <span className="font-bold text-gray-400 text-sm w-8 shrink-0 pt-0.5">
                  {idx + 1}.
                </span>
                <div className="flex-1">
                  <p className="text-base text-gray-800 leading-relaxed">
                    {problem.question}
                  </p>
                  {problem.choices && problem.choices.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-4">
                      {problem.choices.map((choice, ci) => (
                        <label key={ci} className="flex items-center gap-1.5 text-sm text-gray-700">
                          <span className="w-5 h-5 rounded-full border-2 border-gray-300 inline-block shrink-0" />
                          {choice}
                        </label>
                      ))}
                    </div>
                  )}
                  {!problem.choices && problem.type === 'number_input' && (
                    <div className="mt-2">
                      <span className="text-sm text-gray-500">Answer: </span>
                      <span className="inline-block w-20 border-b-2 border-gray-400" />
                    </div>
                  )}
                  {!problem.choices && problem.type === 'true_false' && (
                    <div className="mt-2 flex gap-6">
                      <label className="flex items-center gap-1.5 text-sm text-gray-700">
                        <span className="w-5 h-5 rounded-full border-2 border-gray-300 inline-block shrink-0" />
                        True
                      </label>
                      <label className="flex items-center gap-1.5 text-sm text-gray-700">
                        <span className="w-5 h-5 rounded-full border-2 border-gray-300 inline-block shrink-0" />
                        False
                      </label>
                    </div>
                  )}
                  {!problem.choices && problem.type === 'comparison' && (
                    <div className="mt-2 flex gap-4">
                      {['<', '=', '>'].map((op) => (
                        <label key={op} className="flex items-center gap-1.5 text-sm text-gray-700">
                          <span className="w-5 h-5 rounded-full border-2 border-gray-300 inline-block shrink-0" />
                          {op}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Answer key (prints on a new page) */}
          <div className="mt-8 pt-6 border-t-2 border-gray-400 break-before-page">
            <h2 className="text-lg font-bold text-gray-700 mb-3">Answer Key</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1 text-sm text-gray-600">
              {worksheet.problems.map((problem, idx) => (
                <div key={problem.id} className="flex gap-2">
                  <span className="font-medium text-gray-400 w-6">{idx + 1}.</span>
                  <span className="font-semibold text-gray-700">{problem.correctAnswer}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---- Render editor view ----
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Worksheet Generator</h1>
        <p className="text-gray-500 mb-6">
          Create custom practice worksheets for offline learning
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Skill Selection */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-semibold text-gray-700">Select Skills</h2>
              <div className="flex gap-2">
                <button
                  onClick={selectAll}
                  className="text-xs px-3 py-1.5 rounded-md text-blue-600 hover:bg-blue-50 font-medium"
                >
                  Select All
                </button>
                <button
                  onClick={selectNone}
                  className="text-xs px-3 py-1.5 rounded-md text-gray-500 hover:bg-gray-100 font-medium"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="max-h-[500px] overflow-y-auto">
              {domains.map((domain) => {
                const domainSkills = skills
                  .filter((s) => s.domain === domain)
                  .sort((a, b) => a.curriculumOrder - b.curriculumOrder);
                const availableSkills = domainSkills.filter((s) =>
                  registeredIds.current.has(s.id),
                );
                const allChecked =
                  availableSkills.length > 0 &&
                  availableSkills.every((s) => config.selectedSkills.has(s.id));
                const someChecked = availableSkills.some((s) =>
                  config.selectedSkills.has(s.id),
                );

                return (
                  <div key={domain} className="border-b border-gray-100 last:border-0">
                    {/* Domain header */}
                    <button
                      onClick={() => toggleDomain(domain)}
                      className="w-full px-5 py-3 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={allChecked}
                        ref={(el) => {
                          if (el) el.indeterminate = someChecked && !allChecked;
                        }}
                        readOnly
                        className="w-4 h-4 rounded text-blue-600 pointer-events-none"
                      />
                      <span className="font-semibold text-sm text-gray-700">
                        {domainNames[domain]}
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">
                        {availableSkills.filter((s) => config.selectedSkills.has(s.id)).length}/
                        {availableSkills.length}
                      </span>
                    </button>

                    {/* Skills */}
                    <div className="px-5 pb-3 grid grid-cols-1 sm:grid-cols-2 gap-1">
                      {domainSkills.map((skill) => {
                        const isAvailable = registeredIds.current.has(skill.id);
                        const isChecked = config.selectedSkills.has(skill.id);

                        return (
                          <label
                            key={skill.id}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                              !isAvailable
                                ? 'opacity-40 cursor-not-allowed'
                                : isChecked
                                  ? 'bg-blue-50 text-blue-800'
                                  : 'hover:bg-gray-50 text-gray-700'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              disabled={!isAvailable}
                              onChange={() => toggleSkill(skill.id)}
                              className="w-4 h-4 rounded text-blue-600"
                            />
                            <span className={`w-2 h-2 rounded-full shrink-0 ${getMasteryDotColor(skill.id)}`} />
                            <span className="truncate">{skill.name}</span>
                            <span className="text-[10px] text-gray-400 ml-auto capitalize shrink-0">
                              {getMasteryLabel(skill.id)}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Settings */}
          <div className="space-y-4">
            {/* Problem Count */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-700 mb-3">Number of Problems</h3>
              <div className="grid grid-cols-2 gap-2">
                {([10, 15, 20, 25] as ProblemCountOption[]).map((n) => (
                  <button
                    key={n}
                    onClick={() => setConfig((prev) => ({ ...prev, problemCount: n }))}
                    className={`py-2.5 rounded-lg text-sm font-medium transition-all ${
                      config.problemCount === n
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {n} problems
                  </button>
                ))}
              </div>
            </div>

            {/* Scaffolding Level */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-700 mb-3">Scaffolding Level</h3>
              <div className="space-y-2">
                {(Object.keys(scaffoldingLabels) as ScaffoldingLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() =>
                      setConfig((prev) => ({ ...prev, scaffolding: level }))
                    }
                    className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                      config.scaffolding === level
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p
                      className={`text-sm font-medium ${
                        config.scaffolding === level ? 'text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      {scaffoldingLabels[level].name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {scaffoldingLabels[level].description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-700 mb-3">Summary</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Selected skills</span>
                  <span className="font-medium text-gray-800">
                    {config.selectedSkills.size}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Problems</span>
                  <span className="font-medium text-gray-800">
                    {config.problemCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Level</span>
                  <span className="font-medium text-gray-800 capitalize">
                    {config.scaffolding}
                  </span>
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={generateWorksheet}
                className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                Generate Worksheet
              </button>

              {worksheet && (
                <button
                  onClick={handlePrint}
                  className="w-full py-3 px-4 bg-white text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Print Preview
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Generated Worksheet Preview (inline, non-print) */}
        {worksheet && !showPrintPreview && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-700">{worksheet.title}</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {worksheet.date} -- {worksheet.problems.length} problems --{' '}
                  {scaffoldingLabels[worksheet.scaffolding].name} level
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 font-medium"
                >
                  Print
                </button>
                <button
                  onClick={generateWorksheet}
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Regenerate
                </button>
              </div>
            </div>

            <div className="p-5 space-y-4">
              {worksheet.problems.map((problem, idx) => (
                <div
                  key={problem.id}
                  className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0"
                >
                  <span className="font-bold text-gray-300 text-sm w-7 shrink-0 text-right">
                    {idx + 1}.
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{problem.question}</p>
                    {problem.choices && (
                      <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-gray-600">
                        {problem.choices.map((choice, ci) => (
                          <span
                            key={ci}
                            className="px-2 py-1 bg-gray-100 rounded"
                          >
                            {String.fromCharCode(65 + ci)}. {choice}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-green-600 font-mono bg-green-50 px-2 py-1 rounded shrink-0">
                    {problem.correctAnswer}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
