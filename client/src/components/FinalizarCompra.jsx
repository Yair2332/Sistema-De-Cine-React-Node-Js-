import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react"; // Importar QRCodeSVG
import html2pdf from "html2pdf.js";

function FinalizarCompra({ infoPelicula, horario, asientos, TodosLosAsientos, totalAPagar, setPeliculaSelect }) {
    const [minDate, setMinDate] = useState("");
    const [fechaSeleccionada, setFechaSeleccionada] = useState("");
    const pdfRef = useRef(null); // Referencia para el contenido del PDF

    useEffect(() => {
        if (!horario) return;

        const today = new Date();
        const [functionHour, functionMinute] = horario.split(":").map(Number);
        const functionTime = new Date();
        functionTime.setHours(functionHour, functionMinute, 0, 0);

        if (today >= functionTime) {
            today.setDate(today.getDate() + 1);
        }

        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        setMinDate(formattedDate);
        setFechaSeleccionada(formattedDate); // Inicializa con la fecha mínima permitida
    }, [horario, asientos, TodosLosAsientos]);

    if (!infoPelicula) {
        return <div className="text-center text-light">Cargando información de la película...</div>;
    }

    const generarPDF = () => {
        const contenido = pdfRef.current;

        // Opciones para el PDF
        const opciones = {
            margin: 10,
            filename: `compra_${infoPelicula.titulo}_${fechaSeleccionada}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true }, // Permitir carga de imágenes externas
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };

        // Generar el PDF
        html2pdf().from(contenido).set(opciones).save();
    };

    const registrarVenta = () => {
        if (asientos.length === 0) {
            alert("Selecciona al menos un asiento.");
            return;
        }

        axios.post('http://localhost:3001/ventas/registrarVenta', {
            pelicula_id: infoPelicula.id,
            fecha_funcion: fechaSeleccionada,
            horario: horario,
            asientos: asientos,
            todosLosAsientos: TodosLosAsientos
        })
        .then((response) => {
            alert("Venta registrada con éxito.");
            generarPDF(); // Generar el PDF después de registrar la venta
            setPeliculaSelect("")
        })
        .catch((error) => {
            alert("Hubo un error al registrar la venta. Inténtalo de nuevo.");
        });
    };

    // Datos para el código QR
    const datosQR = JSON.stringify({
        pelicula: infoPelicula.titulo,
        fecha_funcion: fechaSeleccionada,
        horario: horario,
        asientos: asientos.join(", "),
    });

    return (
        <div className="container movie-details animate__animated animate__fadeIn">
            <div className="row">
                <div className="col-md-4">
                    <img
                        src={"./assets/" + infoPelicula.imagen_url}
                        alt="Póster de la película"
                        style={{ height: "450px" }}
                    />
                </div>
                <div className="col-md-8">
                    <div className="form-container">
                        <h2>Confirmación de Compra</h2>
                        <div>
                            <label className="form-label m-0 fs-5">Película</label>
                            <input type="text" className="form-control bg-dark text-light text-center" value={infoPelicula.titulo} readOnly />

                            <label className="form-label m-0 fs-5">Fecha de Función</label>
                            <input 
                                type="date" 
                                className="form-control bg-dark text-light text-center" 
                                value={fechaSeleccionada} 
                                min={minDate}
                                onChange={(e) => setFechaSeleccionada(e.target.value)} 
                            />

                            <label className="form-label m-0 fs-5">Horario</label>
                            <input type="text" className="form-control bg-dark text-light text-center" value={horario} readOnly />

                            <label className="form-label m-0 fs-5">Asientos</label>
                            <input 
                                type="text" 
                                className="form-control bg-dark text-light text-center" 
                                value={Array.isArray(asientos) ? asientos.join(", ") : ""} 
                                readOnly 
                            />

                            <label className="form-label m-0 fs-5">Total A Pagar</label>
                            <input type="text" className="form-control bg-dark text-light text-center" value={totalAPagar} readOnly />

                            <button className="btn btn-danger w-100 mt-2" onClick={registrarVenta}>Finalizar Compra</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenido oculto para el PDF */}
            <div style={{ display: "none" }}>
                <div ref={pdfRef} style={{ position: "relative", padding: "20px", fontFamily: "Arial", textAlign: "center" }}>
                    {/* Imagen de fondo */}
                    <img 
                        src="/fondo-pdf.jpg" // Ruta de la imagen de fondo
                        alt="Fondo del PDF" 
                        style={{ 
                            position: "absolute", 
                            top: 0, 
                            left: 0, 
                            width: "100%", 
                            height: "100%", 
                            objectFit: "cover", 
                            opacity: 0.3, // Ajusta la opacidad de la imagen de fondo
                            zIndex: -1, // Coloca la imagen detrás del contenido
                        }} 
                    />

                    {/* Contenido del PDF */}
                    <div style={{ position: "relative", zIndex: 1 }}>
                        <h1>Comprobante de Compra</h1>
                        <p><strong>Película:</strong> {infoPelicula.titulo}</p>
                        <p><strong>Fecha de Función:</strong> {fechaSeleccionada}</p>
                        <p><strong>Horario:</strong> {horario}</p>
                        <p><strong>Asientos:</strong> {asientos.join(", ")}</p>
                        <div style={{ marginTop: "20px" }}>
                            <QRCodeSVG value={datosQR} size={128} /> {/* Usar QRCodeSVG */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FinalizarCompra;