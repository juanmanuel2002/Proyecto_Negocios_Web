import React, { useState } from 'react';
import { resetPassword } from '../services/api'; // Importa la función del servicio
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const ForgotPasswordReset = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const token = searchParams.get('oobCode'); // Obtén el token de la URL
    if (!token) {
      setError('Token inválido o no proporcionado.');
      return;
    }

    const result = await resetPassword(token, newPassword);
    if (result.success) {
      setMessage('Contraseña restablecida exitosamente. Ahora puedes iniciar sesión.');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Restablecer Contraseña</h2>
      <form onSubmit={handleResetPassword} className="form">
        <input
          className="input"
          type="password"
          placeholder="Nueva Contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        {message && <p className="success" style={{ color: 'green' }}>{message}</p>}
        {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
        <button className="login-button" type="submit">Restablecer Contraseña</button>
        <button className="register-button" onClick={() => navigate('/login')}>Regresar</button>
      </form>
    </div>
  );
};

export default ForgotPasswordReset;