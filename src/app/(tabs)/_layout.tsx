import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { ColorValue } from 'react-native';

import { fonts } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

interface TabIconProps {
  color: ColorValue;
  size: number;
}

function renderHomeIcon({ color, size }: TabIconProps) {
  return <Ionicons name="home" color={color} size={size} />;
}

function renderPantryIcon({ color, size }: TabIconProps) {
  return <Ionicons name="basket" color={color} size={size} />;
}

export default function TabsLayout() {
  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: { fontFamily: fonts.semibold },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Início', tabBarIcon: renderHomeIcon }} />
      <Tabs.Screen name="pantry" options={{ title: 'Despensa', tabBarIcon: renderPantryIcon }} />
    </Tabs>
  );
}
