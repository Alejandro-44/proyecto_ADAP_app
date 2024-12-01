import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Header.css'; // Archivo CSS adicional para estilos personalizados

const Header = ({ companyName, routes, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  const handleCompanyNameClick = (e) => {
    e.preventDefault();
    navigate('/organization-home');
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light px-3">
      {/* Nombre de la compañía */}
      <span
        className="navbar-brand"
        onClick={handleCompanyNameClick}
        style={{ cursor: 'pointer' }}
      >
        {companyName || 'Company Name'}
      </span>

      {/* Botón de colapso para dispositivos móviles */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Menú Offcanvas */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
            Menú
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {routes.map((route, index) => (
              <li key={index} className="nav-item">
                <NavLink
                  to={route.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                  data-bs-dismiss="offcanvas" // Cierra el menú al seleccionar una opción
                >
                  {route.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            className="btn btn-danger btn-sm w-100"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  companyName: PropTypes.string,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onLogout: PropTypes.func,
};

export default Header;