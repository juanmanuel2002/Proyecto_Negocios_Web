// scripts/seed.js
import { fileURLToPath } from "url";
import admin from "firebase-admin";
import fs from "fs";
import path from "path";

//Se recrea el __filename y el __dirname para poder usarlo en el script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//carga las variables .env
import dotenv from "dotenv";


// Inicializa admin apuntando al emulador
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8085";
admin.initializeApp({ projectId:  "mysterybox-666c1" });
const db = admin.firestore();

async function seed() {
  const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../database/seed/data.json")));
  for (const [col, docs] of Object.entries(data)) {
    for (const [id, doc] of Object.entries(docs)) {
      await db.collection(col).doc(id).set(doc);
      console.log(`Seeded ${col}/${id}`);
    }
  }
  console.log("🌱 Seed complete");
  process.exit(0);
}

seed().catch(console.error);
