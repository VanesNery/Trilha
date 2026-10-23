import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, before, describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import certificado from "../../commands/certificado.ts";

const projectRoot = resolve(fileURLToPath(new URL("../../", import.meta.url)));
before(() => process.chdir(projectRoot));
afterEach(() => process.chdir(projectRoot));

describe("/certificado", () => {
  it("está registrado localmente no Bob", () => {
    const prompt = readFileSync(resolve(projectRoot, "src/commands/certificado.md"), "utf8");
    assert.match(prompt, /argument-hint: <nome-do-usuario> <trilha-concluída>/);
    assert.match(prompt, /FICTÍCIO — SEM VALIDADE OFICIAL/);
  });

  it("mostra instruções se nome ou trilha estiver faltando", () => {
    assert.match(certificado.execute("Aluno Geo-Explorer"), /Uso: \/certificado/);
  });

  it("rejeita trilha não cadastrada", () => {
    assert.match(certificado.execute("Aluno Geo-Explorer | Trilha Inventada"), /Não encontrei a trilha/);
  });

  it("gera certificado fictício para a trilha de Java", () => {
    const resposta = certificado.execute("Aluno Geo-Explorer | Java e Orientação a Objetos");
    assert.match(resposta, /FICTÍCIO — SEM VALIDADE OFICIAL/);
    assert.match(resposta, /Aluno Geo-Explorer/);
    assert.match(resposta, /Java e Orientação a Objetos/);
    assert.match(resposta, /Java, Maven, JUnit/);
  });
});
