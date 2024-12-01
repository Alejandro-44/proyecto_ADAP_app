import PropTypes from 'prop-types';

const EmployeeList = ({ employees, onDeactivate }) => {
  return (
    <ul className="list-group">
      {employees.map((employee) => (
        <li
          key={employee.employee_id}
          className={`list-group-item d-flex justify-content-between align-items-center ${
            employee.is_active ? '' : 'list-group-item-secondary'
          }`}
        >
          <span>
            {employee.first_name} {employee.last_name} - {employee.position}
          </span>
          {employee.is_active ? (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDeactivate(employee.employee_id)}
            >
              Desactivar
            </button>
          ) : (
            <span className="badge bg-secondary">Inactivo</span>
          )}
        </li>
      ))}
    </ul>
  );
};

EmployeeList.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      employee_id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      is_active: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDeactivate: PropTypes.func.isRequired,
};

export default EmployeeList;
