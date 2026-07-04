import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { LoadingView } from '@/components/ui/loading-view';
import { Screen } from '@/components/ui/screen';
import { greetingForHour } from '@/features/home/greeting';
import { usePantryStore } from '@/features/pantry/pantry-store';
import { radius, spacing } from '@/theme/spacing';
import { fonts, typography } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

function pantrySummaryFor(count: number): string {
  if (count === 0) {
    return 'Sua despensa ainda está vazia.';
  }
  if (count === 1) {
    return 'Você tem 1 ingrediente na despensa.';
  }
  return `Você tem ${count} ingredientes na despensa.`;
}

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const ingredientIds = usePantryStore((state) => state.ingredientIds);
  const hasHydrated = usePantryStore((state) => state.hasHydrated);

  if (!hasHydrated) {
    return <LoadingView />;
  }

  const pantrySummary = pantrySummaryFor(ingredientIds.length);

  return (
    <Screen>
      <Text style={[typography.screenTitle, { color: colors.textPrimary }]}>
        {greetingForHour(new Date().getHours())}
      </Text>
      <Text style={[typography.body, styles.subtitle, { color: colors.textSecondary }]}>
        O que vamos cozinhar hoje?
      </Text>
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>🧺 Sua despensa</Text>
        <Text style={[typography.body, styles.cardBody, { color: colors.textSecondary }]}>
          {pantrySummary}
        </Text>
        <Button label="Adicionar ingredientes" onPress={() => router.push('/pantry-add')} />
      </View>
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>🍲 Receitas em breve</Text>
        <Text style={[typography.body, styles.cardBody, { color: colors.textSecondary }]}>
          Logo o app vai sugerir receitas com o que você já tem em casa. É o próximo passo!
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  card: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  cardBody: {
    marginBottom: spacing.xs,
  },
});
