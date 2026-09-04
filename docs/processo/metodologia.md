# Metodologia

O projeto é conduzido por uma pessoa só, com apoio de IA. Justamente por isso ele adota um
processo explícito: sem ele, decisão tomada em uma sessão se perde na seguinte.

## O pipeline

Toda funcionalidade relevante percorre seis etapas, cada uma gerando um artefato versionado:

``` mermaid
graph LR
  A[PRD] --> B[TechSpec]
  B --> C[Tasks]
  C --> D[Execução]
  D --> E[Review]
  E --> F[Pull Request]
```

| Etapa | Pergunta que responde | Artefato |
|---|---|---|
| **PRD** | O que vamos construir e por quê? | Requisitos numerados e testáveis |
| **TechSpec** | Como vamos construir? | Contratos, arquitetura, trade-offs |
| **Tasks** | Em que ordem, em pedaços de quanto? | Tarefas pequenas e autocontidas |
| **Execução** | Uma tarefa por vez | Código com lint, tipos e testes verdes |
| **Review** | O que passou despercebido? | Revisão em três lentes |
| **PR** | Está pronto para entrar? | Descrição autossuficiente |

## Regras que sustentam o processo

**O PRD não discute implementação.** Nada de biblioteca, tabela ou endpoint — isso é da
TechSpec. Misturar os dois faz decidir tecnologia antes de entender o problema.

**Nenhuma etapa começa sem perguntas.** PRD e TechSpec exigem esclarecimento antes de serem
escritos. Se a resposta for "decida você", a decisão é registrada **com a justificativa**.

**Tarefas são autocontidas.** Cada uma traz os contratos e regras relevantes copiados dentro
dela, para ser executada sem navegar entre arquivos.

**Uma tarefa por vez, com validação local.** Nada é dado como concluído sem lint, tipos e testes
passando.

**Nada é publicado sem autorização explícita.** Commit, push e publicação acontecem apenas
quando o responsável autoriza naquele momento.

## O documento de contexto vivo

O ponto mais importante do processo. Um documento único registra visão, escopo, stack, decisões
e o estado atual do trabalho — e é lido no início de toda sessão.

!!! quote "Por que isso existe"
    Sessões de trabalho com IA são reiniciadas com frequência. Sem um contexto persistente, cada
    reinício custa horas de re-explicação e, pior, decisões já tomadas são refeitas de forma
    diferente.

Junto dele ficam um diário de decisões com o raciocínio de cada escolha, a visão de fases
futuras, o padrão das artes e as ideias registradas mas ainda não construídas.

## Validação em aparelho real

Nenhuma tela é dada como pronta antes de ser vista **no celular**, nos dois temas. Foi assim com
a despensa, com a identidade visual e com as artes dos ingredientes.

Emulador e teste automatizado não mostram o que importa aqui: se o traço lê a 44 pixels, se o
contraste funciona no sol, se o toque cai onde deveria.
