# Geo-Explorer

Projeto didático desenvolvido para um desafio da DIO. O Geo-Explorer demonstra como modelar um catálogo local de aprendizagem, consultar trilhas, sugerir planos de estudos, gerar desafios de programação e disponibilizar essas funções a clientes de IA por meio do Model Context Protocol (MCP).

> **Aviso sobre os dados:** as 32 trilhas em `data/trilhas.json` são fictícias. Nomes, tecnologias agrupadas, níveis, XP, badges, promoções, datas, acesso vitalício e lives são exemplos criados para o projeto. Não representam cursos, preços ou ofertas oficiais da DIO. Os módulos gerados são sugestões do Geo-Explorer, não ementas oficiais.

## O que o projeto faz

- Lê um catálogo estruturado em JSON.
- Procura uma trilha por tecnologia ou nome.
- Gera um plano sugerido com a quantidade de módulos cadastrada.
- Cria desafios aleatórios compatíveis com uma tecnologia e nível.
- Produz um certificado Markdown explicitamente fictício.
- Expõe as funcionalidades em quatro ferramentas MCP por `stdio` ou Streamable HTTP.
- Inclui testes unitários por comando e um teste de fluxo Java.

O projeto **não** tem uma aplicação web, banco de dados de alunos, rastreamento de progresso, emissão oficial de certificados, login/SSO ou API REST própria.

## Começar

### Requisitos

- Node.js 22 ou superior.
- npm.

### Instalar e conferir

Na pasta `Geo-Explorer`:

```sh
npm install
npm test
npx tsc --noEmit
```

## Modos de uso

### 1. Prompts locais do Bob

Os prompts Markdown estão em `.bob/commands/`, diretório de comandos locais do projeto no Bob. A sintaxe é:

```text
/trilha Java
/trilha "Java e Orientação a Objetos"
/desafio Iniciante Java
/certificado Ana Silva | Java e Orientação a Objetos
```

`Java` encontra mais de uma trilha; escolha pelo nome completo para obter um plano sem ambiguidade. Para certificado, separe o nome e o nome da trilha com `|`.

**Integração do Bob:** cada arquivo Markdown em `.bob/commands/` corresponde ao comando local com o mesmo nome. Abra o projeto no Bob e digite `/` no chat para localizá-los. Os testes verificam os arquivos e a lógica TypeScript; a disponibilidade no menu ainda depende de abrir o workspace correto no Bob.

### 2. Servidor MCP local por `stdio`

Use este modo quando um cliente MCP inicia o servidor como processo local:

```sh
npm run mcp:stdio
```

### 3. Servidor MCP via HTTP local

```sh
npm run mcp:http
```

Endereços padrão:

- MCP Streamable HTTP: `http://127.0.0.1:3333/mcp`
- Verificação de saúde: `http://127.0.0.1:3333/healthz`

Configuração por ambiente:

```sh
MCP_HOST=127.0.0.1 MCP_PORT=3333 npm run mcp:http
```

O padrão fica no loopback. Para bind remoto, o programa exige `MCP_ALLOW_REMOTE_BIND=true`; essa opção **não adiciona autenticação**. Use-a somente quando o processo estiver numa rede privada, atrás de um gateway que aplique TLS e autenticação antes de encaminhar as requisições. Veja [src/mcp/README.md](src/mcp/README.md).

O endpoint `/mcp` fala o protocolo MCP sobre Streamable HTTP (JSON-RPC). Ele não cria rotas REST, como `/api/trilhas`. Uma aplicação que precise de REST terá de implementar um gateway próprio. A autenticação OAuth/OIDC/SSO, TLS, autorização e hospedagem também ficam para a infraestrutura futura.

## Ferramentas MCP

| Ferramenta | Parâmetros | Resultado |
| --- | --- | --- |
| `listar_trilhas` | Nenhum | Catálogo fictício completo em JSON. |
| `consultar_trilha` | `tecnologia` | Plano de estudos em Markdown. Aceita uma tecnologia ou o nome exato da trilha. |
| `gerar_desafio` | `nivel`, `tecnologia` | Desafio de código aleatório, com requisitos e critérios. |
| `gerar_certificado_ficticio` | `nome_usuario`, `trilha_concluida` | Certificado demonstrativo em Markdown, sem validade oficial. |

As ferramentas chamam a mesma lógica TypeScript usada pelos testes. A saída do certificado via MCP é retornada ao cliente; o servidor não grava um arquivo para cada chamada.

## Exemplos e dicas

### Plano de estudos

- Prefira `/trilha Java e Orientação a Objetos` para selecionar a trilha desejada diretamente.
- Se informar apenas `/trilha Java`, o sistema mostra as opções quando mais de uma trilha contém Java.
- Use uma tecnologia como aparece em `data/trilhas.json`; acentos e caixa são normalizados.
- A quantidade de tópicos é determinada por `numero_modulos`. O catálogo não contém ementas, portanto os títulos e atividades são sugestões do Geo-Explorer.

### Desafio

- Combine o nível e uma tecnologia cadastrados, por exemplo `Iniciante Java` ou `Avançado Spring Boot`.
- O desafio é escolhido aleatoriamente; execute novamente para obter outra proposta.
- A lógica do projeto não fornece a solução completa por padrão.
- Se não houver combinação válida, o resultado apresenta opções cadastradas.

### Certificado

- Use o formato `Nome da pessoa | Nome exato da trilha`.
- O nome da trilha precisa existir no catálogo; os certificados não validam conclusão real.
- Preserve o aviso **FICTÍCIO — SEM VALIDADE OFICIAL** ao compartilhar o resultado.

### Editar o catálogo

1. Edite `data/trilhas.json`, mantendo a propriedade raiz `trilhas` como uma lista.
2. Use `id` numérico e preserve os tipos esperados: listas para tecnologias, badges e lives; booleanos para `ativa` e `vitalicio`; `validade` pode ser uma data ou `null`.
3. Atualize ou acrescente testes para entradas novas, ambiguidade e casos inválidos.
4. Não inclua informação real da DIO sem fonte, data de verificação e autorização para uso.

## Estrutura do projeto

```text
Geo-Explorer/
├── .bobignore
├── README.md
├── package.json / package-lock.json
├── tsconfig.json
├── commands/                 # Implementações TypeScript reutilizáveis
├── data/trilhas.json         # Catálogo local fictício (32 trilhas)
├── docs/
│   ├── guia-do-projeto.md
│   ├── prompts-do-projeto.md
│   ├── resultados-testes.txt
│   ├── desafios-gerados/     # Exemplo gravado pelo fluxo de testes
│   └── certificados-emetidos/# Exemplo fictício gravado pelo fluxo de testes
├── src/
│   └── mcp/                  # Registro das ferramentas e transportes MCP
│       ├── server.ts
│       ├── stdio.ts
│       ├── http.ts
│       └── README.md
├── .bob/commands/            # Prompts Markdown dos slash commands locais do Bob
└── tests/
    ├── unit/                 # Um arquivo por comando
    └── flow/                 # Fluxo de estudo e inicialização MCP por stdio
```

### Arquivos TypeScript

- `commands/index.ts`: interface `Trilha`, interface `ComandoSlash`, normalização de acentos/caixa, leitura e validação básica do catálogo e formatação de opções.
- `commands/trilha.ts`: busca por tecnologia/nome, apresenta opções se houver ambiguidade, e monta o plano.
- `commands/desafio.ts`: combina tecnologia e nível e escolhe uma proposta compatível.
- `commands/certificado.ts`: valida o nome da trilha e monta o certificado fictício com data atual.
- `src/mcp/server.ts`: registra as ferramentas MCP e chama os módulos de `commands/`.
- `src/mcp/stdio.ts`: inicia o transporte local `stdio`.
- `src/mcp/http.ts`: inicia o endpoint HTTP, a rota de saúde e as proteções de host/origem para execução local.

Os prompts `.md` orientam o Bob; os módulos `.ts` fazem o processamento determinístico e permitem integração por código. Consulte [Prompts e decisões](docs/prompts-do-projeto.md) para ler o texto integral dos prompts operacionais.

## Formato do catálogo

O arquivo usa esta estrutura conceitual:

```json
{
  "trilhas": [
    {
      "id": 7,
      "nome": "Java e Orientação a Objetos",
      "tecnologia": ["Java", "Maven", "JUnit"],
      "nivel": "Iniciante",
      "numero_modulos": 12,
      "xp_total": 6900,
      "badges_disponiveis": ["Classe Fundamental", "Objeto em Campo", "Java Starter"],
      "promocoes": {
        "ativa": true,
        "descricao": "Mentoria em grupo fictícia incluída",
        "validade": "2027-05-01"
      },
      "vitalicio": true,
      "lives_ao_vivo": [
        {
          "tema": "POO com exemplos do cotidiano",
          "frequencia": "Segundas às 19h",
          "status": "agenda fictícia"
        }
      ]
    }
  ]
}
```

`id` deve ser numérico. As propriedades `tecnologia`, `badges_disponiveis` e `lives_ao_vivo` são listas. `promocoes` agrupa os dados da promoção ilustrativa. O catálogo guarda apenas o número de módulos, não os nomes oficiais ou suas ementas.

## Testes e qualidade

```sh
npm test
npm run test:coverage
npx tsc --noEmit
```

- `tests/unit/trilha.test.ts`: arquivo de prompt, normalização, carregamento/validação do catálogo, ambiguidades e plano.
- `tests/unit/desafio.test.ts`: arquivo de prompt, validação de tecnologia/nível e respostas de níveis diferentes.
- `tests/unit/certificado.test.ts`: arquivo de prompt, parâmetros, trilha inválida e certificado de exemplo.
- `tests/flow/geo-explorer-flow.test.ts`: percorre consulta Java, plano, desafio e certificado para a mesma pessoa fictícia; grava os exemplos em `docs/`.
- `tests/flow/mcp-stdio-flow.test.ts`: inicia `src/mcp/stdio.ts` como cliente MCP, verifica as quatro ferramentas registradas e chama as ferramentas de plano, desafio e certificado.

`npm run test:coverage` mede a lógica em `commands/` e aplica os limites de 80% de linhas, branches e funções. O teste MCP valida o transporte `stdio` e as chamadas das ferramentas, mas ainda não está incluído no cálculo de cobertura. O teste de fluxo Java grava os arquivos de exemplo em `docs/desafios-gerados/` e `docs/certificados-emetidos/`; os valores registrados em `docs/resultados-testes.txt` são históricos e podem mudar conforme a suíte evolui. Execute os comandos acima para obter os resultados atuais.

## Arquivos ignorados pelo Bob

`.bobignore` exclui `node_modules/`, arquivos `.env`, `data/cache-progresso/`, `docs/certificados-emetidos/` e arquivos `.tmp`. Isso orienta o Bob sobre arquivos a ignorar; não substitui `.gitignore`, controle de acesso ou gestão segura de segredos.

## Limitações e cuidados

1. O catálogo inteiro é fictício e não consulta o site da DIO.
2. Os planos são construídos a partir da quantidade de módulos e de etapas genéricas definidas no código.
3. Os desafios são gerados de uma lista de modelos locais, não por um serviço externo.
4. O certificado é um documento ilustrativo; não comprova conclusão nem é reconhecido por instituição.
5. Não existe login ou SSO no servidor. Não publique o HTTP diretamente na internet.
6. Os comandos do Bob são locais ao workspace e ficam em `.bob/commands/`; não são comandos de terminal.

## Ideias para evolução

- Definir validação de schema completa para o catálogo e mensagens para cada campo inválido.
- Adicionar um teste de integração para o transporte HTTP e avaliar a cobertura interna de `src/mcp/`.
- Injetar o repositório de dados nas funções para testar sem mudar o diretório de trabalho.
- Escrever ementas autorais, objetivos observáveis e critérios de avaliação para cada trilha.
- Adicionar fontes e data de atualização se futuramente forem usados dados reais.
- Escolher um provedor de identidade para OAuth/OIDC/SSO, aplicar autorização por ferramenta, TLS, limites e logs no gateway e documentar o modelo de ameaças.
- Criar uma API REST somente se houver requisito para clientes que não falam MCP.
- Adicionar armazenamento de progresso com privacidade e consentimento se o projeto passar a guardar dados de usuários.

## Aprendizados para quem estuda o projeto

- **Separação de responsabilidades:** prompts, regras de negócio, dados, transporte, documentação e testes têm locais distintos.
- **Reuso:** MCP é uma camada de transporte; suas ferramentas chamam a mesma lógica usada nos testes, evitando copiar regras.
- **Entradas ambíguas:** uma tecnologia pode apontar para várias trilhas; pedir uma escolha explícita é melhor que assumir uma.
- **Dados honestos:** marcar conteúdo como fictício reduz o risco de apresentar exemplos como fatos ou ofertas reais.
- **Testes em camadas:** testes unitários localizam falhas por comando; o teste de fluxo mostra como as peças funcionam juntas.
- **Cobertura é uma métrica parcial:** 100% de linhas não valida precisão pedagógica, segurança de produção ou reconhecimento do comando pelo Bob.
- **Deploy é parte da arquitetura:** adicionar HTTPS não resolve identidade e autorização; esses controles precisam de planejamento próprio.

## Documentos complementares

- [Guia completo do projeto](docs/guia-do-projeto.md)
- [Prompts operacionais e decisões de desenvolvimento](docs/prompts-do-projeto.md)
- [Detalhes e configuração do servidor MCP](src/mcp/README.md)
- [Resultados registrados dos testes](docs/resultados-testes.txt)
