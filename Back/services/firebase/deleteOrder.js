import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from './setup.js';

export const deleteOrderById = async (id) => {
  try {
    const orderDocRef = doc(db, 'pedidos', id); 
    const orderDoc = await getDoc(orderDocRef); 

    if (!orderDoc.exists()) {
      throw new Error('La orden no existe');
    }

    await deleteDoc(orderDocRef); 
    return { success: true, message: 'Orden eliminada exitosamente' };
  } catch (error) {
    throw new Error(error.message);
  }
};