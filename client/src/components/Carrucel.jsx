import { useState, useEffect, useCallback } from "react";
import Asientos from "./Asientos";
import Horarios from "./Horarios";
import FinalizarCompra from "./FinalizarCompra";
import axios from "axios";

function Carrucel({ peliculaSelect, setPeliculaSelect }) {
    const [horarioSelect, setHorarioSelect] = useState("");
    const [infoPeliculaSelect, setInfoPeliculaSelect] = useState(null);
    const [todosLosAsientos, setTodosLosAsientos] = useState(new Array(80).fill(0));
    const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);

    const [totalAPagar, setTotalAPagar] = useState();

    const buscarPeliculaPorId = useCallback(() => {
        if (!peliculaSelect) return;

        axios.post('http://localhost:3001/peliculas/buscarPeliculaPorId', { peliculaId: peliculaSelect })
            .then((response) => {
                setInfoPeliculaSelect(response.data || null);
            })
            .catch((e) => {
                console.log("Error", e);
                setInfoPeliculaSelect(null);
            });
    }, [peliculaSelect]);

    useEffect(() => {
        new window.bootstrap.Carousel("#carouselExampleControls", { interval: false });
        buscarPeliculaPorId();
    }, [buscarPeliculaPorId]);

    return (
        <div id="carouselExampleControls" className="carousel slide">
            <div className="carousel-inner container carru">
                <button className="btn btn-danger btn-cerrar" onClick={() => setPeliculaSelect("")}>x</button>
                <div className="carousel-item active">
                    <Horarios infoPeliculaSelect={infoPeliculaSelect} setHorarioSelect={setHorarioSelect} setTodosLosAsientos={setTodosLosAsientos} />
                </div>
                <div className="carousel-item">
                    <Asientos
                        setTotalAPagar={setTotalAPagar}
                        peliculaId={peliculaSelect}
                        horario={horarioSelect}
                        setAsientosArray={setAsientosSeleccionados}
                        setTodosLosAsientos={setTodosLosAsientos}
                    />
                </div>
                <div className="carousel-item">
                    <FinalizarCompra
                        totalAPagar={totalAPagar}
                        infoPelicula={infoPeliculaSelect}
                        asientos={asientosSeleccionados}
                        horario={horarioSelect}
                        TodosLosAsientos={todosLosAsientos}
                        setPeliculaSelect={setPeliculaSelect}
                    />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carrucel;
