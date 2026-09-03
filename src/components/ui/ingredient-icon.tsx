import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';

import { IconShape } from '@/features/pantry/ingredient-icons';
import { ArtName } from '@/theme/ingredient-art';
import { TintName } from '@/theme/ingredient-tints';

import { IngredientArt } from './ingredient-art';
import { useTheme } from '@/theme/use-theme';

interface IngredientIconProps {
  shape: IconShape;
  tint: TintName;
  art?: ArtName;
  size?: number;
}

function Shape({ shape, color }: { shape: IconShape; color: string }) {
  switch (shape) {
    case 'round':
      return (
        <G>
          <Circle cx={24} cy={26} r={14} fill={color} />
          <Path
            d="M24 12 C26 6 32 5 34 8"
            stroke={color}
            strokeWidth={2.6}
            strokeLinecap="round"
            fill="none"
          />
        </G>
      );
    case 'leaf':
      return (
        <G>
          <Path
            d="M24 40 C12 34 10 18 24 10 C38 18 36 34 24 40 Z"
            fill={color}
            transform="rotate(-8 24 24)"
          />
          <Path
            d="M24 38 L24 14"
            stroke={color}
            strokeWidth={1.6}
            strokeLinecap="round"
            opacity={0.45}
          />
        </G>
      );
    case 'root':
      return (
        <G>
          <Path d="M20 10 L28 10 L26 38 C25 41 23 41 22 38 Z" fill={color} />
          <Path
            d="M20 10 C16 4 12 6 14 10"
            stroke={color}
            strokeWidth={2.4}
            strokeLinecap="round"
            fill="none"
          />
          <Path
            d="M28 10 C32 4 36 6 34 10"
            stroke={color}
            strokeWidth={2.4}
            strokeLinecap="round"
            fill="none"
          />
        </G>
      );
    case 'long':
      return (
        <Path
          d="M16 38 C10 30 12 14 24 10 C34 14 36 30 30 38 C26 42 20 42 16 38 Z"
          fill={color}
          transform="rotate(14 24 24)"
        />
      );
    case 'egg':
      return (
        <G>
          <Path
            d="M24 8 C33 8 39 18 39 26 C39 34 32 40 24 40 C16 40 9 34 9 26 C9 18 15 8 24 8 Z"
            fill={color}
            opacity={0.35}
          />
          <Circle cx={24} cy={25} r={9} fill={color} />
        </G>
      );
    case 'bottle':
      return (
        <G>
          <Rect x={20} y={7} width={8} height={8} rx={2} fill={color} />
          <Path d="M18 18 C18 15 30 15 30 18 L32 38 C32 41 16 41 16 38 Z" fill={color} />
        </G>
      );
    case 'bag':
      return (
        <G>
          <Path d="M14 16 L34 16 L32 40 C32 41 16 41 16 40 Z" fill={color} />
          <Path d="M16 16 C18 10 30 10 32 16" fill={color} opacity={0.45} />
        </G>
      );
    case 'meat':
      return (
        <G>
          <Path
            d="M12 28 C12 16 22 10 32 14 C40 18 40 32 32 38 C22 43 12 38 12 28 Z"
            fill={color}
          />
          <Ellipse cx={30} cy={26} rx={5} ry={6} fill={color} opacity={0.4} />
        </G>
      );
    case 'fish':
      return (
        <G>
          <Path d="M10 24 C16 14 32 14 38 24 C32 34 16 34 10 24 Z" fill={color} />
          <Path d="M38 24 L44 18 L44 30 Z" fill={color} />
          <Circle cx={18} cy={22} r={2} fill={color} opacity={0.35} />
        </G>
      );
    case 'cheese':
      return (
        <G>
          <Path d="M10 34 L38 16 L38 34 Z" fill={color} />
          <Circle cx={30} cy={28} r={2.6} fill={color} opacity={0.35} />
          <Circle cx={22} cy={31} r={2} fill={color} opacity={0.35} />
        </G>
      );
    case 'can':
      return (
        <G>
          <Rect x={14} y={12} width={20} height={26} rx={4} fill={color} />
          <Ellipse cx={24} cy={13} rx={10} ry={3.4} fill={color} opacity={0.45} />
          <Rect x={17} y={22} width={14} height={7} rx={2} fill={color} opacity={0.35} />
        </G>
      );
    case 'shaker':
      return (
        <G>
          <Path d="M16 18 L32 18 L34 38 C34 41 14 41 14 38 Z" fill={color} />
          <Rect x={18} y={10} width={12} height={8} rx={3} fill={color} opacity={0.5} />
          <Circle cx={22} cy={13} r={1.2} fill={color} />
          <Circle cx={27} cy={13} r={1.2} fill={color} />
        </G>
      );
    case 'bread':
      return (
        <G>
          <Path
            d="M10 32 C10 20 16 14 24 14 C32 14 38 20 38 32 C38 35 10 35 10 32 Z"
            fill={color}
          />
          <Path
            d="M16 22 L20 18 M23 21 L27 17 M30 22 L33 19"
            stroke={color}
            strokeWidth={1.8}
            strokeLinecap="round"
            opacity={0.4}
          />
        </G>
      );
    case 'pasta':
      return (
        <G>
          <Path
            d="M17 10 C13 20 13 30 17 40 M24 10 C20 20 20 30 24 40 M31 10 C27 20 27 30 31 40"
            stroke={color}
            strokeWidth={3.4}
            strokeLinecap="round"
            fill="none"
          />
        </G>
      );
    case 'cup':
      return (
        <G>
          <Path d="M13 18 L33 18 L31 36 C31 39 15 39 15 36 Z" fill={color} />
          <Path
            d="M33 22 C39 22 39 30 33 30"
            stroke={color}
            strokeWidth={2.8}
            fill="none"
            strokeLinecap="round"
          />
          <Path
            d="M20 12 C18 9 22 7 20 4 M27 12 C25 9 29 7 27 4"
            stroke={color}
            strokeWidth={1.8}
            strokeLinecap="round"
            fill="none"
            opacity={0.5}
          />
        </G>
      );
    case 'jar':
      return (
        <G>
          <Rect x={15} y={16} width={18} height={22} rx={4} fill={color} />
          <Rect x={13} y={9} width={22} height={7} rx={3} fill={color} opacity={0.5} />
          <Rect x={18} y={23} width={12} height={8} rx={2} fill={color} opacity={0.35} />
        </G>
      );
    default:
      return <Circle cx={24} cy={24} r={13} fill={color} />;
  }
}

export function IngredientIcon({ shape, tint, art, size = 48 }: IngredientIconProps) {
  const theme = useTheme();
  const palette = theme.tints[tint];

  return (
    <View
      style={[
        styles.tile,
        {
          width: size,
          height: size,
          borderRadius: size * 0.3,
          backgroundColor: palette.background,
        },
      ]}
    >
      <Svg width={size * 0.72} height={size * 0.72} viewBox="0 0 48 48">
        {art ? (
          <IngredientArt name={art} palettes={theme.art} />
        ) : (
          <Shape shape={shape} color={palette.foreground} />
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
