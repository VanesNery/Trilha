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

Os prompts Markdown estão em `src/commands/`. Quando o ambiente Bob estiver configurado para carregar esses arquivos como comandos locais, a sintaxe planejada é:

```text
/trilha Java
/trilha "Java e Orientação a Objetos"
/desafio Iniciante Java
/certificado Ana Silva | Java e Orientação a Objetos
```

`Java` encontra mais de uma trilha; escolha pelo nome completo para obter um plano sem ambiguidade. Para certificado, separe o nome e o nome da trilha com `|`.

**Integração do Bob:** os prompts estão em `src/commands/`, conforme a organização solicitada. O Bob precisa reconhecer essa pasta ou receber os prompts por configuração para que os comandos apareçam automaticamente no chat. A presença dos arquivos no projeto, por si só, não registra um comando no Bob. Os testes verificam o conteúdo dos prompts e a lógica TypeScript, não a descoberta automática pelo chat.

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

O padrão fica no loopback. Para bind remoto, o programa exige `MCP_ALLOW_REMOTE_BIND=true`; essa opção **não adiciona autenticação**. Use-a somente quando o processo estiver numa rede privada, atrás de um gateway que aplique TLS e autenticação antes de encaminhar as requisições. Veja [mcp/README.md](mcp/README.md).

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
├── mcp/                      # Registro das ferramentas e transportes MCP
├── src/commands/             # Prompts Markdown do Bob
└── tests/
    ├── unit/                 # Um arquivo por comando
    └── flow/                 # Consulta, desafio e certificado no mesmo fluxo
```

### Arquivos TypeScript

- `commands/index.ts`: interface `Trilha`, interface `ComandoSlash`, normalização de acentos/caixa, leitura e validação básica do catálogo e formatação de opções.
- `commands/trilha.ts`: busca por tecnologia/nome, apresenta opções se houver ambiguidade, e monta o plano.
- `commands/desafio.ts`: combina tecnologia e nível e escolhe uma proposta compatível.
- `commands/certificado.ts`: valida o nome da trilha e monta o certificado fictício com data atual.
- `mcp/server.ts`: registra as ferramentas MCP e chama os módulos de `commands/`.
- `mcp/stdio.ts`: inicia o transporte local `stdio`.
- `mcp/http.ts`: inicia o endpoint HTTP, a rota de saúde e as proteções de host/origem para execução local.

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

O relatório histórico em `docs/resultados-testes.txt` registra 20 testes aprovados, 100% de linhas, 97,83% de branches e 100% de funções para a lógica de `commands/`. Essa execução foi feita antes da inclusão do servidor MCP. Depois da criação do MCP, a checagem TypeScript foi aprovada, mas a cobertura registrada ainda não mede `mcp/`.

## Arquivos ignorados pelo Bob

`.bobignore` exclui `node_modules/`, arquivos `.env`, `data/cache-progresso/`, `docs/certificados-emetidos/` e arquivos `.tmp`. Isso orienta o Bob sobre arquivos a ignorar; não substitui `.gitignore`, controle de acesso ou gestão segura de segredos.

## Limitações e cuidados

1. O catálogo inteiro é fictício e não consulta o site da DIO.
2. Os planos são construídos a partir da quantidade de módulos e de etapas genéricas definidas no código.
3. Os desafios são gerados de uma lista de modelos locais, não por um serviço externo.
4. O certificado é um documento ilustrativo; não comprova conclusão nem é reconhecido por instituição.
5. Não existe login ou SSO no servidor. Não publique o HTTP diretamente na internet.
6. A pasta `src/commands/` contém os prompts, mas a integração do Bob depende de configurar a descoberta dessa pasta.

## Ideias para evolução

- Definir validação de schema completa para o catálogo e mensagens para cada campo inválido.
- Criar testes MCP cliente-servidor e incluir `mcp/` nos critérios de cobertura.
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
- [Detalhes e configuração do servidor MCP](mcp/README.md)
- [Resultados registrados dos testes](docs/resultados-testes.txt)
