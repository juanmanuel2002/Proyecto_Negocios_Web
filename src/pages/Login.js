import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api'; // Importa la función del servicio
import { useAuth } from '../context/AuthContext'; 
import '../styles/Auth.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const result = await loginUser(email, password);
    if (result.success) {
      login()
      navigate('/main');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="form">
        <input
          className="input"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
        <button className="login-button" type="submit">Iniciar Sesión</button>
      </form>

      <div className="register-container">
        <p className="forgot-password">
          ¿Olvidaste tu contraseña? <a href="/forgot-password">Recupérala aquí</a>
        </p>
        <button
          className="register-button"
          onClick={() => navigate('/register')}
        >
          Crear cuenta nueva
        </button>
      </div>
    </div>
  );
};

export default Login;