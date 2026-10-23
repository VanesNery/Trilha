import { carregarTrilhas, normalizar, type ComandoSlash } from "./index.ts";

const command: ComandoSlash = {
  name: "/certificado",
  description: "Gera um certificado fictício em Markdown para uma trilha concluída.",
  execute(args) {
    const [nome, ...trilhaPartes] = args.split("|").map((parte) => parte.trim());
    const trilhaNome = trilhaPartes.join(" | ").trim();
    if (!nome || !trilhaNome) {
      return "Uso: /certificado <nome do usuário> | <trilha concluída>\nExemplo: /certificado Ana Silva | Python para Iniciantes";
    }

    const trilha = carregarTrilhas().find((item) => normalizar(item.nome) === normalizar(trilhaNome));
    if (!trilha) {
      const disponiveis = carregarTrilhas().map((item) => `- ${item.nome}`).join("\n");
      return `Não encontrei a trilha “${trilhaNome}”. Escolha uma destas trilhas cadastradas:\n${disponiveis}`;
    }

    const data = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(new Date());
    return [
      "# Certificado de Conclusão",
      "",
      "> ## FICTÍCIO — SEM VALIDADE OFICIAL",
      "",
      `Certificamos, para fins demonstrativos, que **${nome}** concluiu a trilha **${trilha.nome}** no Geo-Explorer.`,
      "",
      `- **Tecnologias:** ${trilha.tecnologia.join(", ")}`,
      `- **Nível:** ${trilha.nivel}`,
      `- **XP ilustrativo:** ${trilha.xp_total}`,
      `- **Data:** ${data}`,
      "",
      "Este documento é uma demonstração fictícia gerada localmente. Não foi emitido, validado nem reconhecido pela DIO ou por outra instituição.",
    ].join("\n");
  },
};

export default command;
