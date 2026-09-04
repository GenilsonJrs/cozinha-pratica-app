# Qualidade

O projeto trata qualidade como **portão**, não como intenção. Nada entra na branch principal sem
passar por verificação automática.

## Números atuais

| Métrica | Valor |
|---|---|
| Suítes de teste | 20 |
| Testes | 290 |
| Cobertura de linhas | ~93% |
| Cobertura mínima exigida | 85% |
| Bugs e vulnerabilidades no SonarCloud | 0 |

## O que roda a cada envio

A integração contínua executa, em ordem, e falha em qualquer etapa:

1. **ESLint** — padrão de código
2. **TypeScript** — verificação de tipos em modo estrito
3. **Testes com cobertura** — falha se a cobertura cair abaixo do mínimo
4. **SonarCloud** — análise estática com Quality Gate bloqueante

A branch principal é protegida e exige o resultado verde.

## Testes que guardam decisões, não só código

Alguns testes existem para impedir que uma **decisão de projeto** se perca com o tempo:

| Teste | O que protege |
|---|---|
| Contraste | Calcula a razão de contraste de cada par de cores e falha abaixo do mínimo acessível |
| Cores literais | Varre o código procurando cor escrita à mão fora da pasta de tema |
| Integridade do catálogo | Impede receita com ingrediente inexistente, item repetido, passo vazio ou água na lista |
| Inversão de tema nas artes | Garante que a arte dos ingredientes mude apenas o contorno entre claro e escuro |
| Cobertura dos essenciais | Garante que a despensa inicial produza receitas prontas na estreia |

Essa é a diferença entre um teste que confirma que o código faz o que faz, e um teste que
impede alguém — inclusive o próprio autor, meses depois — de desfazer uma decisão sem perceber.

## Cobertura como sinal, não como meta

O limite de 85% é piso, não alvo. Quando a cobertura cai perto dele porque entrou muito **dado**
(um catálogo, por exemplo), a resposta é escrever mais teste na **lógica**, nunca baixar o
limite.

## Armadilhas já pagas

Registro honesto do que custou tempo e não deve custar de novo:

- **`toJSON()` volta nulo** ao renderizar SVG nos testes; o assert que funciona é a raiz da tela.
- **Dois `render()` no mesmo teste quebram** do segundo em diante — usar um render por caso.
- **Campo novo no tema obriga atualizar a fixture** do teste que compara o tema inteiro.
- **A formatação automática reformata o projeto inteiro** por deriva de versão da ferramenta;
  roda-se com cuidado, para o diff não encher de ruído.
- **As rotas tipadas são geradas** e ficam fora do controle de versão, então a verificação local
  pode ser mais estrita que a do servidor.
