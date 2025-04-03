const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto'); // Para generar tokens seguros
const nodemailer = require('nodemailer');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Cargar variables de entorno

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

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


// Configuración del transporter de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Usa un servicio real como Gmail, Outlook, etc.
    auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS   
    }
});

//Endpoint para enviar el correo de recuperación de contraseña usando JWT
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        // Crear un token con expiración de 1 hora
        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        // Enlace de recuperación
        const resetLink = `http://localhost:3000/reset-password/${token}`;

        // Configurar el correo
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Recuperación de contraseña",
            html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                   <a href="${resetLink}">${resetLink}</a>
                   <p>Este enlace es válido por 1 hora.</p>`
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "Correo de recuperación enviado" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al enviar el correo" });
    }
});

// Endpoint para actualizar la contraseña con el token de recuperación
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        // Verificar el token
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        // Verificar si la nueva contraseña es válida
        //if (password.length < 6) {
        //    return res.status(400).json({ message: "La nueva contraseña debe tener al menos 6 caracteres" });
        //}

        // Hashear la nueva contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Actualizar la contraseña en la base de datos
        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Contraseña actualizada correctamente" });

    } catch (error) {
        res.status(400).json({ message: "Token inválido o expirado" });
    }
});



module.exports = router;
