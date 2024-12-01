import { useEffect, useState } from 'react';
import dashboardService from '@/services/dashboardService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const DashboardPage = () => {
  const [iframeUrl, setIframeUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('Token no encontrado. Por favor, inicie sesión.');

        const response = await dashboardService.getDashboard(token);
        setIframeUrl(response.iframe_url);
      } catch (err) {
        setError(err.message);
        setTimeout(() => navigate('/login'), 3000); // Redirige a login después de 3 segundos si hay un error
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  if (loading) {
    return <div className="text-center mt-5"><p>Cargando dashboard...</p></div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Dashboard</h1>
      <div className="mt-4">
        {iframeUrl ? (
          <iframe
            src={iframeUrl}
            title="Dashboard"
            width="100%"
            height="600"
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <div className="alert alert-warning text-center">No se pudo cargar el dashboard.</div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
