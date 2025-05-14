import express from 'express';
import cors from 'cors';
import { registerUser, loginUser, sendResetEmail, resetPassword } from './services/firebase/auth.js';
import {getProductos} from './services/firebase/getProduct.js';
import { scrapePrices } from './services/utils/scraper.js'; 
import config from './config.js';
import { searchTweets } from './services/utils/twitter.js'; 
import { createOrder, getOrdersByUserId} from './services/firebase/order.js';
import { db } from './services/firebase/setup.js';
import { doc, getDoc } from 'firebase/firestore';
import { getUserByUid } from './services/firebase/getUser.js'; 
import { deleteOrderById } from './services/firebase/deleteOrder.js';
import jwt from 'jsonwebtoken';
import { authenticateToken } from './services/middleware/authenticateToken.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/register', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const result = await registerUser(email, password, name);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/api/login', async (req, res) => {
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
        // Generar el token JWT
        const token = jwt.sign(
          { uid: result.uid, email, name, suscripcion }, 
          config.jwtSecret, 
          { expiresIn: '1h' } 
        );

        res.status(200).json({...result, token, name, email, suscripcion });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

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
app.get('/api/search-tweets', async (req, res) => {
const { query } = req.query;
if (!query) {
    return res.status(400).json({ error: 'El parámetro "query" es requerido' });
}

try {
    const tweets = await searchTweets(query); // Obtiene los datos de la API de Twitter
    if (!tweets.data || tweets.data.length === 0) {
    return res.status(404).json({ error: 'No se encontraron tweets para la consulta proporcionada.' });
    }
    console.log(tweets.data);
    const randomTweets = getRandomElements(tweets.data, 3); // Accede a tweets.data y selecciona 3 aleatorios
    res.status(200).json(randomTweets); // Devuelve los 3 tweets seleccionados
} catch (error) {
    res.status(500).json({ error: 'Error al buscar tweets', details: error.message });
}
});


app.post('/api/order',authenticateToken, async (req, res) => {
    const { userId, orderData, total } = req.body;
  
    if (!userId || !orderData) {
      return res.status(400).json({ error: 'El userId y los datos del pedido son requeridos' });
    }
  
    try {
      const result = await createOrder(userId, orderData, total);
      if (result.success) {
        res.status(200).json(result);
      }else if (result.status === 404) {
        res.status(404).json({ error: 'No se encontraron productos' });
      }
      else {
        res.status(500).json({ error: result.message });
      }       
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el pedido', details: error.message });
    }
  });

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

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend running`);
});