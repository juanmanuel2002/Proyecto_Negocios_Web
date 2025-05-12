import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import config from '../../config.js';

const firebaseConfig = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  messagingSenderId: config.firebase.messagingSenderId,
  appId: config.firebase.appId,
  measurementId: config.firebase.measurementId
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Servicios
export const auth = getAuth(app);
export const db = getFirestore(app);

if(process.env.FIREBASE_EMULATOR){
  console.log("Firebase Emulator is running");
  connectAuthEmulator(auth, "http://localhost:9099",{disableWarnings: true});
  connectFirestoreEmulator(db, "localhost", 8085);
}

/**
 * Intenta un login en Auth (apunta al emulador si está activo)
 */
export async function login(email, password) {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  } catch (err) {
    console.error('Error en login:', err.code, err.message);
    throw err;
  }
}