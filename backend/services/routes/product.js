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

export default router;