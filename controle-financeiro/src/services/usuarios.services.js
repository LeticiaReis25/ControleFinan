function cadastrar(dados, nome, email) {
    if (!nome || !email) {
        return { status: 400, body: { erro: "Nome e email são obrigatórios." } };
    }

    if (dados.usuarios.some(u => u.email === email)) {
        return { status: 409, body: { erro: "Este email já está cadastrado." } };
    }

    const usuario = {
        id: dados.idUsuario++,
        nome,
        email
    };

    dados.usuarios.push(usuario);

    return { status: 201, body: usuario };
}

function listar(dados) {
    return { status: 200, body: dados.usuarios };
}

function buscar(dados, id) {
    const usuario = dados.usuarios.find(u => u.id === Number(id));

    if (!usuario) {
        return { status: 404, body: { erro: "Usuário não encontrado." } };
    }

    return { status: 200, body: usuario };
}

function atualizar(dados, id, nome, email) {
    const usuario = dados.usuarios.find(u => u.id === Number(id));

    if (!usuario) {
        return { status: 404, body: { erro: "Usuário não encontrado." } };
    }

    if (nome !== undefined) {
        if (typeof nome !== "string" || !nome.trim()) {
            return { status: 400, body: { erro: "Nome inválido." } };
        }

        usuario.nome = nome.trim();
    }

    if (email !== undefined) {
        if (typeof email !== "string" || !email.trim()) {
            return { status: 400, body: { erro: "Email inválido." } };
        }

        const existe = dados.usuarios.some(
            u => u.id !== usuario.id && u.email === email.trim()
        );

        if (existe) {
            return { status: 409, body: { erro: "Este email já está cadastrado." } };
        }

        usuario.email = email.trim();
    }

    return { status: 200, body: usuario };
}

function excluir(dados, id) {
    id = Number(id);

    const usuario = dados.usuarios.find(u => u.id === id);

    if (!usuario) {
        return { status: 404, body: { erro: "Usuário não encontrado." } };
    }

    if (
        dados.contas.some(c => c.usuarioId === id) ||
        dados.lancamentos.some(l => l.usuarioId === id)
    ) {
        return {
            status: 409,
            body: { erro: "Exclua as contas e os lançamentos vinculados primeiro." }
        };
    }

    dados.usuarios = dados.usuarios.filter(u => u.id !== id);

    return { status: 204 };
}

export default { cadastrar, listar, buscar, atualizar, excluir };
