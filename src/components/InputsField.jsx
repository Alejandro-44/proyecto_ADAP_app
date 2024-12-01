import PropTypes from 'prop-types';

const InputField = ({ label, type, id, name, value, onChange, placeholder, required }) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label">{label}</label>
    <input
      type={type}
      id={id}
      name={name}
      className="form-control"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

InputField.defaultProps = {
  placeholder: '',
  required: false,
};

export default InputField;
