import { mockInfer } from '../src/mocks/inferenceMocks';
import { InferenceRequest } from '../src/types/inference';

describe('mockInfer', () => {
  const baseReq: InferenceRequest = {
    clientId: 'test',
    timestamp: new Date().toISOString(),
    inputMode: 'text',
    text: 'Test',
    age: 22,
    sex: 'other',
    weightKg: 70,
    imageBase64: undefined,
    substanceHints: { nicotineMg: null, alcoholUnits: null, thcMg: null },
    frequencyContext: { perDay: null, perWeek: null }
  };

  it('returns higher alcohol risk for heavy units', async () => {
    const res = await mockInfer({ ...baseReq, substanceHints: { ...baseReq.substanceHints, alcoholUnits: 8 } });
    expect(res.alcohol.bloodAlcoholContentEstimate).toBeGreaterThan(0.08);
    expect(res.riskIndicators.alcohol).toBeDefined();
  });

  it('returns warnings for high nicotine', async () => {
    const res = await mockInfer({ ...baseReq, substanceHints: { ...baseReq.substanceHints, nicotineMg: 25 } });
    expect(res.warnings.length).toBeGreaterThan(0);
  });
});
