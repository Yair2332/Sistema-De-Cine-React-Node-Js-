import express from "express";
import { buscarAsientosSegunIdHorario } from "../controllers/asientoController.js";

const router = express.Router();

router.post('/buscarAsientosSegunIdHorario', buscarAsientosSegunIdHorario);

export default router;