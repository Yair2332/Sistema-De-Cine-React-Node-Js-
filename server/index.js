import express from "express";
import cors from "cors";
import db from "./config/db.js";
import peliculaRoutes from "./routes/peliculaRoutes.js";
import asientoRoutes from "./routes/asientoRoutes.js";
import ventaRoutes from "./routes/ventaRoutes.js";
import administradorRoutes from "./routes/administradorRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/peliculas', peliculaRoutes);
app.use('/asientos', asientoRoutes);
app.use('/ventas', ventaRoutes);
app.use('/administrador', administradorRoutes);

// Iniciar servidor
app.listen(3001, () => {
    console.log("Servidor escuchando en el puerto 3001");
});