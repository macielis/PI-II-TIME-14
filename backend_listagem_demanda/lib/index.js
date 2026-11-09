"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const listagem_rotas_1 = __importDefault(require("./rotas/listagem_rotas"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
//IMPORTANTE: se juntar com o backend de detalhes (que usa "/demandas/:id"),
//registre este router ANTES do de detalhes. Senão "/demandas/resumo" seria
//interpretado como um id.
app.use("/demandas", listagem_rotas_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(3000, () => {
    console.log("servidor ativo na porta 3000");
});
//# sourceMappingURL=index.js.map