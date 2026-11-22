import metasService from "../services/metas.services.js";

export async function cadastrar(req, res) {
    const resultado = await metasService.cadastrar(req.body);

    return res.status(resultado.status).json(resultado.body);
}

export async function listar(req, res) {
    const resultado = await metasService.listar(req.query.usuarioId);

    return res.status(resultado.status).json(resultado.body);
}

export async function buscar(req, res) {
    const resultado = await metasService.buscar(req.params.id);

    return res.status(resultado.status).json(resultado.body);
}

export async function atualizar(req, res) {
    const resultado = await metasService.atualizar(
        req.params.id,
        req.body
    );

    return res.status(resultado.status).json(resultado.body);
}

export async function excluir(req, res) {
    const resultado = await metasService.excluir(req.params.id);

    if (resultado.status === 204) {
        return res.status(204).end();
    }

    return res.status(resultado.status).json(resultado.body);
}