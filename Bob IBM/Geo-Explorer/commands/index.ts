import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

export interface Trilha {
  id: number;
  nome: string;
  tecnologia: string[];
  nivel: string;
  numero_modulos: number;
  xp_total: number;
  badges_disponiveis: string[];
  promocoes: { ativa: boolean; descricao: string; validade: string | null };
  vitalicio: boolean;
  lives_ao_vivo: Array<{ tema: string; frequencia: string; status: string }>;
}

export interface ComandoSlash {
  name: string;
  description: string;
  execute(args: string): string;
}

export function normalizar(valor: string): string {
  return valor.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLocaleLowerCase("pt-BR");
}

export function carregarTrilhas(): Trilha[] {
  const caminhos = [
    resolve(process.cwd(), "data/trilhas.json"),
    resolve(process.cwd(), "Bob IBM/Geo-Explorer/data/trilhas.json"),
    resolve(process.cwd(), "../data/trilhas.json"),
  ];
  const arquivo = caminhos.find(existsSync);
  if (!arquivo) {
    throw new Error("Não encontrei data/trilhas.json. Execute o comando na raiz do Geo-Explorer ou do repositório.");
  }

  const dados = JSON.parse(readFileSync(arquivo, "utf8")) as { trilhas?: Trilha[] };
  if (!Array.isArray(dados.trilhas)) {
    throw new Error("O arquivo trilhas.json precisa conter uma lista na propriedade 'trilhas'.");
  }
  return dados.trilhas;
}

export function formatarOpcoesTrilha(trilhas: Trilha[]): string {
  return trilhas.map((trilha) => `- ${trilha.nome} (${trilha.nivel}; ${trilha.tecnologia.join(", ")})`).join("\n");
}
