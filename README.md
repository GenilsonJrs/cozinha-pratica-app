<h1 align="center">Cozinha Prática</h1>

<p align="center">
  Aplicativo mobile que ajuda você a <b>cozinhar com o que tem em casa</b>: informe os
  ingredientes disponíveis e receba sugestões de receitas, com passo a passo, lista de
  compras e, futuramente, comparação de preços entre mercados locais.
</p>

<p align="center">
  <a href="https://github.com/GenilsonJrs/cozinha-pratica-app/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/GenilsonJrs/cozinha-pratica-app/actions/workflows/ci.yml/badge.svg" /></a>
  <a href="https://sonarcloud.io/summary/new_code?id=GenilsonJrs_cozinha-pratica-app"><img alt="Quality Gate" src="https://sonarcloud.io/api/project_badges/measure?project=GenilsonJrs_cozinha-pratica-app&metric=alert_status" /></a>
  <a href="https://sonarcloud.io/summary/new_code?id=GenilsonJrs_cozinha-pratica-app"><img alt="Coverage" src="https://sonarcloud.io/api/project_badges/measure?project=GenilsonJrs_cozinha-pratica-app&metric=coverage" /></a>
  <img alt="Expo" src="https://img.shields.io/badge/Expo-SDK%2057-000020?logo=expo&logoColor=white" />
  <img alt="React Native" src="https://img.shields.io/badge/React%20Native-0.86-61DAFB?logo=react&logoColor=black" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white" />
</p>

<p align="center">
  <b><a href="https://genilsonjrs.github.io/cozinha-pratica-app/">Documentação do projeto</a></b>
</p>

---

## Sobre o projeto

Continuação profissional do TCC **Cozinha Prática** (Técnico em Informática, IFBA —
Campus Barreiras, 2021). O protótipo original em Flutter está preservado em
[cozinha-pratica](https://github.com/GenilsonJrs/cozinha-pratica); este repositório é a
reescrita do produto com stack atual e processo de engenharia, com objetivo de chegar
às lojas.

### Já funciona

- Despensa pessoal persistida no aparelho, com catálogo de 126 ingredientes, busca que
  ignora acentos e agrupamento por categoria
- Quantidade por ingrediente: um toque adiciona, o contador aparece depois
- Ícone próprio para cada ingrediente, composto a partir de formas e tons da marca
- Tema claro e escuro, com contraste AA verificado por teste automatizado
- Ilustrações e transições próprias nos estados vazios e na navegação

### Em construção (MVP)

- Busca de receitas pelos ingredientes disponíveis, ordenada por compatibilidade
- Detalhe de receita com passo a passo, tempo e porções
- Lista de compras gerada a partir dos ingredientes faltantes
- Autenticação e perfil de usuário

### Depois do MVP

- Mapa de mercados próximos
- Comparação de preços por produto e por compra completa
- O que falta para uma receita e quanto custaria completar

## Stack

- **React Native 0.86 + Expo SDK 57 + TypeScript (strict)**
- **Expo Router** — navegação file-based
- **Zustand** + AsyncStorage — estado e persistência local
- **react-native-svg** — ícones e ilustrações vetoriais
- **Supabase** (Postgres, Auth, Storage) — a integrar
- Qualidade: **ESLint**, **Prettier**, **Jest** + React Native Testing Library

## Como executar

Pré-requisitos: Node 24+ e npm. Para testar em um aparelho físico, instale o app
**Expo Go** (Play Store / App Store).

```bash
npm install
npm start
```

Com o celular na mesma rede Wi-Fi do computador, escaneie o QR code exibido no
terminal usando o Expo Go (Android) ou a câmera (iOS). Se a rede bloquear a conexão
entre dispositivos, use `npx expo start --tunnel`.

## Qualidade

```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript (tsc --noEmit)
npm test            # Jest + Testing Library
npm run format      # Prettier
```

## Estrutura

```
src/
├── app/            # rotas (Expo Router, file-based)
├── components/
│   ├── illustrations/  # artes dos estados vazios (SVG)
│   └── ui/             # biblioteca de componentes
├── features/
│   ├── home/
│   └── pantry/         # catálogo, busca, store e ícones dos ingredientes
├── hooks/
├── theme/          # cores, tipografia, espaçamento e tons
└── __tests__/      # testes
assets/
├── brand/          # SVGs da marca (fonte dos PNGs)
└── images/         # ícone, splash e favicon gerados
scripts/            # geração dos assets de marca
```

Alias de import: `@/*` → `src/*`.

## Design system

Toda cor vem de `src/theme/` — um teste automatizado falha o CI se aparecer um literal de
cor no restante do código. Isso mantém os dois temas consistentes e o contraste sob controle.

Os ícones de ingrediente são compostos por **formas**
(`src/components/ui/ingredient-icon.tsx`) combinadas com **tons da marca**
(`src/theme/ingredient-tints.ts`), mapeados em
`src/features/pantry/ingredient-icons.ts`. Ingrediente sem mapeamento cai no padrão da
categoria, então o catálogo cresce sem quebrar nada.

Para regerar o ícone do app e a splash a partir dos SVGs da marca:

```bash
node scripts/generate-icons.mjs
```

## Autoria

**Genilson Júnior** — [GenilsonJrs](https://github.com/GenilsonJrs)
