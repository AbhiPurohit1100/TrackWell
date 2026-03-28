import * as ImagePicker from 'expo-image-picker';

export const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0.8,
    base64: true
  });
  if (result.canceled) return null;
  return result.assets[0];
};

export const extractTextFromImage = async (base64: string | undefined): Promise<string> => {
  // Placeholder for OCR (ML Kit / Tesseract). For now, return a stub.
  if (!base64) return '';
  return 'Nicotine 12mg, Alcohol 2 units, THC 5mg';
};
