import React from 'react';
import { View, Text, StyleSheet, Switch, Button, Alert } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { exportData } from '../services/storage';
import { signOut } from '../services/auth';

const SettingsScreen: React.FC = () => {
  const { useCloudInference, toggleCloudInference, events, clearAll, user, setUser } = useAppStore();

  const handleExport = async () => {
    const file = await exportData(events);
    Alert.alert('Exported', `Data saved to ${file}`);
  };

  const handleDelete = async () => {
    await clearAll();
    Alert.alert('Deleted', 'Local data removed.');
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Use cloud inference (opt-in)</Text>
        <Switch value={useCloudInference} onValueChange={toggleCloudInference} />
      </View>
      <Text style={styles.helper}>Uploads text and image metadata when enabled.</Text>

      <Button title="Export data" onPress={handleExport} />
      <Button title="Delete local data" color="#ef4444" onPress={handleDelete} />
      {user && <Button title="Sign out" onPress={handleSignOut} />}

      <Text style={[styles.helper, { marginTop: 20 }]}>
        TrackWell is informational only. Seek professional care if concerned about your health.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1220', padding: 16, gap: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: '#e5e7eb', fontSize: 16, fontWeight: '600' },
  helper: { color: '#94a3b8', fontSize: 12 }
});

export default SettingsScreen;
