const API_URL = 'https://proyecto-negocios-web-1.onrender.com/api'; //Servidor render
//const API_URL = 'http://localhost:5000/api'; // Para pruebas en local

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok && data.token) {
            sessionStorage.setItem('token', data.token);
            return data;
        } else {
            return { success: false, message: data.message || 'Credenciales inválidas' };
        }
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
        const token = sessionStorage.getItem('token');
        const response = await fetch(`${API_URL}/productos`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
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

export const scrapePrices = async (productName) => {
    try {
      const response = await fetch(`${API_URL}/scrape-prices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName }),
      });
  
      if (!response.ok) {
        throw new Error('Error al realizar el scraping');
      }
  
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, message: 'Error al comparar precios' };
    }
  };

export const fetchPayPalClientId = async () => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/clientPaypal`,{
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`, 
          },
      });
    if (!response.ok) {
      throw new Error(`Error en la respuesta del servidor: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.clientId) {
      throw new Error('El client-id no está presente en la respuesta del servidor');
    }

    return data.clientId;
  } catch (error) {
    console.error('Error al obtener el client-id de PayPal:', error);
    throw error;
  }
};

export const handleSearchTweets = async (query) => {
  try {
    const response = await fetch(`${API_URL}/search-tweets?query=${encodeURIComponent(query)}`);
    const tweets = await response.json();
    console.log('Tweets encontrados:', tweets);
    return tweets;
  } catch (error) {
    console.error('Error al buscar tweets:', error);
  }
};

export const createOrder = async (userId, orderData, total) => {
  try {
    const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_URL}/order`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, orderData, total }),
      });

      if (!response.ok) {
          throw new Error('Error al crear la orden');
      }

      const data = await response.json();
      return { success: true, data };
  } catch (error) {
      console.error('Error al crear la orden:', error);
      return { success: false, message: 'Error al conectar con el servidor.' };
  }
};

export const fetchPedidos = async (userId) => {
  try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_URL}/order?userId=${userId}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
            },
        });
      if (!response.ok) {
          throw new Error('Error al obtener los pedidos');
      }
      const data = await response.json();
      return { success: true, data };
  } catch (error) {
      console.error('Error en fetchPedidos:', error);
      return { success: false, message: 'No se pudieron cargar los pedidos. Inténtalo más tarde.' };
  }
};

export const fetchUserInfo = async (userId) => {
  try{
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_URL}/user?userId=${userId}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
            },
        });
    if (!response.ok) {
      throw new Error('Error al obtener los datos del usuario');
    }
    const data = await response.json();
    console.log('Datos del usuario:', data);
    return {data};
  } catch (error) {
    console.error('Error en fetchUsuario:', error);
    return { success: false, message: 'No se pudieron cargar la informacion el usuario, Inténtalo más tarde.' };
  }
}

export const deletePedido = async (pedidoId) => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/order?id=${pedidoId}`, {
      method: 'DELETE',
      headers: {
              'Authorization': `Bearer ${token}`,
          },
    });

    if (!response.ok) {
      throw new Error('Error al borrar el pedido');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error en deletePedido:', error);
    return { success: false, message: 'No se pudo borrar el pedido. Inténtalo más tarde.' };
  }
};

export const fetchAdminDashboard = async () => {
  try {
    const token = sessionStorage.getItem('token'); 
    const response = await fetch(`${API_URL}/admin-dashboard`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los datos del dashboard de administrador');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error en fetchAdminDashboard:', error);
    return { success: false, message: 'No se pudieron cargar los datos del dashboard. Inténtalo más tarde.' };
  }
};

export async function updateStockProductos(productos) {
  try {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/productos`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, },
      body: JSON.stringify(productos),
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: error.message };
  }
}