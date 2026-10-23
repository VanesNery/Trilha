import { createServer } from "node:http";
import { createMcpHandler } from "@modelcontextprotocol/server";
import {
  localhostHostValidation,
  localhostOriginValidation,
  toNodeHandler,
} from "@modelcontextprotocol/node";
import { createGeoExplorerServer } from "./server.ts";

const host = process.env.MCP_HOST ?? "127.0.0.1";
const port = Number(process.env.MCP_PORT ?? 3333);
const isLoopback = ["127.0.0.1", "localhost", "::1"].includes(host);

if (!isLoopback && process.env.MCP_ALLOW_REMOTE_BIND !== "true") {
  throw new Error("Bind remoto bloqueado. Defina MCP_ALLOW_REMOTE_BIND=true somente atrás de um proxy privado com TLS e autenticação.");
}

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("MCP_PORT deve ser um número entre 1 e 65535.");
}

const handler = createMcpHandler(() => createGeoExplorerServer());
const nodeHandler = toNodeHandler(handler);
const validateHost = isLoopback ? localhostHostValidation() : undefined;
const validateOrigin = isLoopback ? localhostOriginValidation() : undefined;

const httpServer = createServer((request, response) => {
  if (validateHost && !validateHost(request, response)) return;
  if (validateOrigin && !validateOrigin(request, response)) return;

  if (request.url === "/healthz") {
    response.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ status: "ok", service: "geo-explorer-mcp" }));
    return;
  }

  if (new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`).pathname !== "/mcp") {
    response.writeHead(404, { "content-type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ error: "Use /mcp ou /healthz." }));
    return;
  }

  void nodeHandler(request, response).catch((error: unknown) => {
    console.error("Falha ao processar requisição MCP:", error);
    if (!response.headersSent) response.writeHead(500);
    response.end();
  });
});

httpServer.listen(port, host, () => {
  console.error(`Geo-Explorer MCP ativo em http://${host}:${port}/mcp`);
});

async function encerrar() {
  await handler.close();
  httpServer.close();
}

process.once("SIGINT", () => void encerrar());
process.once("SIGTERM", () => void encerrar());
