const BASE_URL =  import.meta.env.VITE_API_BASE_URL + '/evaluation';

/**
 * Obtiene una evaluación asignada por su ID.
 * @param {number} evaluationId - ID de la evaluación asignada.
 * @param {string} token - Token de autenticación del usuario.
 * @returns {Promise<Object>} - Detalles de la evaluación con categorías y preguntas.
 */
const getEvaluationById = async (evaluationId, token) => {
  const response = await fetch(`${BASE_URL}/get_evaluation/${evaluationId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error al obtener la evaluación');
  }

  return response.json();
};

/**
 * Enviar respuestas de una evaluación.
 * @param {number} evaluationId - ID de la evaluación asignada.
 * @param {Object[]} answers - Respuestas de las preguntas.
 * @param {string} token - Token de acceso del usuario.
 * @returns {Promise<Object>} - Respuesta del servidor.
 */
const submitAnswers = async (evaluationId, answers, token) => {
  const response = await fetch(`${BASE_URL}/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      evaluation_id: evaluationId,
      answers: answers.map(([questionId, score]) => ({
        question_id: parseInt(questionId, 10),
        score,
      })),
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error al enviar respuestas');
  }

  return response.json();
};


const getTemplates = async (token) => {
  const response = await fetch(`${BASE_URL}/templates`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error al obtener los templates.');
  }

  return response.json();
};

const assignEvaluation = async (data, token) => {
  const response = await fetch(`${BASE_URL}/assign`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error al asignar la evaluación.');
  }

  return response.json();
};

const createTemplate = async (data, token) => {
  const response = await fetch(`${BASE_URL}/template`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error al crear el template.');
  }

  return response.json();
};

export default { getEvaluationById, submitAnswers, getTemplates, assignEvaluation, createTemplate };
