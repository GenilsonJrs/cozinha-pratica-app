# Receitas

<span class="status-wip">Em construção</span>

É o coração do produto: o que transforma a despensa em decisão de jantar. A regra de match, a
lista e a tela de detalhe já funcionam; falta completar o catálogo e o polimento final.

## A regra de match

Para cada receita, o app compara os ingredientes exigidos com os que estão na despensa e produz:

- se ela está **completa** (todos os ingredientes presentes);
- **quais ingredientes faltam**, nominalmente;
- quantos dos exigidos você já tem.

### O que a regra deliberadamente não faz

| Não faz | Por quê |
|---|---|
| **Não assume nenhum básico** | Se pede sal e você não tem sal cadastrado, não fica pronta. Nada de "todo mundo tem sal" |
| **Não olha quantidade** | Basta o ingrediente estar presente, seja 1 ou 99 |
| **Não troca variantes** | Receita que pede arroz branco não fecha com arroz integral. Não existe conceito de substituição |

A única exceção universal é a **água**: receitas simplesmente não a listam como ingrediente. Ela
aparece no modo de preparo, mas ninguém precisa confirmar que tem água em casa.

### Ordenação

A lista segue quatro critérios, nesta ordem:

1. **Completas primeiro** — o que dá para fazer agora
2. Menor número de ingredientes faltando
3. Maior proporção de ingredientes já disponíveis
4. Nome em ordem alfabética

O quarto critério existe para a ordem ser **determinística**: a mesma despensa produz sempre a
mesma lista, sem embaralhamento entre aberturas.

## A aba Receitas

Cartões grandes, com a imagem ocupando a largura toda, empilhados na vertical. Cada cartão traz
nome, tempo de preparo e um **selo de estado**: "Dá pra fazer" em verde quando completa, ou
"Falta 1 ingrediente" / "Faltam N ingredientes" quando não.

Com a despensa vazia, a aba não mostra uma lista de receitas impossíveis — mostra um convite
para montar a despensa, com atalho direto.

### As capas

Nenhuma foto é versionada no repositório. Quando a receita não tem imagem, o app **compõe a capa
em código**: a arte do ingrediente principal entra grande ao centro, sobre a própria cor de
fundo dele, e o segundo e o terceiro aparecem como fichas menores no canto.

Cada receita ganha assim uma capa distinta, sem nenhum desenho novo e sem peso no repositório.
Há um campo opcional de imagem por receita, para substituição futura.

## A tela de detalhe

Traz a capa, nome, tempo, porções e dificuldade. Abaixo:

- **Ingredientes marcados** — verde para o que você tem, vermelho para o que falta. A cor nunca
  é o único sinal: cada linha tem ícone e rótulo de acessibilidade dizendo "tem" ou "falta".
- **Resumo do que falta**, no topo, quando a receita está incompleta.
- **Modo de preparo numerado**, na ordem.
- **Medidas** ao lado de cada ingrediente ("2 colheres de sopa"), que são informativas e não
  entram no match.

## Sugestões inteligentes na despensa

Como a regra não assume nenhum básico, sugerir bem o que cadastrar deixa de ser conveniência e
vira parte do caminho crítico.

O app ordena os ingredientes que faltam pelo critério mais útil possível: **quantas receitas
passariam a ficar prontas se só aquele item entrasse na despensa**. Frequência geral no catálogo
é apenas o desempate.

Na prática, com a despensa dos essenciais, a primeira sugestão é o **ovo** — porque ele sozinho
destrava uma receita, mesmo não sendo o ingrediente mais comum do catálogo.

Ingredientes já cadastrados nunca aparecem nas sugestões.

## Catálogo de receitas

As receitas são **embarcadas no app**, escritas em código, e usam os identificadores do catálogo
de ingredientes — o que garante que o match funcione sem nenhuma etapa de normalização.

Um teste automatizado impede que receita inválida entre no repositório: identificador de
ingrediente inexistente, ingrediente repetido, passo vazio ou água na lista quebram a
integração contínua.
