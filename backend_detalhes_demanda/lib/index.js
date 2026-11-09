"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const detalhe_rotas_1 = __importDefault(require("./rotas/detalhe_rotas"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/demandas", detalhe_rotas_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(3000, () => {
    console.log("servidor ativo na porta 3000");
});
//# sourceMappingURL=index.js.map