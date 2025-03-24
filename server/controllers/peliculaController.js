import db from "../config/db.js";

export const subirPelicula = (req, res) => {
    const { titulo, descripcion, genero, duracion, fecha, horario } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: "Debe subir una imagen" });
    }

    if (!titulo || !descripcion || !genero || !duracion || !fecha || !horario) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const imagen_url = req.file.filename;

    db.query(
        'INSERT INTO peliculas SET ?',
        { titulo, descripcion, genero, duracion, fecha_estreno: fecha, imagen_url, horario },
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error al guardar en la base de datos" });
            }

            const peliculaId = result.insertId;
            const horariosArray = JSON.parse(horario);

            horariosArray.forEach((horario) => {
                const asientos = new Array(75).fill(0);
                db.query(
                    'INSERT INTO asientos SET ?',
                    { pelicula_id: peliculaId, horario, asientos: JSON.stringify(asientos) },
                    (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ message: "Error al guardar los horarios" });
                        }
                    }
                );
            });

            res.json({ message: "Película y horarios guardados exitosamente", imagen_url });
        }
    );
};

export const obtenerPeliculas = (req, res) => {
    const titulo = req.body.peliBuscar;
    let sql = !titulo ? 'SELECT * FROM peliculas' : `SELECT * FROM peliculas WHERE titulo LIKE '%${titulo}%'`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error al obtener las películas" });
        }
        res.json(results);
    });
};

export const obtenerPeliculaPorId = (req, res) => {
    const id = req.body.peliculaId;
    db.query('SELECT * FROM peliculas WHERE id=?', [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error al obtener las películas" });
        }
        res.json(results[0]);
    });
};

export const borrarPelicula = (req, res) => {
    const id = req.body.id;

    db.query('DELETE FROM asientos WHERE pelicula_id=?', [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error al borrar asientos" });
        }

        db.query('DELETE FROM peliculas WHERE id=?', [id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error al borrar pelicula" });
            }
            res.status(200).json({ message: "Película eliminada exitosamente" });
        });
    });
};