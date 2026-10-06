import { useApp, type DemoOutcome } from '../context/AppContext';
import type { PageId } from '../types';
import {
  LayoutDashboard,
  Mic,
  Upload,
  FileSearch,
  History,
  Bell,
  ShieldCheck,
  FlaskConical,
  CircleDot,
} from 'lucide-react';

interface NavItem {
  id: PageId;
  label: string;
  icon: typeof LayoutDashboard;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'live', label: 'Live Detection', icon: Mic },
  { id: 'upload', label: 'Upload Audio', icon: Upload },
  { id: 'result', label: 'Detection Result', icon: FileSearch },
  { id: 'history', label: 'Detection History', icon: History },
  { id: 'alerts', label: 'Security Alerts', icon: Bell },
];

export default function Sidebar() {
  const { currentPage, navigate, alerts } = useApp();
  const unackCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-cyan-500/10 bg-navy-900/50 backdrop-blur-xl h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-cyan-500/10">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center glow-cyan">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight">
            Voice<span className="text-cyan-400">Guard</span>
          </h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">
            AI Voice Defense
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = currentPage === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                active
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-navy-800/50'
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-cyan-400" />
              )}
              <Icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
              {item.id === 'alerts' && unackCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {unackCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Demo badge */}
      <div className="px-4 py-4 border-t border-cyan-500/10">
        <div className="glass p-3 flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-amber-400">
              Prototype / Research Demo
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Simulated detection — no live ML model
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const { currentPage, navigate } = useApp();
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-navy-900/90 backdrop-blur-xl border-t border-cyan-500/10 flex justify-around px-2 py-2">
      {navItems.map((item) => {
        const active = currentPage === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg transition-colors ${
              active ? 'text-cyan-400' : 'text-slate-500'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[9px] font-medium">{item.label.split(' ')[0]}</span>
          </button>
        );
      })}
    </nav>
  );
}

export function TopBar() {
  const { demoOutcome, setDemoOutcome, alerts } = useApp();
  const unackCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <header className="sticky top-0 z-40 bg-navy-950/80 backdrop-blur-xl border-b border-cyan-500/10">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5">
        {/* Mobile logo */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="text-base font-bold text-white">
            Voice<span className="text-cyan-400">Guard</span>
          </span>
        </div>

        {/* Status */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="text-sm font-medium text-emerald-400">
            Protection Active
          </span>
        </div>

        {/* Demo mode control */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy-800/60 border border-cyan-500/15">
            <CircleDot className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-slate-400 hidden sm:inline">Demo:</span>
            <div className="flex gap-1">
              {(
                [
                  ['genuine', 'Genuine'],
                  ['synthetic', 'AI-Generated'],
                ] as [DemoOutcome, string][]
              ).map(([val, lbl]) => (
                <button
                  key={val}
                  onClick={() => setDemoOutcome(val)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    demoOutcome === val
                      ? val === 'genuine'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-red-500/20 text-red-400'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </div>

          {unackCount > 0 && (
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20">
              <span className="text-xs font-bold text-red-400">{unackCount}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
