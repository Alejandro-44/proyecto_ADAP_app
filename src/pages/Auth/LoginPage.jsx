import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '@/services/authService';
import './LoginPage.css'; // Archivo CSS con los estilos personalizados

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
        navigate('/organization-home'); // Redirige al homepage de compañías
      } else {
        throw new Error('Tipo de usuario desconocido.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login">
      <div className="header">
        <span>¡Bienvenido de nuevo!</span>
        <p>Inicia sesión para continuar.</p>
      </div>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario o correo"
          value={formData.username}
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
        <input type="submit" value="Iniciar Sesión" />
        <span>
          ¿No tienes una cuenta? <a href="/register-company">Regístrate aquí</a>
        </span>
      </form>
    </div>
  );
};

export default LoginPage;
