import usuariosService from "../services/usuarios.services.js";

export function cadastrar(req, res) {
    const resultado = usuariosService.cadastrar(
        req.app.locals.dados,
        req.body.nome,
        req.body.email
    );

    return res.status(resultado.status).json(resultado.body);
}

export function listar(req, res) {
    const resultado = usuariosService.listar(req.app.locals.dados);
    return res.status(resultado.status).json(resultado.body);
}

export function buscar(req, res) {
    const resultado = usuariosService.buscar(
        req.app.locals.dados,
        req.params.id
    );

    return res.status(resultado.status).json(resultado.body);
}

export function atualizar(req, res) {
    const resultado = usuariosService.atualizar(
        req.app.locals.dados,
        req.params.id,
        req.body.nome,
        req.body.email
    );

    return res.status(resultado.status).json(resultado.body);
}

export function excluir(req, res) {
    const resultado = usuariosService.excluir(
        req.app.locals.dados,
        req.params.id
    );

    if (resultado.status === 204) {
        return res.status(204).end();
    }

    return res.status(resultado.status).json(resultado.body);
}