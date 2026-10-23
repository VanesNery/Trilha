import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { before, describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import certificado from "../../commands/certificado.ts";
import desafio from "../../commands/desafio.ts";
import trilha from "../../commands/trilha.ts";

const projectRoot = resolve(fileURLToPath(new URL("../../", import.meta.url)));
const aluno = "Aluno Geo-Explorer";

before(() => process.chdir(projectRoot));

describe("fluxo de estudo e conclusão em Java", () => {
  it("consulta JAVA, gera desafio e salva desafio e certificado para o mesmo aluno", () => {
    const opcoesJava = trilha.execute("JAVA");
    assert.match(opcoesJava, /Java e Orientação a Objetos/);
    assert.match(opcoesJava, /Spring Boot para Microsserviços/);

    const plano = trilha.execute("Java e Orientação a Objetos");
    assert.match(plano, /# Plano de estudos: Java e Orientação a Objetos/);
    assert.equal((plano.match(/^\d+\. \*\*/gm) ?? []).length, 12);

    const originalRandom = Math.random;
    Math.random = () => 0;
    let desafioGerado = "";
    try {
      desafioGerado = desafio.execute("Iniciante Java");
    } finally {
      Math.random = originalRandom;
    }

    const certificadoGerado = certificado.execute(`${aluno} | Java e Orientação a Objetos`);
    assert.match(desafioGerado, /Java, Maven, JUnit/);
    assert.match(certificadoGerado, new RegExp(aluno));
    assert.match(certificadoGerado, /FICTÍCIO — SEM VALIDADE OFICIAL/);

    const pastaDesafios = resolve(projectRoot, "docs/desafios-gerados");
    const pastaCertificados = resolve(projectRoot, "docs/certificados-emetidos");
    mkdirSync(pastaDesafios, { recursive: true });
    mkdirSync(pastaCertificados, { recursive: true });
    writeFileSync(resolve(pastaDesafios, "desafio-java-aluno.md"), `# Desafio para ${aluno}\n\n${desafioGerado}\n`, "utf8");
    writeFileSync(resolve(pastaCertificados, "certificado-java-aluno.md"), `${certificadoGerado}\n`, "utf8");
  });
});
