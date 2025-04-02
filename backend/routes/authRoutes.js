const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
//const Usuario = require('../models/Usuario'); // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
    try {
        const { nombre, usuario, email, password } = req.body;
        
        const existingUser = await User.findOne({ usuario });
        if (existingUser) return res.status(400).json({ message: "El usuario ya existe" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ nombre, usuario, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Usuario registrado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar usuario" });
    }
});

// Backend - Login
router.post('/login', async (req, res) => {
    try {
        const { usuario, password } = req.body;
        console.log('Usuario recibido:', usuario);  // Log para verificar el valor de 'usuario'
        
        const user = await User.findOne({ usuario });
        if (!user) {
            console.log("Usuario no encontrado");  // Log para verificar si no se encuentra el usuario
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Contraseña incorrecta");  // Log para verificar si la contraseña es incorrecta
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        //const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("Login exitoso");  // Log cuando el login es exitoso
        //res.json({ token });
    } catch (error) {
        console.error("Error en el login:", error);  // Log del error si ocurre
        res.status(500).json({ message: "Error en el login" });
    }
});


router.get('/me', async (req, res) => {
    try{
        const name = req.query.name;

        if (!name) {
            return res.status(400).json({ message: "nombre es requerido" });
        }
         // Buscar en la colección "usuarios"
         const usuario = await User.findOne({ name });

         if (!usuario) {
             return res.status(404).json({ message: "Usuario no encontrado" });
         }
 
         res.json(usuario);
    }catch (error) {
        res.status(500).json({ message: "Error al obtener usuario" });
    }
});

module.exports = router;
