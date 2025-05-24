import { doc, setDoc,getDoc, collection, query, where, getDocs, updateDoc, orderBy } from 'firebase/firestore';
import { db } from './setup.js';
import { sendEmail } from '../utils/sendEmail.js';


export const createOrder = async (uid, orderData, total) => {
  try {
    const orderId = `${Date.now()}`; // Generar un ID único para el pedido
    const userDocRef = doc(db, 'usuarios', uid);
    const fechaCreacion = new Date().toISOString(); 

    await setDoc(doc(db, 'pedidos', orderId), {
      uid, // Relacionar el pedido con el usuario
      orderData,
      total,
      estado: 'ACTIVO',
      creado: fechaCreacion
    });

    const suscripcionItem = orderData.find(item => item.nombre.includes('Suscripción'));
    if (suscripcionItem) {
      
      await updateDoc(userDocRef, {
        suscripcion: suscripcionItem.nombre 
      });
    }

    // Obtener el correo del usuario
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      throw new Error('Usuario no encontrado');
    }

    const userEmail = userDoc.data().email;
    const userName = userDoc.data().nombre;
    const userAddress = userDoc.data().direccion;
    console.log(userAddress);
    // Enviar correo de confirmación
    await sendEmail('compra',userEmail, orderData,total, orderId, fechaCreacion,userName, userAddress);

    return { success: true, orderId };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getOrdersByUserId = async (userId) => {
  try {
    const ordersRef = collection(db, 'pedidos'); 
    const q = query(ordersRef, where('uid', '==', userId), orderBy('creado', 'desc')); // Ordenar por fecha de creación
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