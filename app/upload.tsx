import React, { useState } from 'react';
import { Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { YStack, Text } from 'tamagui';

export default function UploadScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    // Ask for media library permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // If user didn't cancel, update state
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <YStack f={1} jc="center" ai="center" space="$4">
      <Text fontSize="$6" fontWeight="bold">Upload an Image</Text>
      <Button title="Pick an image" onPress={pickImage} />
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 500, height: 300, marginTop: 20, borderRadius: 12 }}
          resizeMode="cover"
        />
      )}
    </YStack>
  );
}
