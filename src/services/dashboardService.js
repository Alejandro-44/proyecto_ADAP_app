const BASE_URL = 'http://localhost:8000/dashboard';

/**
 * Obtiene el iframe URL del dashboard desde el servidor.
 * @param {string} token - Token de autenticación del usuario.
 * @returns {Promise<Object>} - URL del iframe del dashboard.
 */
const getDashboard = async (token) => {
  const response = await fetch(`${BASE_URL}/get_dashboard`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error al obtener el dashboard');
  }

  return response.json();
};

export default {
  getDashboard,
};
