import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { afterEach, before, describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { carregarTrilhas, formatarOpcoesTrilha, normalizar } from "../../commands/index.ts";
import trilha from "../../commands/trilha.ts";

const projectRoot = resolve(fileURLToPath(new URL("../../", import.meta.url)));
before(() => process.chdir(projectRoot));
afterEach(() => process.chdir(projectRoot));

describe("/trilha", () => {
  it("está registrado localmente no Bob", () => {
    const prompt = readFileSync(resolve(projectRoot, ".bob/commands/trilha.md"), "utf8");
    assert.match(prompt, /argument-hint: <tecnologia>/);
    assert.match(prompt, /data\/trilhas\.json/);
    assert.match(prompt, /plano de estudos/i);
  });

  it("normaliza diferenças de caixa e acentuação", () => {
    assert.equal(normalizar("  INTERMEDIÁRIO  "), "intermediario");
    assert.equal(normalizar("Java"), "java");
  });

  it("carrega trilhas e formata opções", () => {
    const catalogo = carregarTrilhas();
    assert.ok(catalogo.length >= 30);
    assert.match(formatarOpcoesTrilha(catalogo), /Java e Orientação a Objetos/);
  });

  it("informa quando o arquivo do catálogo está ausente", () => {
    const temp = mkdtempSync(join(tmpdir(), "geo-explorer-missing-"));
    try {
      process.chdir(temp);
      assert.throws(() => carregarTrilhas(), /Não encontrei data\/trilhas\.json/);
    } finally {
      process.chdir(projectRoot);
      rmSync(temp, { recursive: true, force: true });
    }
  });

  it("rejeita catálogo sem a lista trilhas", () => {
    const temp = mkdtempSync(join(tmpdir(), "geo-explorer-invalid-"));
    try {
      mkdirSync(join(temp, "data"));
      writeFileSync(join(temp, "data", "trilhas.json"), JSON.stringify({ cursos: [] }));
      process.chdir(temp);
      assert.throws(() => carregarTrilhas(), /propriedade 'trilhas'/);
    } finally {
      process.chdir(projectRoot);
      rmSync(temp, { recursive: true, force: true });
    }
  });

  it("mostra uso quando não recebe argumento", () => {
    assert.match(trilha.execute(""), /Uso: \/trilha/);
  });

  it("lista opções quando JAVA corresponde a mais de uma trilha", () => {
    const resposta = trilha.execute("JAVA");
    assert.match(resposta, /mais de uma trilha/i);
    assert.match(resposta, /Java e Orientação a Objetos/);
    assert.match(resposta, /Spring Boot para Microsserviços/);
  });

  it("gera plano com quantidade exata de módulos ao selecionar pelo nome", () => {
    const resposta = trilha.execute("Java e Orientação a Objetos");
    assert.match(resposta, /# Plano de estudos/);
    assert.match(resposta, /Java e Orientação a Objetos/);
    assert.equal((resposta.match(/^\d+\. \*\*/gm) ?? []).length, 12);
    assert.match(resposta, /plano sugerido/i);
  });

  it("informa as tecnologias disponíveis quando não há correspondência", () => {
    assert.match(trilha.execute("Fortran"), /Tecnologias disponíveis/);
  });
});
