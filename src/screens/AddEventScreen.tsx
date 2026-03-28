import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { useAppStore } from '../store/useAppStore';
import { inferUsage } from '../services/inference';
import { pickImage, extractTextFromImage } from '../services/ocr';
import { InferenceRequest } from '../types/inference';

const AddEventScreen: React.FC = () => {
  const navigation = useNavigation();
  const { age, useCloudInference, setInference, addEvent, addAuditLog, user } = useAppStore();
  const [textInput, setTextInput] = useState('');
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [imageBase64, setImageBase64] = useState<string | undefined>();
  const [nicotineMg, setNicotineMg] = useState('');
  const [alcoholUnits, setAlcoholUnits] = useState('');
  const [thcMg, setThcMg] = useState('');
  const [perDay, setPerDay] = useState('');
  const [perWeek, setPerWeek] = useState('');
  const [sex, setSex] = useState<'male' | 'female' | 'other' | null>(null);
  const [weightKg, setWeightKg] = useState('');
  const [hydration, setHydration] = useState('');
  const [sleep, setSleep] = useState('');
  const [mood, setMood] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePickImage = async () => {
    const image = await pickImage();
    if (!image) return;
    setImageUri(image.uri);
    setImageBase64(image.base64);
    addAuditLog(`Image picked ${image.uri}`);
    const extracted = await extractTextFromImage(image.base64);
  setTextInput((prev: string) => `${prev}\n${extracted}`.trim());
  };

  const handleSubmit = async () => {
    if (!textInput && !imageBase64) {
      Alert.alert('Add details', 'Provide text or a photo.');
      return;
    }
    setLoading(true);
    try {
      const req: InferenceRequest = {
        clientId: user?.id || 'anon',
        timestamp: new Date().toISOString(),
        inputMode: imageBase64 ? 'image' : 'text',
        text: textInput,
        imageBase64,
        age: age || null,
        sex,
        weightKg: weightKg ? parseFloat(weightKg) : null,
        substanceHints: {
          nicotineMg: nicotineMg ? parseFloat(nicotineMg) : null,
          alcoholUnits: alcoholUnits ? parseFloat(alcoholUnits) : null,
          thcMg: thcMg ? parseFloat(thcMg) : null
        },
        frequencyContext: {
          perDay: perDay ? parseFloat(perDay) : null,
          perWeek: perWeek ? parseFloat(perWeek) : null
        }
      };

      const response = await inferUsage(req, { useCloud: useCloudInference });
      setInference(response);
      const event = {
        id: uuid.v4().toString(),
        createdAt: req.timestamp,
        inputMode: req.inputMode,
        description: textInput,
        imageUri,
        wellnessNotes: notes,
        hydrationCups: hydration ? parseFloat(hydration) : null,
        sleepHours: sleep ? parseFloat(sleep) : null,
        mood: mood || null,
        request: req,
        response
      };
      addEvent(event);
      addAuditLog('Inference completed');
      // @ts-ignore
      navigation.navigate('Results');
    } catch (error: any) {
      Alert.alert('Inference failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add event</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe what you had (brand, amount, units)"
        multiline
        value={textInput}
        onChangeText={setTextInput}
        placeholderTextColor="#94a3b8"
      />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Use photo" onPress={handlePickImage} />

      <Text style={styles.section}>Quick numbers (optional)</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="Nicotine mg"
          keyboardType="numeric"
          value={nicotineMg}
          onChangeText={setNicotineMg}
          placeholderTextColor="#94a3b8"
        />
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="Alcohol units"
          keyboardType="numeric"
          value={alcoholUnits}
          onChangeText={setAlcoholUnits}
          placeholderTextColor="#94a3b8"
        />
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="THC mg"
          keyboardType="numeric"
          value={thcMg}
          onChangeText={setThcMg}
          placeholderTextColor="#94a3b8"
        />
      </View>

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="Per day"
          keyboardType="numeric"
          value={perDay}
          onChangeText={setPerDay}
          placeholderTextColor="#94a3b8"
        />
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="Per week"
          keyboardType="numeric"
          value={perWeek}
          onChangeText={setPerWeek}
          placeholderTextColor="#94a3b8"
        />
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="Weight kg"
          keyboardType="numeric"
          value={weightKg}
          onChangeText={setWeightKg}
          placeholderTextColor="#94a3b8"
        />
      </View>

      <Text style={styles.section}>Wellness context (optional)</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="Hydration (cups)"
          keyboardType="numeric"
          value={hydration}
          onChangeText={setHydration}
          placeholderTextColor="#94a3b8"
        />
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="Sleep hours"
          keyboardType="numeric"
          value={sleep}
          onChangeText={setSleep}
          placeholderTextColor="#94a3b8"
        />
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="Mood"
          value={mood}
          onChangeText={setMood}
          placeholderTextColor="#94a3b8"
        />
      </View>

      <TextInput
        style={[styles.input, { minHeight: 80 }]}
        placeholder="Notes (e.g., cravings, triggers, coping actions)"
        multiline
        value={notes}
        onChangeText={setNotes}
        placeholderTextColor="#94a3b8"
      />

      <Text style={styles.help}>Tip: Add context like timeframe, brands, and sizes to improve estimates.</Text>

      <Button title={loading ? 'Estimating…' : 'Estimate exposure'} onPress={handleSubmit} disabled={loading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#0b1220', flexGrow: 1 },
  title: { color: '#f8fafc', fontSize: 24, fontWeight: '800', marginBottom: 12 },
  input: {
    backgroundColor: '#111827',
    borderRadius: 10,
    padding: 12,
    color: '#e5e7eb',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1f2937'
  },
  image: { width: '100%', height: 180, borderRadius: 12, marginBottom: 12 },
  section: { color: '#e2e8f0', fontWeight: '700', marginVertical: 8 },
  row: { flexDirection: 'row', gap: 8 },
  smallInput: { flex: 1 },
  help: { color: '#94a3b8', fontSize: 12, marginVertical: 12 }
});

export default AddEventScreen;
