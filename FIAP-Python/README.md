# FIAP Python

Repositório de exercícios e pequenos programas desenvolvidos durante os estudos de Python na FIAP. Os exemplos são independentes e percorrem conceitos básicos da linguagem até estruturas de dados e manipulação de arquivos.

## Conteúdo

- `entendendoVariaveis/` — variáveis, tipos básicos, texto, operações e entrada de dados.
- `estruturasLogicas/` — condicionais, repetições, menus e pequenos problemas de lógica.
- `estruturasDados/` — listas, conjuntos, dicionários, `map` e exercícios que usam essas estruturas.
- `entendendoFuncoes/` — definição de funções, argumentos, retorno, documentação e `kwargs`.
- `topicosAvancados/` — leitura e gravação de arquivos de texto e JSON, além de uma agenda interativa.

Os programas foram feitos como exercícios: vários exibem resultados no terminal e outros pedem dados durante a execução. Não há uma aplicação única nem uma suíte de testes automatizados.

## Requisitos

- Python 3 instalado (recomenda-se Python 3.10 ou superior).
- Terminal ou console integrado do editor.

Os exemplos usam recursos da biblioteca padrão do Python; não é necessário instalar pacotes adicionais.

Confira a instalação:

```bash
python3 --version
```

## Como executar

No terminal, entre na raiz do repositório e execute o arquivo desejado indicando seu caminho. Por exemplo:

```bash
cd FIAP-Python
python3 entendendoVariaveis/boas_vindas.py
```

Outro exemplo, com um exercício de estruturas lógicas:

```bash
python3 estruturasLogicas/fatorial.py
```

Em Windows, se `python3` não estiver disponível, use `python`:

```powershell
python estruturasLogicas/fatorial.py
```

Cada arquivo `.py` pode ser executado separadamente. Quando o programa solicitar valores, digite-os no terminal e pressione Enter. Para encerrar programas com menu, escolha a opção de saída apresentada.

## Exemplos para explorar

| Assunto | Arquivo | O que demonstra |
| --- | --- | --- |
| Variáveis e entrada | `entendendoVariaveis/calculadora_inteiros.py` | Operações aritméticas com valores informados pelo usuário |
| Condicionais e repetição | `estruturasLogicas/jogo_senha.py` | Repetição de tentativas até acertar uma senha |
| Estruturas de dados | `estruturasDados/batalha_naval.py` | Uso de coordenadas e coleções em um jogo simples |
| Funções | `entendendoFuncoes/funcoes.py` | Funções e interação por menu |
| Arquivos e JSON | `topicosAvancados/manipulador_agenda.py` | Cadastro de contatos, importação e exportação de dados |

## Arquivos de texto e JSON

Os scripts `abrindo_arquivo_texto.py`, `abrindo_json.py` e `criando_json.py` usam caminhos que começam com `FIAP-Python/`. Para executá-los sem alterar esses caminhos, rode-os a partir da pasta que contém `FIAP-Python` (a raiz do repositório), por exemplo:

```bash
python3 FIAP-Python/topicosAvancados/abrindo_json.py
```

Já `manipulador_agenda.py` solicita o nome ou caminho do arquivo no próprio programa. Informe um caminho válido para importar ou exportar a agenda.

## Testes

Não há testes automatizados configurados neste repositório. Para verificar um exercício, execute-o conforme as instruções acima e confira a saída com valores conhecidos. Nos programas interativos, experimente também diferentes entradas e opções dos menus.
