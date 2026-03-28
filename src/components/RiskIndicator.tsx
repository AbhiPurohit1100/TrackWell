import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RiskLevel } from '../utils/risk';

const COLORS: Record<RiskLevel, string> = {
  low: '#22c55e',
  moderate: '#f59e0b',
  high: '#ef4444'
};

const LABELS: Record<RiskLevel, string> = {
  low: 'Low',
  moderate: 'Moderate',
  high: 'High'
};

interface Props {
  risk: RiskLevel;
}

const RiskIndicator: React.FC<Props> = ({ risk }: Props) => {
  return (
    <View style={[styles.chip, { backgroundColor: `${COLORS[risk]}22` }]}>
      <View style={[styles.dot, { backgroundColor: COLORS[risk] }]} />
      <Text style={[styles.text, { color: COLORS[risk] }]}>{LABELS[risk]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999
  },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 6 },
  text: { fontWeight: '700', fontSize: 12 }
});

export default RiskIndicator;
