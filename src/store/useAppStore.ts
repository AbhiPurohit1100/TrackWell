import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import { InferenceResponse, UsageEvent } from '../types/inference';
import { AuthUser } from '../types/user';

export interface AppState {
  consentAccepted: boolean;
  age: number | null;
  user: AuthUser | null;
  events: UsageEvent[];
  lastInference: InferenceResponse | null;
  useCloudInference: boolean;
  auditLog: string[];
  setConsent: (accepted: boolean, age: number | null) => void;
  setUser: (user: AuthUser | null) => void;
  addEvent: (event: UsageEvent) => void;
  setInference: (result: InferenceResponse | null) => void;
  toggleCloudInference: (value: boolean) => void;
  addAuditLog: (entry: string) => void;
  clearAll: () => Promise<void>;
}

const secureStorage = {
  getItem: async (name: string) => SecureStore.getItemAsync(name),
  setItem: async (name: string, value: string) => SecureStore.setItemAsync(name, value),
  removeItem: async (name: string) => SecureStore.deleteItemAsync(name)
};

export const useAppStore = create<AppState>()(
  persist<AppState>(
    (set, get) => ({
      consentAccepted: false,
      age: null,
      user: null,
      events: [],
      lastInference: null,
      useCloudInference: false,
      auditLog: [],
      setConsent: (accepted: boolean, age: number | null) => set({ consentAccepted: accepted, age }),
      setUser: (user: AuthUser | null) => set({ user }),
      addEvent: (event: UsageEvent) => set({ events: [event, ...get().events] }),
      setInference: (result: InferenceResponse | null) => set({ lastInference: result }),
      toggleCloudInference: (value: boolean) => set({ useCloudInference: value }),
      addAuditLog: (entry: string) => set({ auditLog: [entry, ...get().auditLog].slice(0, 200) }),
      clearAll: async () => {
        set({ consentAccepted: false, age: null, user: null, events: [], lastInference: null, auditLog: [] });
        await SecureStore.deleteItemAsync('trackwell-store');
      }
    }),
    {
      name: 'trackwell-store',
      storage: createJSONStorage(() => secureStorage),
      partialize: (state: AppState) => ({
        consentAccepted: state.consentAccepted,
        age: state.age,
        user: state.user,
        useCloudInference: state.useCloudInference
      })
    }
  )
);
