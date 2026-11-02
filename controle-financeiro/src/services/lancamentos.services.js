function cadastrar(dados, campos) {
    const usuarioId = Number(campos.usuarioId);
    const contaId = Number(campos.contaId);
    const categoriaId = Number(campos.categoriaId);
    const valor = Number(campos.valor);

    const { descricao, tipo, data } = campos;

    if (
        !Number.isInteger(usuarioId) ||
        !Number.isInteger(contaId) ||
        !Number.isInteger(categoriaId) ||
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

    const conta = dados.contas.find(
        c => c.id === contaId && c.usuarioId === usuarioId
    );

    const categoria = dados.categorias.find(
        c => c.id === categoriaId && c.usuarioId === usuarioId
    );

    if (!conta || !categoria) {
        return {
            status: 404,
            body: { erro: "Conta ou categoria não encontrada." }
        };
    }

    const lancamento = {
        id: dados.idLancamento++,
        usuarioId,
        contaId,
        categoriaId,
        descricao,
        valor,
        tipo,
        data
    };

    dados.lancamentos.push(lancamento);

    return { status: 201, body: lancamento };
}

function listar(dados, filtros) {
    let resultado = dados.lancamentos;

    if (filtros.usuarioId) {
        resultado = resultado.filter(
            l => l.usuarioId === Number(filtros.usuarioId)
        );
    }

    if (filtros.inicio) {
        resultado = resultado.filter(l => l.data >= filtros.inicio);
    }

    if (filtros.fim) {
        resultado = resultado.filter(l => l.data <= filtros.fim);
    }

    return { status: 200, body: resultado };
}

function buscar(dados, id) {
    const lancamento = dados.lancamentos.find(
        l => l.id === Number(id)
    );

    if (!lancamento) {
        return {
            status: 404,
            body: { erro: "Lançamento não encontrado." }
        };
    }

    return { status: 200, body: lancamento };
}

function atualizar(dados, id, campos) {
    const lancamento = dados.lancamentos.find(
        l => l.id === Number(id)
    );

    if (!lancamento) {
        return {
            status: 404,
            body: { erro: "Lançamento não encontrado." }
        };
    }

    const { descricao, valor, tipo, data } = campos;

    if (descricao !== undefined) {
        if (typeof descricao !== "string" || !descricao.trim()) {
            return {
                status: 400,
                body: { erro: "Descrição inválida." }
            };
        }

        lancamento.descricao = descricao.trim();
    }

    if (valor !== undefined) {
        if (!Number.isFinite(Number(valor)) || Number(valor) <= 0) {
            return {
                status: 400,
                body: { erro: "Valor inválido." }
            };
        }

        lancamento.valor = Number(valor);
    }

    if (tipo !== undefined) {
        if (tipo !== "receita" && tipo !== "despesa") {
            return {
                status: 400,
                body: { erro: "O tipo deve ser receita ou despesa." }
            };
        }

        lancamento.tipo = tipo;
    }

    if (data !== undefined) {
        lancamento.data = data;
    }

    return { status: 200, body: lancamento };
}

function excluir(dados, id) {
    id = Number(id);

    if (!dados.lancamentos.some(l => l.id === id)) {
        return {
            status: 404,
            body: { erro: "Lançamento não encontrado." }
        };
    }

    dados.lancamentos = dados.lancamentos.filter(l => l.id !== id);

    return { status: 204 };
}

export default {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
};