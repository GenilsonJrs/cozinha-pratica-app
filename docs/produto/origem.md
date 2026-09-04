# Pesquisa e origem

## O TCC de 2021

O Cozinha Prática nasceu como Trabalho de Conclusão de Curso do **Técnico em Informática do
IFBA — Campus Barreiras**, defendido por Genilson Júnior em 2021, sob orientação do professor
**Ricardo Sena**.

O protótipo original foi feito em Flutter 1.x e **não chegou a ser finalizado**. Este repositório
não migra aquele código: aproveita a **visão de produto** e recomeça com stack atual e processo
de engenharia.

## O que o protótipo de 2021 tinha

- Abas: Início, Sugestões, Adicione, Menu, Sobre, Configurações.
- "Sugestões" eram **imagens estáticas** que linkavam para sites externos.
- Seleção de ingredientes numa grade de cerca de 20 itens fixos no código.
- Mapa de mercados incompleto.
- Sem backend, sem persistência, sem autenticação, sem testes.

A lição foi clara: a ideia era boa, a execução não existia. É o que esta segunda tentativa
corrige.

## A pesquisa original

A monografia trouxe uma pesquisa com **102 respondentes**, maioria jovem (15 a 18 anos). Os
dados que ainda orientam decisões hoje:

| Achado | Número | Como influencia o produto |
|---|---|---|
| Qualidade culinária mais citada | **"me viro com o que tem"** | Valida a proposta central do app |
| Motivo nº 1 para usar apps de comida | **37,3%** poupar tempo / não querer cozinhar | Reforça a UX de 1 toque e resposta rápida |
| Ponto mais valorizado num app | **40,2%** diversidade de receitas | Pressiona pelo tamanho do catálogo — e motiva a ideia da rede social |
| Mapa de mercados e comparativo de preços | **90,2%** de aprovação | É o recurso mais validado depois da proposta central |
| Cor preferida | **65,7%** vermelho, 38,2% azul | A terracota da marca está na família do vermelho |
| Aba sobre fome e desperdício | 61,8% a favor, **35,3% contra** | Tratado com cautela: rejeição alta demais para ser ignorada |

## Funcionalidades que o TCC já previa

Muitas continuam no roadmap: filtros de preferência (dificuldade, tipo de refeição, calorias,
tempo de preparo, quantidade de ingredientes), favoritos, avaliação por estrelas, perfil de
consumo para recomendações, informações nutricionais, multimídia com vídeos e dicas, perfis
distintos de usuário e de estabelecimento, guia de primeiro uso, "ver o que falta" em pratos
indisponíveis, e modo escuro — este último **já entregue**.

## A postura adotada hoje

!!! note "Usar a visão, não repetir o TCC"
    A monografia é base de intenção, não de execução. As estratégias são desenhadas para o que
    funciona hoje, não para o que se imaginava em 2020. Onde o dado da pesquisa ainda vale, ele
    é citado; onde envelheceu, é substituído.
