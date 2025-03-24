import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function Navegacion({ setIsLogin, setIsAdmin, buscarPeliculas }) {
    const clientID = "993646554546-ee84fl5i73h7ui57q2dn85lmetlkcojb.apps.googleusercontent.com";
    
    const [user, setUser] = useState(() => {
        const usuarioGuardado = localStorage.getItem('usuario');
        return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
    });

    const [flotante, setFlotante] = useState(false);

    useEffect(() => {
        if (user) {
            setIsLogin(true);
            const adminResponse = axios.post('http://localhost:3001/administrador/administrador', { correo: user.email });
            setIsAdmin(adminResponse.data);
        }
    }, [user, setIsLogin, setIsAdmin]);

    const onSuccess = async (response) => {
        try {
            console.log("Login exitoso:", response);

            const userInfo = jwtDecode(response.credential);
            setUser(userInfo);
            setIsLogin(true);
            localStorage.setItem('usuario', JSON.stringify(userInfo)); // Guardar usuario en localStorage

            const adminResponse = await axios.post('http://localhost:3001/administrador/administrador', { correo: userInfo.email });
            setIsAdmin(adminResponse.data);
        } catch (error) {
            console.error("Error en la autenticación:", error);
        }
    };

    const onFailure = (error) => {
        console.error("Error en el login:", error);
    };

    const handleLogout = () => {
        setUser(null);
        setFlotante(false);
        setIsLogin(false);
        setIsAdmin(false);
        localStorage.removeItem('usuario'); // Eliminar usuario del localStorage
    };

    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <div className="container">
                <a className="navbar-brand" href="/">Cinemark UI</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <form className="d-flex me-2" onSubmit={(e) => e.preventDefault()}>
                        <input 
                            className="form-control me-2" 
                            type="search" 
                            placeholder="Buscar película..." 
                            onChange={(e) => buscarPeliculas(e.target.value)} 
                        />
                        <button className="btn btn-outline-light">Buscar</button>
                    </form>
                    {
                        user ? (
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={user.picture}
                                    alt="Foto de perfil"
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}
                                    onClick={() => setFlotante(!flotante)}
                                />
                                {flotante && (
                                    <div className='bg-dark flotante'>
                                        <div className='text-center'>
                                            <img
                                                src={user.picture}
                                                alt="Foto de perfil"
                                                style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                                            />
                                            <h5 className='p-1'>{user.name}</h5>
                                            <p>{user.email}</p>
                                        </div>
                                        <button onClick={handleLogout} className='btn-flotante'>
                                            Cerrar sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <GoogleOAuthProvider clientId={clientID}>
                                <GoogleLogin
                                    onSuccess={onSuccess}
                                    onError={onFailure}
                                    useOneTap
                                    theme="filled_black"
                                />
                            </GoogleOAuthProvider>
                        )
                    }
                </div>
            </div>
        </nav>
    );
}

export default Navegacion;