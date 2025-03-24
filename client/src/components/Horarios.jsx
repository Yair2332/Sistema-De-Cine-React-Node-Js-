import { useEffect, useState, useMemo } from "react";

function Horarios({ setHorarioSelect, infoPeliculaSelect }) {
    const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

    // Memoizar el array de horarios para evitar recalculaciones innecesarias
    const horariosArray = useMemo(() => {
        return typeof infoPeliculaSelect?.horario === "string" 
            ? JSON.parse(infoPeliculaSelect.horario) 
            : [];
    }, [infoPeliculaSelect]);

    useEffect(() => {
        // Solo establecer el primer horario si aún no se ha seleccionado uno manualmente
        if (horariosArray.length > 0 && horarioSeleccionado === null) {
            setHorarioSeleccionado(horariosArray[0]);
            setHorarioSelect(horariosArray[0]);
        }
    }, [horariosArray, horarioSeleccionado, setHorarioSelect]);

    const seleccionarHorario = (horario) => {
        setHorarioSeleccionado(horario);
        setHorarioSelect(horario);
    };

    if (!infoPeliculaSelect) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container movie-details animate__animated animate__fadeIn">
            <div className="row">
                <div className="col-md-4">
                    <img
                        id="moviePoster"
                        src={"/assets/" + infoPeliculaSelect.imagen_url}
                        alt="Póster de la película"
                        style={{ height: "450px" }}
                    />
                </div>
                <div className="col-md-8">
                    <h2 id="movieTitle">
                        <i className="fas fa-film"></i> {infoPeliculaSelect.titulo}
                    </h2>
                    <p id="movieDescription" className="mt-1 fs-5">
                        {infoPeliculaSelect.descripcion}
                    </p>
                    <p>
                        <i className="fas fa-tags"></i>{" "}
                        <strong className="fs-5">Género:</strong>{" "}
                        <span id="movieGenre">{infoPeliculaSelect.genero}</span>
                    </p>
                    <p>
                        <i className="fas fa-clock"></i>{" "}
                        <strong className="fs-5">Duración:</strong>{" "}
                        <span id="movieDuration">{infoPeliculaSelect.duracion} min</span>
                    </p>
                    <p>
                        <i className="fas fa-calendar-alt"></i>{" "}
                        <strong className="fs-5">Fecha de Estreno:</strong>{" "}
                        <span id="movieDate">{infoPeliculaSelect.fecha_estreno}</span>
                    </p>

                    <h4>
                        <i className="fas fa-clock"></i> Horarios Disponibles
                    </h4>
                    <div id="horarios" className="d-flex flex-wrap justify-content-center">
                        {horariosArray.map((horario, index) => (
                            <button
                                key={index}
                                className={`btn ${horario === horarioSeleccionado ? "btn-light" : "btn-outline-light"} btn-horario m-2`}
                                onClick={() => seleccionarHorario(horario)}
                            >
                                {horario}
                            </button>
                        ))}
                    </div>

                    <button className="btn btn-danger mt-3">
                        <i className="fas fa-ticket-alt"></i> Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Horarios;
