import { Router } from "express";
import * as controller from "../controllers/categoria.controllers.js";

const router = Router();

router.get("/", controller.listar);
router.post("/", controller.cadastrar);

export default router