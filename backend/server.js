import express from 'express';
import cors from 'cors';
import { registerUser, loginUser, sendResetEmail, resetPassword } from './services/firebase/auth.js';

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint para registrar un usuario
app.post('/api/register', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const result = await registerUser(email, password, name);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint para iniciar sesión
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await loginUser(email, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint para enviar correo de restablecimiento de contraseña
app.post('/api/reset-email', async (req, res) => {
    const { email } = req.body;
    try {
        const result = await sendResetEmail(email);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint para restablecer la contraseña
app.post('/api/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        await resetPassword(token, newPassword);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});