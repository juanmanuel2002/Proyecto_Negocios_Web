import { doc, setDoc } from 'firebase/firestore';
import { db } from './setup.js';

export const createOrder = async (uid, orderData, total) => {
  try {
    const orderId = `${Date.now()}`; // Generar un ID único para el pedido
    await setDoc(doc(db, 'pedidos', orderId), {
      uid, // Relacionar el pedido con el usuario
      ...orderData,
      total,
      creado: new Date().toISOString()
    });

    return { success: true, orderId };
  } catch (error) {
    throw new Error(error.message);
  }
};