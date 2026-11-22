import resumoService from "../services/resumo.services.js";

export async function consultar(req, res) {
    const resultado = await resumoService.consultar(
        req.query.usuarioId,
        req.query.mes
    );

    return res.status(resultado.status).json(resultado.body);
}