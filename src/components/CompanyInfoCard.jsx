import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Componente para mostrar la información de la empresa.
 * @param {Object} companyInfo - Información de la empresa.
 */
const CompanyInfoCard = ({ companyInfo }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Información de la Compañía</h5>
        <p><strong>Nombre:</strong> {companyInfo.company_name}</p>
        <p><strong>Correo:</strong> {companyInfo.email}</p>
        <p><strong>Teléfono:</strong> {companyInfo.phone_number}</p>
        <p><strong>País de Residencia:</strong> {companyInfo.country_of_residence}</p>
      </div>
    </div>
  );
};

// Validación de props
CompanyInfoCard.propTypes = {
  companyInfo: PropTypes.shape({
    company_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    country_of_residence: PropTypes.string.isRequired,
  }).isRequired,
};

export default CompanyInfoCard;
