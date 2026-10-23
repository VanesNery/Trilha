# Prompts e decisões de desenvolvimento

Este documento preserva o texto integral dos três prompts operacionais armazenados em `.bob/commands/`. Esses textos são instruções para o Bob. As funções em `commands/*.ts` são suas implementações programáticas reutilizadas pelo MCP.

## `/trilha`

Arquivo: `.bob/commands/trilha.md`

```text
---
description: Exibe um plano de estudos para a tecnologia informada, usando o catálogo local.
argument-hint: <tecnologia>
---

Gere um plano de estudos para a tecnologia informada pelo usuário: `$1`.

Leia `data/trilhas.json` no workspace do Geo-Explorer. Encontre as trilhas cuja lista `tecnologia` contenha a tecnologia pedida, ignorando diferenças entre maiúsculas, minúsculas e acentos. Se o usuário informar o nome exato de uma trilha, aceite-o também como seleção. Se não encontrar, mostre as tecnologias disponíveis. Se houver mais de uma trilha correspondente, liste seus nomes e níveis e peça que o usuário escolha pelo nome exato da trilha.

Apresente o nome da trilha, nível, tecnologias, XP total e quantidade de módulos. Em seguida, monte uma lista numerada com exatamente o número indicado por `numero_modulos`, em ordem progressiva e com objetivos práticos coerentes com a tecnologia e o nível. Termine com uma sugestão de projeto final.

O arquivo contém apenas a quantidade de módulos, não seus títulos ou ementas. Identifique os módulos elaborados como sugestões do Geo-Explorer; não os atribua à DIO nem invente dados de catálogo. Não altere arquivos.
```

Argumento declarado no cabeçalho: `<tecnologia>`.

## `/desafio`

Arquivo: `.bob/commands/desafio.md`

```text
---
description: Gera um desafio aleatório de código baseado no nível e na tecnologia escolhidos.
argument-hint: <nível> <tecnologia>
---

Gere um único desafio de código aleatório para o nível `$1` e a tecnologia `$2`. Se a tecnologia tiver mais de uma palavra, aceite-a entre aspas ou identifique-a pelo restante dos argumentos.

Leia `data/trilhas.json` no workspace do Geo-Explorer. Confirme que a tecnologia consta em `tecnologia` e o nível corresponde a `nivel`, ignorando diferenças entre maiúsculas, minúsculas e acentos. Se faltar um dado, pergunte apenas pelo dado ausente. Se a combinação não corresponder a uma trilha, mostre opções válidas.

Apresente título, contexto, objetivo, requisitos, exemplos de entrada e saída quando fizerem sentido, critérios de conclusão e uma dica. Ajuste a complexidade ao nível. Não forneça a solução completa, a menos que o usuário peça. Os dados são fictícios; não diga que o desafio é oficial da DIO. Não altere arquivos.
```

Argumentos declarados no cabeçalho: `<nível> <tecnologia>`.

## `/certificado`

Arquivo: `.bob/commands/certificado.md`

```text
---
description: Gera um certificado fictício em Markdown para uma trilha concluída.
argument-hint: <nome-do-usuario> <trilha-concluída>
---

Gere um certificado fictício em Markdown para o usuário `$1`, referente à trilha concluída `$2`. Se o nome ou a trilha tiver mais de uma palavra, aceite o valor entre aspas ou identifique-o pelo restante dos argumentos.

Leia `data/trilhas.json` no workspace do Geo-Explorer e confirme que a trilha existe. Se faltar o nome ou a trilha, pergunte pelo dado ausente. Se a trilha não existir, apresente os nomes cadastrados e peça que o usuário escolha uma.

Inclua título, nome do participante, trilha, tecnologias, nível, XP ilustrativo e data atual se disponível. Deixe em destaque **FICTÍCIO — SEM VALIDADE OFICIAL**. Não afirme que o certificado foi emitido ou reconhecido pela DIO e não invente carga horária ou credenciais. Não altere arquivos.
```

Argumentos declarados no cabeçalho: `<nome-do-usuario> <trilha-concluída>`.

## Solicitações que orientaram o desenvolvimento

O histórico de trabalho estabeleceu estas decisões, resumidas em ordem:

1. Inspecionar a estrutura antes de criar ou alterar arquivos.
2. Criar `Bob IBM/Geo-Explorer` e as pastas `src`, `data`, `commands`, `mcp` e `docs`.
3. Criar `data/trilhas_dio.json`, mostrar a árvore e preencher uma lista extensa de trilhas fictícias.
4. Ajustar o formato do catálogo para `{ "trilhas": [...] }` e usar somente IDs numéricos.
5. Criar `.bobignore` para dependências, segredos e saídas/temporários indicados.
6. Criar `/trilha`, `/desafio` e `/certificado`; esclarecer que os comandos de projeto deveriam ser arquivos locais `.ts` e renomear `shared.ts` para `index.ts`.
7. Manter os comandos locais ao projeto, remover `.agents` e revisar a árvore do projeto.
8. Criar testes unitários e de fluxo, testar Java, gravar resultados e separar testes unitários em um arquivo para cada comando.
9. Criar um servidor MCP local que possa servir de base para uso posterior por HTTP/HTTPS, SSO ou API, usando a pasta `mcp`.
10. Mover os prompts Markdown para `src/commands/` e documentar o projeto, seus prompts, modos de uso, dicas e oportunidades de evolução.
11. Após a auditoria identificar que o Bob procura comandos do workspace em `.bob/commands/`, mover os três prompts para esse diretório e ajustar testes e documentação.
12. Mover a implementação e a documentação do servidor MCP de `mcp/` para `src/mcp/`, atualizando os scripts e caminhos do projeto.

As solicitações anteriores usaram variações e correções de texto para reafirmar os mesmos objetivos. Os três prompts operacionais integrais acima são a versão vigente armazenada no repositório.
