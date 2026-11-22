import * as contasModel from "../models/contas.model.js";
import * as usuariosModel from "../models/usuarios.model.js";
import * as lancamentosModel from "../models/lancamentos.model.js";

async function cadastrar(nome, usuarioId) {
    if (
        typeof nome !== "string" ||
        !nome.trim() ||
        typeof usuarioId !== "string" ||
        !usuarioId.trim()
    ) {
        return {
            status: 400,
            body: { erro: "Nome e usuarioId são obrigatórios." }
        };
    }

    const usuario = await usuariosModel.buscarPorId(usuarioId);

    if (!usuario) {
        return {
            status: 404,
            body: { erro: "Usuário não encontrado." }
        };
    }

    const conta = {
        nome: nome.trim(),
        usuarioId
    };

    const id = await contasModel.inserir(conta);

    return {
        status: 201,
        body: { _id: id, ...conta }
    };
}

async function listar(usuarioId) {
    let contas = await contasModel.buscarTodas();

    if (usuarioId) {
        contas = contas.filter(c => c.usuarioId === usuarioId);
    }

    return {
        status: 200,
        body: contas
    };
}

async function saldo(id) {
    const conta = await contasModel.buscarPorId(id);

    if (!conta) {
        return {
            status: 404,
            body: { erro: "Conta não encontrada." }
        };
    }

    const lancamentos = await lancamentosModel.buscarTodas();

    const movimentos = lancamentos.filter(
        l => l.contaId === id
    );

    const receitas = movimentos
        .filter(l => l.tipo === "receita")
        .reduce((total, l) => total + l.valor, 0);

    const despesas = movimentos
        .filter(l => l.tipo === "despesa")
        .reduce((total, l) => total + l.valor, 0);

    return {
        status: 200,
        body: {
            conta: conta.nome,
            receitas: Number(receitas.toFixed(2)),
            despesas: Number(despesas.toFixed(2)),
            saldo: Number((receitas - despesas).toFixed(2))
        }
    };
}

export default { cadastrar, listar, saldo };