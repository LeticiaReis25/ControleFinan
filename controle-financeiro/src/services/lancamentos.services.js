import * as lancamentosModel from "../models/lancamentos.model.js";
import * as contasModel from "../models/contas.model.js";
import * as categoriasModel from "../models/categoria.model.js";

async function cadastrar(campos) {
    const {
        usuarioId,
        contaId,
        categoriaId,
        descricao,
        tipo,
        data
    } = campos;

    const valor = Number(campos.valor);

    if (
        !usuarioId ||
        !contaId ||
        !categoriaId ||
        !descricao ||
        !Number.isFinite(valor) ||
        valor <= 0 ||
        !tipo ||
        !data
    ) {
        return {
            status: 400,
            body: {
                erro: "Todos os campos são obrigatórios e devem ser válidos."
            }
        };
    }

    if (tipo !== "receita" && tipo !== "despesa") {
        return {
            status: 400,
            body: { erro: "O tipo deve ser receita ou despesa." }
        };
    }

    const conta = await contasModel.buscarPorId(contaId);
    const categoria = await categoriasModel.buscarPorId(categoriaId);

    if (
        !conta ||
        !categoria ||
        conta.usuarioId !== usuarioId ||
        categoria.usuarioId !== usuarioId
    ) {
        return {
            status: 404,
            body: { erro: "Conta ou categoria não encontrada." }
        };
    }

    const lancamento = {
        usuarioId,
        contaId,
        categoriaId,
        descricao,
        valor,
        tipo,
        data
    };

    const id = await lancamentosModel.inserir(lancamento);

    return {
        status: 201,
        body: { _id: id, ...lancamento }
    };
}

async function listar(filtros) {
    let resultado = await lancamentosModel.buscarTodas();

    if (filtros.usuarioId) {
        resultado = resultado.filter(
            l => l.usuarioId === filtros.usuarioId
        );
    }

    if (filtros.inicio) {
        resultado = resultado.filter(l => l.data >= filtros.inicio);
    }

    if (filtros.fim) {
        resultado = resultado.filter(l => l.data <= filtros.fim);
    }

    return {
        status: 200,
        body: resultado
    };
}

async function buscar(id) {
    const lancamento = await lancamentosModel.buscarPorId(id);

    if (!lancamento) {
        return {
            status: 404,
            body: { erro: "Lançamento não encontrado." }
        };
    }

    return {
        status: 200,
        body: lancamento
    };
}

async function atualizar(id, campos) {
    const lancamento = await lancamentosModel.buscarPorId(id);

    if (!lancamento) {
        return {
            status: 404,
            body: { erro: "Lançamento não encontrado." }
        };
    }

    const atualizacoes = {};

    if (campos.descricao !== undefined) {
        if (
            typeof campos.descricao !== "string" ||
            !campos.descricao.trim()
        ) {
            return {
                status: 400,
                body: { erro: "Descrição inválida." }
            };
        }

        atualizacoes.descricao = campos.descricao.trim();
    }

    if (campos.valor !== undefined) {
        if (!Number.isFinite(Number(campos.valor)) || Number(campos.valor) <= 0) {
            return {
                status: 400,
                body: { erro: "Valor inválido." }
            };
        }

        atualizacoes.valor = Number(campos.valor);
    }

    if (campos.tipo !== undefined) {
        if (campos.tipo !== "receita" && campos.tipo !== "despesa") {
            return {
                status: 400,
                body: { erro: "O tipo deve ser receita ou despesa." }
            };
        }

        atualizacoes.tipo = campos.tipo;
    }

    if (campos.data !== undefined) {
        atualizacoes.data = campos.data;
    }

    if (Object.keys(atualizacoes).length > 0) {
        await lancamentosModel.atualizar(id, atualizacoes);
    }

    return {
        status: 200,
        body: { ...lancamento, ...atualizacoes }
    };
}

async function excluir(id) {
    const lancamento = await lancamentosModel.buscarPorId(id);

    if (!lancamento) {
        return {
            status: 404,
            body: { erro: "Lançamento não encontrado." }
        };
    }

    await lancamentosModel.remover(id);

    return { status: 204 };
}

export default {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
};