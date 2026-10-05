const express = require("express");

const app = express();
app.use(express.json());

const PORTA = 3000;

let usuarios = [];
let contas = [];
let categorias = [];
let lancamentos = [];

let idUsuario = 1;
let idConta = 1;
let idCategoria = 1;
let idLancamento = 1;

app.get("/", (req, res) => {
    res.json({
        mensagem: "API de controle Financeiro Pessoal Funcionando!"
    });
});

app.post("/usuarios", (req, res) => {
    const{nome, email} = req.body;

    if(!nome || !email) {
        return res.status(400).json({
            erro: "Nome e email são obrigatórios."
        });
    }
    if(usuarios.some(u => u.email === email)) {
        return res.status(409).json({
            erro: "Este email ja esta cadastrado."
        });
    }
    const usuario = {
        id: idUsuario++,
        nome,
        email
    };
    usuarios.push(usuario);
    res.status(201).json(usuario);
});
app.get("/usuarios", (req, res) => {
    res.json(usuarios);
});
app.get("/usuarios/:id", (req, res) => {
    const usuario = usuarios.find(
        u => u.id === Number(req.params.id)
    );
    if (!usuario) {
        return res.status(404).json({
            erro:"Usuário não encontrado."
        });
    }
    res.json(usuario);
});


app.put("/usuarios/:id", (req, res) => {
  const usuario = usuarios.find(
    u => u.id === Number(req.params.id)
  );

  if (!usuario) {
    return res.status(404).json({
      erro: "Usuário não encontrado."
    });
  }

  const { nome, email } = req.body;

  if (nome !== undefined) {
    if (typeof nome !== "string" || !nome.trim()) {
      return res.status(400).json({
        erro: "Nome inválido."
      });
    }

    usuario.nome = nome.trim();
  }

  if (email !== undefined) {
    if (typeof email !== "string" || !email.trim()) {
      return res.status(400).json({
        erro: "Email inválido."
      });
    }

    const existe = usuarios.some(
      u => u.id !== usuario.id &&
           u.email === email.trim()
    );

    if (existe) {
      return res.status(409).json({
        erro: "Este email já está cadastrado."
      });
    }

    usuario.email = email.trim();
  }

  res.json(usuario);
});

app.delete("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({
      erro: "Usuário não encontrado."
    });
  }

  if (
    contas.some(c => c.usuarioId === id) ||
    lancamentos.some(l => l.usuarioId === id)
  ) {
    return res.status(409).json({
      erro: "Exclua as contas e os lançamentos vinculados primeiro."
    });
  }

  usuarios = usuarios.filter(u => u.id !== id);
  res.status(204).end();
});




app.post("/contas", (req, res) => {
  const { nome, usuarioId } = req.body;

  if (!nome || !Number.isInteger(usuarioId)) {
    return res.status(400).json({
      erro: "Nome e usuarioId são obrigatórios."
    });
  }

  const usuario = usuarios.find(
    u => u.id === usuarioId
  );

  if (!usuario) {
    return res.status(404).json({
      erro: "Usuário não encontrado."
    });
  }

  const conta = {
    id: idConta++,
    nome,
    usuarioId
  };

  contas.push(conta);
  res.status(201).json(conta);
});


app.get("/contas", (req, res) => {
  const { usuarioId } = req.query;

  const resultado = usuarioId
    ? contas.filter(c => c.usuarioId === Number(usuarioId))
    : contas;

  res.json(resultado);
});


app.get("/contas/:id/saldo", (req, res) => {
  const conta = contas.find(
    c => c.id === Number(req.params.id)
  );

  if (!conta) {
    return res.status(404).json({
      erro: "Conta não encontrada."
    });
  }

  const movimentos = lancamentos.filter(
    l => l.contaId === conta.id
  );

  const receitas = movimentos
    .filter(l => l.tipo === "receita")
    .reduce((total, l) => total + l.valor, 0);

  const despesas = movimentos
    .filter(l => l.tipo === "despesa")
    .reduce((total, l) => total + l.valor, 0);

  res.json({
    conta: conta.nome,
    receitas: Number(receitas.toFixed(2)),
    despesas: Number(despesas.toFixed(2)),
    saldo: Number((receitas - despesas).toFixed(2))
  });
});




app.post("/categorias", (req, res) => {
  const { nome, usuarioId } = req.body;

  if (!nome || !Number.isInteger(usuarioId)) {
    return res.status(400).json({
      erro: "Nome e usuarioId são obrigatórios."
    });
  }

  if (!usuarios.some(u => u.id === usuarioId)) {
    return res.status(404).json({
      erro: "Usuário não encontrado."
    });
  }

  const categoria = {
    id: idCategoria++,
    nome,
    usuarioId
  };

  categorias.push(categoria);
  res.status(201).json(categoria);
});


app.get("/categorias", (req, res) => {
  const { usuarioId } = req.query;

  const resultado = usuarioId
    ? categorias.filter(
        c => c.usuarioId === Number(usuarioId)
      )
    : categorias;

  res.json(resultado);
});




app.post("/lancamentos", (req, res) => {
  const {
    usuarioId,
    contaId,
    categoriaId,
    descricao,
    valor,
    tipo,
    data
  } = req.body;

  if (
    !usuarioId ||
    !contaId ||
    !categoriaId ||
    !descricao ||
    !valor ||
    !tipo ||
    !data
  ) {
    return res.status(400).json({
      erro: "Todos os campos são obrigatórios."
    });
  }

  if (tipo !== "receita" && tipo !== "despesa") {
    return res.status(400).json({
      erro: "O tipo deve ser receita ou despesa."
    });
  }

  const conta = contas.find(
    c => c.id === usuarioId
  );

  const categoria = categorias.find(
    c => c.id === categoriaId
  );

  if (!conta || !categoria) {
    return res.status(404).json({
      erro: "Conta ou categoria não encontrada."
    });
  }

  const lancamento = {
    id: idLancamento++,
    usuarioId,
    contaId,
    categoriaId,
    descricao,
    valor,
    tipo,
    data
  };

  lancamentos.push(lancamento);

  res.status(201).json(lancamento);
});


app.get("/lancamentos", (req, res) => {
  res.json(lancamentos);
});


app.get("/lancamentos/:id", (req, res) => {
  const lancamento = lancamentos.find(
    l => l.id === Number(req.params.id)
  );

  if (!lancamento) {
    return res.status(404).json({
      erro: "Lançamento não encontrado."
    });
  }

  res.json(lancamento);
});


app.put("/lancamentos/:id", (req, res) => {
  const lancamento = lancamentos.find(
    l => l.id === Number(req.params.id)
  );

  if (!lancamento) {
    return res.status(404).json({
      erro: "Lançamento não encontrado."
    });
  }

  const {
    descricao,
    valor,
    tipo,
    data
  } = req.body;

  if (descricao) {
    lancamento.descricao = descricao;
  }

  if (valor) {
    lancamento.valor = valor;
  }

  if (tipo) {
    lancamento.tipo = tipo;
  }

  if (data) {
    lancamento.data = data;
  }

  res.json(lancamento);
});


app.delete("/lancamentos/:id", (req, res) => {
  const id = Number(req.params.id);

  const existe = lancamentos.some(
    l => l.id === id
  );

  if (!existe) {
    return res.status(404).json({
      erro: "Lançamento não encontrado."
    });
  }

  lancamentos = lancamentos.filter(
    l => l.id !== id
  );

  res.status(204).end();
});


app.get("/resumo-mensal", (req, res) => {
  const { usuarioId, mes } = req.query;

  if (!usuarioId || !mes) {
    return res.status(400).json({
      erro: "Informe o usuarioId e o mês."
    });
  }

  const usuario = usuarios.find(
    u => u.id === Number(usuarioId)
  );

  if (!usuario) {
    return res.status(404).json({
      erro: "Usuário não encontrado."
    });
  }

  const movimentos = lancamentos.filter(
    l =>
      l.usuarioId === Number(usuarioId) &&
      l.data.startsWith(mes)
  );

  const receitas = movimentos
    .filter(l => l.tipo === "receita")
    .reduce((total, l) => total + l.valor, 0);

  const despesas = movimentos
    .filter(l => l.tipo === "despesa")
    .reduce((total, l) => total + l.valor, 0);

  res.json({
    mes,
    totalReceitas: receitas,
    totalDespesas: despesas,
    saldoDoMes: receitas - despesas
  });
});

app.listen(PORTA, () => {
    console.log(`Servidor funcionando na porta ${PORTA}`)
})
