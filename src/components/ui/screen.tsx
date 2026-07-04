import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing } from '@/theme/spacing';
import { useTheme } from '@/theme/use-theme';

interface ScreenProps {
  children: ReactNode;
  withTopInset?: boolean;
}

export function Screen({ children, withTopInset = true }: ScreenProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const paddingTop = withTopInset ? insets.top + spacing.lg : spacing.lg;
  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
});
