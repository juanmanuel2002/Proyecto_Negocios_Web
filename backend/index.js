const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const initDatabase = require("./scripts/init-mongo");

const app = express();
app.use(express.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("MongoDB conectado");
  //initDatabase(); // Ejecutar script de inicialización
})
.catch(err => console.error(err));

// Importar rutas de autenticación
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
