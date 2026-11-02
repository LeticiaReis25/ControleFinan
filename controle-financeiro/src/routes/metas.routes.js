import { Router } from "express";
import * as controller from "../controllers/metas.controllers.js";

const router = Router();

router.get("/", controller.listar);
router.post("/", controller.cadastrar);
router.get("/:id", controller.buscar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.excluir);

export default router; 