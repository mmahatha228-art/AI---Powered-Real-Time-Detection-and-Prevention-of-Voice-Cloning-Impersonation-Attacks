import type { DetectionIndicator } from '../types';

interface IndicatorBarProps {
  indicator: DetectionIndicator;
}

export default function IndicatorBar({ indicator }: IndicatorBarProps) {
  const isHigh = indicator.value >= 70;
  const isMedium = indicator.value >= 40 && indicator.value < 70;
  const color = isHigh
    ? 'from-red-600 to-red-400'
    : isMedium
      ? 'from-amber-600 to-amber-400'
      : 'from-emerald-600 to-emerald-400';
  const textColor = isHigh
    ? 'text-red-400'
    : isMedium
      ? 'text-amber-400'
      : 'text-emerald-400';

  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-slate-300">
          {indicator.label}
        </span>
        <span className={`text-sm font-mono font-semibold ${textColor}`}>
          {indicator.value}%
        </span>
      </div>
      <div className="h-2 rounded-full bg-navy-700 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
          style={{
            width: `${indicator.value}%`,
            boxShadow: isHigh ? '0 0 8px rgba(248,113,113,0.4)' : 'none',
          }}
        />
      </div>
      <p className="text-xs text-slate-500 mt-1.5">{indicator.description}</p>
    </div>
  );
}
