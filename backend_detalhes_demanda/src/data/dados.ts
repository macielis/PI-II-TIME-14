//Aqui é onde ficará os arrays com informações falsas para as rotas poderem ler e devolver.

export const usuarios = [
  { id: 1, nome: "Ana Souza", email: "ana@gmail.com", senha: "123456", perfil: "Administrador" },
  { id: 2, nome: "Bruno Lima", email: "bruno@gmail.com", senha: "123456", perfil: "Líder de Projeto" },
  { id: 3, nome: "Rafael Menezes", email: "rafael@gmail.com", senha: "123456", perfil: "Membro da Equipe" },
];
 
export const demandas = [ {
    id: 1,
    titulo: "Corrigir erro no login",
    descricao: "Usuário não consegue entrar quando digita o e-mail em letras maiúsculas.",
    tipo: "Defeito",
    prioridade: "Alta",
    status: "Aberta",
    projetoId: 1,
    responsavelId: 3,
    dataCriacao: "2026-10-01",
    dataAtualizacao: "2026-10-01",
    prazo: "2026-10-30",
  },
  {
    id: 2,
    titulo: "Documentar as telas",
    descricao: "Descrever a função de cada tela do sistema.",
    tipo: "Tarefa",
    prioridade: "Média",
    status: "Em andamento",
    projetoId: 1,
    responsavelId: 2,
    dataCriacao: "2026-09-25",
    dataAtualizacao: "2026-10-05",
    prazo: "2026-11-10",
  },
  {
    id: 3,
    titulo: "Atualizar o README",
    descricao: "Incluir as instruções de instalação e execução do projeto.",
    tipo: "Documentação",
    prioridade: "Baixa",
    status: "Concluída",
    projetoId: 2,
    responsavelId: null,
    dataCriacao: "2026-09-01",
    dataAtualizacao: "2026-09-20",
    prazo: null,
  },
];
 
export const comentarios = [
  {
    id: 1,
    demandaId: 1,
    usuarioId: 2,
    texto: "Acabei de reproduzir o erro aqui, realmente tem algo de errado.",
    //O "T" é apenas um separador entre data e hora.
    dataCriacao: "2026-10-02T14:30:00",
  },
  {
    id: 2,
    demandaId: 1,
    usuarioId: 3,
    texto: "Encontrei a causa: falta converter as letras do e-mail para minúsculas antes de comparar.",
    dataCriacao: "2026-10-03T09:15:00",
  },
  {
    id: 3,
    demandaId: 2,
    usuarioId: 1,
    texto: "Vou começar descrevendo a tela de login primeiro!",
    dataCriacao: "2026-10-05T16:20:00",
  },
];