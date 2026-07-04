import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

interface SectionProps {
  title: string;
  children: ReactNode;
}

export function Section({ title, children }: SectionProps) {
  const { colors } = useTheme();
  return (
    <View style={styles.section}>
      <Text style={[typography.sectionTitle, styles.title, { color: colors.textSecondary }]}>
        {title}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.xs,
  },
});
