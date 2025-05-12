import React, { createContext, useContext, useState } from 'react';
import { fetchUserInfo } from '../services/api'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectPath, setRedirectPath] = useState('/main'); // Ruta por defecto

  const [currentUser, setCurrentUser] = useState(null);

    const login = async (uid,name,email,suscripcion) => {
        setCurrentUser({uid,name,email,suscripcion})
        setIsLoggedIn(true);
       
    };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setRedirectPath('/main'); // Restablecer la ruta por defecto al cerrar sesión
  };

  const refreshUserData = async (uid) => {
    try {
      const updatedUserData = await fetchUserInfo(uid); 
      setCurrentUser(updatedUserData.data);
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, redirectPath, setRedirectPath, currentUser, refreshUserData}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);