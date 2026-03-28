import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';

export const secureStore = {
  set: async (key: string, value: string) => SecureStore.setItemAsync(key, value),
  get: async (key: string) => SecureStore.getItemAsync(key),
  delete: async (key: string) => SecureStore.deleteItemAsync(key),
  clearAll: async () => {
    // SecureStore has no bulk clear; trackwell-store is persisted via zustand storage
    await SecureStore.deleteItemAsync('trackwell-store');
  }
};

export const exportData = async (data: unknown) => {
  const fileUri = `${FileSystem.documentDirectory}trackwell-export-${Date.now()}.json`;
  await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data, null, 2), {
    encoding: FileSystem.EncodingType.UTF8
  });
  return fileUri;
};

export const deleteFile = async (uri: string) => {
  const info = await FileSystem.getInfoAsync(uri);
  if (info.exists) {
    await FileSystem.deleteAsync(uri, { idempotent: true });
  }
};
