import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import axios from 'axios';
import '../styles/Auth.css';

const Login = () => {
    const [usuario, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate(); // Hook para la navegación

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {    
            // Solo verifica la respuesta exitosa
            await axios.post('http://localhost:5000/api/auth/login', { usuario, password });
            
            setSuccess(true);
            // Redirecciona inmediatamente o después de un tiempo
            setTimeout(() => navigate('/main'), 2000);
        } catch (err) {
            console.error(err.response?.data || err.message);
            setError(err.response?.data?.message || "Credenciales incorrectas");
        }
    };

    return (
        <div className="container">
            <div className="heading">Bienvenido</div>
            {success && <p style={{ color: 'green' }}>✅ Login exitoso. Redirigiendo...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form className="form" onSubmit={handleSubmit}>
                <input
                    required
                    className="input"
                    type="text"
                    placeholder="Usuario"
                    value={usuario}
                    onChange={(e) => {
                        setUser(e.target.value);
                        setError(''); // Borra el error cuando el usuario escribe
                    }}
                />
                <input
                    required
                    className="input"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError(''); // Borra el error cuando el usuario escribe
                    }}
                />
                <span className="forgot-password">
                    <a onClick={() => navigate('/forgot-password')}>Olvidé mi contraseña</a>
                </span>
                <input 
                    className="login-button" 
                    type="submit" 
                    value="Sign In" 
                    onClick={() => setError('')} // Limpia el error cuando se hace click
                />
            </form>

            <div className="register-container">
                <p>¿No tienes cuenta?</p>
                <button className="register-button" onClick={() => navigate('/register')}>Crear Cuenta</button>
            </div>
            
            <div className="footer">
                <p>©2025 Sabores ocultos. Todos los derechos reservados.</p>
            </div>

        </div>
    );
};

export default Login;
