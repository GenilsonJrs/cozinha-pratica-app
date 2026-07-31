import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import { useTheme } from '@/theme/use-theme';

interface EmptyPantryIllustrationProps {
  width?: number;
  height?: number;
}

export function EmptyPantryIllustration({
  width = 236,
  height = 177,
}: EmptyPantryIllustrationProps) {
  const { colors, illustration } = useTheme();

  return (
    <Svg width={width} height={height} viewBox="0 0 400 300" accessibilityRole="image">
      <Defs>
        <LinearGradient id="pantryDisc" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={illustration.discFrom} />
          <Stop offset="100%" stopColor={illustration.discTo} />
        </LinearGradient>
        <LinearGradient id="pantryTerra" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={illustration.terracottaFrom} />
          <Stop offset="100%" stopColor={illustration.terracottaTo} />
        </LinearGradient>
        <LinearGradient id="pantryYolk" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={illustration.yolkFrom} />
          <Stop offset="100%" stopColor={illustration.yolkTo} />
        </LinearGradient>
      </Defs>

      <Path
        d="M75,55 C75,42 86,34 100,34 L300,34 C314,34 325,42 325,55 L328,258 C328,270 318,278 305,278 L95,278 C82,278 72,270 72,258 Z"
        fill="url(#pantryDisc)"
        stroke="url(#pantryTerra)"
        strokeWidth={7}
        strokeLinejoin="round"
      />
      <Path
        d="M78,132 C150,126 250,138 322,130"
        fill="none"
        stroke={colors.primary}
        strokeWidth={6}
        strokeLinecap="round"
        opacity={0.55}
      />
      <Path
        d="M76,202 C155,196 245,208 324,200"
        fill="none"
        stroke={colors.primary}
        strokeWidth={6}
        strokeLinecap="round"
        opacity={0.55}
      />

      <G opacity={0.6}>
        <Rect
          x={112}
          y={82}
          width={46}
          height={34}
          rx={10}
          fill="none"
          stroke={illustration.outline}
          strokeWidth={3.5}
          strokeDasharray="6 7"
        />
        <Rect
          x={122}
          y={72}
          width={26}
          height={12}
          rx={5}
          fill="none"
          stroke={illustration.outline}
          strokeWidth={3.5}
          strokeDasharray="6 7"
        />
      </G>
      <G opacity={0.6}>
        <Rect
          x={188}
          y={150}
          width={50}
          height={38}
          rx={11}
          fill="none"
          stroke={illustration.outline}
          strokeWidth={3.5}
          strokeDasharray="6 7"
        />
        <Rect
          x={199}
          y={139}
          width={28}
          height={13}
          rx={5}
          fill="none"
          stroke={illustration.outline}
          strokeWidth={3.5}
          strokeDasharray="6 7"
        />
      </G>
      <Ellipse
        cx={270}
        cy={168}
        rx={24}
        ry={27}
        fill="none"
        stroke={illustration.outline}
        strokeWidth={3.5}
        strokeDasharray="5 7"
        opacity={0.55}
      />

      <G transform="translate(30,196)">
        <Path
          d="M22,44 C6,32 8,15 24,9 C34,5 43,8 48,14 C58,7 74,10 76,24 C78,36 68,50 52,53 C38,56 16,54 8,46 C4,42 8,38 22,44 Z"
          fill={illustration.eggWhite}
          stroke={illustration.outline}
          strokeWidth={2.4}
          strokeLinejoin="round"
        />
        <Circle cx={52} cy={27} r={18} fill="url(#pantryYolk)" />
        <Ellipse
          cx={45}
          cy={19}
          rx={6.5}
          ry={3.8}
          fill={illustration.shine}
          opacity={0.6}
          transform="rotate(-24 45 19)"
        />
        <Ellipse cx={46} cy={23} rx={1.9} ry={2.5} fill={illustration.outline} />
        <Ellipse cx={58} cy={21} rx={1.9} ry={2.5} fill={illustration.outline} />
        <Path
          d="M43,17 Q46,13 50,15"
          fill="none"
          stroke={illustration.outline}
          strokeWidth={1.6}
          strokeLinecap="round"
        />
        <Path
          d="M55,15 Q59,12 63,15"
          fill="none"
          stroke={illustration.outline}
          strokeWidth={1.6}
          strokeLinecap="round"
        />
        <Path
          d="M47,34 Q53,40 61,33"
          fill="none"
          stroke={illustration.outline}
          strokeWidth={2.2}
          strokeLinecap="round"
        />
        <Path
          d="M8,30 Q-4,20 2,8"
          fill="none"
          stroke={illustration.outline}
          strokeWidth={2.4}
          strokeLinecap="round"
        />
      </G>

      <G transform="translate(215,214)">
        <Path d="M12,44 C6,30 8,20 12,10 L20,10 C24,20 26,30 20,44 Z" fill={colors.primary} />
        <Path
          d="M10,20 C0,14 -4,2 6,-4"
          fill="none"
          stroke={illustration.green}
          strokeWidth={5}
          strokeLinecap="round"
        />
        <Path
          d="M22,18 C32,10 34,-2 24,-8"
          fill="none"
          stroke={illustration.green}
          strokeWidth={5}
          strokeLinecap="round"
        />
        <Path
          d="M16,14 C16,4 16,-6 16,-14"
          fill="none"
          stroke={illustration.green}
          strokeWidth={5}
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
}
