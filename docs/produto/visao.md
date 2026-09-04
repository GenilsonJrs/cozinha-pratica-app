# Visão de produto

## Proposta de valor

> "Abri a geladeira, o que dá pra fazer?" — resposta imediata, com o custo de completar a
> receita nos mercados perto de você.

O diferencial não é ter muitas receitas. É **partir do que a pessoa já tem** e responder rápido.
Um app que devolve mil receitas que ela não pode fazer agora não resolve o problema dela.

## Para quem

A pessoa que tem ingredientes em casa, não sabe o que cozinhar e não quer sair para comprar
nada. A pesquisa que originou o projeto confirmou esse perfil: a qualidade culinária mais citada
pelos respondentes foi **"me viro com o que tem"**.

## O que o produto se recusa a ser

- **Não é um catálogo de receitas.** Catálogo já existe de sobra. O valor está no cruzamento com
  a despensa.
- **Não é uma rede social de culinária** — pelo menos não agora. A ideia existe no roadmap, mas
  como consequência de um app já útil, não como porta de entrada.
- **Não exige cadastro para funcionar.** Onboarding sem login é o que segura retenção; dado de
  mercado aponta cerca de **75% de abandono em três dias** em apps de consumo.

## As três camadas do produto

<div class="grid cards" markdown>

- **1. Despensa** — o que eu tenho

    A base de tudo. Sem ela nada funciona, e por isso foi a primeira coisa construída.

- **2. Receitas** — o que eu faço com isso

    O coração do produto. Transforma um cadastro em decisão de jantar.

- **3. Mercados e preços** — quanto custa completar

    A ponte entre "falta cebola" e "onde comprar mais barato". É a fase 2.

</div>

## A ponte que amarra tudo

A visão de longo prazo é uma resposta única que junta as três camadas:

!!! quote "O diferencial mais forte do projeto"
    Ver **o que falta** para fazer uma receita, **quanto custaria** comprar só o que falta, e
    **em qual mercado próximo** encontrar — com o mapa já indicando onde tem.

Nenhum concorrente conhecido faz isso. SuperCook resolve o match por ingredientes; apps de
mercado resolvem preço. Ninguém liga os dois.

## Restrições assumidas

| Restrição | Motivo |
|---|---|
| Tudo local, sem backend | Enquanto não houver dado colaborativo, backend é custo sem retorno |
| Catálogo de receitas embarcado | Base externa traz ingrediente em texto livre e quebra o match; a normalização é o custo real, não a coleta |
| Sem quantidades no match | A despensa guarda contagem simples; comparar com "500 g de farinha" exigiria unidades e conversões, aumentando muito o atrito de manutenção |
| Imagens próprias | Um app publicado em loja não pode carregar passivo de direito de imagem |
