import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import './Question.css'; // Asegúrate de importar el archivo CSS actualizado

const Question = ({ question, selectedValue, onChange }) => {
  return (
    <div className="question mb-4">
      {/* Contenedor responsivo */}
      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between">
        {/* Pregunta */}
        <p className="fw-bold mb-2 mb-md-0 question-text">{question.text}</p>

        {/* Opciones de respuesta */}
        <div className="radio-input radio-container d-flex flex-wrap justify-content-start justify-content-md-between">
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value} className="">
              <input
                type="radio"
                value={value}
                name={`question-${question.id}`}
                id={`question-${question.id}-${value}`}
                checked={selectedValue === value}
                onChange={() => onChange(question.id, value)}
              />
              <span>{value}</span>
            </label>
          ))}
          <span className="selection"></span>
        </div>
      </div>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  selectedValue: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default Question;
