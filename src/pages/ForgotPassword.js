import React, { useState } from 'react';
import { sendResetEmail} from '../services/api'; // Importa la función del servicio
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const result = await sendResetEmail(email);
    if (result.success) {
      setMessage('Correo de restablecimiento enviado. Revisa tu bandeja de entrada.');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Recuperar Contraseña</h2>
      <form onSubmit={handleForgotPassword} className="form">
        <input
          className="input"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {message && <p className="success" style={{ color: 'green' }}>{message}</p>}
        {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
        <button className="login-button" type="submit">Enviar Correo</button>
        <button className="register-button" onClick={() => navigate('/login')}>Regresar</button>
      </form>
    </div>
  );
};

export default ForgotPassword;