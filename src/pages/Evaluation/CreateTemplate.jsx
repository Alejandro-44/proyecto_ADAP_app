import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import evaluationService from '@/services/evaluationService';
import userService from '@/services/userService';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateTemplatePage = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('Token no encontrado. Por favor, inicie sesión.');

        const data = await userService.getCurrentUserInfo(token);
        setCompanyInfo(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCompanyInfo();
  }, []);

  const generateTemplateTitle = () => {
    if (!companyInfo) return '';
    const initials = companyInfo.company_name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
    const countryAbbreviation = companyInfo.country_of_residence.slice(0, 3).toUpperCase();
    const companyId = companyInfo.company_id;
    return `${initials}-${countryAbbreviation}-${companyId}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('Token no encontrado. Por favor, inicie sesión.');

      const fullTitle = `${generateTemplateTitle()}-${title}`;
      await evaluationService.createTemplate({ title: fullTitle, description }, token);

      setSuccess('Template creado exitosamente.');
      setError('');
      setTitle('');
      setDescription('');
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  const handleGoBack = () => {
    navigate('/company-home');
  };

  if (error && !companyInfo) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Crear Nuevo Template</h1>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        {/* Título del template */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Título del Template</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ingrese el título del template"
            required
          />
        </div>

        {/* Descripción del template */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ingrese una descripción para el template"
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Crear Template</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={handleGoBack}>
          Volver
        </button>
      </form>
    </div>
  );
};

export default CreateTemplatePage;
