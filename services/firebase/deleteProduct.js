import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from './setup.js';

export const deleteProducto = async (nombre) => {
  if (!nombre) return { success: false, status: 400, message: 'Nombre requerido' };

  try {
    const docRef = doc(db, 'productos', nombre);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return { success: false, status: 404, message: 'Producto no encontrado' };
    }

    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    return { success: false, status: 500, message: error.message };
  }
};
