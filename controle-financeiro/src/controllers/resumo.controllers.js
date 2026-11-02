
import resumoService from "../services/resumo.services.js";

export function consultar(req, res) {
    const resultado = resumoService.consultar(
        req.app.locals.dados,
        req.query.usuarioId,
        req.query.mes
    );

    return res.status(resultado.status).json(resultado.body);
}
