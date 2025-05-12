import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api'; 
import { useAuth } from '../context/AuthContext'; 
import '../styles/Auth.css';

const Login = () => {
  const { login, redirectPath, setRedirectPath } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await loginUser(email, password);
      if (result.success) {
        login(result.uid, result.name, result.email, result.suscripcion); 
        const path = redirectPath || '/main'; 
        setRedirectPath('/main'); 
        navigate(path);
      } else {
        throw new Error(result.message); 
      }
    } catch (err) {
      if (err.message.includes('auth/invalid-credential') || err.message.includes('auth/wrong-password')) {
        setError('Usuario o Contraseña incorrectos, intente nuevamente.');
      } else if (err.message.includes('auth/user-not-found')) {
        setError('No se encontró una cuenta con este correo electrónico.');
      } else {
        setError('Ocurrió un error inesperado. Por favor, intente nuevamente.');
      }
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