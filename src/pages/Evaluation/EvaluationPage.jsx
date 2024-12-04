import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import evaluationService from '@/services/evaluationService';
import ProgressBar from '@/components/ProgressBar';
import Category from '@/components/Category';
import NavigationButtons from '@/components/NavigationButtons';
import 'bootstrap/dist/css/bootstrap.min.css';

const EvaluationPage = () => {
  const { evaluationId } = useParams();
  const navigate = useNavigate();
  const [evaluationData, setEvaluationData] = useState(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('Token no encontrado. Por favor, inicie sesión.');

        const data = await evaluationService.getEvaluationById(evaluationId, token);
        setEvaluationData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluation();
  }, [evaluationId]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setWarning(''); // Limpia la advertencia al responder
  };

  const handleNext = () => {
    const currentCategory = evaluationData.categories[currentCategoryIndex];
    const allAnswered = currentCategory.questions.every((q) => answers[q.id] !== undefined);

    if (!allAnswered) {
      setWarning('Por favor, responde todas las preguntas antes de continuar.');
      return;
    }

    if (currentCategoryIndex < evaluationData.categories.length - 1) {
      setCurrentCategoryIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleBack = () => {
    setWarning(''); // Limpia la advertencia al retroceder
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('Token no encontrado. Por favor, inicie sesión.');

      // Enviar las respuestas al servidor
      await evaluationService.submitAnswers(evaluationId, Object.entries(answers), token);

      navigate('/employee-home'); // Redirigir al Home
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoHome = () => {
    navigate('/employee-home');
  };

  if (loading) return <p className="text-center mt-5">Cargando evaluación...</p>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  const currentCategory = evaluationData.categories[currentCategoryIndex];

  // Calcular progreso basado en preguntas respondidas
  const totalQuestions = evaluationData.categories.reduce(
    (total, category) => total + category.questions.length,
    0
  );
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center">{evaluationData.title}</h1>

      {/* Barra de progreso */}
      <ProgressBar progress={progress} />

      {/* Advertencia si no se han respondido todas las preguntas */}
      {warning && <div className="alert alert-warning text-center mt-3">{warning}</div>}

      {/* Categoría actual */}
      <Category
        category={currentCategory}
        answers={answers}
        onAnswerChange={handleAnswerChange}
      />

      {/* Botones de navegación */}
      <NavigationButtons
        onBack={handleBack}
        onNext={currentCategoryIndex < evaluationData.categories.length - 1 ? handleNext : handleSubmit}
        isBackDisabled={currentCategoryIndex === 0}
        isNextDisabled={false} // No está deshabilitado porque validamos dentro de handleNext
        isFinalStep={currentCategoryIndex === evaluationData.categories.length - 1}
      />

      {/* Botón para regresar al homepage */}
      <div className="text-center mt-4">
        <button className="btn btn-outline-primary" onClick={handleGoHome}>
          Volver al Home
        </button>
      </div>
    </div>
  );
};

export default EvaluationPage;
