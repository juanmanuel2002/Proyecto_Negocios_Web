import { doc, getDoc } from 'firebase/firestore';
import { db } from './setup.js';

export const getUserByUid = async (uid) => {
  try {
    const userDocRef = doc(db, 'usuarios', uid); 
    const userDoc = await getDoc(userDocRef); 

    if (!userDoc.exists()) {
      throw new Error('Usuario no encontrado');
    }

    return userDoc.data(); 
  } catch (error) {
    throw new Error(error.message); 
  }
};