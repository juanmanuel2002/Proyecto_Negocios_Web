import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset } from 'firebase/auth';
import { auth, db } from './setup.js';
import { doc, setDoc } from 'firebase/firestore';
import { sendEmail } from '../utils/sendEmail.js';

export const registerUser = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'usuarios', user.uid), {
      uid: user.uid,
      email: user.email,
      nombre: name,
      suscripcion: null,
      creado: new Date().toISOString()
    });

    // Enviar correo de bienvenida
    await sendEmail('bienvenida',email,"","","","",name); 

    return { success: true};
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return { success: true, uid: user.reloadUserInfo.localId }; 
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const sendResetEmail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const resetPassword = async (token, newPassword) => {
    try {
        await confirmPasswordReset(auth, token, newPassword);
    } catch (error) {
        throw new Error('Error al restablecer la contraseña: ' + error.message);
    }
};
