export type ArtName =
  | 'tomate'
  | 'cebola'
  | 'alho'
  | 'ovo'
  | 'arroz'
  | 'feijao'
  | 'leite'
  | 'cenoura'
  | 'batata'
  | 'banana'
  | 'queijo'
  | 'cafe';

export interface ArtPalettes {
  tomate: {
    line: string;
    skinFrom: string;
    skinTo: string;
    shade: string;
    gloss: string;
    leaf: string;
    leafDark: string;
  };
  cebola: { line: string; body: string; rib: string; leaf: string; leafDark: string };
  alho: { line: string; body: string; clove: string; neck: string; tip: string };
  ovo: { line: string; shell: string; warm: string; gloss: string };
  arroz: { line: string; body: string; cuff: string; label: string; mound: string; grain: string };
  feijao: { line: string; body: string; cuff: string; label: string; mound: string; grain: string };
  leite: {
    line: string;
    carton: string;
    cap: string;
    band: string;
    warm: string;
    gloss: string;
  };
  cenoura: {
    line: string;
    body: string;
    shade: string;
    groove: string;
    leaf: string;
    leafDark: string;
  };
  batata: { line: string; body: string; shade: string; eye: string };
  banana: { line: string; back: string; mid: string; front: string; tip: string };
  queijo: { line: string; body: string; top: string; hole: string };
  cafe: {
    line: string;
    body: string;
    cuff: string;
    label: string;
    mound: string;
    grain: string;
    crease: string;
  };
}

const lineSoft = '#3B2F2A';
const lineBold = '#241A15';
const lineBoldDark = '#F2E5D7';

export const lightArt: ArtPalettes = {
  tomate: {
    line: lineSoft,
    skinFrom: '#E0703F',
    skinTo: '#A63C1B',
    shade: '#A63C1B',
    gloss: '#FFF8EE',
    leaf: '#3E6B4F',
    leafDark: '#2C5240',
  },
  ovo: { line: lineSoft, shell: '#FDF6EF', warm: '#E28C29', gloss: '#FFF8EE' },
  leite: {
    line: lineSoft,
    carton: '#FDF6EF',
    cap: '#2C5240',
    band: '#3E6B4F',
    warm: '#E28C29',
    gloss: '#FFF8EE',
  },
  cenoura: {
    line: lineSoft,
    body: '#C86F1F',
    shade: '#A63C1B',
    groove: '#3B2F2A',
    leaf: '#3E6B4F',
    leafDark: '#2C5240',
  },
  batata: { line: lineSoft, body: '#9A6A38', shade: '#63432C', eye: '#3B2F2A' },

  cebola: { line: lineBold, body: '#E9A63C', rib: '#C0761A', leaf: '#3E6B4F', leafDark: '#2C5240' },
  alho: { line: lineBold, body: '#D3A3D6', clove: '#A874AE', neck: '#F5E7F2', tip: '#7FA35C' },
  banana: { line: lineBold, back: '#D99A1C', mid: '#EBB02C', front: '#F7C942', tip: '#3B2F2A' },
  queijo: { line: lineBold, body: '#F0B93A', top: '#F8D879', hole: '#D18E14' },
  arroz: {
    line: lineBold,
    body: '#E5C79A',
    cuff: '#D2AE7C',
    label: '#FBEBCB',
    mound: '#FFFDF8',
    grain: '#FFFDF8',
  },
  feijao: {
    line: lineBold,
    body: '#C98A4E',
    cuff: '#B0713A',
    label: '#F6E3C6',
    mound: '#B2743C',
    grain: '#8C5A2E',
  },
  cafe: {
    line: lineBold,
    body: '#8A5535',
    cuff: '#6F4227',
    label: '#EBD3B4',
    mound: '#5C3A22',
    grain: '#4A2E1C',
    crease: '#D2B79C',
  },
};

export const darkArt: ArtPalettes = {
  ...lightArt,
  cebola: { ...lightArt.cebola, line: lineBoldDark },
  alho: { ...lightArt.alho, line: lineBoldDark },
  banana: { ...lightArt.banana, line: lineBoldDark },
  queijo: { ...lightArt.queijo, line: lineBoldDark },
  arroz: { ...lightArt.arroz, line: lineBoldDark },
  feijao: { ...lightArt.feijao, line: lineBoldDark },
  cafe: { ...lightArt.cafe, line: lineBoldDark },
};
