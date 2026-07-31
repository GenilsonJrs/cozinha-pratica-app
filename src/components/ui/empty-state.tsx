import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { spacing } from '@/theme/spacing';
import { fonts, typography } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

import { Button } from './button';
import { FadeIn } from './fade-in';

interface EmptyStateProps {
  illustration?: ReactNode;
  emoji?: string;
  title: string;
  message: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

export function EmptyState({
  illustration,
  emoji,
  title,
  message,
  actionLabel,
  onActionPress,
}: EmptyStateProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {illustration ? (
        <FadeIn distance={32} scaleFrom={0.88} duration={620}>
          {illustration}
        </FadeIn>
      ) : (
        emoji && (
          <FadeIn distance={32} scaleFrom={0.88} duration={620}>
            <Text style={styles.emoji}>{emoji}</Text>
          </FadeIn>
        )
      )}
      <FadeIn delay={150} style={styles.copy}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
        <Text style={[typography.body, styles.message, { color: colors.textSecondary }]}>
          {message}
        </Text>
      </FadeIn>
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
  copy: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
  },
});
