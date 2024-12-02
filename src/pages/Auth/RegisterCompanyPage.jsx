import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '@/services/authService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RegisterCompanyPage.css';

const RegisterCompanyPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '', // Campo adicional para confirmar contraseña
    company_name: '',
    phone_number: '',
    country_of_residence: '',
    is_active: true,
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordError, setPasswordError] = useState(''); // Estado para errores de validación de contraseña
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar si las contraseñas coinciden
    if (name === 'confirmPassword' || name === 'password') {
      const password = name === 'password' ? value : formData.password;
      const confirmPassword = name === 'confirmPassword' ? value : formData.confirmPassword;
      setPasswordError(password !== confirmPassword ? 'Las contraseñas no coinciden.' : '');
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validar contraseñas antes de enviar el formulario
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Las contraseñas no coinciden.');
      return;
    }

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
      <div className="register-form">
        <div className="header">
          <span>Únete hoy</span>
          <p>Registra tu empresa para acceder a los servicios.</p>
        </div>

        <p className="text-center mt-3">
          ¿Ya tienes cuenta? <Link to="/" className="text-primary">Inicia sesión aquí</Link>
        </p>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {passwordError && <p className="text-danger">{passwordError}</p>}
          <input
            type="text"
            name="company_name"
            placeholder="Nombre de la empresa"
            value={formData.company_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Teléfono"
            value={formData.phone_number}
            onChange={handleChange}
          />
          <select
            name="country_of_residence"
            value={formData.country_of_residence}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Seleccione su país</option>
            {/* Lista de países */}
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="Mexico">Mexico</option>
            {/* Añade el resto de los países */}
          </select>
          <button type="submit" className="register-btn btn-primary">Registrar Empresa</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterCompanyPage;
