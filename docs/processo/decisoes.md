# Decisões

Registro das escolhas que moldaram o projeto, com o raciocínio por trás. A intenção é que
ninguém — nem o próprio autor daqui a seis meses — precise adivinhar por que algo é como é.

## Produto

### Catálogo embarcado, não integração com site de receitas

**Contexto:** a tentação natural foi integrar com um grande site brasileiro de receitas para ter
volume de conteúdo.

**Decisão:** catálogo próprio, embarcado, atrás de um contrato trocável.

**Por quê:** o site em questão não tem API pública, então integrar significaria raspagem — o que
viola os termos de uso, quebra a cada mudança de layout e cria risco de remoção para um app que
pretende ir para as lojas. Mas o argumento decisivo foi outro: **o gargalo do match não é a
quantidade de receitas, é a normalização**. Toda base externa traz ingrediente como texto livre
e alguém precisa mapear para os identificadores do catálogo. É esse trabalho que custa caro.
Cinquenta receitas que casam certo valem mais que dez mil que casam mal.

### Nenhum ingrediente é assumido

**Decisão:** se a receita pede sal e não há sal na despensa, ela não fica pronta.

**Por quê:** o caminho comum seria assumir que todo mundo tem sal, óleo e açúcar. Isso simplifica,
mas mente: quem realmente não tem vê uma receita marcada como pronta e se frustra na cozinha.

**Consequência assumida:** os essenciais pré-marcados e as sugestões inteligentes deixam de ser
conveniência e viram **caminho crítico** — se falharem, o usuário fica com a despensa cheia e
nenhuma receita.

### Quantidade não participa do match

**Por quê:** a despensa guarda contagem simples e a receita pede medida ("500 g de farinha").
Comparar os dois exigiria unidades e conversões, aumentando muito o atrito de manutenção. A
medida existe apenas para exibição.

### Água não é ingrediente

**Por quê:** pedir que alguém confirme ter água em casa é ruído, não informação. É a única
premissa universal do app.

### Imagens nunca de terceiros

**Decisão:** nenhuma foto de banco de imagens ou da web entra no repositório.

**Por quê:** um app publicado em loja não pode carregar passivo de direito de imagem. A solução
foi compor a capa em código a partir das artes dos ingredientes — custo zero, distinta por
receita, sem risco. No futuro, quando houver conteúdo da comunidade, a imagem e os direitos
ficam atrelados a quem publicou.

## Arquitetura

### Match como função pura, não estado

**Por quê:** não há nada a sincronizar ou invalidar, e testar sem renderizar torna visível um
erro que de outro modo passaria batido — ordenação instável não quebra nada, só entrega uma
lista pior.

### Contrato de receitas síncrono

**Custo assumido:** quando a fonte virar remota, as telas mudarão uma vez. Torná-lo assíncrono
hoje obrigaria estados de carregamento e erro em todas as telas para um caso que não existe.

### Um repositório por artefato implantável

Enquanto houver um só app, um só repositório. Painel web ou API futura nascem em repositório
próprio.

### Deploy adiado

Build e publicação em loja ficam para quando houver algo a distribuir. O fluxo de
desenvolvimento com Expo Go atende enquanto isso.

## Decisões revertidas

Registro honesto do que mudou de ideia.

### "Só presença, sem quantidades"

**Decisão original:** a despensa guardaria apenas tenho/não tenho, por receio de que quantidades
aumentassem o atrito de manutenção.

**Revertida:** quantidades foram adicionadas como contagem inteira. O receio não se confirmou —
o controle fica no próprio card, sem tela extra. **Unidades e medidas seguem fora.**

### Fotos locais fora do controle de versão

**Decisão original:** as fotos provisórias ficariam numa pasta ignorada pelo versionamento.

**Revertida na TechSpec:** é tecnicamente inviável. O carregamento de arquivo local é resolvido
na hora de empacotar o app, então um arquivo ausente quebraria o build em qualquer outra
máquina. Trocado por campo de URL, que atende melhor a intenção original — assim nem arquivo
local passa a existir.
