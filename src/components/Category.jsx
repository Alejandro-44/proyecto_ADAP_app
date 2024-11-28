import Question from '@/components/Question';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const Category = ({ category, answers, onAnswerChange }) => {
  return (
    <div>
      <h4 className="text-center">{category.name}</h4>
      <div className="mt-4">
        {category.questions.map((question) => (
          <Question
            key={question.id}
            question={question}
            selectedValue={answers[question.id]}
            onChange={onAnswerChange}
          />
        ))}
      </div>
    </div>
  );
};

// Definimos las PropTypes para validar las props
Category.propTypes = {
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
      questions: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          text: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
    answers: PropTypes.object.isRequired,
    onAnswerChange: PropTypes.func.isRequired,
  };

export default Category;
