const BASE_URL = 'http://localhost:8000';

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

/**
 * Obtiene las evaluaciones incompletas de una compañía desde el API.
 * @param {string} token - El token de acceso para autenticación.
 * @returns {Promise<Array>} - Lista de evaluaciones incompletas.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
const getIncompleteEvaluations = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/incomplete`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Error al obtener las evaluaciones incompletas.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en getIncompleteEvaluations:', error.message);
    throw error;
  }
};

const deactivateEmployee = async (employeeId, token) => {
  const response = await fetch(`${BASE_URL}/user/employee/${employeeId}/deactivate`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error al desactivar el empleado.');
  }
};


export default {
  getAssignedEvaluations, getIncompleteEvaluations, deactivateEmployee
};
