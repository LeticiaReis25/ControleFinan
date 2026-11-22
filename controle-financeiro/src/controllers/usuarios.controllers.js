import usuariosService from "../services/usuarios.services.js";

export async function cadastrar(req, res) {
    const resultado = await usuariosService.cadastrar(
        req.body.nome,
        req.body.email
    );

    return res.status(resultado.status).json(resultado.body);
}

export async function listar(req, res) {
    const resultado = await usuariosService.listar();

    return res.status(resultado.status).json(resultado.body);
}

export async function buscar(req, res) {
    const resultado = await usuariosService.buscar(req.params.id);

    return res.status(resultado.status).json(resultado.body);
}

export async function atualizar(req, res) {
    const resultado = await usuariosService.atualizar(
        req.params.id,
        req.body.nome,
        req.body.email
    );

    return res.status(resultado.status).json(resultado.body);
}

export async function excluir(req, res) {
    const resultado = await usuariosService.excluir(req.params.id);

    if (resultado.status === 204) {
        return res.status(204).end();
    }

    return res.status(resultado.status).json(resultado.body);
}