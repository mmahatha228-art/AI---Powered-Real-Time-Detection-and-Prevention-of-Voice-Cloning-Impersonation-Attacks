import type { Classification, RiskLevel } from '../types';
import { Shield, ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';

export function RiskBadge({ level }: { level: RiskLevel }) {
  const config = {
    LOW: {
      cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      icon: ShieldCheck,
    },
    MEDIUM: {
      cls: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      icon: AlertTriangle,
    },
    HIGH: {
      cls: 'bg-red-500/10 text-red-400 border-red-500/30',
      icon: ShieldAlert,
    },
  };
  const { cls, icon: Icon } = config[level];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${cls}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {level} RISK
    </span>
  );
}

export function ClassificationBadge({
  classification,
}: {
  classification: Classification;
}) {
  const isGenuine = classification === 'Genuine';
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${
        isGenuine
          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
          : 'bg-red-500/10 text-red-400 border-red-500/30'
      }`}
    >
      {isGenuine ? (
        <ShieldCheck className="w-3.5 h-3.5" />
      ) : (
        <ShieldAlert className="w-3.5 h-3.5" />
      )}
      {classification}
    </span>
  );
}

export function StatusBadge({
  status,
}: {
  status: 'Authentic' | 'Suspicious';
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${
        status === 'Authentic'
          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
          : 'bg-red-500/10 text-red-400 border-red-500/30'
      }`}
    >
      <Shield className="w-3.5 h-3.5" />
      {status}
    </span>
  );
}
