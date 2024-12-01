import PropTypes from 'prop-types';

const SearchBar = ({ onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar empleado por nombre..."
        onChange={handleInputChange}
      />
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
