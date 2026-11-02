function consultar(dados, usuarioId, mes) {
    usuarioId = Number(usuarioId);

    if (!usuarioId || !mes || !/^\d{4}-\d{2}$/.test(mes)) {
        return {
            status: 400,
            body: { erro: "Informe um usuarioId e um mês no formato AAAA-MM." }
        };
    }

    const usuario = dados.usuarios.find(u => u.id === usuarioId);

    if (!usuario) {
        return {
            status: 404,
            body: { erro: "Usuário não encontrado." }
        };
    }

    const movimentos = dados.lancamentos.filter(
        l => l.usuarioId === usuarioId && l.data.startsWith(mes)
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
            mes,
            totalReceitas: Number(receitas.toFixed(2)),
            totalDespesas: Number(despesas.toFixed(2)),
            saldoDoMes: Number((receitas - despesas).toFixed(2))
        }
    };
}

export default { consultar };

