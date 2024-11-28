const BASE_URL = 'http://localhost:8000/evaluation';

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


export default { getEvaluationById, submitAnswers };
