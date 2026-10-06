import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent?: 'cyan' | 'emerald' | 'red' | 'amber' | 'blue';
  sublabel?: string;
  children?: ReactNode;
}

const accentMap = {
  cyan: {
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    glow: 'shadow-cyan-500/10',
  },
  emerald: {
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    glow: 'shadow-emerald-500/10',
  },
  red: {
    text: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    glow: 'shadow-red-500/10',
  },
  amber: {
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    glow: 'shadow-amber-500/10',
  },
  blue: {
    text: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    glow: 'shadow-blue-500/10',
  },
};

export default function StatCard({
  label,
  value,
  icon: Icon,
  accent = 'cyan',
  sublabel,
  children,
}: StatCardProps) {
  const a = accentMap[accent];
  return (
    <div
      className={`glass-hover p-5 group hover:shadow-lg ${a.glow}`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-slate-400 font-medium">{label}</span>
        <div
          className={`w-10 h-10 rounded-xl ${a.bg} ${a.border} border flex items-center justify-center ${a.text}`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className={`text-3xl font-bold ${a.text} font-mono tracking-tight`}>
        {value}
      </div>
      {sublabel && (
        <div className="text-xs text-slate-500 mt-1">{sublabel}</div>
      )}
      {children}
    </div>
  );
}
