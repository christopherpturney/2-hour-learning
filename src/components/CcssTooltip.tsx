import { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

const gradeLabels: Record<string, string> = {
  K: 'Kindergarten',
  '1': 'Grade 1',
  '2': 'Grade 2',
  '3': 'Grade 3',
  '4': 'Grade 4',
  '5': 'Grade 5',
};

const domainLabels: Record<string, string> = {
  OA: 'Operations & Algebraic Thinking',
  NBT: 'Number & Operations in Base Ten',
  MD: 'Measurement & Data',
  G: 'Geometry',
  NF: 'Number & Operations—Fractions',
  RP: 'Ratios & Proportional Relationships',
  NS: 'The Number System',
  EE: 'Expressions & Equations',
  SP: 'Statistics & Probability',
};

const clusterLabels: Record<string, Record<string, string>> = {
  OA: {
    A: 'Represent and solve problems involving addition and subtraction',
    B: 'Understand and apply properties of operations',
    C: 'Add and subtract within 20',
    D: 'Work with addition and subtraction equations',
  },
  NBT: {
    A: 'Extend the counting sequence',
    B: 'Understand place value',
    C: 'Use place value understanding and properties of operations',
  },
  MD: {
    A: 'Measure lengths indirectly and by iterating length units',
    B: 'Tell and write time',
    C: 'Represent and interpret data',
  },
  G: {
    A: 'Reason with shapes and their attributes',
  },
};

const standardDescriptions: Record<string, string> = {
  'K.OA.A.5': 'Fluently add and subtract within 5',
  '1.OA.A.1': 'Use addition and subtraction within 20 to solve word problems',
  '1.OA.A.2': 'Solve word problems that call for addition of three whole numbers whose sum is less than or equal to 20',
  '1.OA.B.3': 'Apply properties of operations as strategies to add and subtract',
  '1.OA.B.4': 'Understand subtraction as an unknown-addend problem',
  '1.OA.C.5': 'Relate counting to addition and subtraction',
  '1.OA.C.6': 'Add and subtract within 20',
  '1.OA.D.7': 'Understand the meaning of the equal sign',
  '1.OA.D.8': 'Determine the unknown whole number in an addition or subtraction equation',
  '1.NBT.A.1': 'Count to 120, starting at any number less than 120',
  '1.NBT.B.2': 'Understand that the two digits of a two-digit number represent amounts of tens and ones',
  '1.NBT.B.3': 'Compare two two-digit numbers based on meanings of the tens and ones digits',
  '1.NBT.C.4': 'Add within 100 using concrete models or drawings and strategies based on place value',
  '1.NBT.C.5': 'Given a two-digit number, mentally find 10 more or 10 less',
  '1.NBT.C.6': 'Subtract multiples of 10 in the range 10–90 from multiples of 10',
  '1.MD.A.1': 'Order three objects by length; compare the lengths of two objects indirectly',
  '1.MD.A.2': 'Express the length of an object as a whole number of length units',
  '1.MD.B.3': 'Tell and write time in hours and half-hours using analog and digital clocks',
  '1.MD.C.4': 'Organize, represent, and interpret data with up to three categories',
  '1.G.A.1': 'Distinguish between defining attributes versus non-defining attributes; build and draw shapes',
  '1.G.A.2': 'Compose two-dimensional shapes or three-dimensional shapes to create a composite shape',
  '1.G.A.3': 'Partition circles and rectangles into two and four equal shares',
  // 2nd grade
  '2.OA.A.1': 'Use addition and subtraction within 100 to solve one- and two-step word problems',
  '2.OA.B.2': 'Fluently add and subtract within 20 using mental strategies',
  '2.NBT.A.1': 'Understand that the three digits of a three-digit number represent hundreds, tens, and ones',
  '2.NBT.B.5': 'Fluently add and subtract within 100 using strategies based on place value',
  '2.MD.C.7': 'Tell and write time from analog and digital clocks to the nearest five minutes',
  '2.G.A.1': 'Recognize and draw shapes having specified attributes',
};

interface CcssTooltipProps {
  code: string;
  className?: string;
}

export default function CcssTooltip({ code, className = '' }: CcssTooltipProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const show = useCallback(() => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({
        top: rect.top + window.scrollY,
        left: rect.left + rect.width / 2,
      });
    }
    setOpen(true);
  }, []);

  const hide = useCallback(() => setOpen(false), []);

  // Parse code like "1.OA.C.6" or "K.OA.A.5"
  const parts = code.split('.');
  if (parts.length < 4) {
    return <span className={`font-mono ${className}`}>{code}</span>;
  }

  const [grade, domain, cluster, standard] = parts;

  const gradeLabel = gradeLabels[grade] || `Grade ${grade}`;
  const domainLabel = domainLabels[domain] || domain;
  const clusterLabel = clusterLabels[domain]?.[cluster] || `Cluster ${cluster}`;
  const standardDesc = standardDescriptions[code] || `Standard ${standard}`;

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onMouseEnter={show}
        onMouseLeave={hide}
        onClick={() => (open ? hide() : show())}
        className={`font-mono underline decoration-dotted decoration-gray-400 underline-offset-2 cursor-help ${className}`}
      >
        {code}
      </button>

      {open &&
        pos &&
        createPortal(
          <div
            className="fixed z-[9999] w-72 bg-gray-900 text-white text-xs rounded-lg shadow-lg p-3 pointer-events-none"
            style={{
              top: pos.top - 8,
              left: pos.left,
              transform: 'translate(-50%, -100%)',
            }}
          >
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-gray-900" />

            <p className="font-semibold text-gray-100 mb-2">{code}</p>

            <div className="space-y-1.5">
              <div>
                <span className="text-gray-400 font-medium">{grade}</span>
                <span className="text-gray-500 mx-1">=</span>
                <span>{gradeLabel}</span>
              </div>
              <div>
                <span className="text-gray-400 font-medium">{domain}</span>
                <span className="text-gray-500 mx-1">=</span>
                <span>{domainLabel}</span>
              </div>
              <div>
                <span className="text-gray-400 font-medium">{cluster}</span>
                <span className="text-gray-500 mx-1">=</span>
                <span>{clusterLabel}</span>
              </div>
              <div>
                <span className="text-gray-400 font-medium">{standard}</span>
                <span className="text-gray-500 mx-1">=</span>
                <span>Standard #{standard}</span>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-gray-700">
              <p className="text-gray-300 leading-relaxed">{standardDesc}</p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
