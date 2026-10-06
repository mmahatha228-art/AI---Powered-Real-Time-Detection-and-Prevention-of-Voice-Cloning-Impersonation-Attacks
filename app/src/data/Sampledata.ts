import type { DetectionResult, SecurityAlert, SystemStats } from './types';

export const sampleHistory: DetectionResult[] = [
  {
    id: 'det-001',
    timestamp: '2026-10-05T09:42:17',
    source: 'Live Call — Incoming +44 7***',
    classification: 'AI-Generated',
    confidence: 94.7,
    riskLevel: 'HIGH',
    status: 'Suspicious',
    durationSec: 12.4,
    indicators: [],
    recommendation:
      'Terminate the call immediately and verify the caller identity through an out-of-band channel.',
  },
  {
    id: 'det-002',
    timestamp: '2026-10-05T08:15:03',
    source: 'Uploaded File — ceo_message.wav',
    classification: 'Genuine',
    confidence: 96.2,
    riskLevel: 'LOW',
    status: 'Authentic',
    durationSec: 34.8,
    indicators: [],
    recommendation: 'No action required. Voice signature matches known profile.',
  },
  {
    id: 'det-003',
    timestamp: '2026-10-04T18:22:41',
    source: 'Live Call — Incoming +1 6***',
    classification: 'AI-Generated',
    confidence: 91.3,
    riskLevel: 'HIGH',
    status: 'Suspicious',
    durationSec: 9.7,
    indicators: [],
    recommendation:
      'Do not share sensitive information. Report this number to your security team.',
  },
  {
    id: 'det-004',
    timestamp: '2026-10-04T14:08:55',
    source: 'Uploaded File — support_call.mp3',
    classification: 'Genuine',
    confidence: 88.5,
    riskLevel: 'LOW',
    status: 'Authentic',
    durationSec: 22.1,
    indicators: [],
    recommendation: 'Voice verified as authentic. Proceed normally.',
  },
  {
    id: 'det-005',
    timestamp: '2026-10-04T11:33:12',
    source: 'Live Call — Incoming +33 6***',
    classification: 'AI-Generated',
    confidence: 87.2,
    riskLevel: 'MEDIUM',
    status: 'Suspicious',
    durationSec: 15.3,
    indicators: [],
    recommendation:
      'Exercise caution. Request secondary verification before proceeding.',
  },
  {
    id: 'det-006',
    timestamp: '2026-10-03T16:47:29',
    source: 'Uploaded File — voicemail.wav',
    classification: 'Genuine',
    confidence: 97.8,
    riskLevel: 'LOW',
    status: 'Authentic',
    durationSec: 18.6,
    indicators: [],
    recommendation: 'No action required. Voice signature confirmed genuine.',
  },
  {
    id: 'det-007',
    timestamp: '2026-10-03T10:12:05',
    source: 'Live Call — Incoming +49 1***',
    classification: 'AI-Generated',
    confidence: 93.1,
    riskLevel: 'HIGH',
    status: 'Suspicious',
    durationSec: 11.2,
    indicators: [],
    recommendation:
      'Potential voice cloning attack detected. End the call and alert security personnel.',
  },
  {
    id: 'det-008',
    timestamp: '2026-10-02T21:05:38',
    source: 'Uploaded File — conference.mp3',
    classification: 'Genuine',
    confidence: 92.4,
    riskLevel: 'LOW',
    status: 'Authentic',
    durationSec: 45.9,
    indicators: [],
    recommendation: 'All speakers verified. No anomalies detected.',
  },
];

export const sampleAlerts: SecurityAlert[] = [
  {
    id: 'alert-001',
    severity: 'HIGH',
    timestamp: '2026-10-05T09:42:17',
    detectionType: 'Voice Cloning Impersonation',
    description:
      'AI-generated voice detected during an incoming call impersonating a known contact. Spectral analysis revealed synthetic voice artifacts.',
    recommendedAction:
      'Terminate the call immediately. Verify the caller identity through a trusted secondary channel and report the incident.',
    acknowledged: false,
  },
  {
    id: 'alert-002',
    severity: 'HIGH',
    timestamp: '2026-10-04T18:22:41',
    detectionType: 'Synthetic Speech Injection',
    description:
      'Real-time analysis flagged unnatural pitch variation and spectral inconsistency consistent with a text-to-speech engine.',
    recommendedAction:
      'Block the source number. Do not disclose any personal or financial information.',
    acknowledged: false,
  },
  {
    id: 'alert-003',
    severity: 'MEDIUM',
    timestamp: '2026-10-04T11:33:12',
    detectionType: 'Voice Pattern Anomaly',
    description:
      'Moderate confidence anomaly in voice-pattern consistency. Potential partial voice synthesis or manipulated recording.',
    recommendedAction:
      'Request secondary verification. Continue monitoring the call for additional indicators.',
    acknowledged: true,
  },
  {
    id: 'alert-004',
    severity: 'HIGH',
    timestamp: '2026-10-03T10:12:05',
    detectionType: 'Impersonation Attempt',
    description:
      'Voice characteristics matched a known executive profile but contained synthetic artifacts indicative of a cloned voice model.',
    recommendedAction:
      'Alert the security operations team immediately. Escalate to incident response protocol.',
    acknowledged: false,
  },
  {
    id: 'alert-005',
    severity: 'MEDIUM',
    timestamp: '2026-10-02T15:44:20',
    detectionType: 'Unnatural Pitch Variation',
    description:
      'Detected irregular prosody patterns that deviate from natural human speech cadence. Source uploaded audio file.',
    recommendedAction:
      'Review the audio source manually. Flag the sender for additional scrutiny.',
    acknowledged: true,
  },
  {
    id: 'alert-006',
    severity: 'LOW',
    timestamp: '2026-10-01T08:19:53',
    detectionType: 'Minor Spectral Inconsistency',
    description:
      'Low-risk spectral anomaly detected, likely caused by network compression rather than synthesis. Logged for trend analysis.',
    recommendedAction:
      'No immediate action required. Monitor for recurring patterns from this source.',
    acknowledged: true,
  },
];

export const systemStats: SystemStats = {
  totalAnalyzed: 1847,
  genuineDetected: 1492,
  suspiciousDetected: 355,
  threatsBlocked: 41,
};
