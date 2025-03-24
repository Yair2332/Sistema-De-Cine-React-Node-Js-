import axios from "axios";
import { useEffect, useState, useCallback } from "react";

function Asientos({ peliculaId, horario, setAsientosArray, setTodosLosAsientos, setTotalAPagar }) {
  const [asientos, setAsientos] = useState([]);
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);

  const buscarAsientosSegunIdHorario = useCallback(() => {
    axios.post('http://localhost:3001/asientos/buscarAsientosSegunIdHorario', { peliculaId, horario }) 
      .then((response) => {
        const asientosArray = JSON.parse(response.data.asientos);
        setAsientos(asientosArray);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [peliculaId, horario]);

  const seleccionarAsiento = (numeroAsiento) => {
    let nuevosAsientos = [...asientosSeleccionados];
    if (nuevosAsientos.includes(numeroAsiento)) {
      nuevosAsientos = nuevosAsientos.filter((asiento) => asiento !== numeroAsiento);
    } else {
      nuevosAsientos.push(numeroAsiento);
    }
    setAsientosSeleccionados(nuevosAsientos);
    setTotalAPagar(nuevosAsientos.length * 500);
    const nuevosTodosLosAsientos = [...asientos];
    nuevosAsientos.forEach((asiento) => {
      nuevosTodosLosAsientos[asiento - 1] = 1;
    });
    setTodosLosAsientos(nuevosTodosLosAsientos);
  };

  useEffect(() => {
    setAsientosArray(asientosSeleccionados);
  }, [asientosSeleccionados, setAsientosArray]);

  useEffect(() => {
    if (horario) {
      buscarAsientosSegunIdHorario();
    }
  }, [horario, buscarAsientosSegunIdHorario]);

  return (
    <>
      <div className="container movie-details asientos">
        <h2><i className="fas fa-chair"></i> Selecciona tu Asiento</h2>
        <div className="screen">Pantalla</div>
        <div className="seats-container">
          {[...Array(5)].map((_, fila) => (
            <div className="row" key={fila}>
              {[...Array(15)].map((_, asiento) => {
                const numeroAsiento = fila * 15 + asiento + 1;
                const estaOcupado = asientos[numeroAsiento - 1] === 1;
                const estaSeleccionado = asientosSeleccionados.includes(numeroAsiento);

                return (
                  <>
                    <div
                      key={numeroAsiento}
                      className={`seat ${estaOcupado ? "occupied" : ""} ${estaSeleccionado ? "selected" : ""}`}
                      onClick={() => !estaOcupado && seleccionarAsiento(numeroAsiento)}
                    >
                      {numeroAsiento}
                    </div>
                    {(asiento + 1) % 5 === 0 && (asiento + 1) !== 15 && (
                      <div className="aisle"></div>
                    )}
                  </>
                );
              })}
            </div>
          ))}
        </div>
        <p style={{ marginTop: "20px" }}>
          Los asientos en <span style={{ color: "orange", fontWeight: "bold" }}>naranja</span> ya están ocupados.
          Los asientos en <span style={{ color: "green", fontWeight: "bold" }}>verde</span> están seleccionados.
        </p>
      </div>
    </>
  );
}

export default Asientos;