import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { DetectionResult, PageId, SecurityAlert } from '../types';
import {
  sampleAlerts,
  sampleHistory,
  systemStats as initialStats,
} from '../data/sampleData';

export type DemoOutcome = 'genuine' | 'synthetic';

interface AppState {
  currentPage: PageId;
  navigate: (page: PageId) => void;
  demoOutcome: DemoOutcome;
  setDemoOutcome: (o: DemoOutcome) => void;
  lastResult: DetectionResult | null;
  setLastResult: (r: DetectionResult | null) => void;
  history: DetectionResult[];
  addHistoryEntry: (r: DetectionResult) => void;
  alerts: SecurityAlert[];
  acknowledgeAlert: (id: string) => void;
  stats: typeof initialStats;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [demoOutcome, setDemoOutcome] = useState<DemoOutcome>('synthetic');
  const [lastResult, setLastResult] = useState<DetectionResult | null>(null);
  const [history, setHistory] = useState<DetectionResult[]>(sampleHistory);
  const [alerts, setAlerts] = useState<SecurityAlert[]>(sampleAlerts);
  const [stats] = useState(initialStats);

  const navigate = useCallback((page: PageId) => {
    setCurrentPage(page);
  }, []);

  const addHistoryEntry = useCallback((r: DetectionResult) => {
    setHistory((prev) => [r, ...prev]);
  }, []);

  const acknowledgeAlert = useCallback((id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)),
    );
  }, []);

  const value = useMemo(
    () => ({
      currentPage,
      navigate,
      demoOutcome,
      setDemoOutcome,
      lastResult,
      setLastResult,
      history,
      addHistoryEntry,
      alerts,
      acknowledgeAlert,
      stats,
    }),
    [
      currentPage,
      navigate,
      demoOutcome,
      lastResult,
      history,
      addHistoryEntry,
      alerts,
      acknowledgeAlert,
      stats,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
