"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//O Router permite dividir as rotas em arquivos diferentes.
const express_1 = require("express");
const dados_1 = require("../data/dados");
const rota = (0, express_1.Router)();
function buscarDemanda(id) {
    return dados_1.demandas.find((d) => String(d.id) === id);
}
//Rota 1 mostra todos os campos de uma demanda específica determinada pelo id.
rota.get("/:id", (req, res) => {
    const demanda = buscarDemanda(String(req.params.id));
    if (!demanda) {
        return res.status(404).json({ mensagem: "Demanda não encontrada!" });
    }
    return res.status(200).json(demanda);
});
//Rota 2 vai listar os comentários de uma demanda.
rota.get("/:id/comentarios", (req, res) => {
    const demanda = buscarDemanda(String(req.params.id));
    if (!demanda) {
        return res.status(404).json({ mensagem: "Demanda não encontrada!" });
    }
    const lista = dados_1.comentarios
        //Faz ficar só com os comentários desta demanda.
        .filter((c) => String(c.demandaId) === String(demanda.id))
        //Essa linha vai ordenar os comentários dos mais antigos para os mais novos.
        //Caso querer do mais novo para o mais velho, basta inverter o "a" e o "b".
        .sort((a, b) => a.dataCriacao.localeCompare(b.dataCriacao));
    return res.status(200).json(lista);
});
//Rota 3 vai criar um novo comentário.
rota.post("/:id/comentarios", (req, res) => {
    const demandaId = Number(req.params.id);
    const { usuarioId, texto } = req.body;
    //Aqui está vendo se a demanda existe dentro do array.
    const demanda = dados_1.demandas.find((d) => d.id === demandaId);
    if (!demanda) {
        return res.status(404).json({ mensagem: "Demanda não encontrada!" });
    }
    if (typeof texto !== "string" || texto.trim() === "") {
        return res.status(400).json({ mensagem: "O comentário não deve ser vazio!" });
    }
    //Aqui está vendo se o usuário existe dentro do array
    const usuario = dados_1.usuarios.find((u) => u.id === usuarioId);
    if (!usuario) {
        return res.status(404).json({ mensagem: "usuário não encontrado!" });
    }
    const novoComentario = {
        //operador ternário.
        //identifica o maior ID dos comentários e soma mais um caso seja verdadeira a condição.
        //caso a condição for falsa, adiciona como ID = 1.
        id: dados_1.comentarios.length > 0 ? Math.max(...dados_1.comentarios.map((c) => c.id)) + 1 : 1,
        demandaId: demanda.id,
        usuarioId: usuario.id,
        texto: texto.trim(),
        //gera uma data e uma hora automaticamente.
        dataCriacao: new Date().toISOString()
    };
    dados_1.comentarios.push(novoComentario);
    return res.status(201).json({ mensagem: "Comentário enviado com sucesso!" });
});
exports.default = rota;
//# sourceMappingURL=detalhe_rotas.js.map