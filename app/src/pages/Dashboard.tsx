import { useApp } from '../context/AppContext';
import StatCard from '../components/StatCard';
import Waveform from '../components/Waveform';
import { RiskBadge, StatusBadge } from '../components/Badges';
import {
  Activity,
  ShieldCheck,
  ShieldAlert,
  AudioLines,
  Bell,
  Mic,
  TrendingUp,
  Zap,
} from 'lucide-react';

function formatTime(ts: string) {
  const d = new Date(ts);
  return d.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function Dashboard() {
  const { navigate, stats, history, alerts } = useApp();
  const recentEvents = history.slice(0, 5);
  const recentAlerts = alerts.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Hero monitoring card */}
      <div className="glass scan-line-container p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-400 uppercase tracking-wider">
                Real-Time Voice Monitoring
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              System actively scanning for{' '}
              <span className="gradient-text">voice cloning threats</span>
            </h2>
            <p className="text-slate-400 text-sm mb-6 max-w-lg">
              VoiceGuard continuously analyzes incoming audio streams using
              spectral analysis and synthetic voice detection to identify
              AI-generated impersonation attempts in real time.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-xs text-slate-500">Detection Status</p>
                  <p className="text-sm font-semibold text-emerald-400">
                    Protection Active
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <Zap className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-xs text-slate-500">Authenticity Score</p>
                  <p className="text-sm font-semibold text-cyan-400">
                    96.2% — Verified
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <TrendingUp className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="text-xs text-slate-500">Current Risk Level</p>
                  <p className="text-sm font-semibold text-amber-400">LOW</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto">
            <div className="glass p-4 rounded-2xl">
              <Waveform active={true} bars={32} />
              <p className="text-center text-xs text-slate-500 mt-2 uppercase tracking-widest">
                Live Audio Stream
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Voices Analyzed"
          value={stats.totalAnalyzed.toLocaleString()}
          icon={AudioLines}
          accent="cyan"
          sublabel="All-time session count"
        />
        <StatCard
          label="Genuine Voices Detected"
          value={stats.genuineDetected.toLocaleString()}
          icon={ShieldCheck}
          accent="emerald"
          sublabel="Verified authentic"
        />
        <StatCard
          label="Suspicious Voices Detected"
          value={stats.suspiciousDetected.toLocaleString()}
          icon={ShieldAlert}
          accent="red"
          sublabel="Flagged as AI-generated"
        />
        <StatCard
          label="Threats Blocked"
          value={stats.threatsBlocked}
          icon={Zap}
          accent="amber"
          sublabel="Impersonation attempts stopped"
        />
      </div>

      {/* Two column section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent detection events */}
        <div className="glass p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Mic className="w-5 h-5 text-cyan-400" />
              Recent Detection Events
            </h3>
            <button
              onClick={() => navigate('history')}
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              View all
            </button>
          </div>
          <div className="space-y-2">
            {recentEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 rounded-xl bg-navy-800/40 hover:bg-navy-800/60 transition-colors border border-transparent hover:border-cyan-500/10"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      event.status === 'Authentic'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-red-500/10 text-red-400'
                    }`}
                  >
                    {event.status === 'Authentic' ? (
                      <ShieldCheck className="w-4.5 h-4.5" />
                    ) : (
                      <ShieldAlert className="w-4.5 h-4.5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-200 truncate">
                      {event.source}
                    </p>
                    <p className="text-xs text-slate-500">{formatTime(event.timestamp)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-mono font-semibold text-slate-300">
                    {event.confidence}%
                  </span>
                  <RiskBadge level={event.riskLevel} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security alerts */}
        <div className="glass p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-red-400" />
              Security Alerts
            </h3>
            <button
              onClick={() => navigate('alerts')}
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              View all
            </button>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-xl border ${
                  alert.severity === 'HIGH'
                    ? 'bg-red-500/5 border-red-500/20'
                    : alert.severity === 'MEDIUM'
                      ? 'bg-amber-500/5 border-amber-500/20'
                      : 'bg-emerald-500/5 border-emerald-500/20'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-sm font-semibold text-slate-200">
                    {alert.detectionType}
                  </span>
                  <RiskBadge level={alert.severity} />
                </div>
                <p className="text-xs text-slate-500">{formatTime(alert.timestamp)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
