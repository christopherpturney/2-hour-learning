/**
 * SVG icon components for word problem objects.
 * Each icon is designed to be simple, recognizable, and child-friendly.
 * All icons render at a consistent viewBox of 32x32.
 */

interface IconProps {
  size?: number;
  className?: string;
}

function Apple({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M16 8c-6 0-10 5-10 12 0 5 3 8 6 8s3-1 4-1 1 1 4 1 6-3 6-8c0-7-4-12-10-12z" fill="#ef4444" />
      <path d="M16 4c0 0 1 0 2 1s1 3 1 3" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M14 9c-1-2-3-3-5-2" stroke="#16a34a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Book({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="5" y="4" width="22" height="24" rx="2" fill="#3b82f6" />
      <rect x="8" y="4" width="19" height="24" rx="1" fill="#93c5fd" />
      <line x1="11" y1="10" x2="24" y2="10" stroke="#1e40af" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="14" x2="22" y2="14" stroke="#1e40af" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="18" x2="20" y2="18" stroke="#1e40af" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Sticker({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M16 4 L20 12 L28 13 L22 19 L24 28 L16 24 L8 28 L10 19 L4 13 L12 12 Z" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />
    </svg>
  );
}

function Crayon({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="10" y="8" width="12" height="18" rx="1" fill="#8b5cf6" />
      <polygon points="10,8 16,2 22,8" fill="#a78bfa" />
      <rect x="10" y="20" width="12" height="6" rx="1" fill="#7c3aed" />
      <line x1="14" y1="22" x2="14" y2="25" stroke="#6d28d9" strokeWidth="1" strokeLinecap="round" />
      <line x1="18" y1="22" x2="18" y2="25" stroke="#6d28d9" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function ToyCar({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M4 18 L7 12 L12 10 L22 10 L26 14 L28 18Z" fill="#ef4444" />
      <rect x="3" y="18" width="26" height="5" rx="2" fill="#dc2626" />
      <circle cx="9" cy="24" r="3" fill="#374151" />
      <circle cx="9" cy="24" r="1.5" fill="#9ca3af" />
      <circle cx="23" cy="24" r="3" fill="#374151" />
      <circle cx="23" cy="24" r="1.5" fill="#9ca3af" />
      <rect x="13" y="11" width="5" height="5" rx="1" fill="#bfdbfe" />
    </svg>
  );
}

function Cookie({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="12" fill="#d97706" />
      <circle cx="12" cy="12" r="2" fill="#78350f" />
      <circle cx="19" cy="10" r="1.5" fill="#78350f" />
      <circle cx="14" cy="19" r="2" fill="#78350f" />
      <circle cx="20" cy="17" r="1.5" fill="#78350f" />
      <circle cx="10" cy="16" r="1" fill="#78350f" />
      <circle cx="17" cy="22" r="1.5" fill="#78350f" />
    </svg>
  );
}

function Marble({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="12" fill="#6366f1" />
      <path d="M10 10 Q16 6 22 14" stroke="#818cf8" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="12" cy="11" r="3" fill="#a5b4fc" opacity="0.5" />
    </svg>
  );
}

function Pencil({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="8" y="6" width="10" height="20" rx="1" fill="#fbbf24" />
      <polygon points="8,26 13,32 18,26" fill="#fde68a" />
      <polygon points="11,30 13,32 15,30" fill="#374151" />
      <rect x="8" y="6" width="10" height="3" fill="#f59e0b" />
      <rect x="10" y="4" width="6" height="3" rx="1" fill="#ec4899" />
    </svg>
  );
}

function Flower({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <line x1="16" y1="18" x2="16" y2="30" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="16" cy="10" r="4" fill="#ec4899" />
      <circle cx="10" cy="14" r="4" fill="#f472b6" />
      <circle cx="22" cy="14" r="4" fill="#f472b6" />
      <circle cx="12" cy="8" r="4" fill="#fb7185" />
      <circle cx="20" cy="8" r="4" fill="#fb7185" />
      <circle cx="16" cy="12" r="3" fill="#fbbf24" />
    </svg>
  );
}

function Star({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M16 4 L19 12 L28 13 L22 19 L23 28 L16 24 L9 28 L10 19 L4 13 L13 12 Z" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />
    </svg>
  );
}

function Block({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="4" y="8" width="20" height="20" rx="3" fill="#3b82f6" />
      <rect x="8" y="4" width="20" height="20" rx="3" fill="#60a5fa" />
      <line x1="12" y1="8" x2="24" y2="8" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Balloon({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <ellipse cx="16" cy="13" rx="9" ry="11" fill="#ef4444" />
      <polygon points="14,23 16,26 18,23" fill="#dc2626" />
      <path d="M16 26 Q14 28 16 30 Q18 28 16 26" stroke="#9ca3af" strokeWidth="1" fill="none" />
      <ellipse cx="13" cy="10" rx="2" ry="3" fill="#fca5a5" opacity="0.5" />
    </svg>
  );
}

function Fish({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <ellipse cx="16" cy="16" rx="10" ry="7" fill="#f97316" />
      <polygon points="26,16 32,10 32,22" fill="#f97316" />
      <circle cx="10" cy="14" r="2" fill="white" />
      <circle cx="10" cy="14" r="1" fill="#1e293b" />
      <path d="M14 18 Q16 20 18 18" stroke="#ea580c" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Button({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="12" fill="#ec4899" />
      <circle cx="16" cy="16" r="9" fill="none" stroke="#db2777" strokeWidth="1.5" />
      <circle cx="12" cy="13" r="1.5" fill="#831843" />
      <circle cx="20" cy="13" r="1.5" fill="#831843" />
      <circle cx="12" cy="19" r="1.5" fill="#831843" />
      <circle cx="20" cy="19" r="1.5" fill="#831843" />
    </svg>
  );
}

function Shell({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M4 24 Q4 10 16 6 Q28 10 28 24 Z" fill="#fcd34d" />
      <path d="M8 22 Q8 14 16 10" stroke="#d97706" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M12 23 Q12 16 16 12" stroke="#d97706" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M16 24 L16 8" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 23 Q20 16 16 12" stroke="#d97706" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M24 22 Q24 14 16 10" stroke="#d97706" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ---- Data / Pictograph category icons ----

function Banana({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M8 6 Q4 16 10 26 Q14 30 20 26 Q14 20 12 10 Q11 6 8 6Z" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />
    </svg>
  );
}

function Orange({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="17" r="11" fill="#f97316" />
      <path d="M15 6 Q16 4 17 6" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="13" cy="15" r="1" fill="#fb923c" opacity="0.6" />
    </svg>
  );
}

function Dog({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <ellipse cx="16" cy="20" rx="8" ry="8" fill="#d97706" />
      <circle cx="16" cy="12" r="7" fill="#f59e0b" />
      <path d="M9 7 L6 2 L10 8" fill="#d97706" />
      <path d="M23 7 L26 2 L22 8" fill="#d97706" />
      <circle cx="13" cy="11" r="1.5" fill="#1e293b" />
      <circle cx="19" cy="11" r="1.5" fill="#1e293b" />
      <ellipse cx="16" cy="14" rx="2.5" ry="2" fill="#1e293b" />
      <path d="M14 17 Q16 19 18 17" stroke="#92400e" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Cat({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="18" r="10" fill="#9ca3af" />
      <circle cx="16" cy="13" r="8" fill="#d1d5db" />
      <polygon points="9,8 6,1 12,6" fill="#d1d5db" />
      <polygon points="23,8 26,1 20,6" fill="#d1d5db" />
      <circle cx="13" cy="12" r="1.5" fill="#16a34a" />
      <circle cx="19" cy="12" r="1.5" fill="#16a34a" />
      <ellipse cx="16" cy="15" rx="1.5" ry="1" fill="#f472b6" />
      <line x1="4" y1="14" x2="11" y2="13" stroke="#9ca3af" strokeWidth="0.8" />
      <line x1="4" y1="16" x2="11" y2="15" stroke="#9ca3af" strokeWidth="0.8" />
      <line x1="28" y1="14" x2="21" y2="13" stroke="#9ca3af" strokeWidth="0.8" />
      <line x1="28" y1="16" x2="21" y2="15" stroke="#9ca3af" strokeWidth="0.8" />
    </svg>
  );
}

function Soccer({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="12" fill="white" stroke="#374151" strokeWidth="1.5" />
      <path d="M16 4 L12 10 L20 10 Z" fill="#374151" />
      <path d="M6 14 L10 10 L10 18 Z" fill="#374151" />
      <path d="M26 14 L22 10 L22 18 Z" fill="#374151" />
      <path d="M10 24 L14 20 L18 20 L22 24 L16 28 Z" fill="#374151" />
    </svg>
  );
}

function Basketball({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="12" fill="#f97316" />
      <line x1="4" y1="16" x2="28" y2="16" stroke="#92400e" strokeWidth="1.5" />
      <line x1="16" y1="4" x2="16" y2="28" stroke="#92400e" strokeWidth="1.5" />
      <path d="M6 8 Q16 14 26 8" stroke="#92400e" strokeWidth="1.5" fill="none" />
      <path d="M6 24 Q16 18 26 24" stroke="#92400e" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function Swimming({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="4" fill="#f59e0b" />
      <path d="M14 14 L24 10 L26 14" stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 16 L8 20" stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M4 22 Q8 19 12 22 Q16 25 20 22 Q24 19 28 22" stroke="#3b82f6" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M4 26 Q8 23 12 26 Q16 29 20 26 Q24 23 28 26" stroke="#60a5fa" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Cracker({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="6" y="6" width="20" height="20" rx="3" fill="#f59e0b" />
      <rect x="8" y="8" width="16" height="16" rx="2" fill="#fbbf24" />
      <circle cx="12" cy="12" r="1" fill="#d97706" />
      <circle cx="20" cy="12" r="1" fill="#d97706" />
      <circle cx="12" cy="20" r="1" fill="#d97706" />
      <circle cx="20" cy="20" r="1" fill="#d97706" />
      <circle cx="16" cy="16" r="1" fill="#d97706" />
    </svg>
  );
}

function Fruit({ size = 32, className }: IconProps) {
  // Generic fruit icon — use a grape cluster
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="12" cy="14" r="4" fill="#7c3aed" />
      <circle cx="20" cy="14" r="4" fill="#8b5cf6" />
      <circle cx="16" cy="18" r="4" fill="#7c3aed" />
      <circle cx="12" cy="22" r="4" fill="#8b5cf6" />
      <circle cx="20" cy="22" r="4" fill="#7c3aed" />
      <circle cx="16" cy="26" r="4" fill="#8b5cf6" />
      <path d="M16 10 Q16 6 18 4" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function makeColorDot(color: string): React.FC<IconProps> {
  return function ColorDot({ size = 32, className }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
        <circle cx="16" cy="16" r="12" fill={color} />
        <circle cx="12" cy="12" r="3" fill="white" opacity="0.3" />
      </svg>
    );
  };
}

function SpringIcon({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <line x1="16" y1="18" x2="16" y2="30" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="12" r="4" fill="#f472b6" />
      <circle cx="11" cy="15" r="3.5" fill="#fb7185" />
      <circle cx="21" cy="15" r="3.5" fill="#fb7185" />
      <circle cx="16" cy="13" r="2.5" fill="#fbbf24" />
      <path d="M12 26 Q10 22 7 24" stroke="#16a34a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function SummerIcon({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="7" fill="#fbbf24" />
      <line x1="16" y1="4" x2="16" y2="8" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="24" x2="16" y2="28" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="4" y1="16" x2="8" y2="16" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="24" y1="16" x2="28" y2="16" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="7.5" y1="7.5" x2="10.3" y2="10.3" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="21.7" y1="21.7" x2="24.5" y2="24.5" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="24.5" y1="7.5" x2="21.7" y2="10.3" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="10.3" y1="21.7" x2="7.5" y2="24.5" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function WinterIcon({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <line x1="16" y1="2" x2="16" y2="30" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="16" x2="30" y2="16" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
      <line x1="6" y1="6" x2="26" y2="26" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="6" x2="6" y2="26" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="16" r="3" fill="#93c5fd" />
    </svg>
  );
}

/** Map of object name to its icon component */
const ICON_MAP: Record<string, React.FC<IconProps>> = {
  apples: Apple,
  apple: Apple,
  books: Book,
  book: Book,
  stickers: Sticker,
  sticker: Sticker,
  crayons: Crayon,
  crayon: Crayon,
  'toy cars': ToyCar,
  'toy car': ToyCar,
  cookies: Cookie,
  cookie: Cookie,
  marbles: Marble,
  marble: Marble,
  pencils: Pencil,
  pencil: Pencil,
  flowers: Flower,
  flower: Flower,
  stars: Star,
  star: Star,
  blocks: Block,
  block: Block,
  balloons: Balloon,
  balloon: Balloon,
  fish: Fish,
  buttons: Button,
  button: Button,
  shells: Shell,
  shell: Shell,
  // Data/pictograph categories
  bananas: Banana,
  banana: Banana,
  oranges: Orange,
  orange: Orange,
  dog: Dog,
  dogs: Dog,
  cat: Cat,
  cats: Cat,
  soccer: Soccer,
  basketball: Basketball,
  swimming: Swimming,
  crackers: Cracker,
  cracker: Cracker,
  fruit: Fruit,
  // Color categories — colored circles
  red: makeColorDot('#ef4444'),
  blue: makeColorDot('#3b82f6'),
  green: makeColorDot('#22c55e'),
  // Season categories — simple icons
  spring: SpringIcon,
  summer: SummerIcon,
  winter: WinterIcon,
};

export function getObjectIcon(name: string): React.FC<IconProps> | null {
  return ICON_MAP[name.toLowerCase()] || null;
}

export function ObjectIcon({ name, size = 32, className }: { name: string; size?: number; className?: string }) {
  const Icon = getObjectIcon(name);
  if (!Icon) {
    // Fallback: colored circle
    return (
      <div
        className={`rounded-full ${className || ''}`}
        style={{ width: size, height: size, backgroundColor: '#6366f1' }}
      />
    );
  }
  return <Icon size={size} className={className} />;
}
