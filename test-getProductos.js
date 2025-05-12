// test-getProductos.js
import 'dotenv/config';                // si usas variables de .env
import { getProductos } from './services/firebase/getProduct.js';  // o ajusta la ruta si está en src/

(async () => {
  const { success, data, message } = await getProductos();
  if (success) {
    console.log('✅ Productos encontrados:', data);
  } else {
    console.error('❌ Error al obtener productos:', message);
  }
  process.exit(success ? 0 : 1);
})();
