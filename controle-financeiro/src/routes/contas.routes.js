import { Router } from "express";
import * as controller from "../controllers/contas.controllers.js";

const router = Router();

router.get("/", controller.listar);
router.post("/", controller.cadastrar);
router.get("/:id/saldo", controller.saldo);

export default router;