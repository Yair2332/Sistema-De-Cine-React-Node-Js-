import axios from "axios";

function CardPelicula({ img, nombre, descripcion, setPeliculaSelect, id, isAdmin, buscarPeliculas }) {
  const url = "/assets/" + img;

  const borrarPelicula = () => {
    console.log("Eliminando película con ID:", id); 
    axios.post("http://localhost:3001/peliculas/borrarPelicula", { id: id }) 
      .then((response) => {
        console.log("Respuesta del servidor:", response);
        buscarPeliculas(""); 
      })
      .catch((error) => {
        console.error("Error al eliminar película:", error);
        alert("Error al eliminar película");
      });
  };

  const handleVerMas = () => {
    setPeliculaSelect(id);
    const carrusel = document.getElementById("anuncio");
    if (carrusel) {
      carrusel.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="col-md-3 mt-4 animate__animated animate__zoomIn">
      <div className="card text-white position-relative">
        {isAdmin ? <button className="btn btn-danger borrar" onClick={borrarPelicula}><i className="bi bi-trash"></i></button> : ""}
        <img src={url} className="card-img-top" alt="Pelicula 2" />
        <div className="card-body">
          <h5 className="card-title">{nombre}</h5>
          <p className="card-text">{descripcion}</p>
          <button className="btn btn-danger" onClick={handleVerMas}>Ver más</button>
        </div>
      </div>
    </div>
  );
}

export default CardPelicula;