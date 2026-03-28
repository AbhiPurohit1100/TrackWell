# TrackWell (Expo, TypeScript)

Informational-only exposure tracker for nicotine, alcohol, and THC aimed at Gen Z. Accepts text or photo, runs mocked inference for estimates, and enforces consent + privacy guardrails. Includes Supabase auth, local secure storage, and opt-in cloud inference.

## Features
- Onboarding with consent + age prompt (no restriction), explicit medical disclaimer.
- Login/Signup with Supabase (email/password).
- Add event via text or photo; OCR stub hooks; mocked inference with risk labels and life-years-lost range.
- Results cards with conservative ranges, confidence, and explanations.
- History list, settings with data export/delete, and cloud inference toggle (off by default).
- SecureStore-backed persistence for consent/auth flags; local event list in memory (stub for Supabase sync).
- Jest tests for inference mapping and risk indicator.
- CI workflow for lint + tests.

## Safety & disclaimers
- **Informational only — not medical advice.**
- Cloud inference is opt-in; disclose uploaded fields before enabling.
- No geolocation stored by default. Data export/delete available in settings.
- Life-years-lost shows conservative ranges with uncertainty tooltip; requires clinical review before release.

## Getting started
```bash
# install deps
npm install
# or yarn
# yarn

# start Expo
npx expo start

# lint & test
npm run lint
npm test
```

## Env config
Set these (e.g., in `.env` or via Expo app config):
- `EXPO_PUBLIC_SUPABASE_URL` – your Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` – anon key
- `EXPO_PUBLIC_INFER_URL` – optional cloud inference endpoint (keep opt-in)
- `EXPO_PUBLIC_INFER_API_KEY` – optional bearer/api-key for the inference endpoint (needed for Azure OpenAI wrapper)

## Architectural notes
- State: Zustand (`src/store/useAppStore.ts`).
- Navigation: React Navigation stack + tabs (`src/navigation/AppNavigator.tsx`).
- Services: Supabase auth/database, inference (mock-first), OCR stub, SecureStore wrappers.
- Mocks: `src/mocks/inferenceMocks.ts` supplies deterministic offline estimates.

## Testing & QA
- Unit tests: inference mock logic, risk indicator UI.
- QA checklist: consent must be accepted before inference; cloud toggle off by default; delete/export works; disclaimer visible on onboarding and settings; mock inference displays ranges and risk labels.

## Next steps / hardening
- Implement real OCR (ML Kit/Tesseract) and wire to inference payload.
- Add Supabase table `usage_events` schema matching `UsageEvent` type and sync events.
- Strengthen error states, offline caching, accessibility passes.
- Clinical & legal review of all copy, estimation methods, and risk thresholds before release.
