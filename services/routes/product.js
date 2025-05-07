import express from 'express';
import { getProductos } from '../firebase/getProduct.js';

const router = express.Router();

// Endpoint para obtener los productos
router.get('/api/productos', async (req, res) => {
  const result = await getProductos();
  if (result.success) {
    res.status(200).json(result.data);
  } else {
    res.status(500).json({ error: result.message });
  }
});


router.post('/api/scrape-prices', async (req, res) => {
  const { productName } = req.body;

  if (!productName) {
    return res.status(400).json({ error: 'El nombre del producto es requerido' });
  }

  try {
    const results = await scrapeLaEuropea(productName);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: 'Error al hacer scraping', details: err.message });
  }
});

export default router;