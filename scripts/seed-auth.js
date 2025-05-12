// scripts/seed-auth.js
import dotenv from 'dotenv';
dotenv.config();

import admin from 'firebase-admin';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// Apunta al emulator de Auth
process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';

// Inicializa Admin (no necesitas credenciales reales para el emulador)
admin.initializeApp({ projectId:  "mysterybox-666c1" });

async function seedAuth() {
  // Ejemplo: lee usuarios desde JSON (opcional)
  const users = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../database/seed/auth.json'), 'utf8')
  );
  for (const u of users) {
    try {
      await admin.auth().createUser({
        uid: u.uid,
        email: u.email,
        password: u.password,
        displayName: u.displayName
      });
      console.log(`Auth seed: creado ${u.email}`);
    } catch (e) {
      console.warn(`Auth seed: ${u.email} pudo ya existir`);
    }
  }
  process.exit(0);
}

seedAuth().catch(e => {
  console.error(e);
  process.exit(1);
});
