import contasService from "../services/contas.services.js";

export async function cadastrar(req, res) {
    const resultado = await contasService.cadastrar(
        req.body.nome,
        req.body.usuarioId
    );

    return res.status(resultado.status).json(resultado.body);
}

export async function listar(req, res) {
    const resultado = await contasService.listar(
        req.query.usuarioId
    );

    return res.status(resultado.status).json(resultado.body);
}

export async function saldo(req, res) {
    const resultado = await contasService.saldo(req.params.id);

    return res.status(resultado.status).json(resultado.body);
}