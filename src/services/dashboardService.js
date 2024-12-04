const BASE_URL =  import.meta.env.VITE_API_BASE_URL + 'dashboard';

const getDashboardUrl = async (templateId, token) => {
  const response = await fetch(`${BASE_URL}/generate_dashboard_url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ template_id: templateId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error al obtener la URL del dashboard');
  }

  return response.json();
};


/**
 * Obtiene el iframe URL del dashboard para empresas.
 * @param {string} token - Token de autenticación del usuario.
 * @returns {Promise<Object>} - URL del iframe del dashboard.
 */
const getCompanyDashboard = async (token) => {
  const response = await fetch(`${BASE_URL}/generate_company_dashboard_url`, {
    method: 'GET',
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
  getDashboardUrl,
  getCompanyDashboard
};
