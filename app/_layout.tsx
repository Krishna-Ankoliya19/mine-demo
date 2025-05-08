import React from 'react';
import { Tabs } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';

export default function Layout() {
  return (
    <TamaguiProvider config={config}>
      <Tabs>
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="profiles" options={{ title: 'Profile' }} />
        <Tabs.Screen name="upload" options={{ title: 'Upload' }} />
        <Tabs.Screen name="about" options={{ title: 'About' }} />
      </Tabs>
    </TamaguiProvider>
  );
}
