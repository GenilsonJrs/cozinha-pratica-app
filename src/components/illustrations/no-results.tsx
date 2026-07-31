import Svg, { Circle, Defs, Ellipse, G, Line, LinearGradient, Path, Stop } from 'react-native-svg';

import { useTheme } from '@/theme/use-theme';

interface NoResultsIllustrationProps {
  width?: number;
  height?: number;
}

export function NoResultsIllustration({ width = 236, height = 177 }: NoResultsIllustrationProps) {
  const { colors, illustration } = useTheme();

  return (
    <Svg width={width} height={height} viewBox="0 0 400 300" accessibilityRole="image">
      <Defs>
        <LinearGradient id="noResultsTerra" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={illustration.terracottaFrom} />
          <Stop offset="100%" stopColor={illustration.terracottaTo} />
        </LinearGradient>
        <LinearGradient id="noResultsYolk" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={illustration.yolkFrom} />
          <Stop offset="100%" stopColor={illustration.yolkTo} />
        </LinearGradient>
      </Defs>

      <Ellipse
        cx={200}
        cy={205}
        rx={95}
        ry={34}
        fill="none"
        stroke={illustration.outline}
        strokeWidth={3.5}
        strokeDasharray="7 8"
        opacity={0.55}
      />
      <Ellipse
        cx={200}
        cy={205}
        rx={60}
        ry={20}
        fill="none"
        stroke={illustration.outline}
        strokeWidth={2.4}
        strokeDasharray="5 6"
        opacity={0.4}
      />

      <G transform="translate(70,60) rotate(-8)">
        <Path
          d="M20,26 C10,18 12,4 24,0 C34,-3 44,2 44,14 C44,24 34,32 22,30 Z"
          fill="url(#noResultsTerra)"
        />
        <Path
          d="M28,-2 C30,-10 40,-12 44,-6"
          fill="none"
          stroke={illustration.green}
          strokeWidth={4}
          strokeLinecap="round"
        />
      </G>

      <G transform="translate(285,80) rotate(10)">
        <Circle cx={20} cy={20} r={22} fill="url(#noResultsYolk)" />
        <Ellipse
          cx={13}
          cy={12}
          rx={6}
          ry={3.6}
          fill={illustration.shine}
          opacity={0.55}
          transform="rotate(-20 13 12)"
        />
      </G>

      <G transform="translate(96,120) rotate(14)">
        <Path
          d="M0,18 C-6,8 2,-4 14,-2 C22,-1 28,6 24,16 C20,26 6,28 0,18 Z"
          fill={illustration.green}
        />
        <Path
          d="M10,-2 L14,16"
          stroke={illustration.greenDeep}
          strokeWidth={1.6}
          fill="none"
          opacity={0.6}
        />
      </G>

      <G transform="translate(300,150) rotate(-12)">
        <Circle cx={18} cy={18} r={16} fill="none" stroke={colors.primary} strokeWidth={3.4} />
        <Line
          x1={29}
          y1={29}
          x2={42}
          y2={42}
          stroke={colors.primary}
          strokeWidth={4.4}
          strokeLinecap="round"
        />
      </G>

      <Path
        d="M100,72 Q160,150 172,190"
        fill="none"
        stroke={illustration.outline}
        strokeWidth={2}
        strokeDasharray="3 8"
        opacity={0.35}
      />
      <Path
        d="M300,100 Q250,160 228,190"
        fill="none"
        stroke={illustration.outline}
        strokeWidth={2}
        strokeDasharray="3 8"
        opacity={0.35}
      />

      <G transform="translate(148,150)">
        <Path
          d="M22,44 C6,32 8,15 24,9 C34,5 43,8 48,14 C58,7 74,10 76,24 C78,36 68,50 52,53 C38,56 16,54 8,46 C4,42 8,38 22,44 Z"
          fill={illustration.eggWhite}
          stroke={illustration.outline}
          strokeWidth={2.4}
          strokeLinejoin="round"
          transform="rotate(-6 42 30)"
        />
        <Circle cx={50} cy={26} r={18} fill="url(#noResultsYolk)" />
        <Ellipse
          cx={43}
          cy={18}
          rx={6.5}
          ry={3.8}
          fill={illustration.shine}
          opacity={0.6}
          transform="rotate(-24 43 18)"
        />
        <Ellipse cx={44} cy={24} rx={2} ry={2.6} fill={illustration.outline} />
        <Ellipse cx={58} cy={20} rx={2} ry={2.6} fill={illustration.outline} />
        <Path
          d="M39,18 Q43,13 48,15"
          fill="none"
          stroke={illustration.outline}
          strokeWidth={1.6}
          strokeLinecap="round"
        />
        <Path
          d="M55,13 Q60,15 62,19"
          fill="none"
          stroke={illustration.outline}
          strokeWidth={1.6}
          strokeLinecap="round"
        />
        <Path
          d="M46,35 Q50,38 54,35"
          fill="none"
          stroke={illustration.outline}
          strokeWidth={2.2}
          strokeLinecap="round"
        />
        <Path
          d="M8,4 C12,-2 18,-2 20,4"
          fill="none"
          stroke={illustration.outline}
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.7}
        />
        <Path
          d="M2,14 C6,10 10,12 10,17"
          fill="none"
          stroke={illustration.outline}
          strokeWidth={1.8}
          strokeLinecap="round"
          opacity={0.55}
        />
      </G>
    </Svg>
  );
}
