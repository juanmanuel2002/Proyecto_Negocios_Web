const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

const uri = "mongodb://localhost:27017"; // Conexión local
const dbName = "proyecto"; // Nombre de la base de datos
const collectionName = "usuarios"; // Nombre de la colección

async function initDatabase() {
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("✅ Conectado a MongoDB");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Verificar si ya existen datos
        const count = await collection.countDocuments();
        if (count === 0) {
            console.log("📌 Insertando datos de prueba...");

            await collection.insertMany([
                {
                    nombre: "juan",
                    usuario: "admin",
                    email: "usuario1@example.com",
                    password: await bcrypt.hash("12345", 10)
                },
                {
                    nombre: "pedro",
                    usuario: "admin2",
                    email: "usuario2@example.com",
                    password: await bcrypt.hash("abcd", 10)
                }
            ]);

            console.log("✅ Datos insertados correctamente.");
        } else {
            console.log("⚠️ La colección ya tiene datos, no se insertarán duplicados.");
        }

    } catch (error) {
        console.error("❌ Error al inicializar la base de datos:", error);
    } 
}

// Ejecutar el script
initDatabase();
