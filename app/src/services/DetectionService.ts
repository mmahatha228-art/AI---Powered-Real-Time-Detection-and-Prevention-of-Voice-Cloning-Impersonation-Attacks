import type {
  Classification,
  DetectionIndicator,
  DetectionResult,
  RiskLevel,
} from './types';

/**
 * Simulated detection service.
 *
 * The real implementation will call a Python/FastAPI backend that
 * runs a trained ML model (e.g. spectrogram-based CNN / RawNet3) to
 * classify audio as genuine or AI-generated. The interface below is
 * designed so a real backend can be connected with minimal changes —
 * only `runAnalysis` needs to be swapped to call the API.
 */

const genuineIndicators: DetectionIndicator[] = [
  {
    label: 'Spectral Consistency',
    value: 12,
    description: 'Natural harmonic distribution across frequency bands.',
  },
  {
    label: 'Pitch Variation',
    value: 18,
    description: 'Organic prosody with human-like intonation patterns.',
  },
  {
    label: 'Voice Pattern Stability',
    value: 9,
    description: 'Consistent vocal tract characteristics throughout.',
  },
  {
    label: 'Synthetic Artifact Detection',
    value: 5,
    description: 'No neural synthesis artifacts or vocoder signatures found.',
  },
];

const syntheticIndicators: DetectionIndicator[] = [
  {
    label: 'Spectral Inconsistency',
    value: 89,
    description:
      'Irregular harmonic distribution detected — consistent with neural vocoder output.',
  },
  {
    label: 'Unnatural Pitch Variation',
    value: 82,
    description:
      'Prosody patterns show machine-generated regularity absent from natural speech.',
  },
  {
    label: 'Synthetic Voice Characteristics',
    value: 91,
    description:
      'Vocoder artifacts and spectral smoothing indicative of AI voice synthesis.',
  },
  {
    label: 'Voice-Pattern Anomaly',
    value: 76,
    description:
      'Deviations from expected human vocal tract resonances detected.',
  },
];

function buildResult(
  classification: Classification,
  confidence: number,
  riskLevel: RiskLevel,
  source: string,
  durationSec: number,
): DetectionResult {
  return {
    id: `det-${Date.now()}`,
    timestamp: new Date().toISOString(),
    source,
    classification,
    confidence,
    riskLevel,
    status: classification === 'Genuine' ? 'Authentic' : 'Suspicious',
    indicators: classification === 'Genuine' ? genuineIndicators : syntheticIndicators,
    recommendation:
      classification === 'Genuine'
        ? 'No action required. Voice signature matches natural human speech patterns.'
        : 'Potential AI-generated voice detected. Do not share sensitive information. Verify identity through a trusted secondary channel immediately.',
    durationSec,
  };
}

export function getDemoResult(
  outcome: 'genuine' | 'synthetic',
  source = 'Live Voice Analysis',
  durationSec = 8.0,
): DetectionResult {
  if (outcome === 'genuine') {
    return buildResult('Genuine', 96.2, 'LOW', source, durationSec);
  }
  return buildResult('AI-Generated', 94.7, 'HIGH', source, durationSec);
}

/**
 * Returns a result for a "random" demo outcome based on the current
 * demo-mode setting. When demoMode is not 'random', the specified
 * outcome is used directly.
 */
export function analyzeAudio(
  outcome: 'genuine' | 'synthetic',
  source: string,
  durationSec: number,
): DetectionResult {
  return getDemoResult(outcome, source, durationSec);
}

export { genuineIndicators, syntheticIndicators };
