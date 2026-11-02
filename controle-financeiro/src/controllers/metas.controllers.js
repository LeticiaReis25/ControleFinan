
import metasService from "../services/metas.services.js";

export function cadastrar(req, res) {
    const resultado = metasService.cadastrar(
        req.app.locals.dados,
        req.body
    );

    return res.status(resultado.status).json(resultado.body);
}

export function listar(req, res) {
    const resultado = metasService.listar(
        req.app.locals.dados,
        req.query.usuarioId
    );

    return res.status(resultado.status).json(resultado.body);
}

export function buscar(req, res) {
    const resultado = metasService.buscar(
        req.app.locals.dados,
        req.params.id
    );

    return res.status(resultado.status).json(resultado.body);
}

export function atualizar(req, res) {
    const resultado = metasService.atualizar(
        req.app.locals.dados,
        req.params.id,
        req.body
    );

    return res.status(resultado.status).json(resultado.body);
}

export function excluir(req, res) {
    const resultado = metasService.excluir(
        req.app.locals.dados,
        req.params.id
    );

    if (resultado.status === 204) {
        return res.status(204).end();
    }

    return res.status(resultado.status).json(resultado.body);
}
