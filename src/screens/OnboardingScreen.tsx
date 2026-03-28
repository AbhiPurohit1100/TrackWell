import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ScrollView, Switch } from 'react-native';
import { MEDICAL_DISCLAIMER } from '../constants/disclaimers';
import { useAppStore } from '../store/useAppStore';

const OnboardingScreen: React.FC = () => {
  const setConsent = useAppStore((s) => s.setConsent);
  const [age, setAge] = useState('');
  const [accepted, setAccepted] = useState(false);

  const handleContinue = () => {
    const parsedAge = age ? parseInt(age, 10) : null;
    setConsent(accepted, parsedAge);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>TrackWell</Text>
      <Text style={styles.subtitle}>Estimate exposure, stay informed — never medical advice.</Text>
      <Text style={styles.sectionTitle}>Consent & Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Your age"
        keyboardType="number-pad"
        value={age}
        onChangeText={setAge}
        placeholderTextColor="#94a3b8"
      />
      <View style={styles.row}>
        <Switch value={accepted} onValueChange={setAccepted} />
        <Text style={styles.label}>I understand this is informational only and not medical advice.</Text>
      </View>
      <Text style={styles.disclaimer}>{MEDICAL_DISCLAIMER}</Text>
      <Button title="Continue" onPress={handleContinue} disabled={!accepted} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#0b1220', flexGrow: 1 },
  title: { color: '#f8fafc', fontSize: 28, fontWeight: '800', marginBottom: 8 },
  subtitle: { color: '#cbd5e1', fontSize: 16, marginBottom: 20 },
  sectionTitle: { color: '#e2e8f0', fontSize: 16, fontWeight: '700', marginBottom: 8 },
  input: {
    backgroundColor: '#111827',
    borderRadius: 10,
    padding: 12,
    color: '#e5e7eb',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1f2937'
  },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  label: { color: '#e5e7eb', flex: 1, marginLeft: 8 },
  disclaimer: { color: '#94a3b8', fontSize: 12, marginBottom: 16 }
});

export default OnboardingScreen;
