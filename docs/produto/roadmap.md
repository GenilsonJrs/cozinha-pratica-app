# Escopo e roadmap

## Onde o projeto está

| Entrega | Estado |
|---|---|
| Fundação do projeto (scaffold, CI, qualidade) | <span class="status-done">Concluído</span> |
| Despensa de ingredientes | <span class="status-done">Concluído e validado em aparelho</span> |
| Identidade visual e design system | <span class="status-done">Concluído e validado em aparelho</span> |
| Artes dos ingredientes | <span class="status-done">Concluído e validado em aparelho</span> |
| Match de receitas | <span class="status-wip">Em construção</span> |
| Mercados, preços e lista de compras | <span class="status-todo">Não iniciado</span> |
| Rede social de receitas | <span class="status-todo">Ideia registrada</span> |

## Match de receitas — detalhe da entrega atual

A feature foi quebrada em nove tarefas. O estado de cada uma:

| # | Tarefa | Estado |
|---|---|---|
| 1 | Tipos, contrato de fonte e catálogo semente | <span class="status-done">Concluída</span> |
| 2 | Regra de match e ordenação | <span class="status-done">Concluída</span> |
| 3 | Sugestões de ingredientes | <span class="status-done">Concluída</span> |
| 4 | Capa e cartão da receita | <span class="status-done">Concluída</span> |
| 5 | Aba Receitas com lista ordenada | <span class="status-done">Concluída</span> |
| 6 | Tela de detalhe da receita | <span class="status-done">Concluída</span> |
| 7 | Essenciais visuais e sugestões na despensa | <span class="status-todo">Pendente</span> |
| 8 | Completar o catálogo para 40 receitas | <span class="status-todo">Pendente</span> |
| 9 | Validação em aparelho e polimento | <span class="status-todo">Pendente</span> |

## Fora do escopo atual

Decisões conscientes de **não fazer agora**, cada uma com motivo registrado:

- **Filtros e favoritos** nas receitas — camada sobre o núcleo, adiável sem prejuízo.
- **Vídeos e mídia** além da imagem da receita.
- **Quantidades no match** — a medida existe só para exibição.
- **Cache offline de fonte remota** — resolve um problema que ainda não existe, já que o
  catálogo é embarcado. Vira obrigatório quando a fonte virar remota.
- **Login, contas e sincronização.**
- **Telemetria.**

## Fase 2 — o que vem depois

Nada em construção; tudo registrado como visão.

### Mercados e preços

Mapa de mercados próximos, com preços alimentados de forma colaborativa e consolidados por
consenso. O **risco central** já está identificado: um marketplace de dados morre se ninguém
alimenta. O caminho mais promissor levantado é a **contribuição passiva** — foto do cupom
fiscal com extração automática dos itens, transformando o esforço em "tirar uma foto do que já
está na mão".

### Comparação de preços

Uma sutileza que muda o desenho da feature: o café pode estar mais barato no mercado da esquina,
mas a **lista inteira** pode sair mais barata em outro. Comparar item a item e comparar a compra
completa são perguntas diferentes.

### Lista de compras

Listas nomeadas e reutilizáveis, com foco na **lista recorrente** — os itens que se compra todo
mês. Checklist que risca sem remover, e três ações distintas: desmarcar tudo, esvaziar a lista,
excluir a lista.

### Rede social de receitas

Feed no formato de rede social, onde as pessoas publicam receitas com foto, e a comunidade
curte e comenta. A sacada que torna a ideia valiosa: **quem publica seleciona os ingredientes do
próprio catálogo do app**, então a receita já nasce compatível com o match. Passando de certo
número de curtidas, ela entra no catálogo oficial.

É o caminho para volume de conteúdo sem raspar sites de terceiros, sem custo de API e sem risco
jurídico — e resolve de quebra o direito de imagem, já que a foto passa a ser de quem publicou.
