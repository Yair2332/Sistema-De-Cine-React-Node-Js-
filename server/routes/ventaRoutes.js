import express from "express";
import { registrarVenta } from "../controllers/ventaController.js";

const router = express.Router();

router.post('/registrarVenta', registrarVenta);

export default router;