import { db } from './setup.js';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

export const updateUserInfo = async (uid, direccion) => {
  const userRef = doc(db, 'usuarios', uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error('Usuario no encontrado');
  }

  const updateData = {};
 
  if (direccion) {
    const requiredFields = [
      'codigoPostal',
      'calle',
      'numeroInterior',
      'numeroExterior',
      'colonia',
      'delegacion',
      'pais'
    ];
    for (const field of requiredFields) {
        console.log('field', field);
      if (!direccion[field]) {
        throw new Error(`El campo "${field}" es obligatorio en la dirección`);
      }
    }
    updateData.direccion = direccion;
  }

  await updateDoc(userRef, updateData);
  return { uid, ...updateData };
};