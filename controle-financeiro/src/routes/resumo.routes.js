
import { Router } from "express";
import * as controller from "../controllers/resumo.controllers.js";

const router = Router();

router.get("/", controller.consultar);

export default router;