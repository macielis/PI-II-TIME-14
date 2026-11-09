import express from "express";
import rotasDetalhes from "./rotas/detalhe_rotas";

const app = express();

app.use(express.json());
app.use("/demandas", rotasDetalhes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, () => {
    console.log("servidor ativo na porta 3000");
});