const API_URL = 'http://localhost:5000/api'; 

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        return await response.json();
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return { success: false, message: 'Error al conectar con el servidor.' };
    }
};

export const registerUser = async (email, password, name) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
        });
        return await response.json();
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return { success: false, message: 'Error al conectar con el servidor.' };
    }
};

export const sendResetEmail = async (email) => {
    try {
        const response = await fetch(`${API_URL}/reset-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        return await response.json();
    } catch (error) {
        console.error('Error al enviar correo de restablecimiento:', error);
        return { success: false, message: 'Error al conectar con el servidor.' };
    }
};

export const resetPassword = async (token, newPassword) => {
    try {
        const response = await fetch(`${API_URL}/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword }),
        });
        return await response.json();
    } catch (error) {
        console.error('Error al restablecer contraseña:', error);
        return { success: false, message: 'Error al conectar con el servidor.' };
    }
};

export const fetchProductos = async () => {
    try {
        const response = await fetch(`${API_URL}/productos`);
        const data = await response.json();
        if (response.ok) {
        return { success: true, data: data };
        } else {
        return { success: false, message: 'Error al obtener los productos' };
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
};