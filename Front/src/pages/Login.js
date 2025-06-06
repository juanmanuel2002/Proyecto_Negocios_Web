import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api'; 
import { useAuth } from '../context/AuthContext'; 
import DireccionControl from '../components/DireccionControl';
import { useDireccionControl } from '../utils/useDireccionControl';
import '../styles/Auth.css';

const Login = () => {
  const { login, redirectPath, setRedirectPath, currentUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const {
    showDireccionControl,
  // eslint-disable-next-line
    abrirDireccionControl,
    cerrarDireccionControl,
  } = useDireccionControl();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await loginUser(email, password);
      if (result.success) {
        login(result.uid, result.name, result.email, result.suscripcion);
        if (redirectPath === '/paypal') {
          setRedirectPath('/main');
          navigate('/paypal', { state: { from: '/login' } });
        } else {
          const path = redirectPath || '/main';
          setRedirectPath('/main');
          navigate(path);
        }
      } else {
        // Manejo de errores específicos basado en el mensaje del backend
        if (result.message.includes('Credenciales inválidas')) {
          setError('Correo o contraseña incorrectos. Por favor, verifica tus datos.');
        } else if (result.message.includes('Usuario no encontrado')) {
          setError('No se encontró una cuenta con este correo electrónico.');
        } else {
          setError(result.message || 'Ocurrió un error inesperado. Por favor, intente nuevamente.');
        }
      }
    } catch (err) {
      setError('Error al procesar la solicitud. Por favor, intente nuevamente.');
    }
  };
  const handleDireccionConfirmada = () => {
    cerrarDireccionControl();
    setRedirectPath('/main'); // Limpia el redirect para futuros logins
    navigate('/paypal', { state: { from: '/login' } });
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
      {showDireccionControl && (
        <DireccionControl
          userId={currentUser?.uid}
          onDireccionConfirmada={handleDireccionConfirmada}
        />
      )}
    </div>
  );
};

export default Login;