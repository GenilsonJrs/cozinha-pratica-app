import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/nunito';
import { Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import { darkNavigationTheme, lightNavigationTheme } from '@/theme/navigation';
import { fonts } from '@/theme/typography';

SplashScreen.preventAutoHideAsync();

const splashTimeoutMs = 3000;

export default function RootLayout() {
  const scheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTimedOut(true), splashTimeoutMs);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (fontsLoaded || timedOut) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, timedOut]);

  if (!fontsLoaded && !timedOut) {
    return null;
  }

  return (
    <ThemeProvider value={scheme === 'dark' ? darkNavigationTheme : lightNavigationTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="pantry-add"
          options={{
            presentation: 'modal',
            headerShown: true,
            title: 'Adicionar ingredientes',
            headerTitleStyle: { fontFamily: fonts.bold },
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
