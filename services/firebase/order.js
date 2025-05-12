import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './setup.js';

export const createOrder = async (uid, orderData, total) => {
  try {
    const orderId = `${Date.now()}`; // Generar un ID único para el pedido
    await setDoc(doc(db, 'pedidos', orderId), {
      uid, // Relacionar el pedido con el usuario
      ...orderData,
      total,
      estado: 'ACTIVO', 
      creado: new Date().toISOString()
    });

    return { success: true, orderId };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getOrdersByUserId = async (userId) => {
  try {
    const ordersRef = collection(db, 'pedidos'); 
    const q = query(ordersRef, where('uid', '==', userId)); // Filtrar por userId
    const querySnapshot = await getDocs(q);

    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() }); // Agregar cada pedido al array
    });

    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};