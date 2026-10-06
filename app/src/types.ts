export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type Classification = 'Genuine' | 'AI-Generated';
export type DetectionStatus = 'Authentic' | 'Suspicious';
export type AnalysisPhase = 'idle' | 'listening' | 'analyzing' | 'complete';

export type PageId =
  | 'dashboard'
  | 'live'
  | 'upload'
  | 'result'
  | 'history'
  | 'alerts';

export interface DetectionIndicator {
  label: string;
  value: number; // 0-100, higher = more suspicious
  description: string;
}

export interface DetectionResult {
  id: string;
  timestamp: string;
  source: string;
  classification: Classification;
  confidence: number;
  riskLevel: RiskLevel;
  status: DetectionStatus;
  indicators: DetectionIndicator[];
  recommendation: string;
  durationSec: number;
}

export interface SecurityAlert {
  id: string;
  severity: RiskLevel;
  timestamp: string;
  detectionType: string;
  description: string;
  recommendedAction: string;
  acknowledged: boolean;
}

export interface SystemStats {
  totalAnalyzed: number;
  genuineDetected: number;
  suspiciousDetected: number;
  threatsBlocked: number;
}
