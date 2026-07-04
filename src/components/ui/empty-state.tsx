import { StyleSheet, Text, View } from 'react-native';

import { spacing } from '@/theme/spacing';
import { fonts, typography } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

import { Button } from './button';

interface EmptyStateProps {
  emoji: string;
  title: string;
  message: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

export function EmptyState({ emoji, title, message, actionLabel, onActionPress }: EmptyStateProps) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      <Text style={[typography.body, styles.message, { color: colors.textSecondary }]}>
        {message}
      </Text>
      {actionLabel && onActionPress && <Button label={actionLabel} onPress={onActionPress} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.xl,
  },
  emoji: {
    fontSize: 48,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.bold,
  },
  message: {
    textAlign: 'center',
  },
});
