const BASE_URL = 'http://localhost:8000';

/**
 * Obtiene la información del usuario actual.
 * @param {string} token - Token de autenticación del usuario.
 * @returns {Promise<Object>} - Información del usuario.
 */
const getCurrentUserInfo = async (token) => {
  const response = await fetch(`${BASE_URL}/user/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error al obtener la información del usuario');
  }

  return response.json();
};

/**
 * Obtiene la lista de evaluaciones asignadas al empleado.
 * @param {string} token - Token de autenticación del usuario.
 * @returns {Promise<Array>} - Lista de evaluaciones asignadas.
 */
const getAssignedEvaluations = async (token) => {
  const response = await fetch(`${BASE_URL}/evaluation/assigned`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error al obtener las evaluaciones asignadas');
  }

  return response.json();
};

export default {
  getCurrentUserInfo,
  getAssignedEvaluations,
};
