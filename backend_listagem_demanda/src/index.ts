import express from "express";
import rotasListagem from "./rotas/listagem_rotas";

const app = express();

app.use(express.json());

//IMPORTANTE: se juntar com o backend de detalhes (que usa "/demandas/:id"),
//registre este router ANTES do de detalhes. Senão "/demandas/resumo" seria
//interpretado como um id.
app.use("/demandas", rotasListagem);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, () => {
    console.log("servidor ativo na porta 3000");
});
