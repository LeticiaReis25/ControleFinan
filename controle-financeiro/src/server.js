import app from "./app.js";
import { conectarBanco } from "./config/database.js";

const PORTA = process.env.PORT || 3000;

async function iniciarServidor() {
  try {
    await conectarBanco();

    app.listen(PORTA, () => {
      console.log(`Servidor rodando na porta ${PORTA}`);
    });
  } catch (erro) {
    console.error("Erro ao iniciar a aplicação:", erro);
    process.exit(1);
  }
}

iniciarServidor();