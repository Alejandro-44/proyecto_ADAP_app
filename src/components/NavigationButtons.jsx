import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

const NavigationButtons = ({ onBack, onNext, isBackDisabled, isNextDisabled, isFinalStep }) => {
  return (
    <div className="d-flex justify-content-between mt-4">
      <button className="btn btn-secondary" onClick={onBack} disabled={isBackDisabled}>
        Atrás
      </button>
      <button className="btn btn-primary" onClick={onNext} disabled={isNextDisabled}>
        {isFinalStep ? 'Finalizar' : 'Siguiente'}
      </button>
    </div>
  );
};

// Definimos las PropTypes para validar las props
NavigationButtons.propTypes = {
    onBack: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    isBackDisabled: PropTypes.bool.isRequired,
    isNextDisabled: PropTypes.bool.isRequired,
    isFinalStep: PropTypes.bool.isRequired,
  };

export default NavigationButtons;
