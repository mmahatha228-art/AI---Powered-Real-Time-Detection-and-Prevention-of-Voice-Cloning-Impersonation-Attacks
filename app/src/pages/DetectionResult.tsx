import { useApp } from '../context/AppContext';
import ScoreGauge from '../components/ScoreGauge';
import IndicatorBar from '../components/IndicatorBar';
import { RiskBadge, ClassificationBadge } from '../components/Badges';
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Lightbulb,
  ArrowLeft,
  Mic,
  FileAudio,
  Clock,
} from 'lucide-react';

export default function DetectionResult() {
  const { lastResult, navigate } = useApp();

  if (!lastResult) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-navy-800/50 border border-cyan-500/10 flex items-center justify-center mb-4">
          <ShieldAlert className="w-8 h-8 text-slate-600" />
        </div>
        <h2 className="text-xl font-semibold text-slate-300 mb-2">
          No detection result available
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Run a voice analysis first to see the detection report here.
        </p>
        <button
          onClick={() => navigate('live')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
        >
          Go to Live Detection
        </button>
      </div>
    );
  }

  const isGenuine = lastResult.classification === 'Genuine';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('dashboard')}
          className="w-10 h-10 rounded-xl bg-navy-800/50 border border-cyan-500/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Detection Report</h1>
          <p className="text-sm text-slate-500">
            Voice analysis result — {new Date(lastResult.timestamp).toLocaleString('en-GB')}
          </p>
        </div>
      </div>

      {/* Main classification banner */}
      <div
        className={`glass p-6 lg:p-8 scan-line-container relative overflow-hidden border-2 ${
          isGenuine ? 'border-emerald-500/30' : 'border-red-500/30'
        }`}
      >
        <div className={`absolute inset-0 grid-bg opacity-20`} />
        <div className="relative flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          {/* Gauge */}
          <ScoreGauge
            score={lastResult.confidence}
            label="Confidence"
            color={isGenuine ? 'emerald' : 'red'}
            size={200}
          />

          {/* Classification info */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  isGenuine
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'bg-red-500/10 text-red-400'
                }`}
              >
                {isGenuine ? (
                  <ShieldCheck className="w-6 h-6" />
                ) : (
                  <ShieldAlert className="w-6 h-6" />
                )}
              </div>
              <h2
                className={`text-2xl lg:text-3xl font-bold ${
                  isGenuine ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {isGenuine ? 'Genuine Voice' : 'AI-Generated Voice'}
              </h2>
            </div>

            <p className="text-slate-400 text-sm mb-4 max-w-md">
              {isGenuine
                ? 'The analyzed audio exhibits natural human speech characteristics with no signs of synthetic generation.'
                : 'The analyzed audio shows strong indicators of AI-generated synthetic speech, consistent with voice cloning technology.'}
            </p>

            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <ClassificationBadge classification={lastResult.classification} />
              <RiskBadge level={lastResult.riskLevel} />
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap gap-4 mt-4 justify-center lg:justify-start">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                {lastResult.source.startsWith('Live') ? (
                  <Mic className="w-3.5 h-3.5" />
                ) : (
                  <FileAudio className="w-3.5 h-3.5" />
                )}
                {lastResult.source}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                {lastResult.durationSec.toFixed(1)}s audio
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Warning for AI-generated */}
      {!isGenuine && (
        <div className="flex items-start gap-3 p-5 rounded-2xl bg-red-500/10 border border-red-500/30 animate-slide-up">
          <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-base font-semibold text-red-400 mb-1">
              Warning: Potential Impersonation Attack
            </h3>
            <p className="text-sm text-slate-300">
              This voice has been classified as AI-generated with{' '}
              {lastResult.confidence}% confidence. Do not share sensitive
              information with the caller. Verify their identity through a
              trusted secondary communication channel immediately.
            </p>
          </div>
        </div>
      )}

      {/* Feature indicators */}
      <div className="glass p-6">
        <h3 className="text-lg font-semibold text-white mb-1">
          Detection Indicators
        </h3>
        <p className="text-sm text-slate-500 mb-5">
          Feature-level analysis scores (0% = natural, 100% = highly suspicious)
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          {lastResult.indicators.map((ind) => (
            <IndicatorBar key={ind.label} indicator={ind} />
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div className="glass p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white mb-1">
              Security Recommendation
            </h3>
            <p className="text-sm text-slate-300">{lastResult.recommendation}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => navigate('dashboard')}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
        >
          Return to Dashboard
        </button>
        <button
          onClick={() => navigate('live')}
          className="flex-1 py-3 rounded-xl bg-navy-800/50 border border-cyan-500/20 text-slate-300 font-medium hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
        >
          Run New Analysis
        </button>
      </div>
    </div>
  );
}
