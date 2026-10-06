import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RiskBadge, StatusBadge, ClassificationBadge } from '../components/Badges';
import { History as HistoryIcon, Search, ArrowRight } from 'lucide-react';
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

type Filter = 'all' | RiskLevel;

export default function DetectionHistory() {
  const { history, navigate, setLastResult } = useApp();
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');

  const filtered = history.filter((h) => {
    if (filter !== 'all' && h.riskLevel !== filter) return false;
    if (search && !h.source.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const handleView = (id: string) => {
    const entry = history.find((h) => h.id === id);
    if (entry) {
      setLastResult(entry);
      navigate('result');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
          <HistoryIcon className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Detection History</h1>
          <p className="text-sm text-slate-500">
            Complete log of all voice analysis sessions
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass p-4 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by source..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-navy-800/50 border border-cyan-500/10 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/30 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'LOW', 'MEDIUM', 'HIGH'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                filter === f
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-navy-800/40 text-slate-500 border border-transparent hover:text-slate-300'
              }`}
            >
              {f === 'all' ? 'All' : `${f} Risk`}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cyan-500/10">
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">
                  Date / Time
                </th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">
                  Source
                </th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">
                  Classification
                </th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">
                  Confidence
                </th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">
                  Risk
                </th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">
                  Status
                </th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-cyan-500/5 hover:bg-navy-800/30 transition-colors group"
                >
                  <td className="px-4 py-3.5 text-sm text-slate-400 font-mono whitespace-nowrap">
                    {formatTime(entry.timestamp)}
                  </td>
                  <td className="px-4 py-3.5 text-sm text-slate-200 max-w-[200px] truncate">
                    {entry.source}
                  </td>
                  <td className="px-4 py-3.5">
                    <ClassificationBadge classification={entry.classification} />
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`text-sm font-mono font-semibold ${
                        entry.classification === 'Genuine'
                          ? 'text-emerald-400'
                          : 'text-red-400'
                      }`}
                    >
                      {entry.confidence}%
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <RiskBadge level={entry.riskLevel} />
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={entry.status} />
                  </td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => handleView(entry.id)}
                      className="text-slate-500 hover:text-cyan-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-slate-500">
              No detection records match your filters.
            </p>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-600 text-center">
        Showing {filtered.length} of {history.length} detection records
      </p>
    </div>
  );
}
