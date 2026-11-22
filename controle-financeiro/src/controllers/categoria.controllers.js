import categoriasService from "../services/categoria.services.js";

export async function cadastrar(req, res) {
    const resultado = await categoriasService.cadastrar(
        req.body.nome,
        req.body.usuarioId
    );

    return res.status(resultado.status).json(resultado.body);
}

export async function listar(req, res) {
    const resultado = await categoriasService.listar(
        req.query.usuarioId
    );

    return res.status(resultado.status).json(resultado.body);
}