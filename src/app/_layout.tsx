import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="pantry-add"
          options={{
            presentation: 'modal',
            headerShown: true,
            title: 'Adicionar ingredientes',
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
