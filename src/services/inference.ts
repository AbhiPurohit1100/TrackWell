import Constants from 'expo-constants';
import { InferenceRequest, InferenceResponse } from '../types/inference';
import { mockInfer } from '../mocks/inferenceMocks';

const INFER_URL = Constants.expoConfig?.extra?.inferUrl || process.env.EXPO_PUBLIC_INFER_URL;
const INFER_API_KEY = Constants.expoConfig?.extra?.inferApiKey || process.env.EXPO_PUBLIC_INFER_API_KEY;

export const inferUsage = async (
  request: InferenceRequest,
  opts: { useCloud: boolean }
): Promise<InferenceResponse> => {
  if (!opts.useCloud || !INFER_URL) {
    return mockInfer(request);
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (INFER_API_KEY) {
    headers['Authorization'] = `Bearer ${INFER_API_KEY}`;
    headers['api-key'] = INFER_API_KEY; // Azure OpenAI often uses this header
  }

  const res = await fetch(`${INFER_URL}/infer`, {
    method: 'POST',
    headers,
    body: JSON.stringify(request)
  });

  if (!res.ok) {
    throw new Error(`Inference failed: ${res.status}`);
  }

  const data = (await res.json()) as InferenceResponse;
  return data;
};
