const express = require("express");

const app = express();
app.use(express.json());

const PORTA = 3000;

let usuarios = [];
let contas = [];
let categorias = [];
let lancamentos = [];

app.get("/", (req, res) => {
    res.json({
        mensagem: "API de controle Financeiro Pessoal Funcionando!"
    });
});

app.listen(PORTA, () => {
    console.log(`Servidor funcionando na porta ${PORTA}`)
})
