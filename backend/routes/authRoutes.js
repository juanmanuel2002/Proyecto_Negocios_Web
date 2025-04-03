const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

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

//Login
router.post('/login', async (req, res) => {
    
    try {
        const { usuario, password } = req.body;
       
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

        console.log("Login exitoso");  // Log cuando el login es exitoso
        res.status(200).json({ message: "Login exitoso", userId: user._id });
    } catch (error) {
        console.error("Error en el login:", error);  // Log del error si ocurre
        res.status(500).json({ message: "Error en el login" });
    }
});



module.exports = router;
