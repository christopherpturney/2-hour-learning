import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Student } from '../types';
import { Users } from 'lucide-react';

interface StudentSelectorProps {
  students: Student[];
  activeStudent: Student | null;
  onSelect: (student: Student) => void;
  onAdd: (name: string) => void;
}

export default function StudentSelector({ students, activeStudent, onSelect, onAdd }: StudentSelectorProps) {
  const [showAddForm, setShowAddForm] = useState(students.length === 0);
  const [name, setName] = useState('');

  function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name.trim());
    setName('');
    setShowAddForm(false);
  }

  return (
    <div className="space-y-5">
      <div className="text-center py-4">
        <Users className="w-12 h-12 text-indigo-500 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-slate-800">Who's learning today?</h2>
        <p className="text-slate-500 mt-1">Select a student or add a new one</p>
      </div>

      {/* Student list */}
      {students.length > 0 && (
        <div className="space-y-3">
          {students.map((student) => (
            <button
              key={student.id}
              onClick={() => onSelect(student)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left min-h-[72px] active:scale-[0.98] ${
                activeStudent?.id === student.id
                  ? 'border-indigo-400 bg-indigo-50 shadow-sm'
                  : 'border-slate-200 bg-white active:border-indigo-300'
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-2xl font-bold shrink-0">
                {student.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xl font-bold text-slate-800 truncate">{student.name}</p>
                <p className="text-sm text-slate-500">Grade {student.gradeLevel}</p>
              </div>
              <div>
                {student.assessmentComplete ? (
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-semibold">
                    Ready
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full text-sm font-semibold">
                    New
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Add student form */}
      {showAddForm ? (
        <form onSubmit={handleAdd} className="bg-white rounded-2xl border-2 border-dashed border-indigo-300 p-6 space-y-4">
          <h3 className="text-lg font-bold text-indigo-600">Add a Student</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Student's first name"
            required
            autoFocus
            className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-indigo-400 focus:outline-none text-lg min-h-[48px]"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-3.5 rounded-xl text-lg font-bold active:bg-indigo-700 transition-colors min-h-[48px]"
            >
              Add Student
            </button>
            {students.length > 0 && (
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-3.5 rounded-xl text-slate-500 active:bg-slate-100 font-semibold transition-colors min-h-[48px]"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-300 text-slate-500 active:border-indigo-300 active:text-indigo-500 text-lg font-semibold transition-colors min-h-[52px]"
        >
          + Add Another Student
        </button>
      )}
    </div>
  );
}
