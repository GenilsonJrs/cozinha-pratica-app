import { ArtName } from '@/theme/ingredient-art';
import { TintName } from '@/theme/ingredient-tints';

import { IngredientCategory } from './types';

export type IconShape =
  | 'round'
  | 'leaf'
  | 'root'
  | 'long'
  | 'egg'
  | 'bottle'
  | 'bag'
  | 'meat'
  | 'fish'
  | 'cheese'
  | 'can'
  | 'shaker'
  | 'bread'
  | 'pasta'
  | 'cup'
  | 'jar';

export interface IngredientIcon {
  shape: IconShape;
  tint: TintName;
  art?: ArtName;
}

const byCategory: Record<IngredientCategory, IngredientIcon> = {
  produce: { shape: 'round', tint: 'leaf' },
  protein: { shape: 'meat', tint: 'tomato' },
  grains: { shape: 'bag', tint: 'grain' },
  dairy: { shape: 'bottle', tint: 'cream' },
  seasonings: { shape: 'shaker', tint: 'grain' },
  canned: { shape: 'can', tint: 'grain' },
  bakery: { shape: 'bread', tint: 'grain' },
  beverages: { shape: 'bottle', tint: 'cream' },
};

const byIngredient: Record<string, IngredientIcon> = {
  tomate: { shape: 'round', tint: 'tomato', art: 'tomate' },
  cebola: { shape: 'round', tint: 'cream', art: 'cebola' },
  alho: { shape: 'round', tint: 'cream', art: 'alho' },
  batata: { shape: 'round', tint: 'grain', art: 'batata' },
  'batata-doce': { shape: 'root', tint: 'carrot' },
  cenoura: { shape: 'root', tint: 'carrot', art: 'cenoura' },
  mandioca: { shape: 'root', tint: 'grain' },
  abobrinha: { shape: 'long', tint: 'leaf' },
  abobora: { shape: 'round', tint: 'carrot' },
  chuchu: { shape: 'round', tint: 'leaf' },
  beterraba: { shape: 'round', tint: 'tomato' },
  pimentao: { shape: 'long', tint: 'leaf' },
  pepino: { shape: 'long', tint: 'leaf' },
  alface: { shape: 'leaf', tint: 'leaf' },
  couve: { shape: 'leaf', tint: 'leaf' },
  repolho: { shape: 'round', tint: 'leaf' },
  brocolis: { shape: 'leaf', tint: 'leaf' },
  'couve-flor': { shape: 'leaf', tint: 'cream' },
  espinafre: { shape: 'leaf', tint: 'leaf' },
  rucula: { shape: 'leaf', tint: 'leaf' },
  quiabo: { shape: 'long', tint: 'leaf' },
  berinjela: { shape: 'long', tint: 'cocoa' },
  'milho-verde': { shape: 'long', tint: 'yolk' },
  gengibre: { shape: 'root', tint: 'grain' },
  limao: { shape: 'round', tint: 'leaf' },
  laranja: { shape: 'round', tint: 'carrot' },
  banana: { shape: 'long', tint: 'yolk', art: 'banana' },
  maca: { shape: 'round', tint: 'tomato' },
  mamao: { shape: 'round', tint: 'carrot' },
  abacaxi: { shape: 'round', tint: 'yolk' },
  maracuja: { shape: 'round', tint: 'yolk' },
  coco: { shape: 'round', tint: 'cocoa' },

  'peito-de-frango': { shape: 'meat', tint: 'cream' },
  'coxa-de-frango': { shape: 'meat', tint: 'cream' },
  'frango-inteiro': { shape: 'meat', tint: 'cream' },
  'carne-moida': { shape: 'meat', tint: 'tomato' },
  patinho: { shape: 'meat', tint: 'tomato' },
  acem: { shape: 'meat', tint: 'tomato' },
  alcatra: { shape: 'meat', tint: 'tomato' },
  'costela-bovina': { shape: 'meat', tint: 'tomato' },
  'bisteca-suina': { shape: 'meat', tint: 'tomato' },
  'lombo-suino': { shape: 'meat', tint: 'tomato' },
  'carne-seca': { shape: 'meat', tint: 'cocoa' },
  linguica: { shape: 'long', tint: 'tomato' },
  bacon: { shape: 'meat', tint: 'tomato' },
  salsicha: { shape: 'long', tint: 'tomato' },
  presunto: { shape: 'cheese', tint: 'tomato' },
  mortadela: { shape: 'cheese', tint: 'tomato' },
  tilapia: { shape: 'fish', tint: 'cream' },
  sardinha: { shape: 'fish', tint: 'cream' },
  camarao: { shape: 'fish', tint: 'carrot' },

  'arroz-branco': { shape: 'bag', tint: 'cream', art: 'arroz' },
  'arroz-integral': { shape: 'bag', tint: 'grain', art: 'arroz' },
  'feijao-carioca': { shape: 'bag', tint: 'grain', art: 'feijao' },
  'feijao-preto': { shape: 'bag', tint: 'cocoa', art: 'feijao' },
  lentilha: { shape: 'bag', tint: 'carrot' },
  'grao-de-bico': { shape: 'bag', tint: 'yolk' },
  'macarrao-espaguete': { shape: 'pasta', tint: 'yolk' },
  'macarrao-parafuso': { shape: 'pasta', tint: 'yolk' },
  'macarrao-instantaneo': { shape: 'pasta', tint: 'yolk' },
  'farinha-de-trigo': { shape: 'bag', tint: 'cream' },
  'farinha-de-mandioca': { shape: 'bag', tint: 'cream' },
  fuba: { shape: 'bag', tint: 'yolk' },
  aveia: { shape: 'bag', tint: 'grain' },
  'goma-de-tapioca': { shape: 'bag', tint: 'cream' },
  quinoa: { shape: 'bag', tint: 'grain' },
  'milho-de-pipoca': { shape: 'bag', tint: 'yolk' },

  ovo: { shape: 'egg', tint: 'yolk', art: 'ovo' },
  leite: { shape: 'bottle', tint: 'cream', art: 'leite' },
  manteiga: { shape: 'cheese', tint: 'yolk' },
  margarina: { shape: 'cheese', tint: 'yolk' },
  'queijo-mussarela': { shape: 'cheese', tint: 'yolk', art: 'queijo' },
  'queijo-prato': { shape: 'cheese', tint: 'yolk', art: 'queijo' },
  'queijo-parmesao': { shape: 'cheese', tint: 'grain', art: 'queijo' },
  'queijo-minas': { shape: 'cheese', tint: 'cream', art: 'queijo' },
  requeijao: { shape: 'jar', tint: 'cream' },
  'creme-de-leite': { shape: 'can', tint: 'cream' },
  'leite-condensado': { shape: 'can', tint: 'cream' },
  'iogurte-natural': { shape: 'jar', tint: 'cream' },

  sal: { shape: 'shaker', tint: 'cream' },
  acucar: { shape: 'bag', tint: 'cream' },
  'oleo-de-soja': { shape: 'bottle', tint: 'yolk' },
  azeite: { shape: 'bottle', tint: 'leaf' },
  vinagre: { shape: 'bottle', tint: 'grain' },
  'pimenta-do-reino': { shape: 'shaker', tint: 'cocoa' },
  colorau: { shape: 'shaker', tint: 'tomato' },
  cominho: { shape: 'shaker', tint: 'grain' },
  oregano: { shape: 'leaf', tint: 'leaf' },
  manjericao: { shape: 'leaf', tint: 'leaf' },
  salsinha: { shape: 'leaf', tint: 'leaf' },
  cebolinha: { shape: 'leaf', tint: 'leaf' },
  coentro: { shape: 'leaf', tint: 'leaf' },
  louro: { shape: 'leaf', tint: 'leaf' },
  alecrim: { shape: 'leaf', tint: 'leaf' },
  'canela-em-po': { shape: 'shaker', tint: 'cocoa' },
  cravo: { shape: 'shaker', tint: 'cocoa' },
  'caldo-de-galinha': { shape: 'shaker', tint: 'yolk' },
  'molho-de-soja': { shape: 'bottle', tint: 'cocoa' },
  maionese: { shape: 'jar', tint: 'cream' },
  ketchup: { shape: 'jar', tint: 'tomato' },
  mostarda: { shape: 'jar', tint: 'yolk' },

  'milho-enlatado': { shape: 'can', tint: 'yolk' },
  'ervilha-enlatada': { shape: 'can', tint: 'leaf' },
  'atum-enlatado': { shape: 'can', tint: 'cream' },
  'sardinha-enlatada': { shape: 'can', tint: 'cream' },
  'extrato-de-tomate': { shape: 'can', tint: 'tomato' },
  'molho-de-tomate': { shape: 'can', tint: 'tomato' },
  azeitona: { shape: 'jar', tint: 'leaf' },
  palmito: { shape: 'jar', tint: 'cream' },
  'leite-de-coco': { shape: 'can', tint: 'cream' },
  'seleta-de-legumes': { shape: 'can', tint: 'carrot' },

  'pao-frances': { shape: 'bread', tint: 'grain' },
  'pao-de-forma': { shape: 'bread', tint: 'grain' },
  'pao-integral': { shape: 'bread', tint: 'cocoa' },
  'biscoito-cream-cracker': { shape: 'bread', tint: 'cream' },
  torrada: { shape: 'bread', tint: 'cream' },
  'fermento-biologico': { shape: 'bag', tint: 'cream' },
  'fermento-em-po': { shape: 'bag', tint: 'cream' },
  'massa-de-pastel': { shape: 'bag', tint: 'cream' },

  cafe: { shape: 'cup', tint: 'cocoa', art: 'cafe' },
  'cha-mate': { shape: 'cup', tint: 'grain' },
  'achocolatado-em-po': { shape: 'bag', tint: 'cocoa' },
  refrigerante: { shape: 'bottle', tint: 'cocoa' },
  'suco-de-uva': { shape: 'bottle', tint: 'tomato' },
  'agua-com-gas': { shape: 'bottle', tint: 'leaf' },
  'agua-de-coco': { shape: 'bottle', tint: 'cream' },
};

export function iconFor(id: string, category: IngredientCategory): IngredientIcon {
  return byIngredient[id] ?? byCategory[category];
}
