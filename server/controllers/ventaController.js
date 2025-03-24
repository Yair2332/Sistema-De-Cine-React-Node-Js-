import db from "../config/db.js";

export const registrarVenta = (req, res) => {
    const { pelicula_id, fecha_funcion, horario, asientos, todosLosAsientos } = req.body;

    if (!pelicula_id || !fecha_funcion || !horario || !asientos || !todosLosAsientos) {
        return res.status(400).send("Faltan datos requeridos.");
    }

    const compraData = {
        pelicula_id: pelicula_id,
        fecha_funcion: fecha_funcion,
        horario: horario,
        asientos: JSON.stringify(asientos)
    };

    db.query("INSERT INTO compras SET ?", compraData, (err, results) => {
        if (err) {
            console.error("Error al insertar la compra:", err);
            return res.status(500).send("Error al registrar la venta.");
        }

        const updateQuery = "UPDATE asientos SET asientos = ? WHERE pelicula_id = ? AND horario = ?";
        db.query(updateQuery, [JSON.stringify(todosLosAsientos), pelicula_id, horario], (err, results) => {
            if (err) {
                console.error("Error al actualizar los asientos:", err);
                return res.status(500).send("Error al actualizar los asientos.");
            }

            res.status(201).send("Venta registrada y asientos actualizados correctamente.");
        });
    });
};