import * as metasModel from "../models/metas.model.js";
import * as usuariosModel from "../models/usuarios.model.js";

async function cadastrar(campos) {
    const usuarioId = campos.usuarioId;
    const valorObjetivo = Number(campos.valorObjetivo);

    const valorAtual = campos.valorAtual === undefined
        ? 0
        : Number(campos.valorAtual);

    const { nome, dataLimite } = campos;

    if (
        typeof usuarioId !== "string" ||
        !usuarioId.trim() ||
        typeof nome !== "string" ||
        !nome.trim() ||
        !dataLimite ||
        !Number.isFinite(valorObjetivo)
    ) {
        return {
            status: 400,
            body: {
                erro: "Usuário, nome, valor objetivo e data limite são obrigatórios."
            }
        };
    }

    if (
        valorObjetivo <= 0 ||
        !Number.isFinite(valorAtual) ||
        valorAtual < 0
    ) {
        return {
            status: 400,
            body: { erro: "Os valores da meta são inválidos." }
        };
    }

    const usuario = await usuariosModel.buscarPorId(usuarioId);

    if (!usuario) {
        return {
            status: 404,
            body: { erro: "Usuário não encontrado." }
        };
    }

    const meta = {
        usuarioId,
        nome: nome.trim(),
        valorObjetivo,
        valorAtual,
        dataLimite
    };

    const id = await metasModel.inserir(meta);

    return {
        status: 201,
        body: { _id: id, ...meta }
    };
}

async function listar(usuarioId) {
    let metas = await metasModel.buscarTodas();

    if (usuarioId) {
        metas = metas.filter(m => m.usuarioId === usuarioId);
    }

    return {
        status: 200,
        body: metas
    };
}

async function buscar(id) {
    const meta = await metasModel.buscarPorId(id);

    if (!meta) {
        return {
            status: 404,
            body: { erro: "Meta não encontrada." }
        };
    }

    return {
        status: 200,
        body: meta
    };
}

async function atualizar(id, campos) {
    const meta = await metasModel.buscarPorId(id);

    if (!meta) {
        return {
            status: 404,
            body: { erro: "Meta não encontrada." }
        };
    }

    const atualizacoes = {};

    if (campos.nome !== undefined) {
        if (
            typeof campos.nome !== "string" ||
            !campos.nome.trim()
        ) {
            return {
                status: 400,
                body: { erro: "Nome inválido." }
            };
        }

        atualizacoes.nome = campos.nome.trim();
    }

    if (campos.valorObjetivo !== undefined) {
        if (
            !Number.isFinite(Number(campos.valorObjetivo)) ||
            Number(campos.valorObjetivo) <= 0
        ) {
            return {
                status: 400,
                body: {
                    erro: "O valor objetivo deve ser maior que zero."
                }
            };
        }

        atualizacoes.valorObjetivo = Number(campos.valorObjetivo);
    }

    if (campos.valorAtual !== undefined) {
        if (
            !Number.isFinite(Number(campos.valorAtual)) ||
            Number(campos.valorAtual) < 0
        ) {
            return {
                status: 400,
                body: { erro: "Valor atual inválido." }
            };
        }

        atualizacoes.valorAtual = Number(campos.valorAtual);
    }

    if (campos.dataLimite !== undefined) {
        atualizacoes.dataLimite = campos.dataLimite;
    }

    if (Object.keys(atualizacoes).length > 0) {
        await metasModel.atualizar(id, atualizacoes);
    }

    return {
        status: 200,
        body: { ...meta, ...atualizacoes }
    };
}

async function excluir(id) {
    const meta = await metasModel.buscarPorId(id);

    if (!meta) {
        return {
            status: 404,
            body: { erro: "Meta não encontrada." }
        };
    }

    await metasModel.remover(id);

    return { status: 204 };
}

export default {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
};