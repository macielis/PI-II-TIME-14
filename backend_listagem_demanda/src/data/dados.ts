//Aqui é onde ficará os arrays com informações falsas para as rotas poderem ler e devolver.
//Os dados abaixo são os mesmos que aparecem na tela ListDemanda.html.

//Os tipos ajudam o TypeScript a conferir os campos (e aceitam null onde o detalhe também aceita).
export type Status = "Pendente" | "Em andamento" | "Concluída" | "Atrasada";
export type Prioridade = "Crítica" | "Alta" | "Média" | "Baixa";

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: string;
}

export interface Projeto {
  id: number;
  nome: string;
}

export interface Demanda {
  id: number;
  titulo: string;
  descricao: string;
  tipo: string;
  prioridade: Prioridade;
  status: Status;
  //Porcentagem de 0 a 100 (usada na barra de progresso da tabela).
  progresso: number;
  projetoId: number;
  responsavelId: number | null;
  dataCriacao: string;
  dataAtualizacao: string;
  prazo: string | null;
}

//Listas fixas usadas tanto na validação quanto nos selects de filtro.
export const STATUS_VALIDOS: Status[] = ["Pendente", "Em andamento", "Concluída", "Atrasada"];
export const PRIORIDADES_VALIDAS: Prioridade[] = ["Crítica", "Alta", "Média", "Baixa"];

export const usuarios: Usuario[] = [
  { id: 1, nome: "Ramiro Alexander", email: "ramiro@gmail.com", perfil: "Administrador" },
  { id: 2, nome: "Gabriel Lara", email: "gabriel.lara@gmail.com", perfil: "Líder de Projeto" },
  { id: 3, nome: "Gabriel Hernandes", email: "gabriel.hernandes@gmail.com", perfil: "Membro da Equipe" },
];

//O "Módulo" que aparece embaixo do título de cada demanda na tabela.
export const projetos: Projeto[] = [
  { id: 1, nome: "Módulo de Demandas" },
  { id: 2, nome: "Módulo de Autenticação" },
  { id: 3, nome: "Módulo de Dashboard" },
  { id: 4, nome: "Documentação" },
];

export const demandas: Demanda[] = [
  {
    id: 142,
    titulo: "Listagem de Demandas",
    descricao: "Criar a tela que lista e filtra as demandas.",
    tipo: "Tarefa",
    prioridade: "Alta",
    status: "Em andamento",
    progresso: 70,
    projetoId: 1,
    responsavelId: 1,
    dataCriacao: "2026-08-20",
    dataAtualizacao: "2026-09-10",
    prazo: "2026-09-18",
  },
  {
    id: 143,
    titulo: "Cadastro de nova demanda",
    descricao: "Criar o formulário de cadastro e edição de demandas.",
    tipo: "Tarefa",
    prioridade: "Crítica",
    status: "Pendente",
    progresso: 20,
    projetoId: 1,
    responsavelId: 1,
    dataCriacao: "2026-08-22",
    dataAtualizacao: "2026-09-08",
    prazo: "2026-09-30",
  },
  {
    id: 144,
    titulo: "Validações de formulário",
    descricao: "Validar os campos dos formulários antes de enviar.",
    tipo: "Tarefa",
    prioridade: "Alta",
    status: "Em andamento",
    progresso: 90,
    projetoId: 1,
    responsavelId: 1,
    dataCriacao: "2026-08-25",
    dataAtualizacao: "2026-09-12",
    prazo: "2026-09-20",
  },
  {
    id: 145,
    titulo: "Tela de login",
    descricao: "Criar a tela de login do sistema.",
    tipo: "Tarefa",
    prioridade: "Alta",
    status: "Concluída",
    progresso: 100,
    projetoId: 2,
    responsavelId: 2,
    dataCriacao: "2026-08-10",
    dataAtualizacao: "2026-09-05",
    prazo: "2026-09-05",
  },
  {
    id: 146,
    titulo: "Dashboard de indicadores",
    descricao: "Mostrar gráficos e indicadores das demandas.",
    tipo: "Tarefa",
    prioridade: "Média",
    status: "Em andamento",
    progresso: 40,
    projetoId: 3,
    responsavelId: 3,
    dataCriacao: "2026-08-28",
    dataAtualizacao: "2026-09-11",
    prazo: "2026-09-28",
  },
  {
    id: 147,
    titulo: "Integração com API de feriados",
    descricao: "Consumir uma API de feriados para calcular os prazos.",
    tipo: "Tarefa",
    prioridade: "Baixa",
    status: "Pendente",
    progresso: 0,
    projetoId: 1,
    responsavelId: 3,
    dataCriacao: "2026-09-01",
    dataAtualizacao: "2026-09-01",
    prazo: "2026-10-15",
  },
  {
    id: 148,
    titulo: "Correção de bug na listagem",
    descricao: "A listagem não atualiza o contador após filtrar.",
    tipo: "Defeito",
    prioridade: "Crítica",
    status: "Atrasada",
    progresso: 60,
    projetoId: 1,
    responsavelId: 2,
    dataCriacao: "2026-09-02",
    dataAtualizacao: "2026-09-13",
    prazo: "2026-09-12",
  },
  {
    id: 149,
    titulo: "Documentação técnica do sistema",
    descricao: "Documentar a arquitetura e as rotas do sistema.",
    tipo: "Documentação",
    prioridade: "Baixa",
    status: "Concluída",
    progresso: 100,
    projetoId: 4,
    responsavelId: 1,
    dataCriacao: "2026-08-15",
    dataAtualizacao: "2026-09-01",
    prazo: "2026-09-01",
  },
];
