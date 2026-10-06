import { useEffect, useRef, useState } from 'react';

interface WaveformProps {
  active: boolean;
  bars?: number;
  color?: 'cyan' | 'red' | 'green';
  className?: string;
}

const colorMap = {
  cyan: 'bg-gradient-to-t from-cyan-600 to-cyan-400',
  red: 'bg-gradient-to-t from-red-600 to-red-400',
  green: 'bg-gradient-to-t from-emerald-600 to-emerald-400',
};

export default function Waveform({
  active,
  bars = 48,
  color = 'cyan',
  className = '',
}: WaveformProps) {
  const [heights, setHeights] = useState<number[]>(() =>
    Array.from({ length: bars }, () => 20),
  );
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) {
      setHeights(Array.from({ length: bars }, () => 15));
      return;
    }

    let frame = 0;
    const animate = () => {
      setHeights(
        Array.from({ length: bars }, (_, i) => {
          const t = frame * 0.08 + i * 0.4;
          const base = Math.sin(t) * 25 + Math.sin(t * 2.3) * 15 + Math.sin(t * 0.7) * 10;
          return Math.max(8, Math.min(100, 50 + base));
        }),
      );
      frame++;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, bars]);

  return (
    <div className={`flex items-center justify-center gap-[3px] h-32 ${className}`}>
      {heights.map((h, i) => (
        <div
          key={i}
          className={`w-[4px] rounded-full transition-all duration-75 ${colorMap[color]}`}
          style={{
            height: `${h}%`,
            opacity: active ? 0.9 : 0.3,
            boxShadow: active ? '0 0 8px currentColor' : 'none',
          }}
        />
      ))}
    </div>
  );
}
