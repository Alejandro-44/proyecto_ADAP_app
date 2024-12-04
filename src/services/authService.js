const BASE_URL =  import.meta.env.VITE_API_BASE_URL + '/auth'; // Cambia esto si tu API usa otro dominio o puerto

console.log(BASE_URL);
/**
 * Realiza login y obtiene el token de acceso.
 * @param {string} username - El nombre de usuario o correo.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise<Object>} - Respuesta con el token y el tipo de token.
 */
const login = async (username, password) => {
  const response = await fetch(`${BASE_URL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      username, // Debe ser el nombre de usuario enviado correctamente
      password, // Debe ser la contraseña enviada correctamente
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error al iniciar sesión');
  }

  return response.json();
};


/**
 * Registra una nueva empresa en el sistema.
 * @param {Object} companyData - Datos de la empresa.
 * @returns {Promise<Object>} - Respuesta del servidor.
 */
const registerCompany = async (companyData) => {
  const response = await fetch(`${BASE_URL}/company`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(companyData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error al registrar la empresa');
  }

  return response.json();
};

/**
 * Registra un nuevo empleado.
 * @param {Object} employeeData - Datos del empleado.
 * @param {string} token - Token de autenticación del usuario.
 * @returns {Promise<Object>} - Respuesta del servidor.
 */
const registerEmployee = async (employeeData, token) => {
  const response = await fetch(`${BASE_URL}/employee`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error al registrar el empleado');
  }

  return response.json();
};

const verifyToken = async (token) => {
  const response = await fetch(`${BASE_URL}/verify_token`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
    },
  });

  if (!response.ok) {
    throw new Error('Token inválido o expirado');
  }

  return response.json(); // { username, user_id, user_type }
};

/**
 * Accede a una ruta protegida específica para compañías.
 * @param {string} token - Token de acceso del usuario.
 * @returns {Promise<Object>} - Respuesta de la ruta protegida.
 */
const accessCompanyOnlyRoute = async (token) => {
  const response = await fetch(`${BASE_URL}/company_only_route`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`, // Agregar el token de autenticación
    },
  });

  if (!response.ok) {
    throw new Error('Acceso restringido a compañías');
  }

  return response.json(); // { message }
};

export default {
  login,
  registerCompany,
  registerEmployee,
  verifyToken,
  accessCompanyOnlyRoute,
};
