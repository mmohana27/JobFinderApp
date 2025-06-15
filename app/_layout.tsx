

import { initDB } from '@/utils/bookmark';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [dbReady, setDbReady] = useState(Platform.OS === 'web'); // web doesn't need DB
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (Platform.OS !== 'web') {
      initDB()
        .then(() => {
          setDbReady(true);
        })
        .catch((err) => {
          console.error('❌ Failed to initialize DB:', err);
        });
    } else {
      console.warn('⚠️ Skipping SQLite DB initialization on web.');
    }
  }, []);

  if (!fontsLoaded || !dbReady) {
    return null; // Wait until fonts and DB are ready
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
