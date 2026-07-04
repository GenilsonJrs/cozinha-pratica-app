import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CategorySectionProps {
  title: string;
  children: ReactNode;
}

export function CategorySection({ title, children }: CategorySectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#6B7280',
    marginBottom: 4,
  },
});
