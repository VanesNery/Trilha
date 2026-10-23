import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, before, describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import desafio from "../../commands/desafio.ts";

const projectRoot = resolve(fileURLToPath(new URL("../../", import.meta.url)));
before(() => process.chdir(projectRoot));
afterEach(() => process.chdir(projectRoot));

describe("/desafio", () => {
  it("está registrado localmente no Bob", () => {
    const prompt = readFileSync(resolve(projectRoot, "src/commands/desafio.md"), "utf8");
    assert.match(prompt, /argument-hint: <nível> <tecnologia>/);
    assert.match(prompt, /desafio de código/i);
  });

  it("mostra uso sem argumentos", () => {
    assert.match(desafio.execute(""), /Uso: \/desafio/);
  });

  it("rejeita combinação de nível e tecnologia não cadastrada", () => {
    assert.match(desafio.execute("Avançado JavaScript"), /Não encontrei uma trilha compatível/);
  });

  it("gera desafio básico para Java com requisitos e critérios", () => {
    const originalRandom = Math.random;
    Math.random = () => 0;
    try {
      const resposta = desafio.execute("Iniciante Java");
      assert.match(resposta, /# Desafio:/);
      assert.match(resposta, /Tecnologia:\*\* Java, Maven, JUnit/);
      assert.match(resposta, /Nível:\*\* Iniciante/);
      assert.match(resposta, /## Requisitos/);
      assert.match(resposta, /Critérios de conclusão/);
      assert.match(resposta, /não é uma atividade oficial da DIO/);
    } finally {
      Math.random = originalRandom;
    }
  });

  it("cria desafio de nível intermediário", () => {
    const originalRandom = Math.random;
    Math.random = () => 0.999;
    try {
      const resposta = desafio.execute("Intermediário C#");
      assert.match(resposta, /API de catálogo/);
      assert.match(resposta, /Nível:\*\* Intermediário/);
    } finally {
      Math.random = originalRandom;
    }
  });

  it("cria desafio de nível avançado", () => {
    const originalRandom = Math.random;
    Math.random = () => 0.999;
    try {
      const resposta = desafio.execute("Avançado Spring Boot");
      assert.match(resposta, /Serviço resiliente/);
      assert.match(resposta, /Nível:\*\* Avançado/);
    } finally {
      Math.random = originalRandom;
    }
  });
});
