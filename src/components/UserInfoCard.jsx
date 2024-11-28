import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Componente para mostrar la información del usuario.
 * @param {Object} employeeInfo - Información del empleado.
 * @param {Object} companyInfo - Información de la compañía.
 */
const UserInfoCard = ({ employeeInfo, companyInfo }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Información del Usuario</h5>
        <p><strong>Nombre Completo:</strong> {employeeInfo.first_name} {employeeInfo.last_name}</p>
        <p><strong>Compañía:</strong> {companyInfo.company_name}</p>
        <p><strong>Cargo:</strong> {employeeInfo.position}</p>
        <p><strong>Profesión:</strong> {employeeInfo.profession}</p>
        <p><strong>Género:</strong> {employeeInfo.gender}</p>
        <p><strong>Nacionalidad:</strong> {employeeInfo.nationality}</p>
        <p><strong>Ciudad de Residencia:</strong> {employeeInfo.city_of_residence}</p>
      </div>
    </div>
  );
};

// Validación de props
UserInfoCard.propTypes = {
  employeeInfo: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    profession: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    city_of_residence: PropTypes.string.isRequired,
  }).isRequired,
  companyInfo: PropTypes.shape({
    company_name: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserInfoCard;
