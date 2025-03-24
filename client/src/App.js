import { useEffect, useState } from 'react';
import './App.css';
import Anuncio from './components/Anuncio';
import CardPelicula from './components/CardPelicula';
import Footer from './components/Footer';
import Navegacion from './components/Navegacion';
import axios from "axios";
import FormPelicula from './components/FormPelicula';
import Carrucel from './components/Carrucel';

function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [peliculaSelect, setPeliculaSelect] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogin, setIsLogin] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    return usuarioGuardado ? true : false;
  });

  const buscarPeliculas = async (peliBuscar = "") => {
    try {
      const response = await axios.post('http://localhost:3001/peliculas', { peliBuscar }); 
      setPeliculas(response.data);
    } catch (error) {
      console.error("Error al buscar películas:", error);
    }
  };

  useEffect(() => {
    buscarPeliculas();
  }, []);

  useEffect(() => {
    if (isLogin) {
      localStorage.setItem('isLogin', JSON.stringify(isLogin));
    } else {
      localStorage.removeItem('isLogin'); 
    }
  }, [isLogin]);

  return (
    <div className="App">
      <Navegacion setIsAdmin={setIsAdmin} setIsLogin={setIsLogin} buscarPeliculas={buscarPeliculas} />
      <Anuncio />
      {isAdmin && <FormPelicula buscarPeliculas={buscarPeliculas}/>}
      {peliculaSelect && isLogin && <Carrucel peliculaSelect={peliculaSelect} setPeliculaSelect={setPeliculaSelect} />}
      <section className="container mt-4">
        <h2 className="text-white">Estrenos</h2>
        <div className="row">
          {peliculas.map((pelicula) => (
            <CardPelicula 
              key={pelicula.id} 
              id={pelicula.id} 
              setPeliculaSelect={setPeliculaSelect} 
              img={pelicula.imagen_url} 
              nombre={pelicula.titulo} 
              descripcion={pelicula.descripcion} 
              isAdmin={isAdmin}
              buscarPeliculas={buscarPeliculas}
            />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;