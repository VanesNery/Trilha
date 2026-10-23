import { McpServer } from "@modelcontextprotocol/server";
import * as z from "zod/v4";
import certificado from "../commands/certificado.ts";
import desafio from "../commands/desafio.ts";
import { carregarTrilhas } from "../commands/index.ts";
import trilha from "../commands/trilha.ts";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function texto(conteudo: string) {
  return { content: [{ type: "text" as const, text: conteudo }] };
}

/** Cria uma instância sem estado para transporte stdio ou Streamable HTTP. */
export function createGeoExplorerServer(): McpServer {
  // Os comandos existentes localizam o catálogo relativo à raiz do projeto.
  process.chdir(projectRoot);

  const server = new McpServer({ name: "geo-explorer", version: "1.0.0" });

  server.registerTool(
    "listar_trilhas",
    {
      title: "Listar trilhas do Geo-Explorer",
      description: "Lista as trilhas fictícias do catálogo local, com tecnologia e nível.",
      inputSchema: z.object({}),
    },
    async () => texto(JSON.stringify(carregarTrilhas(), null, 2)),
  );

  server.registerTool(
    "consultar_trilha",
    {
      title: "Consultar plano de estudos",
      description: "Recebe uma tecnologia ou o nome de uma trilha e retorna um plano de estudos em Markdown.",
      inputSchema: z.object({ tecnologia: z.string().min(1).describe("Tecnologia ou nome exato da trilha") }),
    },
    async ({ tecnologia }) => texto(trilha.execute(tecnologia)),
  );

  server.registerTool(
    "gerar_desafio",
    {
      title: "Gerar desafio de código",
      description: "Gera um desafio fictício aleatório para o nível e a tecnologia informados.",
      inputSchema: z.object({
        nivel: z.string().min(1).describe("Nível da trilha, como Iniciante, Intermediário ou Avançado"),
        tecnologia: z.string().min(1).describe("Tecnologia cadastrada no Geo-Explorer"),
      }),
    },
    async ({ nivel, tecnologia }) => texto(desafio.execute(`${nivel} ${tecnologia}`)),
  );

  server.registerTool(
    "gerar_certificado_ficticio",
    {
      title: "Gerar certificado fictício",
      description: "Cria em Markdown um certificado demonstrativo, sem validade oficial.",
      inputSchema: z.object({
        nome_usuario: z.string().min(1).describe("Nome a exibir no certificado"),
        trilha_concluida: z.string().min(1).describe("Nome da trilha cadastrada que foi concluída"),
      }),
    },
    async ({ nome_usuario, trilha_concluida }) =>
      texto(certificado.execute(`${nome_usuario} | ${trilha_concluida}`)),
  );

  return server;
}
