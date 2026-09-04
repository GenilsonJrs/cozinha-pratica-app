---
hide:
  - navigation
---

<div class="hero" markdown>
<img src="assets/logo.png" alt="Logo do Cozinha Prática">
<div class="hero-text" markdown>
# Cozinha Prática
Abri a geladeira, o que dá pra fazer?
</div>
</div>

**Cozinha Prática** é um app mobile que ajuda a pessoa a **cozinhar com o que já tem em casa**.
Você cadastra os ingredientes disponíveis e o app responde o que dá para preparar agora, o que
falta para as outras receitas, e o passo a passo de cada prato.

A proposta nasce de um problema concreto: a pessoa abre a geladeira, vê ingredientes soltos e
não sabe o que fazer com eles. Aplicativos de receita normalmente partem do prato desejado e
mandam comprar o que falta. Aqui o caminho é o inverso — parte-se do que já existe.

## O que dá para fazer hoje

<div class="grid cards" markdown>

- :material-basket: **Montar a despensa**

    Cadastre o que você tem em casa a partir de um catálogo de **126 ingredientes**, com busca,
    categorias e quantidade por item.

    [Ver detalhes](funcionalidades/despensa.md)

- :material-silverware-fork-knife: **Descobrir o que cozinhar**

    O app compara sua despensa com o catálogo de receitas e mostra primeiro o que **dá para
    fazer agora**, depois o que falta pouco.

    [Ver detalhes](funcionalidades/receitas.md)

- :material-book-open-variant: **Seguir o preparo**

    Cada receita traz ingredientes marcados entre o que você tem e o que falta, com medidas e
    modo de preparo numerado.

    [Ver detalhes](funcionalidades/receitas.md)

- :material-palette: **Usar em claro ou escuro**

    Design system próprio, com paleta testada por código para contraste acessível nos dois
    temas.

    [Ver detalhes](funcionalidades/identidade-visual.md)

</div>

## Como funciona, em três passos

1. **Você diz o que tem.** No primeiro uso o app já sugere os básicos da cozinha brasileira
   pré-marcados — você desmarca o que falta e confirma.
2. **O app compara.** Cada receita é classificada como completa ou incompleta, e a lista é
   ordenada: o que dá para fazer agora vem primeiro.
3. **Você cozinha.** A tela da receita mostra o que você tem, o que falta e o passo a passo.

## Princípios do projeto

| Princípio | O que significa na prática |
|---|---|
| **Sem login para começar** | O app é útil na primeira abertura. Conta e sincronização só quando houver algo que as justifique |
| **Funciona offline** | Catálogo de ingredientes e receitas embarcados no app; nada depende de rede |
| **Nada é assumido** | Se a receita pede sal e você não tem sal cadastrado, ela não aparece como pronta |
| **Acessível por padrão** | Contraste verificado por teste automatizado; cor nunca é o único sinal de informação |
| **Qualidade verificável** | Lint, typecheck, testes e análise estática rodam a cada envio, com cobertura mínima obrigatória |

## Estado do projeto

!!! info "Em desenvolvimento ativo"
    A despensa está completa e validada em aparelho real. O match de receitas está em
    construção — a regra, a listagem e a tela de detalhe já funcionam, com um catálogo semente
    de receitas.

Acompanhe o detalhamento em [Escopo e roadmap](produto/roadmap.md).

## Origem

O projeto nasceu como **TCC do curso Técnico em Informática do IFBA — Campus Barreiras (2021)**,
de Genilson Junior, orientado pelo professor Ricardo Sena. O protótipo original, em Flutter, não
foi concluído. Este repositório é a **continuação profissional** do trabalho: reescrita com
stack atual, processo de engenharia e objetivo de chegar a um produto publicável.

[Conheça a pesquisa que embasa o produto](produto/origem.md){ .md-button }
[Ver no GitHub](https://github.com/GenilsonJrs/cozinha-pratica-app){ .md-button }
