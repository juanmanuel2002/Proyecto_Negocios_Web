const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/proyecto';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Conectado a MongoDB con Mongoose"))
  .catch(err => console.error("❌ Error al conectar a MongoDB:", err));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
