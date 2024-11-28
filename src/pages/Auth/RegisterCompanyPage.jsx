import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '@/services/authService';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterCompanyPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    company_name: '',
    phone_number: '',
    country_of_residence: '',
    is_active: true,
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const response = await authService.registerCompany(formData);
      setSuccessMessage(response.message);
      setTimeout(() => navigate('/'), 3000); // Redirige al login después de 3 segundos
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Registro de Empresa</h1>

      {error && <div className="alert alert-danger text-center">{error}</div>}
      {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
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
            placeholder="Ingresa tu correo"
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
          <label htmlFor="company_name" className="form-label">
            Nombre de la empresa:
          </label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            className="form-control"
            placeholder="Ingresa el nombre de la empresa"
            value={formData.company_name}
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
          <label htmlFor="country_of_residence" className="form-label">
            País de residencia:
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

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="is_active"
            name="is_active"
            checked={formData.is_active}
            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
          />
          <label className="form-check-label" htmlFor="is_active">
            Activo
          </label>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Registrar Empresa
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterCompanyPage;
