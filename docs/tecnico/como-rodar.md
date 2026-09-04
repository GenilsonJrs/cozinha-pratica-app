# Como rodar

## Pré-requisitos

- **Node.js** e npm
- **Expo Go** instalado no celular (Android ou iOS)
- Celular e computador **na mesma rede**

## Passos

```bash
git clone https://github.com/GenilsonJrs/cozinha-pratica-app.git
cd cozinha-pratica-app
npm install
npm start
```

Depois é só ler o QR code com o Expo Go. Não é necessário build nativo nem emulador — o app roda
direto no aparelho durante o desenvolvimento.

## Comandos disponíveis

| Comando | O que faz |
|---|---|
| `npm start` | Sobe o empacotador e mostra o QR code |
| `npm run android` | Sobe já abrindo no Android |
| `npm run lint` | Verifica o padrão de código |
| `npm run typecheck` | Verifica os tipos |
| `npm test` | Roda os testes |
| `npm test -- --coverage` | Roda os testes com relatório de cobertura |
| `npm run format` | Formata o projeto |

## Rede: o que costuma dar errado

!!! warning "Rede de visitante não funciona"
    Redes de convidado normalmente têm **isolamento de clientes** — os dispositivos não se
    enxergam, mesmo no mesmo Wi-Fi — e costumam **bloquear serviços de túnel**, o que derruba
    também a opção `--tunnel`.

    A saída que funciona é o **roteador portátil do celular**: ligue o ponto de acesso móvel e
    conecte o computador nele. Sem isolamento, sem relay externo, e o aplicativo carrega pela
    rede local em vez dos dados móveis.

Outros pontos:

- **Porta 8081 ocupada** aborta a inicialização. Encerre o processo que está usando a porta.
- **Firewall do Windows** bloqueia conexões de entrada em redes classificadas como públicas.
- **Ícone e splash só aparecem em build real**; no Expo Go não dá para conferir.

## Documentação

Esta documentação é gerada com MkDocs Material:

```bash
pip install -r requirements-docs.txt
mkdocs serve
```

O site fica em `http://127.0.0.1:8000`.
