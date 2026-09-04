# Funcionalidades

Esta seção descreve **o que existe hoje no app** e o que cada parte faz. À medida que novas
funcionalidades entram, a documentação cresce junto.

<div class="grid cards" markdown>

- :material-basket: **[Despensa](despensa.md)**

    Cadastro do que você tem em casa. Catálogo de 126 ingredientes, busca, categorias,
    quantidades e persistência local.

    <span class="status-done">Concluída e validada em aparelho</span>

- :material-silverware-fork-knife: **[Receitas](receitas.md)**

    Match entre despensa e receitas, lista ordenada por compatibilidade e tela de detalhe com
    passo a passo.

    <span class="status-wip">Em construção</span>

- :material-palette: **[Identidade visual](identidade-visual.md)**

    Design system com tema claro e escuro, tipografia, biblioteca de componentes e as artes dos
    ingredientes.

    <span class="status-done">Concluída e validada em aparelho</span>

</div>

## Navegação do app

O app tem hoje **três abas**:

| Aba | O que faz |
|---|---|
| **Início** | Saudação por faixa de horário, resumo da despensa e atalhos para adicionar ingredientes e ver receitas |
| **Receitas** | Lista das receitas ordenadas por compatibilidade com a despensa |
| **Despensa** | O que você tem em casa, com busca e ajuste de quantidade |

Duas telas vivem fora das abas, abertas por navegação: **Adicionar ingredientes** (modal) e
**Detalhe da receita**.
