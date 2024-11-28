import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

const Question = ({ question, selectedValue, onChange }) => {
  return (
    <div className="mb-3">
      <p>{question.text}</p>
      <div className="d-flex justify-content-between">
        {[1, 2, 3, 4, 5].map((value) => (
          <div key={value} className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name={`question-${question.id}`}
              value={value}
              checked={selectedValue === value}
              onChange={() => onChange(question.id, value)}
            />
            <label className="form-check-label">{value}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

// Definimos las PropTypes para validar las props
Question.propTypes = {
    question: PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    selectedValue: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  };

export default Question;
