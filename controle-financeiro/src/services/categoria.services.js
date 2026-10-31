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

    const categoria = {
        id: dados.idCategoria++,
        nome,
        usuarioId
    };

    dados.categorias.push(categoria);

    return { status: 201, body: categoria };
}

function listar(dados, usuarioId) {
    const resultado = usuarioId
        ? dados.categorias.filter(c => c.usuarioId === Number(usuarioId))
        : dados.categorias;

    return { status: 200, body: resultado };
}

export default { cadastrar, listar };