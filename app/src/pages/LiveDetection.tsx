import { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import Waveform from '../components/Waveform';
import { analyzeAudio } from '../services/detectionService';
import type { AnalysisPhase } from '../types';
import {
  Mic,
  Square,
  Loader2,
  Activity,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  AlertTriangle,
  FlaskConical,
} from 'lucide-react';

const phaseLabels: Record<AnalysisPhase, string> = {
  idle: 'Ready to analyze',
  listening: 'Listening...',
  analyzing: 'Analyzing voice characteristics...',
  complete: 'Detection complete',
};

export default function LiveDetection() {
  const { demoOutcome, setLastResult, navigate, addHistoryEntry } = useApp();
  const [phase, setPhase] = useState<AnalysisPhase>('idle');
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (phase === 'listening') {
      timerRef.current = setInterval(() => {
        setElapsed((e) => e + 0.1);
      }, 100);
    } else if (phase === 'analyzing') {
      timerRef.current = setInterval(() => {
        setElapsed((e) => e + 0.1);
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  const handleStart = () => {
    if (phase !== 'idle' && phase !== 'complete') return;
    setElapsed(0);
    setPhase('listening');

    setTimeout(() => {
      setPhase('analyzing');
      setTimeout(() => {
        const result = analyzeAudio(
          demoOutcome,
          'Live Voice Analysis',
          elapsed || 8.0,
        );
        setLastResult(result);
        addHistoryEntry(result);
        setPhase('complete');
      }, 2500);
    }, 3000);
  };

  const handleReset = () => {
    setPhase('idle');
    setElapsed(0);
  };

  const isActive = phase === 'listening' || phase === 'analyzing';
  const isComplete = phase === 'complete';
  const result = useApp().lastResult;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Demo mode indicator */}
      <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
        <FlaskConical className="w-4 h-4 text-amber-400" />
        <span className="text-sm text-amber-400 font-medium">
          Demo Mode: Next analysis will simulate{' '}
          <span className="font-bold">
            {demoOutcome === 'genuine' ? 'GENUINE' : 'AI-GENERATED'}
          </span>{' '}
          voice
        </span>
      </div>

      {/* Main detection card */}
      <div className="glass scan-line-container p-6 lg:p-10 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative flex flex-col items-center">
          {/* Phase label */}
          <div className="flex items-center gap-2 mb-8">
            <Activity
              className={`w-5 h-5 ${isActive ? 'text-cyan-400 animate-pulse' : 'text-slate-500'}`}
            />
            <span
              className={`text-lg font-semibold uppercase tracking-wider ${
                isActive ? 'text-cyan-400 glow-text' : 'text-slate-400'
              }`}
            >
              {phaseLabels[phase]}
            </span>
          </div>

          {/* Mic button */}
          <button
            onClick={handleStart}
            disabled={isActive}
            className={`relative w-36 h-36 rounded-full flex items-center justify-center transition-all duration-500 ${
              isActive
                ? 'bg-gradient-to-br from-red-500/30 to-red-600/20 border-2 border-red-500/40 glow-red'
                : 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-2 border-cyan-500/40 hover:border-cyan-400/60 hover:scale-105 glow-cyan cursor-pointer'
            }`}
          >
            {isActive && (
              <>
                <span className="absolute inset-0 rounded-full border-2 border-red-500/30 animate-ping" />
                <span
                  className="absolute -inset-4 rounded-full border border-red-500/20 animate-ping"
                  style={{ animationDuration: '2s' }}
                />
              </>
            )}
            {isActive ? (
              <Square className="w-12 h-12 text-red-400 fill-red-400/30" />
            ) : (
              <Mic className="w-12 h-12 text-cyan-400" />
            )}
          </button>

          {/* Timer */}
          <div className="mt-6 font-mono text-2xl text-slate-300">
            {elapsed.toFixed(1)}s
          </div>

          {/* Start button */}
          {!isActive && !isComplete && (
            <button
              onClick={handleStart}
              className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
            >
              Start Voice Analysis
            </button>
          )}

          {isActive && (
            <p className="mt-6 text-sm text-slate-400 animate-pulse">
              {phase === 'listening'
                ? 'Recording audio sample...'
                : 'Running spectral analysis and voice pattern detection...'}
            </p>
          )}

          {/* Waveform */}
          <div className="w-full mt-8">
            <Waveform
              active={isActive}
              bars={56}
              color={phase === 'analyzing' ? 'red' : 'cyan'}
              className="h-28"
            />
          </div>

          {/* Loading bar during analysis */}
          {phase === 'analyzing' && (
            <div className="w-full max-w-md mt-4">
              <div className="h-1.5 rounded-full bg-navy-700 overflow-hidden">
                <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-shimmer"
                  style={{
                    backgroundSize: '200% 100%',
                    backgroundImage:
                      'linear-gradient(90deg, transparent, #22d3ee, transparent)',
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick result preview */}
      {isComplete && result && (
        <div
          className={`glass p-6 animate-slide-up border-2 ${
            result.classification === 'Genuine'
              ? 'border-emerald-500/30'
              : 'border-red-500/30'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                result.classification === 'Genuine'
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-red-500/10 text-red-400'
              }`}
            >
              {result.classification === 'Genuine' ? (
                <ShieldCheck className="w-7 h-7" />
              ) : (
                <ShieldAlert className="w-7 h-7" />
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm text-slate-400">Detection complete</p>
              <p
                className={`text-xl font-bold ${
                  result.classification === 'Genuine'
                    ? 'text-emerald-400'
                    : 'text-red-400'
                }`}
              >
                {result.classification} Voice — {result.confidence}% confidence
              </p>
            </div>
            <button
              onClick={() => navigate('result')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-medium hover:bg-cyan-500/20 transition-all"
            >
              View Full Result
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {result.classification === 'AI-Generated' && (
            <div className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-400">
                  WARNING: AI-generated speech detected
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  This voice shows strong indicators of synthetic generation.
                  Do not trust the caller's identity. Verify through a trusted
                  secondary channel.
                </p>
              </div>
            </div>
          )}

          <button
            onClick={handleReset}
            className="mt-4 w-full py-2.5 rounded-xl bg-navy-700/50 text-slate-400 hover:text-slate-200 hover:bg-navy-700 transition-colors text-sm font-medium"
          >
            Run Another Analysis
          </button>
        </div>
      )}

      {!isComplete && (
        <div className="glass p-5">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">
            How it works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { step: '1', title: 'Capture', desc: 'Microphone captures live audio stream' },
              { step: '2', title: 'Analyze', desc: 'Spectral analysis & pattern detection' },
              { step: '3', title: 'Classify', desc: 'Genuine or AI-generated classification' },
            ].map((s) => (
              <div
                key={s.step}
                className="p-3 rounded-xl bg-navy-800/40 border border-cyan-500/10"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center">
                    {s.step}
                  </span>
                  <span className="text-sm font-semibold text-slate-200">{s.title}</span>
                </div>
                <p className="text-xs text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
