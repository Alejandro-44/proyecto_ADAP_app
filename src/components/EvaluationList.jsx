import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EvaluationList.css'; // Importa los estilos adicionales

const EvaluationList = ({
  title,
  evaluations,
  onEvaluationClick,
  onViewResults,
  showDeadline = false,
  showCompletionDate = false,
}) => {
  return (
    <div className="evaluation-list-container mb-4">
      <div className="evaluation-list-header">
        <h5>{title}</h5>
      </div>
      {evaluations.length > 0 ? (
        <ul className="evaluation-list">
          {evaluations.map((evaluation) => (
            <li
              key={evaluation.evaluation_id}
              className="evaluation-item d-flex justify-content-between align-items-center"
            >
              <div className="evaluation-info">
                <span className="fw-bold">{evaluation.title}</span>
                {showDeadline && evaluation.due_date && (
                  <p className="text-muted mb-0">
                    Fecha Límite: {new Date(evaluation.due_date).toLocaleDateString()}
                  </p>
                )}
                {showCompletionDate && evaluation.completion_date && (
                  <p className="text-muted mb-0">
                    Fecha de Realización: {new Date(evaluation.completion_date).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="evaluation-action">
                <button
                  className={`btn btn-${evaluation.is_completed ? 'secondary' : 'primary'} btn-sm`}
                  onClick={() =>
                    evaluation.is_completed
                      ? onViewResults(evaluation.template_id)
                      : onEvaluationClick(evaluation.evaluation_id)
                  }
                >
                  {evaluation.is_completed ? 'Ver Resultados' : 'Realizar Evaluación'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No hay evaluaciones en esta categoría.</p>
      )}
    </div>
  );
};

// Validación de props
EvaluationList.propTypes = {
  title: PropTypes.string.isRequired,
  evaluations: PropTypes.arrayOf(
    PropTypes.shape({
      evaluation_id: PropTypes.number.isRequired,
      template_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      is_completed: PropTypes.bool.isRequired,
      due_date: PropTypes.string,
      completion_date: PropTypes.string,
    })
  ).isRequired,
  onEvaluationClick: PropTypes.func.isRequired,
  onViewResults: PropTypes.func.isRequired,
  showDeadline: PropTypes.bool,
  showCompletionDate: PropTypes.bool,
};

export default EvaluationList;
