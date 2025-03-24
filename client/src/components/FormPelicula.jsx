import axios from "axios";
import { useState } from "react";

function FormPelicula({ buscarPeliculas }) {
  const [vistaPrevia, setVistaPrevia] = useState(null);
  const [img, setImg] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [genero, setGenero] = useState("");
  const [duracion, setDuracion] = useState("");
  const [horarios, setHorarios] = useState("");
  const [fecha, setFecha] = useState("");

  const subirPelicula = async () => {
    if (!img || !titulo || !descripcion || !genero || !duracion || !fecha || !horarios) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const formData = new FormData();
    formData.append("image", img);
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("genero", genero);
    formData.append("duracion", duracion);
    formData.append("fecha", fecha);
    formData.append("horario", JSON.stringify(horarios.split(',')));

    try {
      const response = await axios.post("http://localhost:3001/peliculas/subirPelicula", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        alert("Película registrada con éxito");
        buscarPeliculas();
      } else {
        alert("Error al registrar la película");
      }
    } catch (error) {
      console.error("Error al subir la película:", error);
      alert("Error al subir la película");
    }
  };


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImg(file);
      setVistaPrevia(URL.createObjectURL(file));
    }
  };

  return (
    <section className="container form">
      <section className="container upload-section">
        <h2 className="text-white">Subir Nueva Película</h2>
        <div className="row">
          <div className="col-md-4 upload-preview">
            <label htmlFor="imageUpload" className="form-label text-white">Imagen de la película</label>
            <input
              type="file"
              className="form-control"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
            />
            {vistaPrevia && <img src={vistaPrevia} alt="Vista previa" className="img-fluid mt-2" />}
          </div>
          <div className="col-md-8">
            <label className="form-label text-white">Título</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese el título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <label className="form-label text-white">Descripción</label>
            <textarea
              className="form-control mb-2"
              rows="3"
              placeholder="Ingrese la descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
            <label className="form-label text-white">Género</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese el género"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            />
            <label className="form-label text-white">Duración</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese la duración"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
            />
            <label className="form-label text-white">Horarios</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese los horarios: 12:00,15:00,22:00"
              value={horarios}
              onChange={(e) => setHorarios(e.target.value)}
            />
            <label className="form-label text-white">Fecha de Estreno</label>
            <input
              type="date"
              className="form-control mb-3"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
            <button className="btn btn-danger w-100" onClick={subirPelicula}>
              Subir Película
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default FormPelicula;