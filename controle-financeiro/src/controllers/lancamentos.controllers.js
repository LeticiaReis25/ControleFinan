import lancamentosService from "../services/lancamentos.services.js";

export async function cadastrar(req, res) {
    const resultado = await lancamentosService.cadastrar(req.body);

    return res.status(resultado.status).json(resultado.body);
}

export async function listar(req, res) {
    const resultado = await lancamentosService.listar(req.query);

    return res.status(resultado.status).json(resultado.body);
}

export async function buscar(req, res) {
    const resultado = await lancamentosService.buscar(req.params.id);

    return res.status(resultado.status).json(resultado.body);
}

export async function atualizar(req, res) {
    const resultado = await lancamentosService.atualizar(
        req.params.id,
        req.body
    );

    return res.status(resultado.status).json(resultado.body);
}

export async function excluir(req, res) {
    const resultado = await lancamentosService.excluir(req.params.id);

    if (resultado.status === 204) {
        return res.status(204).end();
    }

    return res.status(resultado.status).json(resultado.body);
}