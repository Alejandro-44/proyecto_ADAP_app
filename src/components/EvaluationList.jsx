import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EvaluationList.css'; // Importa los estilos adicionales

/**
 * Componente para renderizar una lista de evaluaciones.
 * @param {string} title - Título de la lista.
 * @param {Array} evaluations - Lista de evaluaciones.
 * @param {Function} onEvaluationClick - Función a ejecutar al seleccionar una evaluación.
 * @param {boolean} showDeadline - Indica si se debe mostrar la fecha límite.
 * @param {boolean} showCompletionDate - Indica si se debe mostrar la fecha de realización.
 */
const EvaluationList = ({
  title,
  evaluations,
  onEvaluationClick,
  showDeadline = false,
  showCompletionDate = false,
}) => {
  return (
    <div className="card mb-4" style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {evaluations.length > 0 ? (
          <ul className="list-group">
            {evaluations.map((evaluation) => (
              <li
                key={evaluation.evaluation_id}
                className="list-group-item evaluation-item"
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
                    className="btn btn-primary btn-sm w-100"
                    onClick={() => onEvaluationClick(evaluation.evaluation_id)}
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
    </div>
  );
};

// Validación de props
EvaluationList.propTypes = {
  title: PropTypes.string.isRequired,
  evaluations: PropTypes.arrayOf(
    PropTypes.shape({
      evaluation_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      is_completed: PropTypes.bool.isRequired,
      due_date: PropTypes.string,
      completion_date: PropTypes.string,
    })
  ).isRequired,
  onEvaluationClick: PropTypes.func.isRequired,
  showDeadline: PropTypes.bool,
  showCompletionDate: PropTypes.bool,
};

export default EvaluationList;
