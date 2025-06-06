import express from 'express';
import cors from 'cors';
import config from './config.js';
import jwt from 'jsonwebtoken';
import { registerUser, loginUser, sendResetEmail, resetPassword } from './services/firebase/auth.js';
import {getProductos} from './services/firebase/getProduct.js';
import { addProductos } from './services/firebase/addProduct.js';
import { deleteProducto } from './services/firebase/deleteProduct.js';
import { scrapePrices } from './services/utils/scraper.js'; 
import { searchTweets } from './services/utils/twitter.js'; 
import { createOrder, getOrdersByUserId} from './services/firebase/order.js';
import { db } from './services/firebase/setup.js';
import { doc, getDoc } from 'firebase/firestore';
import { getUserByUid } from './services/firebase/getUser.js'; 
import { updateUserInfo } from './services/firebase/updateUser.js'; 
import { deleteOrderById } from './services/firebase/deleteOrder.js';
import { authenticateToken } from './services/middleware/authenticateToken.js';
import { authorizeRole } from './services/middleware/authorizeRole.js';
import { getTotalUsers, getTotalOrders, getRecentOrders } from './services/firebase/dashboardAdmin.js';
import { body, query, validationResult } from 'express-validator';
import { generateJWT } from './services/utils/getToken.js'; 

const app = express();
app.use(cors());
app.use(express.json());

app.post(
  '/api/register',
  [
    body('email').isEmail().withMessage('Debe ser un correo válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password, name } = req.body;
    registerUser(email, password, name)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json({ success: false, message: error.message }));
  }
);

app.post(
    '/api/login',
    [
      // Validar que el email sea válido
      body('email').isEmail().withMessage('Debe ser un correo válido'),
      // Validar que la contraseña no esté vacía
      body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { email, password } = req.body;
      try {
          // Realiza el login y obtiene el uid
          const result = await loginUser(email, password);

          if (!result.success) {
              return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
          }

          const userDocRef = doc(db, 'usuarios', result.uid); 
          const userDoc = await getDoc(userDocRef); 


          if (!userDoc.exists) {
              return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
          }

          const userData = userDoc.data();
          const name = userData.nombre;
          const suscripcion = userData.suscripcion || null;
          const role = userData.role || 'user'; 
          // Generar el token JWT
          const token = jwt.sign(
            { uid: result.uid, email, name, suscripcion, role }, 
            config.jwtSecret, 
            { expiresIn: '1h' } 
          );

          res.status(200).json({...result, token, name, email, suscripcion, role});
      } catch (error) {
          res.status(500).json({ success: false, message: error.message });
      }
  }
);

app.post('/api/reset-email', async (req, res) => {
    const { email } = req.body;
    try {
        const result = await sendResetEmail(email);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/api/reset-password', async (res) => {
    const { token, newPassword } = req.body;
    try {
        await resetPassword(token, newPassword);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/api/productos', async (req,res) => {
  const result = await getProductos();
  if (result.success) {
    res.status(200).json(result.data);
  }else if(result.status === 404) {
    res.status(404).json({ error: 'No se encontraron productos' });
  }else {
    res.status(500).json({ error: result.message });
  }
});

app.post('/api/productos',authenticateToken, async (req, res) => {
  const result = await addProductos(req.body);
  if (result.success) {
    res.status(201).json({ message: 'Producto agregado correctamente' });
  }else {
    res.status(result.status || 500).json({ error: result.message });
  }
});

app.delete('/api/productos',authenticateToken,authorizeRole('admin'), async (req, res) => {
  const result = await deleteProducto(req.body.id);
  if (result.success) {
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  }else if(result.status === 404) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }else {
    res.status(result.status || 500).json({ error: result.message });
  }
});

app.post('/api/scrape-prices', async (req, res) => {
  const { productName } = req.body; 
  if (!productName) {
    return res.status(400).json({ error: 'El nombre del producto es requerido' });
  }

  try {
    const scrapedData = await scrapePrices(productName); 
    res.status(200).json(scrapedData);
  } catch (error) {
    res.status(500).json({ error: 'Error al realizar el scraping', details: error.message });
  }
});

app.get('/api/clientPaypal',authenticateToken, (req, res) => {
    res.status(200).json({ clientId: config.paypal.paypalClientId });
});

// Función para seleccionar elementos aleatorios
const getRandomElements = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random()); 
    return shuffled.slice(0, count); 
  };
  
// Endpoint para buscar tweets
app.get(
  '/api/search-tweets',
  [
    query('query').notEmpty().withMessage('El parámetro "query" es obligatorio'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { query } = req.query;

    try {
      const tweets = await searchTweets(query);
      
      if (!tweets.data || tweets.data.length === 0) {
        return res.status(404).json({ error: 'No se encontraron tweets para la consulta proporcionada.' });
      }

      const randomTweets = getRandomElements(tweets.data, 3); 
      res.status(200).json(randomTweets);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

app.post(
  '/api/order',
  authenticateToken,
  [
    body('userId').notEmpty().withMessage('El userId es obligatorio'),
    body('orderData').isArray({ min: 1 }).withMessage('Debe proporcionar al menos un producto en orderData'),
    body('total').isNumeric().withMessage('El total debe ser un número'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { userId, orderData, total } = req.body;
    try {
      const result = await createOrder(userId, orderData, total);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

  // Endpoint para obtener pedidos por userId
app.get('/api/order',authenticateToken, async (req, res) => {
    const { userId } = req.query;
  
    if (!userId) {
      return res.status(400).json({ error: 'El parámetro "userId" es requerido' });
    }
  
    try {
      const orders = await getOrdersByUserId(userId); 
      if (orders.length === 0) {
        return res.status(404).json({ error: 'No se encontraron pedidos para el usuario proporcionado.' });
      }
      res.status(200).json(orders); 
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los pedidos', details: error.message });
    }
  });

  // Endpoint para obtener información de un usuario por uid
app.get('/api/user',authenticateToken, async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'El parámetro "userId" es requerido' });
    }

    try {
        const userData = await getUserByUid(userId);
        res.status(200).json(userData); 
    } catch (error) {
        if (error.message === 'Usuario no encontrado') {
            return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: 'Error al obtener la información del usuario', details: error.message });
        }
    
});

app.put(
  '/api/user',
  authenticateToken,
  [
    body('uid').notEmpty().withMessage('El uid es obligatorio'),
    body('name').optional().isString().withMessage('El nombre debe ser un texto'),
    body('direccion').optional().isObject().withMessage('La dirección debe ser un objeto'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { uid, direccion } = req.body;
    try {
      const result = await updateUserInfo(uid, direccion);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// Endpoint para borrar una orden por id
app.delete('/api/order',authenticateToken, async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'El parámetro "id" es requerido' });
    }

    try {
        const result = await deleteOrderById(id); 
        res.status(200).json(result); 
    } catch (error) {
        if (error.message === 'La orden no existe') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error al eliminar la orden', details: error.message });
    }
});

// Endpoint para el dashboard de administrador
app.get('/api/admin-dashboard', authenticateToken, authorizeRole('admin'), async (req, res) => {
    try {
        // Información relevante para el administrador
        const totalUsers = await getTotalUsers(); 
        const totalOrders = await getTotalOrders(); 
        const recentOrders = await getRecentOrders(); 

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalOrders,
                recentOrders,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener datos del dashboard', details: error.message });
    }
});

app.post('/api/token', async (req, res) => {
  const { uid, email, role } = req.body;

  if (!uid || !email) {
    return res.status(400).json({ error: 'uid y email son requeridos' });
  }

  const payload = {
    uid,
    email,
    role: role || 'usuario',
  };

  const result = await generateJWT(payload);

  if (result.success) {
    res.status(200).json({ token: result.token });
  } else {
    res.status(500).json({ error: result.message });
  }
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend running`);
});