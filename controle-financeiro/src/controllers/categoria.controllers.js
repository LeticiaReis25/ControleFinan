
import categoriasService from "../services/categorias.services.js";

export function cadastrar(req, res) {
    const resultado = categoriasService.cadastrar(
        req.app.locals.dados,
        req.body.nome,
        req.body.usuarioId
    );

    return res.status(resultado.status).json(resultado.body);
}

export function listar(req, res) {
    const resultado = categoriasService.listar(
        req.app.locals.dados,
        req.query.usuarioId
    );

    return res.status(resultado.status).json(resultado.body);
}
