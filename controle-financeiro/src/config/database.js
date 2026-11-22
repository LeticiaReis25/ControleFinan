import { MongoClient } from "mongodb";
import "dotenv/config";

const uri = process.env.MONGO_URI;
const nomeBanco = process.env.DB_NAME;

const cliente = new MongoClient(uri);

let banco;

export async function conectarBanco() {
  if (banco) return banco;

  await cliente.connect();

  banco = cliente.db(nomeBanco);

  console.log("MongoDB conectado com sucesso!");

  return banco;
}

export function obterBanco() {
  if (!banco) {
    throw new Error("Banco de dados ainda não conectado.");
  }

  return banco;
}