---
description: Gera um desafio aleatório de código baseado no nível e na tecnologia escolhidos.
argument-hint: <nível> <tecnologia>
---

Gere um único desafio de código aleatório para o nível `$1` e a tecnologia `$2`. Se a tecnologia tiver mais de uma palavra, aceite-a entre aspas ou identifique-a pelo restante dos argumentos.

Leia `data/trilhas.json` no workspace do Geo-Explorer. Confirme que a tecnologia consta em `tecnologia` e o nível corresponde a `nivel`, ignorando diferenças entre maiúsculas, minúsculas e acentos. Se faltar um dado, pergunte apenas pelo dado ausente. Se a combinação não corresponder a uma trilha, mostre opções válidas.

Apresente título, contexto, objetivo, requisitos, exemplos de entrada e saída quando fizerem sentido, critérios de conclusão e uma dica. Ajuste a complexidade ao nível. Não forneça a solução completa, a menos que o usuário peça. Os dados são fictícios; não diga que o desafio é oficial da DIO. Não altere arquivos.
