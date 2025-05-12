import express from 'express';
import cors from 'cors';
import { registerUser, loginUser, sendResetEmail, resetPassword } from './services/firebase/auth.js';
import {getProductos} from './services/firebase/getProduct.js';
import { scrapePrices } from './services/utils/scraper.js'; 
import config from './config.js';
import { searchTweets } from './services/utils/twitter.js'; 
import { createOrder, getOrdersByUserId} from './services/firebase/order.js';

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
        const result = await loginUser(email, password);
        res.status(200).json(result);
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
  } else {
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

app.get('/api/clientPaypal', (req, res) => {
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

    const randomTweets = getRandomElements(tweets.data, 3); // Accede a tweets.data y selecciona 3 aleatorios
    res.status(200).json(randomTweets); // Devuelve los 3 tweets seleccionados
} catch (error) {
    res.status(500).json({ error: 'Error al buscar tweets', details: error.message });
}
});


app.post('/api/order', async (req, res) => {
    const { userId, orderData, total } = req.body;
  
    if (!userId || !orderData) {
      return res.status(400).json({ error: 'El userId y los datos del pedido son requeridos' });
    }
  
    try {
      const result = await createOrder(userId, orderData, total);
      res.status(201).json(result); 
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el pedido', details: error.message });
    }
  });

  // Endpoint para obtener pedidos por userId
app.get('/api/order', async (req, res) => {
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


// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend running`);
});