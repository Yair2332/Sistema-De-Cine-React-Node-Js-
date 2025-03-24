import express from "express";
import { verificarAdministrador } from "../controllers/administradorController.js";

const router = express.Router();

router.post('/administrador', verificarAdministrador);

export default router;