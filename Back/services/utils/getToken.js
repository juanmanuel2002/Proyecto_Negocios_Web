import jwt from 'jsonwebtoken';
import config from '../../config.js';

export const generateJWT = async (payload) => {
  try {
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
    
    return { success: true, token };
  } catch (error) {
    console.error('Error al generar el token:', error);
    return { success: false, message: error.message };
  }
};