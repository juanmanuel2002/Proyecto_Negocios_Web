import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from './setup.js';

export const getProductos = async () => {
  try {
    const productosCollection = collection(db, 'productos'); 
    const productosSnapshot = await getDocs(productosCollection); 
    const productosList = productosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })); 
    return { success: true, data: productosList };
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return { success: false, message: error.message };
  }
};