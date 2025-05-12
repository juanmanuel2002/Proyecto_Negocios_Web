import { doc, setDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from './setup.js';

export const createOrder = async (uid, orderData, total) => {
  try {
    const orderId = `${Date.now()}`; // Generar un ID único para el pedido

    
    await setDoc(doc(db, 'pedidos', orderId), {
      uid, // Relacionar el pedido con el usuario
      orderData,
      total,
      estado: 'ACTIVO',
      creado: new Date().toISOString()
    });

    const suscripcionItem = orderData.find(item => item.nombre.includes('Suscripción'));
    if (suscripcionItem) {
      
      const userDocRef = doc(db, 'usuarios', uid);
      await updateDoc(userDocRef, {
        suscripcion: suscripcionItem.nombre 
      });
    }

    return { success: true, orderId };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getOrdersByUserId = async (userId) => {
  try {
    const ordersRef = collection(db, 'pedidos'); 
    const q = query(ordersRef, where('uid', '==', userId)); 
    const querySnapshot = await getDocs(q);

    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() }); 
    });

    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};