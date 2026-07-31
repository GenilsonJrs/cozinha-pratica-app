export type TintName = 'tomato' | 'carrot' | 'yolk' | 'leaf' | 'grain' | 'cream' | 'cocoa';

export interface Tint {
  background: string;
  foreground: string;
}

export const lightTints: Record<TintName, Tint> = {
  tomato: { background: '#F8DED4', foreground: '#BC4B26' },
  carrot: { background: '#FBE7D0', foreground: '#C86F1F' },
  yolk: { background: '#FBF0D3', foreground: '#B98908' },
  leaf: { background: '#DEEAE0', foreground: '#3E6B4F' },
  grain: { background: '#F1E5D3', foreground: '#9A6A38' },
  cream: { background: '#F4EDE3', foreground: '#7C6753' },
  cocoa: { background: '#E9DDD2', foreground: '#63432C' },
};

export const darkTints: Record<TintName, Tint> = {
  tomato: { background: '#3E241A', foreground: '#FF8A5C' },
  carrot: { background: '#3B2A18', foreground: '#F0A055' },
  yolk: { background: '#3A3018', foreground: '#F2B04A' },
  leaf: { background: '#22332A', foreground: '#8FC2A2' },
  grain: { background: '#37291C', foreground: '#D3A16A' },
  cream: { background: '#332921', foreground: '#C4B5A8' },
  cocoa: { background: '#2E231B', foreground: '#B48C6C' },
};
