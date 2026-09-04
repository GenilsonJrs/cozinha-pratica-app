# Despensa

<span class="status-done">Concluída e validada em aparelho</span>

A despensa é a base do produto: é o que a pessoa tem em casa, e é a única entrada de dados que
alimenta o match de receitas. Sem ela, nada mais funciona.

## O que ela faz

### Catálogo com busca

A entrada é por **catálogo pré-definido**, não por texto livre. São **126 ingredientes** com
identificadores estáveis, organizados em 8 categorias:

| Categoria | Exemplos |
|---|---|
| Hortifrúti | tomate, cebola, alho, batata, cenoura, banana |
| Proteínas | peito de frango, carne moída, ovo, tilápia, linguiça |
| Grãos e massas | arroz, feijão, macarrão, farinha, aveia |
| Laticínios e ovos | leite, manteiga, queijos, requeijão, iogurte |
| Temperos | sal, açúcar, óleo, azeite, pimenta, colorau |
| Enlatados e conservas | milho, ervilha, atum, extrato de tomate, azeitona |
| Padaria | pão francês, pão de forma, torrada, fermento |
| Bebidas e outros | café, chá mate, achocolatado, sucos |

A busca ignora acentuação e diferenças de maiúsculas — procurar por "acucar" encontra "Açúcar".

!!! info "Por que catálogo e não texto livre"
    O match só funciona se o ingrediente da receita e o da despensa forem **a mesma coisa**.
    Texto livre gera "tomate", "Tomates", "tomate italiano" e quebra a comparação. Identificador
    canônico resolve isso na origem.

### Quantidades

Cada item guarda uma **contagem inteira de 1 a 99**, ajustável no próprio card. Não há unidades
nem medidas: não existe "500 g" ou "2 litros". Remover o último item tira o ingrediente da
despensa.

!!! note "Uma decisão que foi revertida"
    O projeto começou com "só presença, sem quantidades", por receio de atrito na manutenção.
    O receio não se confirmou — o controle fica no próprio card, sem tela extra — e quantidades
    foram adicionadas depois. **A quantidade não participa do match**: para saber se dá para
    cozinhar, basta o ingrediente estar presente.

### Essenciais no primeiro uso

Na primeira abertura, o app mostra **oito básicos da cozinha brasileira já marcados** — sal,
açúcar, óleo, arroz, feijão, alho, cebola e café. Você desmarca o que não tem e confirma.

Isso existe porque o match **não assume nada**: se a receita pede sal e você não tem sal
cadastrado, ela não fica pronta. Sem os essenciais pré-marcados, o primeiro uso do app mostraria
zero receitas e pareceria quebrado.

### Persistência local

Tudo fica **no aparelho**, sem login e sem servidor. Os dados sobrevivem a fechar o app.

Duas proteções foram necessárias na prática:

- **Portão de hidratação** — as telas esperam o armazenamento responder antes de decidir o que
  mostrar. Sem isso, o app pisca "despensa vazia" ao abrir.
- **Limpeza na leitura** — ingredientes que não existem mais no catálogo são descartados ao
  carregar, para o dado salvo não envenenar a tela.

## Interface

Ingredientes aparecem com **ícone próprio** em vez de texto puro. Dezessete deles têm arte
dedicada; os demais caem em uma das 16 formas genéricas por categoria. Detalhes em
[Identidade visual](identidade-visual.md).

Alvo de toque de no mínimo 44 pontos em todos os controles, e ações destrutivas — como esvaziar
a despensa — pedem confirmação.
