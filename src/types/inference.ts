export type InputMode = 'text' | 'image';

export interface SubstanceHints {
  nicotineMg: number | null;
  alcoholUnits: number | null;
  thcMg: number | null;
}

export interface FrequencyContext {
  perDay: number | null;
  perWeek: number | null;
}

export interface InferenceRequest {
  clientId: string;
  timestamp: string;
  inputMode: InputMode;
  text?: string;
  imageBase64?: string;
  age: number | null;
  sex: 'male' | 'female' | 'other' | null;
  weightKg: number | null;
  substanceHints: SubstanceHints;
  frequencyContext: FrequencyContext;
}

export interface InferenceResponse {
  nicotine: {
    estimateMgPerDay: number | null;
    rangeMgPerDay: [number, number] | null;
    confidence: number;
  };
  carbonMonoxide: {
    estimatePpm: number | null;
    rangePpm: [number, number] | null;
    confidence: number;
  };
  alcohol: {
    bloodAlcoholContentEstimate: number | null;
    range: [number, number] | null;
    confidence: number;
  };
  thc: {
    shortTermMemoryImpairmentRiskScore: number;
    range: [number, number];
    confidence: number;
  };
  lifeYearsLostEstimate: {
    rangeYears: [number, number];
    basis: string;
    confidence: number;
  };
  riskIndicators: {
    nicotine: 'low' | 'moderate' | 'high';
    alcohol: 'low' | 'moderate' | 'high';
    co: 'low' | 'moderate' | 'high';
    thcPsych: 'low' | 'moderate' | 'high';
  };
  explanations: {
    nicotine: string;
    co: string;
    alcohol: string;
    thc: string;
  };
  warnings: string[];
}

export interface UsageEvent {
  id: string;
  createdAt: string;
  inputMode: InputMode;
  description: string;
  imageUri?: string;
  wellnessNotes?: string;
  hydrationCups?: number | null;
  sleepHours?: number | null;
  mood?: string | null;
  request: InferenceRequest;
  response?: InferenceResponse;
}
