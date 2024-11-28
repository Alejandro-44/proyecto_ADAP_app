import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Componente para renderizar una lista de evaluaciones pendientes.
 * @param {Array} evaluations - Lista de evaluaciones pendientes.
 * @param {Function} onEvaluationClick - Función a ejecutar al seleccionar una evaluación.
 */
const CompanyEvaluationList = ({ evaluations, onEvaluationClick }) => {
  return (
    <div className="card mb-4" style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <div className="card-body">
        <h5 className="card-title">Evaluaciones Pendientes por Completar</h5>
        {evaluations.length > 0 ? (
          <ul className="list-group" style={{ whiteSpace: 'nowrap' }}>
            {evaluations.map((evaluation) => (
              <li
                key={evaluation.evaluation_id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <span className="fw-bold">{evaluation.template_title}</span>
                  <p className="mb-0"><strong>Empleado:</strong> {evaluation.employee.name}</p>
                  {evaluation.due_date && (
                    <p className="text-muted mb-0">Fecha Límite: {new Date(evaluation.due_date).toLocaleDateString()}</p>
                  )}
                </div>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => onEvaluationClick(evaluation.evaluation_id)}
                >
                  Ver Evaluación
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No hay evaluaciones pendientes.</p>
        )}
      </div>
    </div>
  );
};

// Validación de props
CompanyEvaluationList.propTypes = {
  evaluations: PropTypes.arrayOf(
    PropTypes.shape({
      evaluation_id: PropTypes.number.isRequired,
      template_title: PropTypes.string.isRequired,
      employee: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      due_date: PropTypes.string,
    })
  ).isRequired,
  onEvaluationClick: PropTypes.func.isRequired,
};

export default CompanyEvaluationList;
