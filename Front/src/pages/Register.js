import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api'; 
import ModalMensaje from '../components/ModalMensaje';
import '../styles/Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const result = await registerUser(email, password, name);
    if (result.success) {
      setShowSuccessModal(true);
    } else {
    // Mensaje de error más claro para el usuario
    if (
      result.message &&
      (result.message.includes('auth/email-already-in-use') ||
        result.message.toLowerCase().includes('correo ya registrado'))
    ) {
      setError('El correo electrónico ya está registrado. Por favor, usa otro o inicia sesión.');
    } else {
      setError(result.message);
    }
  }
  };

  return (
    <div className="container">
      <h2 className="heading">Crear Cuenta</h2>
      <form onSubmit={handleRegister} className="form">
        <input
          className="input"
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button className="login-button" type="submit">Registrarse</button>
        <button className="register-button" onClick={() => navigate('/login')}>Regresar</button>
      </form>
      {showSuccessModal && (
        <ModalMensaje
          titulo="¡Registro exitoso!"
          mensaje="Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión."
          onClose={() => {
            setShowSuccessModal(false);
            navigate('/login');
          }}
        />
      )}
    </div>
  );
};

export default Register;