import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { IngredientIcon } from '@/components/ui/ingredient-icon';
import { ingredients } from '@/features/pantry/catalog';
import { iconFor } from '@/features/pantry/ingredient-icons';
import { spacing } from '@/theme/spacing';
import { useTheme } from '@/theme/use-theme';

import { Recipe } from '../types';

const ingredientsById = new Map(ingredients.map((ingredient) => [ingredient.id, ingredient]));

const coverIngredientCount = 3;

interface RecipeCoverProps {
  recipe: Recipe;
  height?: number;
}

export function RecipeCover({ recipe, height = 180 }: RecipeCoverProps) {
  const { colors, tints } = useTheme();
  const [photoFailed, setPhotoFailed] = useState(false);

  const icons = recipe.ingredients
    .slice(0, coverIngredientCount)
    .map((ingredient) => ingredientsById.get(ingredient.id))
    .filter((ingredient) => ingredient !== undefined)
    .map((ingredient) => iconFor(ingredient.id, ingredient.category));

  const [hero, ...chips] = icons;
  const background = hero ? tints[hero.tint].background : colors.surface;

  if (recipe.photoUrl && !photoFailed) {
    return (
      <View style={[styles.cover, { height, backgroundColor: background }]}>
        <Image
          testID="recipe-cover-photo"
          source={{ uri: recipe.photoUrl }}
          style={styles.photo}
          resizeMode="cover"
          onError={() => setPhotoFailed(true)}
        />
      </View>
    );
  }

  return (
    <View testID="recipe-cover-art" style={[styles.cover, { height, backgroundColor: background }]}>
      {hero ? <IngredientIcon shape={hero.shape} tint={hero.tint} art={hero.art} size={height * 0.5} /> : null}
      {chips.length > 0 ? (
        <View style={styles.chips}>
          {chips.map((chip, index) => (
            <IngredientIcon
              key={`${chip.shape}-${chip.tint}-${index}`}
              shape={chip.shape}
              tint={chip.tint}
              art={chip.art}
              size={height * 0.24}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  cover: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  chips: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.md,
    flexDirection: 'row',
    gap: spacing.xs,
  },
});
