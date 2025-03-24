import express from "express";
import { subirPelicula, obtenerPeliculas, obtenerPeliculaPorId, borrarPelicula } from "../controllers/peliculaController.js";
import upload from "../middlewares/upload.js"; 

const router = express.Router();

router.post('/subirPelicula', upload.single('image'), subirPelicula);
router.post('/', obtenerPeliculas);
router.post('/buscarPeliculaPorId', obtenerPeliculaPorId);
router.post('/borrarPelicula', borrarPelicula);

export default router;