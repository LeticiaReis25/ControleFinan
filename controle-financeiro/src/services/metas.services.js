function cadastrar(dados, campos) {
    const usuarioId = Number(campos.usuarioId);
    const valorObjetivo = Number(campos.valorObjetivo);
    const valorAtual = campos.valorAtual === undefined
        ? 0
        : Number(campos.valorAtual);

    const { nome, dataLimite } = campos;

    if (
        !Number.isInteger(usuarioId) ||
        !nome ||
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

    if (!dados.usuarios.some(u => u.id === usuarioId)) {
        return {
            status: 404,
            body: { erro: "Usuário não encontrado." }
        };
    }

    const meta = {
        id: dados.idMeta++,
        usuarioId,
        nome,
        valorObjetivo,
        valorAtual,
        dataLimite
    };

    dados.metas.push(meta);

    return { status: 201, body: meta };
}

function listar(dados, usuarioId) {
    const resultado = usuarioId
        ? dados.metas.filter(m => m.usuarioId === Number(usuarioId))
        : dados.metas;

    return { status: 200, body: resultado };
}

function buscar(dados, id) {
    const meta = dados.metas.find(m => m.id === Number(id));

    if (!meta) {
        return {
            status: 404,
            body: { erro: "Meta não encontrada." }
        };
    }

    return { status: 200, body: meta };
}

function atualizar(dados, id, campos) {
    const meta = dados.metas.find(m => m.id === Number(id));

    if (!meta) {
        return {
            status: 404,
            body: { erro: "Meta não encontrada." }
        };
    }

    const { nome, valorObjetivo, valorAtual, dataLimite } = campos;

    if (nome !== undefined) {
        if (typeof nome !== "string" || !nome.trim()) {
            return {
                status: 400,
                body: { erro: "Nome inválido." }
            };
        }

        meta.nome = nome.trim();
    }

    if (valorObjetivo !== undefined) {
        if (!Number.isFinite(Number(valorObjetivo)) || Number(valorObjetivo) <= 0) {
            return {
                status: 400,
                body: { erro: "O valor objetivo deve ser maior que zero." }
            };
        }

        meta.valorObjetivo = Number(valorObjetivo);
    }

    if (valorAtual !== undefined) {
        if (!Number.isFinite(Number(valorAtual)) || Number(valorAtual) < 0) {
            return {
                status: 400,
                body: { erro: "Valor atual inválido." }
            };
        }

        meta.valorAtual = Number(valorAtual);
    }

    if (dataLimite !== undefined) {
        meta.dataLimite = dataLimite;
    }

    return { status: 200, body: meta };
}

function excluir(dados, id) {
    id = Number(id);

    if (!dados.metas.some(m => m.id === id)) {
        return {
            status: 404,
            body: { erro: "Meta não encontrada." }
        };
    }

    dados.metas = dados.metas.filter(m => m.id !== id);

    return { status: 204 };
}

export default {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
};
