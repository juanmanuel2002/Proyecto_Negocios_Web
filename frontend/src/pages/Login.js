import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import axios from 'axios';
import '../styles/Login.css'; 

const Login = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate(); // Hook para la navegación

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Usuario:', user);  // Verifica el valor de usuario
            console.log('Contraseña:', password);  // Verifica el valor de contraseña

            await axios.post('http://localhost:5000/api/auth/login', { usuario: user, password });
            //localStorage.setItem('token', res.data.token);
            //setAuth(true);
            setSuccess(true);
            setTimeout(() => navigate('/main'), 2000);
        } catch (err) {
            console.error(err);  // Imprime el error
            setError("Credenciales incorrectas");
        }
    };

    return (
        <div className="container">
            <div className="heading">Sign In</div>
            {success && <p style={{ color: 'green' }}>✅ Login exitoso. Redirigiendo...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form className="form" onSubmit={handleSubmit}>
                <input
                    required
                    className="input"
                    type="text"
                    placeholder="Usuario"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <input
                    required
                    className="input"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input className="login-button" type="submit" value="Sign In" />
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
