import { collection, addDoc, setDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from './setup.js';

export const addProductos = async (productos) => {
 
  if (!Array.isArray(productos)) {
    return { success: false, message: 'El cuerpo debe ser un arreglo de productos.' };
  }

  try {
    const productosCollection = collection(db, 'productos');
    for (const producto of productos) {
      const { nombre, descripcion, imagen, precio, unidadesDisponibles, categoria } = producto;

      if (!nombre || !descripcion || !imagen || !precio || !unidadesDisponibles || !categoria) {
        return { success: false, message: 'Todos los campos son obligatorios en cada producto.' };
      }

      const q = query(productosCollection, where('nombre', '==', nombre));
      const existing = await getDocs(q);

      if (!existing.empty) {
        // Si ya existe, actualiza el documento
        const existingDoc = existing.docs[0];
        await setDoc(doc(db, 'productos', existingDoc.id), producto);
      } else {
        // Si no existe, lo agrega
        await addDoc(productosCollection, producto);
      }
    }

    return { success: true, message: 'Productos procesados exitosamente.' };
  } catch (error) {
    console.error('Error al agregar productos:', error);
    return { success: false, message: error.message };
  }
};
