interface ScoreGaugeProps {
  score: number; // 0-100
  label: string;
  size?: number;
  color?: 'cyan' | 'emerald' | 'red' | 'amber';
}

const colorMap = {
  cyan: { stroke: '#22d3ee', glow: 'rgba(34,211,238,0.5)' },
  emerald: { stroke: '#34d399', glow: 'rgba(52,211,153,0.5)' },
  red: { stroke: '#f87171', glow: 'rgba(248,113,113,0.5)' },
  amber: { stroke: '#fbbf24', glow: 'rgba(251,191,36,0.5)' },
};

export default function ScoreGauge({
  score,
  label,
  size = 180,
  color = 'cyan',
}: ScoreGaugeProps) {
  const radius = (size - 24) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const c = colorMap[color];

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <defs>
          <linearGradient id={`gauge-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c.stroke} stopOpacity="0.6" />
            <stop offset="100%" stopColor={c.stroke} stopOpacity="1" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#16203d"
          strokeWidth="10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#gauge-${color})`}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 1s ease-out',
            filter: `drop-shadow(0 0 6px ${c.glow})`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-4xl font-bold font-mono"
          style={{ color: c.stroke }}
        >
          {score.toFixed(1)}%
        </span>
        <span className="text-xs text-slate-500 mt-1 uppercase tracking-wider">
          {label}
        </span>
      </div>
    </div>
  );
}
