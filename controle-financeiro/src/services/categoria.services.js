import * as categoriaModel from "../models/categoria.model.js";
import * as usuariosModel from "../models/usuarios.model.js";

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

    const categoria = {
        nome: nome.trim(),
        usuarioId
    };

    const id = await categoriaModel.inserir(categoria);

    return {
        status: 201,
        body: { _id: id, ...categoria }
    };
}

async function listar(usuarioId) {
    let categorias = await categoriaModel.buscarTodas();

    if (usuarioId) {
        categorias = categorias.filter(
            c => c.usuarioId === usuarioId
        );
    }

    return {
        status: 200,
        body: categorias
    };
}

export default { cadastrar, listar };