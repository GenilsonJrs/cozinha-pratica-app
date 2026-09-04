import { Pressable, StyleSheet, Text, View } from 'react-native';

import { radius, spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

import { RecipeMatch } from '../types';
import { RecipeCover } from './recipe-cover';

export function missingLabel(missingCount: number): string {
  if (missingCount === 0) {
    return 'Dá pra fazer';
  }
  if (missingCount === 1) {
    return 'Falta 1 ingrediente';
  }
  return `Faltam ${missingCount} ingredientes`;
}

interface RecipeCardProps {
  match: RecipeMatch;
  onPress: () => void;
}

export function RecipeCard({ match, onPress }: RecipeCardProps) {
  const { colors } = useTheme();
  const { recipe, isComplete, missingIds } = match;
  const label = missingLabel(missingIds.length);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${recipe.name}. ${label}.`}
      onPress={onPress}
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
    >
      <RecipeCover recipe={recipe} />
      <View style={styles.body}>
        <Text numberOfLines={2} style={[typography.sectionTitle, { color: colors.textPrimary }]}>
          {recipe.name}
        </Text>
        <View style={styles.meta}>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>
            {recipe.minutes} min
          </Text>
          <View
            style={[
              styles.badge,
              { backgroundColor: isComplete ? colors.success : colors.border },
            ]}
          >
            <Text
              style={[
                typography.caption,
                { color: isComplete ? colors.onPrimary : colors.textSecondary },
              ]}
            >
              {label}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  body: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
  },
});
