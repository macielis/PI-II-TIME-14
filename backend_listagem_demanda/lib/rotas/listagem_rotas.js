"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//O Router permite dividir as rotas em arquivos diferentes.
const express_1 = require("express");
const dados_1 = require("../data/dados");
const rota = (0, express_1.Router)();
const LIMITE_PADRAO = 10;
const LIMITE_MAXIMO = 50;
//---------------------------- Funções auxiliares ----------------------------
//Lê um parâmetro da URL (?busca=...) e devolve só se for texto.
//Se não vier nada (ou vier repetido, ex: ?status=a&status=b), devolve undefined.
function lerTexto(valor) {
    return typeof valor === "string" ? valor.trim() : undefined;
}
//Tira acentos e deixa minúsculo, para a busca achar "Correcao" em "Correção".
function normalizar(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
//Transforma 142 em "#0142", igual aparece na tabela.
function formatarCodigo(id) {
    return "#" + String(id).padStart(4, "0");
}
//"Gabriel Lara" -> "GL" (o avatar da tabela).
function gerarIniciais(nome) {
    return nome
        .split(" ")
        .filter((parte) => parte !== "")
        .slice(0, 2)
        .map((parte) => parte[0].toUpperCase())
        .join("");
}
//Monta a linha da tabela: só os campos que a tela precisa (sem a descrição, por exemplo).
function montarItem(d) {
    const responsavel = dados_1.usuarios.find((u) => u.id === d.responsavelId);
    const projeto = dados_1.projetos.find((p) => p.id === d.projetoId);
    return {
        id: d.id,
        codigo: formatarCodigo(d.id),
        titulo: d.titulo,
        modulo: projeto ? projeto.nome : null,
        responsavel: responsavel
            ? { id: responsavel.id, nome: responsavel.nome, iniciais: gerarIniciais(responsavel.nome) }
            : null,
        prioridade: d.prioridade,
        progresso: d.progresso,
        status: d.status,
        prazo: d.prazo,
    };
}
//Conta as demandas para os 4 cards do topo da tela.
function calcularResumo() {
    return {
        total: dados_1.demandas.length,
        emAndamento: dados_1.demandas.filter((d) => d.status === "Em andamento").length,
        concluidas: dados_1.demandas.filter((d) => d.status === "Concluída").length,
        atrasadas: dados_1.demandas.filter((d) => d.status === "Atrasada").length,
        pendentes: dados_1.demandas.filter((d) => d.status === "Pendente").length,
    };
}
//Lê um número inteiro positivo da URL. Devolve null se for inválido.
function lerInteiroPositivo(valor) {
    if (!/^\d+$/.test(valor)) {
        return null;
    }
    const numero = Number(valor);
    return numero >= 1 ? numero : null;
}
//------------------------------------ Rotas ----------------------------------
//Rota 1 lista as demandas, com filtros e paginação.
//Exemplo: GET /demandas?busca=login&status=Concluída&prioridade=Alta&responsavel=Gabriel Lara&pagina=1&limite=10
//Todos os parâmetros são opcionais. "Todos" / "Todas" significam "sem filtro" (igual aos selects da tela).
rota.get("/", (req, res) => {
    var _a, _b, _c, _d, _e, _f;
    const busca = (_a = lerTexto(req.query.busca)) !== null && _a !== void 0 ? _a : "";
    const status = (_b = lerTexto(req.query.status)) !== null && _b !== void 0 ? _b : "Todos";
    const prioridade = (_c = lerTexto(req.query.prioridade)) !== null && _c !== void 0 ? _c : "Todas";
    const responsavel = (_d = lerTexto(req.query.responsavel)) !== null && _d !== void 0 ? _d : "Todos";
    const paginaTexto = (_e = lerTexto(req.query.pagina)) !== null && _e !== void 0 ? _e : "1";
    const limiteTexto = (_f = lerTexto(req.query.limite)) !== null && _f !== void 0 ? _f : String(LIMITE_PADRAO);
    //Mesmas regras do validacoes.js do front, para o back não confiar só no navegador.
    const erros = {};
    if (busca.length > 0 && busca.length < 2) {
        erros.busca = "Digite pelo menos 2 caracteres para buscar.";
    }
    if (busca.length > 60) {
        erros.busca = "A busca pode ter no máximo 60 caracteres.";
    }
    if (status !== "Todos" && !dados_1.STATUS_VALIDOS.some((s) => s === status)) {
        erros.status = "Selecione um status válido.";
    }
    if (prioridade !== "Todas" && !dados_1.PRIORIDADES_VALIDAS.some((p) => p === prioridade)) {
        erros.prioridade = "Selecione uma prioridade válida.";
    }
    //O select da tela manda o nome, mas também aceito o id (ex: responsavel=2).
    let responsavelId = null;
    if (responsavel !== "Todos") {
        const encontrado = dados_1.usuarios.find((u) => u.nome === responsavel || String(u.id) === responsavel);
        if (!encontrado) {
            erros.responsavel = "Selecione um responsável válido.";
        }
        else {
            responsavelId = encontrado.id;
        }
    }
    const pagina = lerInteiroPositivo(paginaTexto);
    const limite = lerInteiroPositivo(limiteTexto);
    if (pagina === null) {
        erros.pagina = "A página deve ser um número inteiro maior que zero.";
    }
    if (limite === null || limite > LIMITE_MAXIMO) {
        erros.limite = "O limite deve ser um número inteiro entre 1 e " + LIMITE_MAXIMO + ".";
    }
    if (Object.keys(erros).length > 0) {
        return res.status(400).json({ mensagem: "Filtros inválidos!", erros });
    }
    //Se chegou aqui, pagina e limite são números válidos (o TypeScript precisa dessa conferência).
    if (pagina === null || limite === null) {
        return res.status(400).json({ mensagem: "Filtros inválidos!" });
    }
    //Aplica os filtros. Cada .filter só restringe mais a lista.
    const termo = normalizar(busca);
    //Permite buscar pelo ID digitando "#0142", "0142" ou "142".
    const termoSemSimbolo = termo.replace(/^#/, "");
    const termoComoId = /^\d+$/.test(termoSemSimbolo) ? Number(termoSemSimbolo) : null;
    const filtradas = dados_1.demandas
        .filter((d) => {
        if (termo === "") {
            return true;
        }
        return normalizar(d.titulo).includes(termo) || (termoComoId !== null && d.id === termoComoId);
    })
        .filter((d) => status === "Todos" || d.status === status)
        .filter((d) => prioridade === "Todas" || d.prioridade === prioridade)
        .filter((d) => responsavelId === null || d.responsavelId === responsavelId)
        //Ordena pelo ID, do menor para o maior.
        .sort((a, b) => a.id - b.id);
    //Paginação: pega só o pedaço da lista que corresponde à página pedida.
    const totalItens = filtradas.length;
    const totalPaginas = Math.max(1, Math.ceil(totalItens / limite));
    const inicio = (pagina - 1) * limite;
    const dados = filtradas.slice(inicio, inicio + limite).map(montarItem);
    return res.status(200).json({
        dados,
        //Resumo geral (cards do topo), não muda com os filtros.
        resumo: calcularResumo(),
        //Dá pra montar o "Exibindo X de Y demandas" e os botões de página.
        paginacao: {
            pagina,
            limite,
            exibindo: dados.length,
            totalItens,
            totalPaginas,
        },
    });
});
//Rota 2 devolve só os números dos cards do topo (total, em andamento, concluídas, atrasadas).
//Precisa ficar antes de qualquer rota "/:id", senão "resumo" seria lido como id.
rota.get("/resumo", (req, res) => {
    return res.status(200).json(calcularResumo());
});
//Rota 3 devolve as opções dos selects de filtro (status, prioridade e responsável).
rota.get("/filtros", (req, res) => {
    return res.status(200).json({
        status: ["Todos", ...dados_1.STATUS_VALIDOS],
        prioridades: ["Todas", ...dados_1.PRIORIDADES_VALIDAS],
        responsaveis: dados_1.usuarios.map((u) => ({ id: u.id, nome: u.nome })),
    });
});
exports.default = rota;
//# sourceMappingURL=listagem_rotas.js.map