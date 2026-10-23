# Guia do Geo-Explorer

## 1. Propósito

O Geo-Explorer é um projeto de aprendizado inspirado em trilhas de tecnologia. Sua finalidade é demonstrar o ciclo de uma aplicação pequena: guardar dados em JSON, validar e consultar o catálogo, produzir conteúdo em Markdown, expor funções como ferramentas MCP e cobrir os fluxos principais com testes.

O catálogo é fictício. Não use seus preços, promoções, cronogramas, XP, badges ou trilhas como informação oficial da DIO. Os planos e desafios gerados também são sugestões do projeto, não conteúdo oficial.

## 2. Estrutura atual

```text
Geo-Explorer/
├── .bobignore
├── README.md
├── package.json
├── package-lock.json
├── tsconfig.json
├── commands/
│   ├── certificado.ts
│   ├── desafio.ts
│   ├── index.ts
│   └── trilha.ts
├── data/
│   └── trilhas.json
├── docs/
│   ├── guia-do-projeto.md
│   ├── prompts-do-projeto.md
│   ├── resultados-testes.txt
│   ├── certificados-emetidos/
│   │   └── certificado-java-aluno.md
│   └── desafios-gerados/
│       └── desafio-java-aluno.md
├── .bob/
│   └── commands/
│       ├── certificado.md
│       ├── desafio.md
│       └── trilha.md
├── src/
│   └── mcp/
│       ├── README.md
│       ├── http.ts
│       ├── server.ts
│       └── stdio.ts
└── tests/
    ├── flow/
    │   └── geo-explorer-flow.test.ts
    └── unit/
        ├── certificado.test.ts
        ├── desafio.test.ts
        └── trilha.test.ts
```

`node_modules/` é instalado pelo npm; `coverage/` pode ser criado pela execução com cobertura. Essas pastas geradas não fazem parte da estrutura fonte documentada acima.

## 3. Componentes

### Catálogo `data/trilhas.json`

O arquivo tem um objeto raiz com a propriedade `trilhas`, que contém uma lista de trilhas. Cada entrada usa:

| Campo | Uso |
| --- | --- |
| `id` | Identificador numérico da trilha. |
| `nome` | Nome demonstrativo da trilha. |
| `tecnologia` | Lista de tecnologias relacionadas. |
| `nivel` | Nível, como Iniciante, Intermediário ou Avançado. |
| `numero_modulos` | Quantidade de módulos usada pelo gerador de plano. |
| `xp_total` | XP ilustrativo. |
| `badges_disponiveis` | Badges fictícias para fins de exemplo. |
| `promocoes` | Estado e descrição de uma promoção fictícia. |
| `vitalicio` | Valor booleano para ilustrar o atributo. |
| `lives_ao_vivo` | Tema, frequência e estado demonstrativo da agenda. |

As tecnologias são arrays: uma trilha pode abranger mais de uma. O campo `numero_modulos` registra apenas a quantidade; o catálogo não contém ementas oficiais nem nomes reais de módulos.

### Lógica TypeScript `commands/`

- `index.ts`: tipos compartilhados, normalização de acentos/caixa, carregamento e validação básica do JSON e formatação de opções.
- `trilha.ts`: procura uma tecnologia ou nome exato, resolve ambiguidades e monta a quantidade correta de módulos sugeridos.
- `desafio.ts`: localiza trilhas por nível e tecnologia e escolhe um desafio fictício aleatório.
- `certificado.ts`: confirma o nome exato da trilha e monta um certificado fictício com data atual.

As funções exportam objetos com metadados e um método `execute(args)`. Isso facilita reuso por testes, MCP e futuras interfaces.

### Prompts `.bob/commands/`

Os `.md` são instruções para o Bob, não implementações TypeScript. Eles informam o objetivo, os argumentos, como consultar o JSON e como tratar casos sem correspondência. O arquivo com o texto completo de cada prompt é [docs/prompts-do-projeto.md](prompts-do-projeto.md). O diretório `.bob/commands/` é o local de comandos personalizados do workspace.

Os testes verificam que os arquivos existem no caminho esperado e que a lógica TypeScript funciona. Para confirmar a descoberta no ambiente, abra a raiz do Geo-Explorer no Bob e verifique se os comandos aparecem ao digitar `/` no chat.

### MCP `src/mcp/`

`server.ts` registra as quatro ferramentas e encaminha chamadas para o catálogo e a lógica existente. `stdio.ts` expõe o transporte de processo local. `http.ts` publica Streamable HTTP em `/mcp` e uma rota `/healthz`. `src/mcp/README.md` descreve a execução e os pré-requisitos para uma futura publicação remota.

O protocolo MCP sobre HTTP não é uma API REST. Um cliente MCP compatível envia as chamadas pelo endpoint de protocolo. Para clientes REST, seria necessário criar um gateway próprio que reutilize os mesmos módulos.

## 4. Uso funcional

### Plano de estudos

No prompt `/trilha`, informe uma tecnologia, como `Java`, ou o nome exato de uma trilha. Se a tecnologia apontar para mais de uma opção, escolha pelo nome completo. O resultado inclui nível, tecnologias, XP, quantidade de módulos, módulos numerados e uma ideia de projeto final. Os módulos são sugestões elaboradas pelo Geo-Explorer.

Pela ferramenta MCP, use `consultar_trilha` com o campo `tecnologia`.

### Desafio de código

No prompt `/desafio`, informe nível e tecnologia, como `Iniciante Java`. A seleção considera entradas cadastradas e gera um desafio compatível com o nível, incluindo requisitos e critérios. Os desafios são aleatórios e não trazem solução completa por padrão.

Pela ferramenta MCP, use `gerar_desafio` com os campos `nivel` e `tecnologia`.

### Certificado

No prompt `/certificado`, informe o nome e a trilha concluída, separados por `|`, por exemplo: `Ana Silva | Java e Orientação a Objetos`. O texto resultante deve sempre ser tratado como demonstrativo, sem validade ou reconhecimento institucional.

Pela ferramenta MCP, use `gerar_certificado_ficticio` com os campos `nome_usuario` e `trilha_concluida`.

### Consultar o catálogo

Use `listar_trilhas` para obter o conteúdo corrente de `data/trilhas.json` sem editar o arquivo.

## 5. Instalação, execução e verificação

```sh
npm install
npm test
npx tsc --noEmit
```

Para iniciar os transportes MCP:

```sh
npm run mcp:stdio
npm run mcp:http
```

`mcp:stdio` é para clientes locais que iniciam o processo. `mcp:http` inicia o servidor na interface loopback por padrão. As versões exatas e os scripts estão em `package.json`; `package-lock.json` fixa a árvore instalada.

O projeto também configura `npm run test:coverage`, que pede ao Node cobertura mínima de 80% em linhas, branches e funções para `commands/**/*.ts`. O último relatório arquivado registra 20 de 20 testes aprovados e 100% de linhas, 97,83% de branches e 100% de funções. Essa execução precede a criação do servidor MCP. Após a inclusão do MCP, a checagem `tsc --noEmit` foi executada com sucesso; a cobertura registrada não inclui `src/mcp/**/*.ts`.

## 6. Testes existentes

- `tests/unit/trilha.test.ts`: registro do prompt, normalização, carga/validação do catálogo, ambiguidades, plano e casos sem resultado.
- `tests/unit/desafio.test.ts`: registro do prompt, argumentos inválidos, filtro por nível/tecnologia e saída de níveis diferentes.
- `tests/unit/certificado.test.ts`: registro do prompt, validação de argumentos e trilha e saída fictícia.
- `tests/flow/geo-explorer-flow.test.ts`: fluxo de consulta de Java, geração e gravação do desafio e certificado para o mesmo aluno.

O fluxo grava os artefatos de exemplo em `docs/desafios-gerados/` e `docs/certificados-emetidos/`. O `.bobignore` exclui a pasta de certificados emitidos das atividades do Bob, junto com outras pastas e arquivos temporários; isso não é um controle de acesso nem uma regra geral do Git.

## 7. Limites atuais

1. O catálogo inteiro é fictício e não sincroniza com a DIO.
2. Os títulos de módulo do plano são gerados como sugestões, pois o JSON só guarda a quantidade de módulos.
3. Desafios e certificados são conteúdo de demonstração; certificado não atesta conclusão real.
4. O transporte HTTP está preparado para uso local, mas o projeto não implementa login, provedor OAuth/OIDC/SSO, gestão de usuários, TLS ou implantação em nuvem.
5. Não há API REST independente, banco de dados de progresso, interface web ou persistência de usuários.
6. Os testes automatizam a lógica de `commands/`; não cobrem ainda a comunicação MCP ponta a ponta.
7. O modo HTTP aceita bind remoto apenas com a opção explícita `MCP_ALLOW_REMOTE_BIND=true`; use-a somente numa rede privada atrás de gateway que aplique TLS e autenticação.

## 8. Dicas de manutenção

- Mantenha o JSON como fonte única das trilhas e valide os campos ao carregá-lo.
- Acrescente um teste unitário ao adicionar regras de busca ou formato de saída; atualize o teste de fluxo se mudar o caminho feliz completo.
- Preserve a normalização de acentos e caixa, que é importante para comandos em português.
- Não invente ementa, preço, promoção ou agenda real quando o catálogo for demonstrativo. Para incluir dados reais, guarde fonte e data da verificação.
- Preserve o aviso de ficção no certificado, desafio e documentação.
- Mantenha a lógica de negócio sem dependência do protocolo MCP. Assim é possível adicionar interface web, REST ou outro transporte sem duplicar a regra.
- Na publicação, termine TLS e faça OAuth/OIDC, autorização e limites no gateway. Não habilite bind público sem essa camada.

## 9. Ideias para futuros profissionais

O projeto é um ponto de partida para praticar evolução incremental. Boas próximas etapas seriam:

1. Definir um schema formal do catálogo e mensagens de validação claras para JSON inválido ou campos ausentes.
2. Separar `catalogo`, serviços de plano/desafio/certificado e adaptadores, e injetar o carregador do catálogo nos serviços para simplificar testes.
3. Incluir ementas próprias, revisadas e claramente autorais, para que cada módulo tenha objetivos de aprendizagem mensuráveis.
4. Criar testes MCP cliente-servidor para listar ferramentas, validar parâmetros, verificar respostas e lidar com erros.
5. Medir cobertura também para `src/mcp/` e automatizar checagens num pipeline de integração contínua.
6. Projetar um armazenamento de progresso com consentimento, privacidade, migrações e testes antes de persistir dados pessoais.
7. Integrar um provedor de identidade real e documentar escopos, expiração de tokens, autorização por ferramenta, auditoria e revogação.
8. Se houver necessidade concreta de REST, publicar endpoints documentados com OpenAPI sem confundir REST com Streamable HTTP/MCP.
9. Adicionar integração contínua, empacotamento/container e observabilidade somente depois de definir hospedagem e requisitos operacionais.

### Aprendizados de engenharia

- **Separar instruções de código:** prompts `.md` explicam como o agente deve interagir; `.ts` implementa comportamento determinístico e testável.
- **Modelar ambiguidade:** uma tecnologia pode aparecer em mais de uma trilha; pedir escolha explícita evita selecionar uma opção arbitrária.
- **Dados honestos:** a etiqueta fictícia protege o usuário de confundir dados didáticos com ofertas reais.
- **Transportes substituíveis:** stdio serve bem ao desenvolvimento e uso local; Streamable HTTP abre o caminho para clientes remotos, enquanto a autenticação pertence à camada de publicação.
- **Cobertura não é completude:** alta cobertura dos módulos de comando não prova qualidade de conteúdo, segurança de implantação, nem integração automática no Bob.

## 10. Histórico resumido das decisões

O projeto começou com uma estrutura de pastas, catálogo JSON e amostras fictícias de trilhas. O formato foi ajustado para `{"trilhas": [...]}` e os identificadores definidos como números. Depois foram criados prompts Markdown e implementações TypeScript para `/trilha`, `/desafio` e `/certificado`; `shared.ts` foi renomeado para `index.ts`. Os testes foram separados por comando e acompanhados por um teste de fluxo com relatório em texto. Os prompts foram primeiro movidos para `src/commands/` e, posteriormente, para `.bob/commands/`, o local reconhecido pelo Bob para comandos do workspace. Por fim, o servidor MCP passou a expor essas funções por `stdio` e Streamable HTTP local, com documentação para uma futura camada de publicação segura.
