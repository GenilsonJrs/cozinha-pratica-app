# Stack

## Aplicativo

| Camada | Escolha | Versão |
|---|---|---|
| Framework | Expo (React Native) | ~57.0 |
| Runtime | React Native | 0.86 |
| UI | React | 19.2 |
| Linguagem | TypeScript strict | ~6.0 |
| Navegação | Expo Router (por arquivo) | ~57.0 |
| Estado | Zustand + persistência | ^5.0 |
| Armazenamento | AsyncStorage | 2.2 |
| Gráficos | React Native SVG | 15.15 |
| Animação | Reanimated | 4.5 |
| Tipografia | Nunito embarcada | — |

## Qualidade

| Ferramenta | Papel |
|---|---|
| ESLint | Padrão de código |
| Prettier | Formatação |
| TypeScript | Verificação de tipos, modo estrito |
| Jest + Testing Library | Testes |
| GitHub Actions | Integração contínua |
| SonarCloud | Análise estática e Quality Gate |

## Decisões de stack que valem explicação

### Expo, não React Native puro

Expo entrega build, fontes, splash, ícones e atualização sem configuração nativa manual. Para um
projeto de uma pessoa só, o tempo economizado em configuração é tempo gasto em produto.

### Zustand, não Redux nem Context

O app tem **um** estado global: a despensa. Redux traria estrutura demais; Context puro traria
re-renders demais. Zustand com persistência resolve em poucas linhas.

### TypeScript estrito, sem `any` de conveniência

O catálogo de ingredientes e o de receitas são dados grandes escritos à mão. Tipagem estrita é o
que impede erro de digitação virar bug silencioso em produção.

### Dependências governadas pelo SDK

As versões de runtime **não são atualizadas individualmente**. Quem manda é o SDK do Expo, via
`npx expo install --check`. Subir um pacote sozinho quebra a compatibilidade do conjunto.

!!! note "Atualização automática só para o CI"
    O robô de dependências está ligado apenas para as ações do GitHub Actions, exatamente para
    não propor bumps individuais nas dependências do app.
