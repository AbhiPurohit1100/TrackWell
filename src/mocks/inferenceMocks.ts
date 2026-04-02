import { InferenceResponse, InferenceRequest } from '../types/inference';
import { summarizeRisk } from '../utils/risk';

const baseTemplate: InferenceResponse = {
  nicotine: { estimateMgPerDay: 8, rangeMgPerDay: [5, 15], confidence: 0.42 },
  carbonMonoxide: { estimatePpm: 6, rangePpm: [4, 12], confidence: 0.38 },
  alcohol: { bloodAlcoholContentEstimate: 0.04, range: [0.02, 0.08], confidence: 0.47 },
  thc: { shortTermMemoryImpairmentRiskScore: 35, range: [20, 60], confidence: 0.33 },
  lifeYearsLostEstimate: { rangeYears: [0.1, 1.8], basis: 'Prototype heuristic — requires clinical review', confidence: 0.12 },
  riskIndicators: { nicotine: 'moderate', alcohol: 'moderate', co: 'moderate', thcPsych: 'moderate' },
  explanations: {
    nicotine: 'Estimae derived from reported frequency and typical nicotine content per unit. Prototype only.',
    co: 'CO rises with combustion exposure; range reflects population-level data.',
    alcohol: 'BAC estimated from reported units; hydration and metabolism vary widely.',
    thc: 'Memory impairment risk depends on potency, method, and individual factors.'
  },
  warnings: []
};

export const mockInfer = async (request: InferenceRequest): Promise<InferenceResponse> => {
  const response = { ...baseTemplate };

  if (request.substanceHints.alcoholUnits && request.substanceHints.alcoholUnits > 6) {
    response.alcohol = { bloodAlcoholContentEstimate: 0.11, range: [0.08, 0.16], confidence: 0.38 };
    response.warnings.push('High alcohol intake — consider slowing down, hydrate, seek support if unwell.');
  }

  if (request.substanceHints.nicotineMg && request.substanceHints.nicotineMg > 20) {
    response.nicotine = { estimateMgPerDay: 24, rangeMgPerDay: [18, 32], confidence: 0.36 };
    response.carbonMonoxide = { estimatePpm: 14, rangePpm: [9, 22], confidence: 0.35 };
    response.warnings.push('High nicotine/CO exposure — consider reducing frequency and seek cessation support.');
  }

  if (request.substanceHints.thcMg && request.substanceHints.thcMg > 25) {
    response.thc = { shortTermMemoryImpairmentRiskScore: 78, range: [62, 90], confidence: 0.41 };
    response.warnings.push('THC impairment risk may be high — avoid driving and important decisions.');
  }

  response.riskIndicators = summarizeRisk(response);
  return response;
};
