# ControleFinan

# API de Controle Financeiro Pessoal

API REST desenvolvida em JavaScript com Express.js para controle financeiro pessoal.

O sistema permite cadastrar usuários, contas, categorias, lançamentos financeiros e metas financeiras, além de consultar saldos e resumos mensais.

## Tecnologias utilizadas

- JavaScript
- Node.js
- Express.js
- Postman
- Git
- GitHub

## Como executar o projeto

### Instalação

```bash
npm install
Execução
node index.js
A API será executada na porta 3000:
http://localhost:3000⁠
Recursos da API
Usuários
Contas
Categorias
Lançamentos
Metas financeiras
Endpoints
Usuários
POST /usuarios - Cadastrar usuário
GET /usuarios - Listar usuários
GET /usuarios/:id - Consultar usuário
PUT /usuarios/:id - Atualizar usuário
DELETE /usuarios/:id - Excluir usuário
Contas
POST /contas - Cadastrar conta
GET /contas - Listar contas
GET /contas/:id/saldo - Consultar saldo de uma conta
Categorias
POST /categorias - Cadastrar categoria
GET /categorias - Listar categorias
Lançamentos
POST /lancamentos - Cadastrar lançamento
GET /lancamentos - Listar lançamentos
GET /lancamentos/:id - Consultar lançamento
PUT /lancamentos/:id - Atualizar lançamento
DELETE /lancamentos/:id - Excluir lançamento
Resumo mensal
GET /resumo-mensal - Consultar receitas, despesas e saldo de um mês
Exemplo:
/resumo-mensal?usuarioId=1&mes=2026-10
Metas financeiras
POST /metas - Cadastrar meta
GET /metas - Listar metas
GET /metas/:id - Consultar uma meta
PUT /metas/:id - Atualizar meta
DELETE /metas/:id - Excluir meta
Regras de negócio
O e-mail de cada usuário deve ser único.
Um lançamento deve estar relacionado ao usuário, à conta e à categoria correspondentes.
O tipo de lançamento deve ser receita ou despesa.
O valor objetivo de uma meta financeira deve ser maior que zero.
Observações
Os dados são armazenados temporariamente em memória. Por isso, os dados são apagados quando o servidor é reiniciado.
O projeto foi desenvolvido como atividade acadêmica utilizando JavaScript, Node.js e Express.js.