import PropTypes from 'prop-types';

const CheckboxField = ({ label, id, name, checked, onChange }) => (
  <div className="mb-3 form-check">
    <input
      type="checkbox"
      id={id}
      name={name}
      className="form-check-input"
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={id} className="form-check-label ms-2">{label}</label>
  </div>
);

CheckboxField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckboxField;
