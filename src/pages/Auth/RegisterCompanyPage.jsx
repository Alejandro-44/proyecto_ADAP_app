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
            <option value="Brazil">Brazil</option>
            <option value="Argentina">Argentina</option>
            <option value="Chile">Chile</option>
            <option value="Peru">Peru</option>
            <option value="Colombia">Colombia</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Panama">Panama</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Honduras">Honduras</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Dominican Republic">Dominican Republic</option>
            <option value="Cuba">Cuba</option>
            <option value="Haiti">Haiti</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
            <option value="Barbados">Barbados</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Saint Lucia">Saint Lucia</option>
            <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
            <option value="Grenada">Grenada</option>
            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
            <option value="Belize">Belize</option>
            <option value="Guyana">Guyana</option>
            <option value="Suriname">Suriname</option>
            <option value="French Guiana">French Guiana</option>
            <option value="Bermuda">Bermuda</option>
            <option value="Spain">Spain</option>
            <option value="France">France</option>
            <option value="Germany">Germany</option>
            <option value="Italy">Italy</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Netherlands">Netherlands</option>
            <option value="Belgium">Belgium</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Sweden">Sweden</option>
            <option value="Norway">Norway</option>
            <option value="Denmark">Denmark</option>
            <option value="Finland">Finland</option>
            <option value="Poland">Poland</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Hungary">Hungary</option>
            <option value="Austria">Austria</option>
            <option value="Greece">Greece</option>
            <option value="Portugal">Portugal</option>
            <option value="Ireland">Ireland</option>
            <option value="Iceland">Iceland</option>
            <option value="Russia">Russia</option>
            <option value="Turkey">Turkey</option>
            <option value="Ukraine">Ukraine</option>
            <option value="Romania">Romania</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Serbia">Serbia</option>
            <option value="Croatia">Croatia</option>
            <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
            <option value="Montenegro">Montenegro</option>
            <option value="Albania">Albania</option>
            <option value="Macedonia">Macedonia</option>
            <option value="Kosovo">Kosovo</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Latvia">Latvia</option>

          </select>
          <button type="submit" className="register-btn btn-primary">Registrar Empresa</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterCompanyPage;
