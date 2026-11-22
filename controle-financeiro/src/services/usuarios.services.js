import * as usuariosModel from "../models/usuarios.model.js";

async function cadastrar(nome, email) {
    if (
        typeof nome !== "string" ||
        !nome.trim() ||
        typeof email !== "string" ||
        !email.trim()
    ) {
        return {
            status: 400,
            body: { erro: "Nome e email são obrigatórios." }
        };
    }

    nome = nome.trim();
    email = email.trim();

    const usuarios = await usuariosModel.buscarTodas();

    if (usuarios.some(u => u.email === email)) {
        return {
            status: 409,
            body: { erro: "Este email já está cadastrado." }
        };
    }

    const id = await usuariosModel.inserir({ nome, email });

    return {
        status: 201,
        body: { _id: id, nome, email }
    };
}

async function listar() {
    const usuarios = await usuariosModel.buscarTodas();

    return {
        status: 200,
        body: usuarios
    };
}

async function buscar(id) {
    const usuario = await usuariosModel.buscarPorId(id);

    if (!usuario) {
        return {
            status: 404,
            body: { erro: "Usuário não encontrado." }
        };
    }

    return {
        status: 200,
        body: usuario
    };
}

async function atualizar(id, nome, email) {
    const usuario = await usuariosModel.buscarPorId(id);

    if (!usuario) {
        return {
            status: 404,
            body: { erro: "Usuário não encontrado." }
        };
    }

    const campos = {};

    if (nome !== undefined) {
        if (typeof nome !== "string" || !nome.trim()) {
            return {
                status: 400,
                body: { erro: "Nome inválido." }
            };
        }

        campos.nome = nome.trim();
    }

    if (email !== undefined) {
        if (typeof email !== "string" || !email.trim()) {
            return {
                status: 400,
                body: { erro: "Email inválido." }
            };
        }

        const usuarios = await usuariosModel.buscarTodas();

        const existe = usuarios.some(
            u => u.email === email.trim() && u._id.toString() !== id
        );

        if (existe) {
            return {
                status: 409,
                body: { erro: "Este email já está cadastrado." }
            };
        }

        campos.email = email.trim();
    }

    if (Object.keys(campos).length > 0) {
        await usuariosModel.atualizar(id, campos);
    }

    return {
        status: 200,
        body: { ...usuario, ...campos }
    };
}

async function excluir(id) {
    const usuario = await usuariosModel.buscarPorId(id);

    if (!usuario) {
        return {
            status: 404,
            body: { erro: "Usuário não encontrado." }
        };
    }

    const contasModel = await import("../models/contas.model.js");
    const lancamentosModel = await import("../models/lancamentos.model.js");

    const contas = await contasModel.buscarTodas();
    const lancamentos = await lancamentosModel.buscarTodas();

    const possuiVinculos =
        contas.some(c => c.usuarioId === id) ||
        lancamentos.some(l => l.usuarioId === id);

    if (possuiVinculos) {
        return {
            status: 409,
            body: {
                erro: "Exclua as contas e os lançamentos vinculados primeiro."
            }
        };
    }

    await usuariosModel.remover(id);

    return { status: 204 };
}

export default {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
};