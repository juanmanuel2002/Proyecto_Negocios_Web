import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css';

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', { nombre, usuario, email, password });
            setSuccess(true);
            setTimeout(() => navigate('/main'), 2000); // Redirige después de 2 segundos
        } catch (err) {
            setError("Error al registrar usuario");
        }
    };

    return (
        <div className="container">
            <div className="heading">Registrarse</div>
            {success && <p style={{ color: 'green' }}>✅ Usuario creado exitosamente. Redirigiendo...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form className="form" onSubmit={handleSubmit}>
                <input
                    required
                    className="input"
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    required
                    className="input"
                    type="text"
                    placeholder="Usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                />
                <input
                    required
                    className="input"
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    required
                    className="input"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="register-button" type="submit">Registrarse</button>
            </form>
            <button className="back-button" onClick={() => navigate('/login')}>Volver al Login</button>
        </div>
    );
};

export default Register;
