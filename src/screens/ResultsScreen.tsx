import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import MetricCard from '../components/MetricCard';
import { LIFE_YEARS_TOOLTIP } from '../constants/disclaimers';
import { formatRange } from '../utils/format';

const ResultsScreen: React.FC = () => {
  const lastInference = useAppStore((s) => s.lastInference);

  if (!lastInference) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>No results yet. Add an event to get estimates.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Estimated impact</Text>
      <MetricCard
        title="Nicotine (mg/day)"
        value={lastInference.nicotine.estimateMgPerDay}
        range={lastInference.nicotine.rangeMgPerDay}
        risk={lastInference.riskIndicators.nicotine}
        explanation={lastInference.explanations.nicotine}
      />
      <MetricCard
        title="Carbon Monoxide (ppm)"
        value={lastInference.carbonMonoxide.estimatePpm}
        range={lastInference.carbonMonoxide.rangePpm}
        risk={lastInference.riskIndicators.co}
        explanation={lastInference.explanations.co}
      />
      <MetricCard
        title="Blood Alcohol Content"
        value={lastInference.alcohol.bloodAlcoholContentEstimate}
        range={lastInference.alcohol.range}
        risk={lastInference.riskIndicators.alcohol}
        explanation={lastInference.explanations.alcohol}
      />
      <MetricCard
        title="THC Memory Impact Risk"
        value={lastInference.thc.shortTermMemoryImpairmentRiskScore}
        range={lastInference.thc.range}
        risk={lastInference.riskIndicators.thcPsych}
        explanation={lastInference.explanations.thc}
      />

      <View style={styles.lifeBox}>
        <Text style={styles.label}>Life-years lost (rough range)</Text>
        <Text style={styles.value}>{formatRange(lastInference.lifeYearsLostEstimate.rangeYears, 'y')}</Text>
        <Text style={styles.helper}>{LIFE_YEARS_TOOLTIP}</Text>
      </View>

      <View style={styles.disclaimerBox}>
        <Text style={styles.helper}>These are informational estimates only — seek professional care if concerned.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#0b1220', flexGrow: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0b1220' },
  text: { color: '#e5e7eb' },
  title: { color: '#f8fafc', fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lifeBox: {
    marginTop: 16,
    backgroundColor: '#0f172a',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1f2937'
  },
  label: { color: '#e2e8f0', fontWeight: '700' },
  value: { color: '#f8fafc', fontSize: 18, fontWeight: '800', marginTop: 6 },
  helper: { color: '#94a3b8', fontSize: 12, marginTop: 6 },
  disclaimerBox: { marginTop: 20, padding: 12, backgroundColor: '#111827', borderRadius: 10 }
});

export default ResultsScreen;
