import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signUp } from '../../services/auth';
import { useAppStore } from '../../store/useAppStore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any> {}

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const setUser = useAppStore((s) => s.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    setLoading(true);
    try {
      const user = await signUp(email, password);
      setUser(user);
      navigation.replace('MainTabs');
    } catch (error: any) {
      Alert.alert('Signup failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join TrackWell</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#94a3b8"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#94a3b8"
      />
      <Button title={loading ? 'Creating...' : 'Sign up'} onPress={onSignup} disabled={loading} />
      <Text style={styles.footer} onPress={() => navigation.navigate('Login')}>
        Have an account? Log in
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0b1220' },
  title: { color: '#f8fafc', fontSize: 24, fontWeight: '800', marginBottom: 16 },
  input: {
    backgroundColor: '#111827',
    borderRadius: 10,
    padding: 12,
    color: '#e5e7eb',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1f2937'
  },
  footer: { color: '#60a5fa', marginTop: 12 }
});

export default SignupScreen;
