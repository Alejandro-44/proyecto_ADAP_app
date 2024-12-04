import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CompanyInfoCard.css'; // Archivo CSS personalizado

/**
 * Componente para mostrar la información de la empresa.
 * @param {Object} companyInfo - Información de la empresa.
 */
const CompanyInfoCard = ({ companyInfo }) => {
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    companyInfo.company_name
  )}&size=256&background=random`;

  return (
    <div className="company-info-card">
      <img src={avatarUrl} alt="Avatar" className="company-avatar" />
      <div className="card-body">
        <p className="card-data"><strong>Nombre:</strong> {companyInfo.company_name}</p>
        <p className="card-data"><strong>Correo:</strong> {companyInfo.email}</p>
        <p className="card-data"><strong>Teléfono:</strong> {companyInfo.phone_number}</p>
        <p className="card-data"><strong>País de Residencia:</strong> {companyInfo.country_of_residence}</p>
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
