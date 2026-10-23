import { carregarTrilhas, normalizar, type ComandoSlash, type Trilha } from "./index.ts";

const etapas = [
  "Fundamentos e ambiente de desenvolvimento",
  "Sintaxe essencial e primeiros exercícios",
  "Tipos de dados, variáveis e expressões",
  "Decisões, condições e tratamento de erros",
  "Repetições, coleções e processamento de dados",
  "Funções, organização e reutilização de código",
  "Estruturas e conceitos centrais da tecnologia",
  "Construção de componentes ou serviços",
  "Integração com bibliotecas e ferramentas do ecossistema",
  "Persistência e comunicação entre partes do sistema",
  "Boas práticas, acessibilidade e segurança",
  "Depuração e resolução de problemas comuns",
  "Testes e garantia de qualidade",
  "Desempenho, manutenção e evolução do projeto",
  "Projeto final e revisão do aprendizado",
];

function criarPlano(trilha: Trilha): string {
  const conteudo = Array.from({ length: trilha.numero_modulos }, (_, indice) => {
    const etapa = etapas[indice] ?? `Tópicos avançados e prática aplicada ${indice + 1}`;
    return `${indice + 1}. **${etapa}** — pratique com ${trilha.tecnologia.join(", ")} em um exercício curto.`;
  });

  return [
    `# Plano de estudos: ${trilha.nome}`,
    `**Nível:** ${trilha.nivel}  `,
    `**Tecnologias:** ${trilha.tecnologia.join(", ")}  `,
    `**XP total:** ${trilha.xp_total}  `,
    `**Módulos:** ${trilha.numero_modulos}`,
    "",
    "> Plano sugerido pelo Geo-Explorer. O catálogo contém a quantidade de módulos, mas não os títulos ou ementas oficiais.",
    "",
    ...conteudo,
    "",
    `## Projeto de conclusão\nCrie uma aplicação pequena em ${trilha.tecnologia.join(", ")} que aplique os conceitos estudados, inclua instruções de uso e revise o resultado com testes ou uma lista de verificação.`,
  ].join("\n");
}

const command: ComandoSlash = {
  name: "/trilha",
  description: "Exibe um plano de estudos para uma tecnologia cadastrada.",
  execute(args) {
    const tecnologia = normalizar(args);
    if (!tecnologia) return "Uso: /trilha <tecnologia ou nome da trilha>\nExemplo: /trilha Java";

    const trilhas = carregarTrilhas();
    const correspondencias = trilhas.filter((trilha) =>
      normalizar(trilha.nome) === tecnologia ||
      trilha.tecnologia.some((item) => normalizar(item) === tecnologia),
    );

    if (correspondencias.length === 0) {
      const disponiveis = [...new Set(trilhas.flatMap((trilha) => trilha.tecnologia))].sort();
      return `Não encontrei uma trilha para “${args.trim()}”. Tecnologias disponíveis: ${disponiveis.join(", ")}.`;
    }
    if (correspondencias.length > 1) {
      return `Encontrei mais de uma trilha para “${args.trim()}”. Escolha pelo nome:\n${correspondencias.map((item) => `- ${item.nome} (${item.nivel})`).join("\n")}`;
    }
    return criarPlano(correspondencias[0]);
  },
};

export default command;
