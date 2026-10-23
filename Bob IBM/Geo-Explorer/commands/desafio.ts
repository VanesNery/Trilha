import { carregarTrilhas, formatarOpcoesTrilha, normalizar, type ComandoSlash, type Trilha } from "./index.ts";

const command: ComandoSlash = {
  name: "/desafio",
  description: "Gera um desafio aleatório de código a partir de nível e tecnologia.",
  execute(args) {
    const entrada = args.trim();
    if (!entrada) return "Uso: /desafio <nível> <tecnologia>\nExemplo: /desafio Iniciante Python";

    const trilhas = carregarTrilhas();
    const consulta = normalizar(entrada);
    const opcoes = trilhas.filter((trilha) => {
      const nivel = normalizar(trilha.nivel);
      return consulta.includes(nivel) && trilha.tecnologia.some((tecnologia) => correspondeTecnologia(consulta, tecnologia));
    });

    if (opcoes.length === 0) {
      return `Não encontrei uma trilha compatível com “${entrada}”. Escolha nível e tecnologia entre estas opções:\n${formatarOpcoesTrilha(trilhas)}`;
    }

    const trilha = opcoes[Math.floor(Math.random() * opcoes.length)];
    const desafios = criarDesafios(trilha);
    const desafio = desafios[Math.floor(Math.random() * desafios.length)];
    return [
      `# Desafio: ${desafio.titulo}`,
      `**Tecnologia:** ${trilha.tecnologia.join(", ")}  `,
      `**Nível:** ${trilha.nivel}`,
      "",
      desafio.contexto,
      "",
      "## Requisitos",
      ...desafio.requisitos.map((requisito) => `- ${requisito}`),
      "",
      "## Critérios de conclusão",
      "- A solução atende aos requisitos e funciona com entradas válidas e inválidas.",
      "- O código está organizado e inclui pelo menos três verificações ou testes.",
      "",
      "**Dica:** divida o problema em passos pequenos antes de implementar.",
      "",
      "*Desafio fictício gerado pelo Geo-Explorer; não é uma atividade oficial da DIO.*",
    ].join("\n");
  },
};


function correspondeTecnologia(consulta: string, tecnologia: string): boolean {
  const termo = normalizar(tecnologia).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9])${termo}(?=$|[^a-z0-9])`).test(consulta);
}

function criarDesafios(trilha: Trilha): Array<{ titulo: string; contexto: string; requisitos: string[] }> {
  const tech = trilha.tecnologia[0];
  const base = [
    { titulo: "Organizador de tarefas", contexto: `Crie em ${tech} uma ferramenta simples para organizar tarefas pessoais.`, requisitos: ["Cadastrar, listar e concluir tarefas.", "Permitir filtrar tarefas por estado.", "Validar dados vazios e apresentar mensagens claras."] },
    { titulo: "Analisador de dados", contexto: `Implemente em ${tech} um programa que receba uma coleção de registros e produza um resumo útil.`, requisitos: ["Calcular quantidade, mínimo, máximo e média quando aplicável.", "Tratar coleção vazia e valores inválidos.", "Exibir o resultado em formato legível."] },
    { titulo: "Catálogo pesquisável", contexto: `Construa em ${tech} um catálogo de itens que permita encontrar rapidamente um registro.`, requisitos: ["Cadastrar e listar itens com pelo menos três campos.", "Buscar por nome sem diferenciar maiúsculas de minúsculas.", "Informar quando a busca não encontrar resultados."] },
    { titulo: "Validador de entradas", contexto: `Desenvolva em ${tech} um validador para os dados de um formulário de cadastro.`, requisitos: ["Validar campos obrigatórios e formatos básicos.", "Retornar mensagens específicas para cada erro.", "Aceitar e confirmar um conjunto de dados válido."] },
    { titulo: "Conversor com histórico", contexto: `Crie em ${tech} um conversor de unidades ou valores adequado à tecnologia escolhida.`, requisitos: ["Oferecer pelo menos três conversões.", "Validar a entrada e impedir resultados inválidos.", "Manter e mostrar o histórico das últimas conversões."] },
  ];

  if (normalizar(trilha.nivel) === "intermediario") {
    base.push({ titulo: "API de catálogo", contexto: `Implemente em ${tech} uma API ou módulo de serviço para gerenciar um catálogo.`, requisitos: ["Criar operações para listar, consultar, incluir e remover itens.", "Validar os dados e tratar identificadores inexistentes.", "Separar regras de negócio da apresentação ou transporte."] });
  }
  if (normalizar(trilha.nivel) === "avancado") {
    base.push({ titulo: "Serviço resiliente", contexto: `Projete em ${tech} um serviço que processe tarefas em lote com atenção à confiabilidade.`, requisitos: ["Processar lotes sem interromper todo o trabalho por uma falha isolada.", "Registrar erros e métricas úteis.", "Criar testes para sucesso, falha e carga maior."] });
  }
  return base;
}

export default command;
