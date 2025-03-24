import db from "../config/db.js";

export const buscarAsientosSegunIdHorario = (req, res) => {
    const pelicula_id = req.body.peliculaId;
    const horario = req.body.horario;

    db.query(
        'SELECT asientos FROM asientos WHERE pelicula_id = ? AND horario = ?',
        [pelicula_id, horario],
        (err, results) => {
            if (err) {
                console.error("Error en la consulta:", err);
                return res.status(500).json({ message: "Error al obtener los asientos" });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: "No se encontraron asientos para este horario y película" });
            }
            
            res.json(results[0]);
        }
    );
};