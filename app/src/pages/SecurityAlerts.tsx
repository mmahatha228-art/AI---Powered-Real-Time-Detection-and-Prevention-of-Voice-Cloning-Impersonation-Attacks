import { useApp } from '../context/AppContext';
import { RiskBadge } from '../components/Badges';
import {
  Bell,
  ShieldAlert,
  AlertTriangle,
  Info,
  CheckCircle2,
  Clock,
  Shield,
} from 'lucide-react';
import type { RiskLevel } from '../types';

function formatTime(ts: string) {
  return new Date(ts).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const severityConfig: Record<
  RiskLevel,
  { icon: typeof ShieldAlert; color: string; bg: string; border: string }
> = {
  HIGH: {
    icon: ShieldAlert,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
  },
  MEDIUM: {
    icon: AlertTriangle,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
  },
  LOW: {
    icon: Info,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
  },
};

export default function SecurityAlerts() {
  const { alerts, acknowledgeAlert } = useApp();
  const sorted = [...alerts].sort((a, b) => {
    if (a.acknowledged !== b.acknowledged) return a.acknowledged ? 1 : -1;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const unackCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center relative">
            <Bell className="w-5 h-5 text-red-400" />
            {unackCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {unackCount}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Security Alerts</h1>
            <p className="text-sm text-slate-500">
              Suspicious voice detection incidents and recommended actions
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 rounded-xl bg-navy-800/50 border border-cyan-500/10 text-center">
            <p className="text-2xl font-bold text-red-400 font-mono">
              {alerts.filter((a) => a.severity === 'HIGH').length}
            </p>
            <p className="text-xs text-slate-500">High severity</p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-navy-800/50 border border-cyan-500/10 text-center">
            <p className="text-2xl font-bold text-amber-400 font-mono">
              {alerts.filter((a) => a.severity === 'MEDIUM').length}
            </p>
            <p className="text-xs text-slate-500">Medium</p>
          </div>
        </div>
      </div>

      {/* Alert cards */}
      <div className="space-y-4">
        {sorted.map((alert) => {
          const cfg = severityConfig[alert.severity];
          const Icon = cfg.icon;
          return (
            <div
              key={alert.id}
              className={`glass p-5 border ${cfg.border} ${
                alert.acknowledged ? 'opacity-60' : ''
              } transition-all`}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Severity icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0`}
                >
                  <Icon className={`w-6 h-6 ${cfg.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Title row */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-base font-semibold text-white">
                      {alert.detectionType}
                    </h3>
                    <RiskBadge level={alert.severity} />
                    {alert.acknowledged && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium bg-slate-500/10 text-slate-400 border border-slate-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        Acknowledged
                      </span>
                    )}
                  </div>

                  {/* Timestamp */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    {formatTime(alert.timestamp)}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-300 mb-3">
                    {alert.description}
                  </p>

                  {/* Recommended action */}
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-navy-800/40 border border-cyan-500/10">
                    <Shield className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-0.5">
                        Recommended Action
                      </p>
                      <p className="text-sm text-slate-300">
                        {alert.recommendedAction}
                      </p>
                    </div>
                  </div>

                  {/* Acknowledge button */}
                  {!alert.acknowledged && (
                    <button
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="mt-3 px-4 py-2 rounded-lg bg-navy-700/50 text-slate-300 text-sm font-medium hover:bg-cyan-500/10 hover:text-cyan-400 transition-all border border-transparent hover:border-cyan-500/20"
                    >
                      Acknowledge Alert
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
