import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dashboardService from '@/services/dashboardService';
import Loader from '@/components/Loader';
import 'bootstrap/dist/css/bootstrap.min.css';

const DashboardPage = () => {
  const { templateId } = useParams(); // Obtener el template_id de la URL
  const [iframeUrl, setIframeUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardUrl = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('Token no encontrado. Por favor, inicie sesión.');

        const response = await dashboardService.getDashboardUrl(templateId, token);
        setIframeUrl(response.iframe_url);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardUrl();
  }, [templateId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container-fluid p-0">
      <button
        className="btn btn-secondary m-3"
        onClick={() => navigate(-1)}
      >
        Volver
      </button>
      <iframe
        src={iframeUrl}
        title="Metabase Dashboard"
        style={{
          width: '100%',
          height: 'calc(100vh - 50px)',
          border: 'none',
        }}
      ></iframe>
    </div>
  );
};

export default DashboardPage;
