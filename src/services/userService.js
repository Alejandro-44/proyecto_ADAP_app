const BASE_URL = 'http://localhost:8000'; // Cambia esto por el URL base de tu API

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

export default { registerCompany, registerEmployee, getEmployees };