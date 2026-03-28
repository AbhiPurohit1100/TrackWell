import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { UsageEvent } from '../types/inference';

const HistoryScreen: React.FC = () => {
  const events = useAppStore((s) => s.events);

  const renderItem = ({ item }: { item: UsageEvent }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.inputMode === 'image' ? 'Photo entry' : 'Text entry'}</Text>
      <Text style={styles.subtitle}>{new Date(item.createdAt).toLocaleString()}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      {item.response && (
        <Text style={styles.meta}>
          Nicotine: {item.response.nicotine.estimateMgPerDay} mg/day · CO: {item.response.carbonMonoxide.estimatePpm} ppm
        </Text>
      )}
      {(item.hydrationCups || item.sleepHours || item.mood) && (
        <Text style={styles.meta}>
          {item.hydrationCups ? `${item.hydrationCups} cups water · ` : ''}
          {item.sleepHours ? `${item.sleepHours}h sleep · ` : ''}
          {item.mood ? `Mood: ${item.mood}` : ''}
        </Text>
      )}
      {item.wellnessNotes && <Text style={styles.meta}>Notes: {item.wellnessNotes}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
  keyExtractor={(item: UsageEvent) => item.id}
        renderItem={renderItem}
        contentContainerStyle={events.length === 0 && styles.empty}
        ListEmptyComponent={<Text style={styles.emptyText}>No history yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1220', padding: 16 },
  card: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1f2937'
  },
  title: { color: '#f8fafc', fontWeight: '700', fontSize: 16 },
  subtitle: { color: '#94a3b8', fontSize: 12, marginTop: 4 },
  desc: { color: '#e5e7eb', marginTop: 8 },
  meta: { color: '#cbd5e1', marginTop: 6, fontSize: 12 },
  empty: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#cbd5e1' }
});

export default HistoryScreen;
