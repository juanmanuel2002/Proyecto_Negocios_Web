import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import axios from 'axios';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Hook para la navegación

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response?.data?.message || "Error al enviar correo");
        }
    };

    return (
        <div className="forgot-container">
            <div className="forgot-heading">Recuperar Contraseña</div>
            {message && <p className="forgot-message">{message}</p>}
            <form className="forgot-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="input"
                    placeholder="Ingrese su correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button className="forgot-button" type="submit">Enviar</button>
            </form>
            <button className="forgot-button" onClick={() => navigate('/')}>Volver al Login</button>
        </div>
    );
};

export default ForgotPassword;
