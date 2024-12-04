import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dashboardService from '@/services/dashboardService';
import userService from '@/services/userService';
import Header from '@/components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from '@/components/Loader';

const CompanyDashboardPage = () => {
  const [iframeUrl, setIframeUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [companyInfo, setCompanyInfo] = useState(null);
  const navigate = useNavigate();

  // Definir rutas para el header
  const companyRoutes = [
    { path: '/register-employee', label: 'Registrar Miembros' },
    { path: '/assign-evaluations', label: 'Asignar Evaluaciones' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/create-template', label: 'Crear Plantilla' },
  ];

  useEffect(() => {
    const fetchDashboardUrl = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('Token no encontrado. Por favor, inicie sesión.');

        // Obtener la información de la empresa
        const userData = await userService.getCurrentUserInfo(token);
        setCompanyInfo(userData.data);

        // Obtener el iframe del dashboard para la empresa
        const iframeData = await dashboardService.getCompanyDashboard(token);
        setIframeUrl(iframeData.iframe_url);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardUrl();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
    <div>
      <Header
        companyName={companyInfo?.company_name || 'Mi Empresa'}
        routes={companyRoutes}
        onLogout={handleLogout}
      />
      <div className="container-fluid p-0">
      {iframeUrl ? (
          <div className="iframe-container">
          <iframe
              src={iframeUrl}
              title="Company Dashboard"
              style={{
              width: '100vw',
              height: 'calc(100vh - 60px)', // Ajusta según la altura del header
              border: 'none',
              }}
              allowFullScreen
          ></iframe>
          </div>
      ) : (
          <p className="text-muted text-center">No se pudo cargar el dashboard.</p>
      )}
      </div>
    </div>
  );
};

export default CompanyDashboardPage;
