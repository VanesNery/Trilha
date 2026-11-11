# Trilha de estudos e projetos

Repositório pessoal para reunir exercícios, desafios e projetos desenvolvidos durante estudos de programação, com foco em Python e ferramentas relacionadas. O conteúdo vem de diferentes cursos e iniciativas, por isso cada pasta pode ter seus próprios requisitos e instruções.

## Conteúdo

### [`FIAP-Python/`](FIAP-Python/README.md)

Exercícios introdutórios de Python organizados por assunto: variáveis, estruturas lógicas e de dados, funções e manipulação de arquivos. A pasta tem um README próprio com exemplos de execução. Em geral, execute cada script separadamente com Python 3.

### [`Trilha-DIO/`](Trilha-DIO/)

Materiais e projetos da trilha de Python da DIO, organizados por módulo:

- **06 — Gerenciamento de pacotes e boas práticas:** exemplos de organização e dependências com Poetry e Pipenv, além de desafios.
- **07 — Banco de dados:** exercícios com SQLite, DB-API e transações.
- **11 — Desenvolvimento de APIs com Flask:** projetos `dio_bank` e `dio_blog`. O blog inclui configuração Poetry e testes; consulte os READMEs de cada projeto antes de instalar dependências ou executar a aplicação.
- **12 — Desenvolvimento full stack com Django:** arquivos de configuração Poetry para os estudos do módulo.

### [`Desafio - Formatando_Dados_Em_Python/`](Desafio%20-%20Formatando_Dados_Em_Python/)

Scripts curtos de prática para formatação de datas, conversão de temperatura e separação de domínios.

### [`Bob IBM/Geo-Explorer/`](<Bob IBM/Geo-Explorer/README.md>)

Projeto didático em TypeScript que consulta um catálogo fictício de trilhas de aprendizagem, sugere planos e desafios, e expõe ferramentas por MCP. O README do projeto detalha instalação, execução, testes e limitações.

### [`dio-agent/`](dio-agent/README.md)

Agente de estudos da DIO, com instruções, documentação e skills para apoiar planejamento e aprendizagem em diferentes ambientes de agentes de IA. Consulte o README da pasta para configurar e utilizar o agente.

## Tecnologias presentes

- Python e gerenciamento de ambientes/dependências com Poetry e Pipenv
- SQLite
- Flask e Django
- TypeScript, Node.js e npm
- Model Context Protocol (MCP)
- Git e GitHub

Cada projeto define suas próprias versões e comandos. Consulte os arquivos `README.md`, `pyproject.toml`, `Pipfile` ou `package.json` na respectiva pasta antes de executá-lo. Não existe um único comando de instalação ou de testes que cubra todo o repositório.

## Como começar

Clone o repositório e entre na pasta:

```bash
git clone <URL_DO_REPOSITORIO>
cd Trilha
```

Depois, escolha um projeto e siga as instruções locais. Por exemplo, para executar um exercício simples de Python:

```bash
python3 FIAP-Python/entendendoVariaveis/boas_vindas.py
```

Para o Geo-Explorer, entre na pasta do projeto e siga o fluxo documentado em seu README:

```bash
cd "Bob IBM/Geo-Explorer"
npm install
npm test
```

Projetos Flask, Django e exercícios que acessam arquivos ou bancos de dados podem exigir configuração ou execução a partir de suas próprias pastas. Veja a documentação local para evitar caminhos ou dependências incorretos.

## Organização

```text
Trilha/
├── FIAP-Python/                         # Exercícios Python da FIAP
├── Trilha-DIO/                          # Módulos e projetos da trilha DIO
├── Desafio - Formatando_Dados_Em_Python/ # Exercícios de formatação
├── Bob IBM/Geo-Explorer/                # Projeto TypeScript e MCP
├── dio-agent/                           # Agente de estudos e skills
└── README.md                            # Visão geral do repositório
```

## Objetivo

Manter os registros de estudo e projetos em um só lugar, documentando cada iniciativa no contexto em que foi criada. O repositório é voltado ao aprendizado; os projetos podem estar em estágios diferentes de conclusão e devem ser avaliados individualmente.

Author by Vanessa Nery