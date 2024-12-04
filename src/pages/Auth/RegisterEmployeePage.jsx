import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '@/services/authService';
import userService from '@/services/userService';
import Header from '@/components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterEmployeePage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    nationality: '',
    document_id: '',
    phone_number: '',
    gender: '',
    birth_date: '',
    city_of_residence: '',
    country_of_residence: '',
    profession: '',
    position: '',
    is_entrepreneur: false,
    entrepreneurship_name: '',
  });

  const [companyInfo, setCompanyInfo] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Definir rutas para el header
  const companyRoutes = [
    { path: '/register-employee', label: 'Registrar Empleados' },
    { path: '/assign-evaluations', label: 'Asignar Evaluaciones' },
    { path: '/create-template', label: 'Crear Plantilla' },
    { path: '/dashboard', label: 'Dashboard' },
  ];

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('Token no encontrado. Por favor, inicie sesión.');

        const userData = await userService.getCurrentUserInfo(token);
        setCompanyInfo(userData.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCompanyData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('Token no encontrado. Por favor, inicie sesión.');

      const response = await authService.registerEmployee(formData, token);
      setSuccessMessage(response.message);
      setTimeout(() => navigate('/dashboard'), 3000); // Redirige al dashboard después de 3 segundos
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // Remover token
    window.location.href = '/login'; // Redirigir al login
  };

  return (
    <div>
            {/* Header con rutas dinámicas */}
      <Header
        companyName={companyInfo?.company_name || 'Mi organizacion'}
        routes={companyRoutes}
        onLogout={handleLogout}
      />
      <h1 className="text-center mb-4 mt-4">Registro de nuevos miembros</h1>

      {error && <div className="alert alert-danger text-center">{error}</div>}
      {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}
      <div className='container mt-5'>

        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
          <div className="row g-3">
            {/* Columna izquierda */}
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Nombre de usuario:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  placeholder="Ingresa un nombre de usuario"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Correo Electrónico:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Ingresa un correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Contraseña:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Ingresa una contraseña segura"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="first_name" className="form-label">
                  Nombre:
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="form-control"
                  placeholder="Ingresa el nombre del empleado"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="last_name" className="form-label">
                  Apellidos:
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="form-control"
                  placeholder="Ingresa el apellido del empleado"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="document_id" className="form-label">
                  Documento de Identidad:
                </label>
                <input
                  type="text"
                  id="document_id"
                  name="document_id"
                  className="form-control"
                  placeholder="Ingresa el documento de identidad"
                  value={formData.document_id}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Género:
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="form-select"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Male">Masculino</option>
                  <option value="Female">Femenino</option>
                  <option value="Other">Otro</option>
                </select>
              </div>
            </div>

            {/* Columna derecha */}
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="birth_date" className="form-label">
                  Fecha de Nacimiento:
                </label>
                <input
                  type="date"
                  id="birth_date"
                  name="birth_date"
                  className="form-control"
                  value={formData.birth_date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone_number" className="form-label">
                  Teléfono:
                </label>
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  className="form-control"
                  placeholder="Ingresa el número de teléfono"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="city_of_residence" className="form-label">
                  Ciudad de Residencia:
                </label>
                <input
                  type="text"
                  id="city_of_residence"
                  name="city_of_residence"
                  className="form-control"
                  placeholder="Ingresa la ciudad de residencia"
                  value={formData.city_of_residence}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="country_of_residence" className="form-label">
                  País de Residencia:
                </label>
                <input
                  type="text"
                  id="country_of_residence"
                  name="country_of_residence"
                  className="form-control"
                  placeholder="Ingresa el país de residencia"
                  value={formData.country_of_residence}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="profession" className="form-label">
                  Profesión:
                </label>
                <input
                  type="text"
                  id="profession"
                  name="profession"
                  className="form-control"
                  placeholder="Ingresa la profesión"
                  value={formData.profession}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="position" className="form-label">
                  Posición:
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  className="form-control"
                  placeholder="Ingresa la posición del empleado"
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="is_entrepreneur" className="form-label">
                  ¿Es emprendedor?
                </label>
                <input
                  type="checkbox"
                  id="is_entrepreneur"
                  name="is_entrepreneur"
                  className="form-check-input ms-2"
                  checked={formData.is_entrepreneur}
                  onChange={handleChange}
                />
              </div>

              {formData.is_entrepreneur && (
                <div className="mb-3">
                  <label htmlFor="entrepreneurship_name" className="form-label">
                    Nombre del Emprendimiento:
                  </label>
                  <input
                    type="text"
                    id="entrepreneurship_name"
                    name="entrepreneurship_name"
                    className="form-control"
                    placeholder="Ingresa el nombre del emprendimiento"
                    value={formData.entrepreneurship_name}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Registrar nuevo miembro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterEmployeePage;
