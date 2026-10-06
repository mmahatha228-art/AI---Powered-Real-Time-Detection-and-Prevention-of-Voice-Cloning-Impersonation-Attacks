import { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import Waveform from '../components/Waveform';
import { analyzeAudio } from '../services/detectionService';
import {
  UploadCloud,
  FileAudio,
  Loader2,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  AlertTriangle,
  FlaskConical,
} from 'lucide-react';

export default function UploadAudio() {
  const { demoOutcome, setLastResult, navigate, addHistoryEntry } = useApp();
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (name: string, size: number) => {
    setFileName(name);
    setFileSize(formatSize(size));
    const dur = (Math.random() * 30 + 10).toFixed(1);
    setDuration(`${dur}s`);
    setDone(false);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file.name, file.size);
  };

  const handleAnalyze = () => {
    if (!fileName) return;
    setAnalyzing(true);
    setDone(false);
    setTimeout(() => {
      const result = analyzeAudio(
        demoOutcome,
        `Uploaded File — ${fileName}`,
        parseFloat(duration || '8.0'),
      );
      setLastResult(result);
      addHistoryEntry(result);
      setAnalyzing(false);
      setDone(true);
    }, 3000);
  };

  const reset = () => {
    setFileName(null);
    setFileSize(null);
    setDuration(null);
    setDone(false);
  };

  const result = useApp().lastResult;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Demo indicator */}
      <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
        <FlaskConical className="w-4 h-4 text-amber-400" />
        <span className="text-sm text-amber-400 font-medium">
          Demo Mode: Analysis will simulate{' '}
          <span className="font-bold">
            {demoOutcome === 'genuine' ? 'GENUINE' : 'AI-GENERATED'}
          </span>{' '}
          voice
        </span>
      </div>

      {/* Upload card */}
      <div className="glass p-6 lg:p-8">
        <h2 className="text-xl font-bold text-white mb-1">Upload Audio File</h2>
        <p className="text-sm text-slate-400 mb-6">
          Upload a WAV or MP3 file for synthetic voice detection analysis.
        </p>

        {!fileName ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-10 lg:p-16 flex flex-col items-center justify-center transition-all duration-300 ${
              dragging
                ? 'border-cyan-400/60 bg-cyan-500/5 scale-[1.01]'
                : 'border-cyan-500/20 hover:border-cyan-400/40 hover:bg-navy-800/30'
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".wav,.mp3,audio/wav,audio/mpeg"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f.name, f.size);
              }}
            />
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-8 h-8 text-cyan-400" />
            </div>
            <p className="text-lg font-semibold text-slate-200">
              Drag and drop your audio file here
            </p>
            <p className="text-sm text-slate-500 mt-1">
              or click to browse — supports WAV and MP3
            </p>
            <div className="flex gap-2 mt-4">
              <span className="px-3 py-1 rounded-lg bg-navy-700/50 text-xs text-slate-400 font-mono">
                .WAV
              </span>
              <span className="px-3 py-1 rounded-lg bg-navy-700/50 text-xs text-slate-400 font-mono">
                .MP3
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* File info */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-navy-800/40 border border-cyan-500/10">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                <FileAudio className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-200 truncate">
                  {fileName}
                </p>
                <p className="text-xs text-slate-500">
                  {fileSize} · Duration: {duration}
                </p>
              </div>
              <button
                onClick={reset}
                className="text-sm text-slate-500 hover:text-slate-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-navy-700/50"
              >
                Remove
              </button>
            </div>

            {/* Waveform preview */}
            <div className="glass p-4 rounded-xl">
              <Waveform active={!analyzing && !done} bars={48} />
            </div>

            {/* Analyze button */}
            {!done && (
              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing voice characteristics...
                  </>
                ) : (
                  'Analyze Voice'
                )}
              </button>
            )}

            {/* Result preview */}
            {done && result && (
              <div
                className={`p-5 rounded-xl border-2 animate-slide-up ${
                  result.classification === 'Genuine'
                    ? 'border-emerald-500/30 bg-emerald-500/5'
                    : 'border-red-500/30 bg-red-500/5'
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
                    <p className="text-sm text-slate-400">Analysis result</p>
                    <p
                      className={`text-xl font-bold ${
                        result.classification === 'Genuine'
                          ? 'text-emerald-400'
                          : 'text-red-400'
                      }`}
                    >
                      {result.classification} — {result.confidence}% confidence
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('result')}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-medium hover:bg-cyan-500/20 transition-all"
                  >
                    Full Report
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {result.classification === 'AI-Generated' && (
                  <div className="mt-4 flex items-start gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-300">
                      AI-generated speech detected in this audio file. Treat the
                      content as untrusted.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
