import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Header.css';

import { Offcanvas } from 'bootstrap';

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

  const handleLinkClick = () => {
    const offcanvasElement = document.getElementById('offcanvasNavbar');
    const offcanvasInstance = Offcanvas.getInstance(offcanvasElement);
    if (offcanvasInstance) {
      offcanvasInstance.hide(); // Cierra manualmente el menú
    }
  };

  return (
    <header className="navbar navbar-expand-lg px-3 custom-header">
      {/* Nombre de la compañía */}
      <span
        className="navbar-brand fw-bold pb-3 custom-company-name"
        onClick={handleCompanyNameClick}
        style={{ cursor: 'pointer' }}
      >
        {companyName || 'Company Name'}
      </span>

      {/* Botón de colapso para dispositivos móviles */}
      <button
        className="navbar-toggler d-lg-none custom-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Menú para pantallas grandes */}
      <div className="collapse navbar-collapse d-none d-lg-flex">
        <ul className="navbar-nav me-auto">
          {routes.map((route, index) => (
            <li key={index} className="nav-item">
              <NavLink
                to={route.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active-link' : 'inactive-link'}`
                }
              >
                {route.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <button className="btn btn-danger btn-sm logout-btn" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>

      {/* Menú Offcanvas para pantallas pequeñas */}
      <div
        className="offcanvas offcanvas-start d-lg-none"
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
                    `nav-link ${isActive ? 'active-link' : 'inactive-link'}`
                  }
                  onClick={handleLinkClick}
                >
                  {route.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            className="btn btn-danger btn-sm w-100 logout-btn"
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
