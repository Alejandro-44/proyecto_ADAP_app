import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '@/services/authService';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await authService.login(formData.username, formData.password);
      localStorage.setItem('accessToken', response.access_token);

      // Verificar el tipo de usuario y redirigir
      const userInfo = await authService.verifyToken(response.access_token);

      if (userInfo.user_type === 'employee') {
        navigate('/employee-home'); // Redirige al homepage de empleados
      } else if (userInfo.user_type === 'company') {
        navigate('/organization-home'); // Redirige al homepage de compañías (si existe)
      } else {
        throw new Error('Tipo de usuario desconocido.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Inicio de Sesión</h1>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Nombre de usuario o correo:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            placeholder="Ingresa tu nombre de usuario"
            value={formData.username}
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
            placeholder="Ingresa tu contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
