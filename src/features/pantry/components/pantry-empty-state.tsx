import { StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from './primary-button';

interface PantryEmptyStateProps {
  onAddPress: () => void;
}

export function PantryEmptyState({ onAddPress }: PantryEmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🧺</Text>
      <Text style={styles.title}>Sua despensa está vazia</Text>
      <Text style={styles.message}>
        Adicione os ingredientes que você tem em casa para receber receitas compatíveis.
      </Text>
      <PrimaryButton label="Adicionar ingredientes" onPress={onAddPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
  },
  emoji: {
    fontSize: 48,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 15,
    textAlign: 'center',
    color: '#6B7280',
  },
});
