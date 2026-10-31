import express from "express";

import usuariosRoutes from "./routes/usuarios.routes.js";
import contasRoutes from "./routes/contas.routes.js";
import categoriasRoutes from "./routes/categorias.routes.js";
import lancamentosRoutes from "./routes/lancamentos.routes.js";
import metasRoutes from "./routes/metas.routes.js";
import resumoRoutes from "./routes/resumo.routes.js";

const app = express();

app.use(express.json());


app.locals.dados = {
    usuarios: [],
    contas: [],
    categorias: [],
    lancamentos: [],
    metas: [],

    idUsuario: 1,
    idConta: 1,
    idCategoria: 1,
    idLancamento: 1,
    idMeta: 1
};


app.get("/", (req, res) => {
    res.json({
        mensagem: "API de Controle Financeiro Pessoal Funcionando!"
    });
});


app.use("/usuarios", usuariosRoutes);
app.use("/contas", contasRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/lancamentos", lancamentosRoutes);
app.use("/metas", metasRoutes);
app.use("/resumo-mensal", resumoRoutes);

export default app;