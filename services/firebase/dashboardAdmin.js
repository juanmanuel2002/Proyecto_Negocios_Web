import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from './setup.js';

// Obtener el número total de usuarios
export const getTotalUsers = async () => {
    const usersSnapshot = await getDocs(collection(db, 'usuarios'));
    return usersSnapshot.size; // Devuelve el número total de documentos en la colección 'usuarios'
};

// Obtener el número total de órdenes
export const getTotalOrders = async () => {
    const ordersSnapshot = await getDocs(collection(db, 'pedidos'));
    return ordersSnapshot.size; // Devuelve el número total de documentos en la colección 'pedidos'
};

// Obtener las órdenes más recientes
export const getRecentOrders = async () => {
    const ordersQuery = query(collection(db, 'pedidos'), orderBy('creado', 'desc'), limit(5));
    const ordersSnapshot = await getDocs(ordersQuery);

    const recentOrders = [];
    ordersSnapshot.forEach((doc) => {
        recentOrders.push({ id: doc.id, ...doc.data() });
    });

    return recentOrders; // Devuelve las 5 órdenes más recientes
};