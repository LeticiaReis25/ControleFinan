import contasService from "../services/contas.services.js";

export function cadastrar(req, res) {
    const resultado = contasService.cadastrar(
        req.app.locals.dados,
        req.body.nome,
        req.body.usuarioId
    );

    return res.status(resultado.status).json(resultado.body);
}

export function listar(req, res) {
    const resultado = contasService.listar(
        req.app.locals.dados,
        req.query.usuarioId
    );

    return res.status(resultado.status).json(resultado.body);
}

export function saldo(req, res) {
    const resultado = contasService.saldo(
        req.app.locals.dados,
        req.params.id
    );

    return res.status(resultado.status).json(resultado.body);
}