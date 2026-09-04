# Identidade visual

<span class="status-done">Concluída e validada em aparelho</span>

## A marca

Paleta inspirada em cozinha caseira, com terracota como cor principal — escolha que dialoga com
o dado da pesquisa original, onde **65,7% dos respondentes preferiram vermelho**.

| Cor | Hex | Uso |
|---|---|---|
| Terracota | `#BC4B26` | Cor principal, botões, destaques |
| Creme | `#FDF6EF` | Fundo do tema claro |
| Verde | `#3E6B4F` | Cor secundária |
| Gema | `#F2A93B` | Acentos |

Tipografia **Nunito**, embarcada no app em quatro pesos — não depende de fonte do sistema, então
o app tem a mesma cara em qualquer aparelho.

O ícone é uma frigideira com ovo, desenhada em SVG e convertida para os formatos de cada
plataforma por script.

## Tema claro e escuro

Os dois temas são de primeira classe, não um remendo. A regra que sustenta isso:

!!! warning "Nenhuma cor literal fora do tema"
    Um teste automatizado varre todo o código-fonte procurando cor escrita à mão. Se aparecer
    um `#RRGGBB` fora da pasta de tema, a integração contínua falha.

O contraste **não é conferido no olho**: um teste calcula a razão de contraste de cada par de
cores declarado e falha se algum ficar abaixo do mínimo acessível. Par de cor novo entra na
lista do teste.

## Biblioteca de componentes

Componentes reutilizáveis: tela base, botão em quatro variantes, campo de busca, linha de lista,
seção, estado vazio e indicador de carregamento. Todos com alvo de toque mínimo de **44 pontos**.

## As artes dos ingredientes

O ponto mais trabalhoso da identidade. O problema original: os ícones genéricos colidiam —
**tomate, cebola, alho e batata eram todos o mesmo círculo**, e alho e cebola ficavam idênticos,
mesma forma e mesma cor.

Hoje há **12 artes dedicadas** cobrindo 17 ingredientes, e 16 formas genéricas por categoria
para o resto. Um ingrediente sem arte cai na forma da categoria, então a migração acontece aos
poucos sem quebrar nada.

### O padrão das artes

Fixado como norma do projeto depois de três rodadas de desenho e validação em aparelho:

- **Contorno escuro, grosso e opaco** — é o que faz a peça ser legível a 44 pixels
- **Preenchimento chapado**, sem gradiente; profundidade vem de tons vizinhos
- **Silhueta encorpada**, preenchendo o quadro
- **Tema escuro inverte só o contorno** — os preenchimentos são iguais nos dois temas, o que
  reduz o trabalho pela metade
- **Alimentos a granel viram saco** com os grãos aparecendo e o nome na embalagem

Há uma exceção deliberada à paleta da marca: o **alho é roxo**. Foi o que resolveu alho e cebola
serem os dois cremes e ficarem indistinguíveis na grade.

### Acessibilidade

Cor nunca é o único sinal de informação. Onde há verde e vermelho — como nos ingredientes da
receita — sempre acompanha ícone e rótulo de acessibilidade.
