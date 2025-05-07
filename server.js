import express from 'express';
import cors from 'cors';
import { registerUser, loginUser, sendResetEmail, resetPassword } from './services/firebase/auth.js';
import {getProductos} from './services/firebase/getProduct.js';
import { scrapePrices } from './services/utils/scraper.js'; // Importa tu función de scraping



const app = express();
app.use(cors());
app.use(express.json());

// Endpoint para registrar un usuario
app.post('/api/register', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const result = await registerUser(email, password, name);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint para iniciar sesión
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await loginUser(email, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint para enviar correo de restablecimiento de contraseña
app.post('/api/reset-email', async (req, res) => {
    const { email } = req.body;
    try {
        const result = await sendResetEmail(email);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint para restablecer la contraseña
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
  const { productName } = req.body; // Recibe el nombre del producto desde el cuerpo de la solicitud
  if (!productName) {
    return res.status(400).json({ error: 'El nombre del producto es requerido' });
  }

  try {
    const scrapedData = await scrapePrices(productName); // Llama a la función de scraping
    res.status(200).json(scrapedData);
  } catch (error) {
    res.status(500).json({ error: 'Error al realizar el scraping', details: error.message });
  }
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});