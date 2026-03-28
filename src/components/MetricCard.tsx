import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatNumber, formatRange } from '../utils/format';
import RiskIndicator from './RiskIndicator';

interface MetricCardProps {
  title: string;
  value: number | null;
  range?: [number, number] | null;
  unit?: string;
  risk: 'low' | 'moderate' | 'high';
  explanation?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, range, unit = '', risk, explanation }: MetricCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <RiskIndicator risk={risk} />
      </View>
      <Text style={styles.value}>{formatNumber(value, unit)}</Text>
      {range && <Text style={styles.range}>Range: {formatRange(range, unit)}</Text>}
      {explanation && <Text style={styles.explainer}>{explanation}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#1e293b'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: { color: '#e2e8f0', fontSize: 16, fontWeight: '600' },
  value: { color: '#f1f5f9', fontSize: 22, fontWeight: '700', marginTop: 8 },
  range: { color: '#cbd5e1', marginTop: 4, fontSize: 13 },
  explainer: { color: '#94a3b8', marginTop: 6, fontSize: 13 }
});

export default MetricCard;
