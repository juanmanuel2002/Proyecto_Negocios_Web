import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ForgotPasswordReset.css';

const ForgotPasswordReset = () => {
    const { token } = useParams(); // Obtener el token de la URL
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(token); // Verificar el token en la consola
        if (!token) {
            setError('Token no proporcionado');
            return;
        }
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        try {
            await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
            setSuccess(true);
            setTimeout(() => navigate('/login'), 3000); // Redirigir a login después de éxito
        } catch (err) {
            setError(err.response?.data?.message || 'Error al restablecer la contraseña');
        }
    };

    return (
        <div className="container">
            <div className="heading">Restablecer Contraseña</div>
            {success && <p style={{ color: 'green' }}>✅ Contraseña actualizada. Redirigiendo...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Nueva Contraseña"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirmar Contraseña"
                    className="input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <input className="login-button" type="submit" value="Actualizar Contraseña" />
            </form>
        </div>
    );
};

export default ForgotPasswordReset;
