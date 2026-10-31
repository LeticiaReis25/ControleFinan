function cadastrar(dados, nome, usuarioId) {
    usuarioId = Number(usuarioId);

    if (!nome || !Number.isInteger(usuarioId)) {
        return {
            status: 400,
            body: { erro: "Nome e usuarioId são obrigatórios." }
        };
    }

    if (!dados.usuarios.some(u => u.id === usuarioId)) {
        return {
            status: 404,
            body: { erro: "Usuário não encontrado." }
        };
    }

    const conta = {
        id: dados.idConta++,
        nome,
        usuarioId
    };

    dados.contas.push(conta);

    return { status: 201, body: conta };
}

function listar(dados, usuarioId) {
    const resultado = usuarioId
        ? dados.contas.filter(c => c.usuarioId === Number(usuarioId))
        : dados.contas;

    return { status: 200, body: resultado };
}

function saldo(dados, id) {
    const conta = dados.contas.find(c => c.id === Number(id));

    if (!conta) {
        return {
            status: 404,
            body: { erro: "Conta não encontrada." }
        };
    }

    const movimentos = dados.lancamentos.filter(
        l => l.contaId === conta.id
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