# Arquitetura

## Organização das pastas

```
src/
  app/                 rotas (Expo Router, roteamento por arquivo)
    (tabs)/            Início, Receitas, Despensa
    pantry-add.tsx     modal de adicionar ingredientes
    recipe/[id].tsx    detalhe da receita
  components/
    ui/                biblioteca de componentes reutilizáveis
    illustrations/     ilustrações de estado vazio
  features/
    pantry/            despensa: catálogo, busca, store, ícones
    recipes/           receitas: catálogo, match, sugestões
    home/              lógica da tela inicial
  theme/               cores, tipografia, espaçamento, temas
  hooks/               hooks compartilhados
  __tests__/           suítes de teste
```

## Organização por feature

Cada feature é uma pasta autocontida com seus dados, sua lógica e seus componentes. `pantry/` e
`recipes/` seguem o mesmo molde, o que torna a segunda previsível para quem já conhece a
primeira.

### Uma regra de dependência

!!! warning "`recipes` depende de `pantry`, nunca o contrário"
    As receitas referenciam identificadores do catálogo de ingredientes, então essa direção é
    natural. O inverso tornaria a despensa dependente das receitas e ela deixaria de funcionar
    sozinha.

    **Telas podem importar as duas** — tela é o ponto legítimo de junção.

## Estado

O estado da despensa vive num store leve com persistência automática no armazenamento do
aparelho. É o único estado global do app.

**O resultado do match não é estado.** É calculado a partir da despensa a cada render, por
função pura. Não há nada para sincronizar, invalidar ou manter coerente:

```
despensa (store) ─┐
                  ├─► matchRecipes() ─► lista ordenada
catálogo ─────────┘
```

A consequência prática: mudar a despensa reordena as receitas sozinho, sem código de
sincronização.

## Funções puras onde a lógica erra em silêncio

Match e sugestões são funções puras, sem React e sem store. Elas recebem tudo por parâmetro.

A razão é concreta: uma ordenação instável ou um empate mal resolvido **não quebram nada** — só
entregam uma lista pior, e ninguém percebe. Testar isso sem renderizar tela torna o erro
visível.

Há um detalhe de desenho que vale citar: a função de match recebe **apenas os identificadores**
da despensa, nunca as quantidades. Assim a regra "quantidade não conta" é garantida pelo tipo,
não por convenção que alguém pode esquecer.

## Contrato de fonte de receitas

O acesso às receitas passa por um contrato único, para que trocar a origem no futuro — uma API,
receitas da comunidade — não encoste na regra de match nem nas telas.

O contrato é **síncrono**, e isso é uma escolha com custo assumido: torná-lo assíncrono hoje
obrigaria estados de carregamento e erro em todas as telas para um caso que não existe. Quando a
fonte virar remota, as telas mudam uma vez; as funções puras não mudam.
