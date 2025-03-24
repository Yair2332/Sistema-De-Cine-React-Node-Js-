import db from "../config/db.js";

export const verificarAdministrador = (req, res) => {
    const correo = req.body.correo;

    db.query('SELECT * FROM administrador WHERE correo = ?', [correo], (err, results) => {
        if (err) {
            console.error(err);
        }
        res.send(results[0]);
    });
};