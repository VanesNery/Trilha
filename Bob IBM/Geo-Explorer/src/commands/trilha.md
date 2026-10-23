---
description: Exibe um plano de estudos para a tecnologia informada, usando o catálogo local.
argument-hint: <tecnologia>
---

Gere um plano de estudos para a tecnologia informada pelo usuário: `$1`.

Leia `data/trilhas.json` no workspace do Geo-Explorer. Encontre as trilhas cuja lista `tecnologia` contenha a tecnologia pedida, ignorando diferenças entre maiúsculas, minúsculas e acentos. Se o usuário informar o nome exato de uma trilha, aceite-o também como seleção. Se não encontrar, mostre as tecnologias disponíveis. Se houver mais de uma trilha correspondente, liste seus nomes e níveis e peça que o usuário escolha pelo nome exato da trilha.

Apresente o nome da trilha, nível, tecnologias, XP total e quantidade de módulos. Em seguida, monte uma lista numerada com exatamente o número indicado por `numero_modulos`, em ordem progressiva e com objetivos práticos coerentes com a tecnologia e o nível. Termine com uma sugestão de projeto final.

O arquivo contém apenas a quantidade de módulos, não seus títulos ou ementas. Identifique os módulos elaborados como sugestões do Geo-Explorer; não os atribua à DIO nem invente dados de catálogo. Não altere arquivos.
