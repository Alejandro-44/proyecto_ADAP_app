const BASE_URL = process.env.REACT_APP_API_BASE_URL; 

const registerCompany = async (data) => {
  const response = await fetch(`${BASE_URL}/company`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error al registrar la compañía');
  }

  return response.json();
};

const registerEmployee = async (data) => {
  const response = await fetch(`${BASE_URL}/employees`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error al registrar el empleado');
  }

  return response.json();
};

/**
 * Obtiene la lista de empleados asociados a la compañía autenticada.
 * @param {string} token - El token de acceso del usuario autenticado.
 * @returns {Promise<Array>} - Lista de empleados.
 */
const getEmployees = async (token) => {
  const response = await fetch(`${BASE_URL}/user/employees`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`, // Token de autenticación
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error al obtener empleados');
  }

  return response.json(); // Retorna la lista de empleados
};

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

export default { registerCompany, registerEmployee, getEmployees, getCurrentUserInfo };