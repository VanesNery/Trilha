import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const projectRoot = resolve(fileURLToPath(new URL("../../", import.meta.url)));

describe("servidor MCP em src/mcp", () => {
  it("inicializa, lista ferramentas e executa os três comandos", () => {
    const mensagens = [
      {
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {
          protocolVersion: "2025-11-25",
          capabilities: {},
          clientInfo: { name: "geo-explorer-test", version: "1.0.0" },
        },
      },
      { jsonrpc: "2.0", method: "notifications/initialized" },
      { jsonrpc: "2.0", id: 2, method: "tools/list", params: {} },
      {
        jsonrpc: "2.0",
        id: 3,
        method: "tools/call",
        params: { name: "consultar_trilha", arguments: { tecnologia: "Java e Orientação a Objetos" } },
      },
      {
        jsonrpc: "2.0",
        id: 4,
        method: "tools/call",
        params: { name: "gerar_desafio", arguments: { nivel: "Iniciante", tecnologia: "Java" } },
      },
      {
        jsonrpc: "2.0",
        id: 5,
        method: "tools/call",
        params: {
          name: "gerar_certificado_ficticio",
          arguments: { nome_usuario: "Ana Silva", trilha_concluida: "Java e Orientação a Objetos" },
        },
      },
    ];

    const resultado = spawnSync(
      process.execPath,
      ["--experimental-strip-types", "src/mcp/stdio.ts"],
      {
        cwd: projectRoot,
        input: `${mensagens.map((mensagem) => JSON.stringify(mensagem)).join("\n")}\n`,
        encoding: "utf8",
        timeout: 15_000,
        maxBuffer: 1024 * 1024,
      },
    );

    assert.equal(resultado.error, undefined, resultado.error?.message);
    assert.equal(resultado.status, 0, resultado.stderr);
    const respostas = resultado.stdout
      .split("\n")
      .filter(Boolean)
      .map((linha) => JSON.parse(linha) as { id?: number; result?: { tools?: { name: string }[]; content?: { text: string }[] } });

    const ferramentas = respostas.find((resposta) => resposta.id === 2)?.result?.tools?.map(({ name }) => name);
    assert.deepEqual(ferramentas, ["listar_trilhas", "consultar_trilha", "gerar_desafio", "gerar_certificado_ficticio"]);

    const plano = respostas.find((resposta) => resposta.id === 3)?.result?.content?.[0]?.text;
    assert.match(plano ?? "", /Plano de estudos: Java e Orientação a Objetos/);

    const desafio = respostas.find((resposta) => resposta.id === 4)?.result?.content?.[0]?.text;
    assert.match(desafio ?? "", /Desafio|Java/);

    const certificado = respostas.find((resposta) => resposta.id === 5)?.result?.content?.[0]?.text;
    assert.match(certificado ?? "", /Ana Silva/);
    assert.match(certificado ?? "", /FICTÍCIO — SEM VALIDADE OFICIAL/);
  });
});
