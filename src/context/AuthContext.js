import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectPath, setRedirectPath] = useState('/main'); // Ruta por defecto

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRedirectPath('/main'); // Restablecer la ruta por defecto al cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, redirectPath, setRedirectPath }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);