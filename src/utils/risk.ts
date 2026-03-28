import { InferenceResponse } from '../types/inference';

export type RiskLevel = 'low' | 'moderate' | 'high';

export const classifyRisk = (value: number | null, thresholds: [number, number]): RiskLevel => {
  if (value === null) return 'low';
  const [mid, high] = thresholds;
  if (value >= high) return 'high';
  if (value >= mid) return 'moderate';
  return 'low';
};

export const summarizeRisk = (response: InferenceResponse) => ({
  nicotine: classifyRisk(response.nicotine.estimateMgPerDay, [10, 20]),
  co: classifyRisk(response.carbonMonoxide.estimatePpm, [5, 9]),
  alcohol: classifyRisk(response.alcohol.bloodAlcoholContentEstimate, [0.05, 0.12]),
  thcPsych: classifyRisk(response.thc.shortTermMemoryImpairmentRiskScore, [40, 70])
});
