// test-login.js
import 'dotenv/config';          // si usas .env
import { login } from './services/firebase/setup.js';

(async () => {
  try {
    const user = await login('test@example.com', '123456');
    console.log('✅ Login OK:', {
      uid: user.uid,
      email: user.email
    });
    process.exit(0);
  } catch {
    console.error('❌ Login falló');
    process.exit(1);
  }
})();
