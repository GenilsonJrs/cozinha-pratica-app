import { ReactNode } from 'react';
import {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

import { ArtName, ArtPalettes } from '@/theme/ingredient-art';
import { fonts } from '@/theme/typography';

interface SackTones {
  line: string;
  body: string;
  cuff: string;
  label: string;
  mound: string;
}

function Sack({ p, label, grains }: { p: SackTones; label: string; grains: ReactNode }) {
  return (
    <G>
      <Path
        d="M15,19 C14,13.5 17.5,9.5 21,10.8 C22.2,7.8 26,7.4 27.8,10.2 C31,8.8 34.2,11.4 34,14.6 C36.2,15.2 36.8,17.6 35.6,19.4 Z"
        fill={p.mound}
        stroke={p.line}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {grains}
      <Path
        d="M13.2,22.6 L34.8,22.6 L36.4,40.5 C36.7,43 34.8,44.8 32.4,44.8 L15.6,44.8 C13.2,44.8 11.3,43 11.6,40.5 Z"
        fill={p.body}
        stroke={p.line}
        strokeWidth={2.2}
        strokeLinejoin="round"
      />
      <Rect
        x={10.8}
        y={17.8}
        width={26.4}
        height={5.6}
        rx={2.4}
        fill={p.cuff}
        stroke={p.line}
        strokeWidth={2.2}
      />
      <Ellipse cx={24} cy={33.4} rx={9.6} ry={6.4} fill={p.label} stroke={p.line} strokeWidth={2} />
      <SvgText
        x={24}
        y={35.6}
        textAnchor="middle"
        fill={p.line}
        fontSize={5.2}
        fontFamily={fonts.bold}
      >
        {label}
      </SvgText>
    </G>
  );
}

function Tomate({ p }: { p: ArtPalettes['tomate'] }) {
  return (
    <G>
      <Defs>
        <LinearGradient id="tomateSkin" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={p.skinFrom} />
          <Stop offset="1" stopColor={p.skinTo} />
        </LinearGradient>
      </Defs>
      <Path
        d="M24,10 A14,16 0 1,1 24,42 A15,16 0 1,1 24,10 Z"
        fill="url(#tomateSkin)"
        stroke={p.line}
        strokeWidth={1}
        strokeOpacity={0.35}
      />
      <Path
        d="M33,29c1.4,4.6 -1,9 -5.4,11.4c3.8,-1.4 6.6,-4.6 7.6,-8.6c0.6,-2.4 0.4,-4.8 -0.4,-7c-0.6,1.4 -1.2,2.8 -1.8,4.2z"
        fill={p.shade}
        opacity={0.4}
      />
      <Ellipse
        cx={17.5}
        cy={17.5}
        rx={3}
        ry={4.2}
        fill={p.gloss}
        opacity={0.5}
        transform="rotate(-25 17.5 17.5)"
      />
      <G fill={p.leaf}>
        <Path d="M24,11c-1.6,-2.6 -1.4,-5.6 0.2,-8c1.4,2.8 1.4,5.8 0,8z" />
        <Path
          d="M24,11c-1.6,-2.6 -1.4,-5.6 0.2,-8c1.4,2.8 1.4,5.8 0,8z"
          transform="rotate(72 24 11)"
        />
        <Path
          d="M24,11c-1.6,-2.6 -1.4,-5.6 0.2,-8c1.4,2.8 1.4,5.8 0,8z"
          transform="rotate(144 24 11)"
        />
        <Path
          d="M24,11c-1.6,-2.6 -1.4,-5.6 0.2,-8c1.4,2.8 1.4,5.8 0,8z"
          transform="rotate(216 24 11)"
        />
        <Path
          d="M24,11c-1.6,-2.6 -1.4,-5.6 0.2,-8c1.4,2.8 1.4,5.8 0,8z"
          transform="rotate(288 24 11)"
        />
      </G>
      <Circle cx={24} cy={10.5} r={1.6} fill={p.leafDark} />
    </G>
  );
}

function Ovo({ p }: { p: ArtPalettes['ovo'] }) {
  return (
    <G>
      <Path
        d="M13,24 A11,10 0 1,1 35,24 A11,15 0 1,1 13,24 Z"
        fill={p.shell}
        stroke={p.line}
        strokeWidth={1.1}
        strokeOpacity={0.5}
      />
      <Path
        d="M30,18c3,5 3.4,11 1,16.4"
        stroke={p.warm}
        strokeWidth={4}
        opacity={0.16}
        strokeLinecap="round"
        fill="none"
      />
      <Ellipse
        cx={19}
        cy={17}
        rx={2.6}
        ry={3.6}
        fill={p.gloss}
        opacity={0.6}
        transform="rotate(-25 19 17)"
      />
    </G>
  );
}

function Leite({ p }: { p: ArtPalettes['leite'] }) {
  return (
    <G>
      <Rect x={19} y={6} width={10} height={5} rx={2} fill={p.cap} />
      <Rect
        x={20}
        y={10}
        width={8}
        height={6}
        rx={1.5}
        fill={p.carton}
        stroke={p.line}
        strokeWidth={1}
        strokeOpacity={0.5}
      />
      <Path
        d="M16,17c0,-0.6 0.4,-1 1,-1h14c0.6,0 1,0.4 1,1l1.6,18c0.3,3.6 -2.6,6.7 -6.2,6.7h-6.8c-3.6,0 -6.5,-3.1 -6.2,-6.7z"
        fill={p.carton}
        stroke={p.line}
        strokeWidth={1.2}
        strokeOpacity={0.55}
      />
      <Path
        d="M30,20c1.6,6 1.8,12.4 0.6,18.4"
        stroke={p.warm}
        strokeWidth={3}
        opacity={0.16}
        strokeLinecap="round"
        fill="none"
      />
      <Rect x={14.5} y={26} width={19} height={6} rx={1.5} fill={p.band} />
      <Ellipse
        cx={19.5}
        cy={20}
        rx={1.4}
        ry={2.6}
        fill={p.gloss}
        opacity={0.5}
        transform="rotate(-10 19.5 20)"
      />
    </G>
  );
}

function Cenoura({ p }: { p: ArtPalettes['cenoura'] }) {
  return (
    <G>
      <Path
        d="M17,15c2.6,-1.7 6,-2.3 9,-1.3c0.6,7.4 -0.2,15 -2.6,22c-1,3 -2.3,5.8 -3.9,8.3c-2,-3.4 -3.3,-7.3 -3.9,-11.3c-1.2,-7.9 -0.7,-12.7 1.4,-17.7z"
        fill={p.body}
        stroke={p.line}
        strokeWidth={1}
        strokeOpacity={0.3}
      />
      <Path
        d="M25,16c1,7.4 0.2,15.2 -2.2,22.2c-0.7,2 -1.6,3.9 -2.6,5.6"
        stroke={p.shade}
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.35}
        fill="none"
      />
      <Path
        d="M18,22c2.6,0.9 5.6,1.1 8,0.4"
        stroke={p.groove}
        strokeWidth={0.8}
        opacity={0.4}
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M17.6,28c2.8,1 6.2,1.2 9,0.4"
        stroke={p.groove}
        strokeWidth={0.8}
        opacity={0.4}
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M18.4,34c2.2,0.9 5,1.1 7.2,0.4"
        stroke={p.groove}
        strokeWidth={0.8}
        opacity={0.4}
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M23,15c-1.4,-3.4 -1.2,-7 0.3,-10c1.6,3 1.9,6.6 0.7,10z"
        fill={p.leafDark}
        transform="rotate(-24 23 15)"
      />
      <Path
        d="M23,15c-1.4,-3.4 -1.2,-7 0.3,-10c1.6,3 1.9,6.6 0.7,10z"
        fill={p.leaf}
        transform="rotate(-38 23 15)"
      />
      <Path
        d="M23,15c-1.4,-3.4 -1.2,-7 0.3,-10c1.6,3 1.9,6.6 0.7,10z"
        fill={p.leaf}
        transform="rotate(-12 23 15)"
      />
      <Path
        d="M23,15c-1.4,-3.4 -1.2,-7 0.3,-10c1.6,3 1.9,6.6 0.7,10z"
        fill={p.leaf}
        transform="rotate(10 23 15)"
      />
      <Path
        d="M23,15c-1.4,-3.4 -1.2,-7 0.3,-10c1.6,3 1.9,6.6 0.7,10z"
        fill={p.leaf}
        transform="rotate(30 23 15)"
      />
    </G>
  );
}

function Batata({ p }: { p: ArtPalettes['batata'] }) {
  return (
    <G>
      <Path
        d="M10,24c-0.4,-5.6 3.4,-10.6 9,-12.4c5.4,-1.7 11.4,0.3 14.6,5c3.6,5.3 3,12.4 -1.4,17c-4.3,4.5 -11,6 -16.6,3.6c-4.4,-1.9 -5.2,-7.6 -5.6,-13.2z"
        fill={p.body}
        stroke={p.line}
        strokeWidth={1}
        strokeOpacity={0.35}
      />
      <Path
        d="M28,15c3,5 3.6,11 1.6,16.6"
        stroke={p.shade}
        strokeWidth={4}
        opacity={0.3}
        strokeLinecap="round"
        fill="none"
      />
      <Ellipse cx={19} cy={20} rx={1.1} ry={0.9} fill={p.eye} opacity={0.7} />
      <Ellipse cx={29} cy={24} rx={1} ry={0.8} fill={p.eye} opacity={0.7} />
      <Ellipse cx={23} cy={31} rx={1.2} ry={1} fill={p.eye} opacity={0.7} />
      <Ellipse cx={16} cy={27} rx={0.9} ry={0.8} fill={p.eye} opacity={0.6} />
    </G>
  );
}

function Cebola({ p }: { p: ArtPalettes['cebola'] }) {
  return (
    <G>
      <Path
        d="M24,17 C22.6,11 20.6,6.6 17.6,3.4 C16.6,8.4 18.4,13.6 21.8,17.6 Z"
        fill={p.leaf}
        stroke={p.line}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Path
        d="M24.6,17 C25.4,11 27.4,7 30.4,4.2 C31,9.2 29.2,14 25.8,17.6 Z"
        fill={p.leaf}
        stroke={p.line}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Path
        d="M23.2,17.4 C23,11 23.2,6.4 24,2.6 C25.6,6.4 26,11 25.4,17.4 Z"
        fill={p.leafDark}
        stroke={p.line}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Path
        d="M24,15.6 C32.6,15.6 39.4,23.4 39.4,31.6 C39.4,39.4 32.6,44.6 24,44.6 C15.4,44.6 8.6,39.4 8.6,31.6 C8.6,23.4 15.4,15.6 24,15.6 Z"
        fill={p.body}
        stroke={p.line}
        strokeWidth={2.3}
        strokeLinejoin="round"
      />
      <Path
        d="M24,16.4 C21.2,24 20.8,35 22.2,43.8"
        stroke={p.rib}
        strokeWidth={1.7}
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M24,16.4 C26.8,24 27.2,35 25.8,43.8"
        stroke={p.rib}
        strokeWidth={1.7}
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M17.4,18.6 C13.8,25 12.8,34 14.8,41.4"
        stroke={p.rib}
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M30.6,18.6 C34.2,25 35.2,34 33.2,41.4"
        stroke={p.rib}
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M20.6,16.6 C22.4,15.2 25.6,15.2 27.4,16.6"
        stroke={p.line}
        strokeWidth={2.4}
        fill="none"
        strokeLinecap="round"
      />
    </G>
  );
}

function Alho({ p }: { p: ArtPalettes['alho'] }) {
  return (
    <G>
      <Path
        d="M24,14.5 C20.6,16.4 17.4,19 15,22.4 C11.2,27.6 10.6,33.6 13.4,38.4 C16,42.8 20.6,45 24,45 C27.4,45 32,42.8 34.6,38.4 C37.4,33.6 36.8,27.6 33,22.4 C30.6,19 27.4,16.4 24,14.5 Z"
        fill={p.body}
        stroke={p.line}
        strokeWidth={2.3}
        strokeLinejoin="round"
      />
      <Path
        d="M24,15.4 C20.8,23.4 19.4,34 20.2,44.6"
        stroke={p.clove}
        strokeWidth={1.7}
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M24,15.4 C27.2,23.4 28.6,34 27.8,44.6"
        stroke={p.clove}
        strokeWidth={1.7}
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M16.6,21.6 C13.6,27.4 12.8,35 14.4,41"
        stroke={p.clove}
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M31.4,21.6 C34.4,27.4 35.2,35 33.6,41"
        stroke={p.clove}
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M21.6,15.6 C21.6,11 22,7.8 22.6,5.6 L25.4,5.6 C26,7.8 26.4,11 26.4,15.6 C25.6,14.6 22.4,14.6 21.6,15.6 Z"
        fill={p.neck}
        stroke={p.line}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M22.4,6.6 C23,3.8 25,3.8 25.6,6.6 Z"
        fill={p.tip}
        stroke={p.line}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </G>
  );
}

function Banana({ p }: { p: ArtPalettes['banana'] }) {
  return (
    <G>
      <Path
        d="M9.6,33 C8,25 14,14.6 25.6,10.6 C29,9.4 31.6,11.4 30.6,14.2 C21.6,17.4 16.2,24.6 17,32.8 C17.4,36.6 10.8,37.4 9.6,33 Z"
        fill={p.back}
        stroke={p.line}
        strokeWidth={2.2}
        strokeLinejoin="round"
      />
      <Path
        d="M13.6,36 C12,28 18,17.6 29.6,13.6 C33,12.4 35.6,14.4 34.6,17.2 C25.6,20.4 20.2,27.6 21,35.8 C21.4,39.6 14.8,40.4 13.6,36 Z"
        fill={p.mid}
        stroke={p.line}
        strokeWidth={2.2}
        strokeLinejoin="round"
      />
      <Path
        d="M18,39 C16.4,31 22.4,20.6 34,16.6 C37.4,15.4 40,17.4 39,20.2 C30,23.4 24.6,30.6 25.4,38.8 C25.8,42.6 19.2,43.4 18,39 Z"
        fill={p.front}
        stroke={p.line}
        strokeWidth={2.2}
        strokeLinejoin="round"
      />
      <Path
        d="M35,16.8 C36.8,16 39.2,16.6 39.4,18.4 C39.6,20 38.4,21 36.6,21.4 Z"
        fill={p.tip}
        stroke={p.line}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path
        d="M18.4,40 C17.8,42.4 19.6,44 21.8,43.6 C23.6,43.2 24.4,41.8 24.2,40.2 Z"
        fill={p.tip}
        stroke={p.line}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </G>
  );
}

function Queijo({ p }: { p: ArtPalettes['queijo'] }) {
  return (
    <G>
      <Path
        d="M6.6,29.6 L25.4,11.6 C34,11.6 41.4,18.6 41.4,26.8 L41.4,36.4 C41.4,38.2 40,39.4 38.2,39.4 L9.8,39.4 C8,39.4 6.6,38.2 6.6,36.4 Z"
        fill={p.body}
        stroke={p.line}
        strokeWidth={2.3}
        strokeLinejoin="round"
      />
      <Path
        d="M6.6,29.6 L25.4,11.6 C34,11.6 41.4,18.6 41.4,26.8 L6.6,29.6 Z"
        fill={p.top}
        stroke={p.line}
        strokeWidth={2.2}
        strokeLinejoin="round"
      />
      <Circle cx={14.6} cy={34.6} r={2.5} fill={p.hole} stroke={p.line} strokeWidth={1.5} />
      <Circle cx={24.6} cy={34.8} r={3.1} fill={p.hole} stroke={p.line} strokeWidth={1.5} />
      <Circle cx={34.4} cy={34} r={2.1} fill={p.hole} stroke={p.line} strokeWidth={1.5} />
      <Circle cx={19.4} cy={20.6} r={1.9} fill={p.hole} stroke={p.line} strokeWidth={1.4} />
      <Circle cx={30.8} cy={22.8} r={2.3} fill={p.hole} stroke={p.line} strokeWidth={1.4} />
    </G>
  );
}

function Arroz({ p }: { p: ArtPalettes['arroz'] }) {
  const grains = (
    <G fill={p.grain} stroke={p.line} strokeWidth={0.75}>
      <Ellipse cx={19.8} cy={14.8} rx={2.1} ry={1.2} transform="rotate(-22 19.8 14.8)" />
      <Ellipse cx={26.4} cy={13} rx={2.1} ry={1.2} transform="rotate(14 26.4 13)" />
      <Ellipse cx={31} cy={16.4} rx={2} ry={1.2} transform="rotate(-8 31 16.4)" />
      <Ellipse cx={23.4} cy={17.4} rx={2} ry={1.2} transform="rotate(6 23.4 17.4)" />
    </G>
  );
  return <Sack p={p} label="ARROZ" grains={grains} />;
}

function Feijao({ p }: { p: ArtPalettes['feijao'] }) {
  const grains = (
    <G fill={p.grain} stroke={p.line} strokeWidth={0.85}>
      <Ellipse cx={19.8} cy={14.6} rx={2.6} ry={1.8} transform="rotate(-20 19.8 14.6)" />
      <Ellipse cx={27} cy={12.8} rx={2.6} ry={1.8} transform="rotate(16 27 12.8)" />
      <Ellipse cx={31.4} cy={16.6} rx={2.4} ry={1.7} transform="rotate(-6 31.4 16.6)" />
      <Ellipse cx={23.6} cy={17.6} rx={2.4} ry={1.7} transform="rotate(8 23.6 17.6)" />
    </G>
  );
  return <Sack p={p} label="FEIJÃO" grains={grains} />;
}

function Cafe({ p }: { p: ArtPalettes['cafe'] }) {
  const grains = (
    <G>
      <G fill={p.grain} stroke={p.line} strokeWidth={0.85}>
        <Ellipse cx={19.8} cy={14.6} rx={2.5} ry={1.8} transform="rotate(-20 19.8 14.6)" />
        <Ellipse cx={27} cy={12.8} rx={2.5} ry={1.8} transform="rotate(16 27 12.8)" />
        <Ellipse cx={31.4} cy={16.6} rx={2.3} ry={1.7} transform="rotate(-6 31.4 16.6)" />
        <Ellipse cx={23.6} cy={17.6} rx={2.3} ry={1.7} transform="rotate(8 23.6 17.6)" />
      </G>
      <Path
        d="M18.4,13.8 C19.6,14.6 21,15 22,15.1"
        stroke={p.crease}
        strokeWidth={0.7}
        fill="none"
      />
      <Path
        d="M25.4,12.2 C26.6,12.9 28,13.3 29,13.3"
        stroke={p.crease}
        strokeWidth={0.7}
        fill="none"
      />
    </G>
  );
  return <Sack p={p} label="CAFÉ" grains={grains} />;
}

export function IngredientArt({ name, palettes }: { name: ArtName; palettes: ArtPalettes }) {
  switch (name) {
    case 'tomate':
      return <Tomate p={palettes.tomate} />;
    case 'ovo':
      return <Ovo p={palettes.ovo} />;
    case 'leite':
      return <Leite p={palettes.leite} />;
    case 'cenoura':
      return <Cenoura p={palettes.cenoura} />;
    case 'batata':
      return <Batata p={palettes.batata} />;
    case 'cebola':
      return <Cebola p={palettes.cebola} />;
    case 'alho':
      return <Alho p={palettes.alho} />;
    case 'banana':
      return <Banana p={palettes.banana} />;
    case 'queijo':
      return <Queijo p={palettes.queijo} />;
    case 'arroz':
      return <Arroz p={palettes.arroz} />;
    case 'feijao':
      return <Feijao p={palettes.feijao} />;
    case 'cafe':
      return <Cafe p={palettes.cafe} />;
  }
}
