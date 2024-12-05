import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header'; // Importar el Header
import Loader from '@/components/Loader'; // Importar un Loader opcional
import dashboardService from '@/services/dashboardService'; // Importar el servicio
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminHomePage.css'; // Archivo CSS adicional

const AdminHomePage = () => {
  const [iframeUrl, setIframeUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardUrl = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('Token no encontrado. Por favor, inicie sesión.');

        const url = await dashboardService.getAdminDashboardUrl(token);
        setIframeUrl(url);
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
    navigate('/login'); // Redirige al login al cerrar sesión
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header con título */}
      <Header
        companyName="Admin Dashboard"
        routes={[]} // Sin rutas en este caso
        onLogout={handleLogout}
      />
      <div className="dashboard-container">
        <iframe
          src={iframeUrl}
          title="Admin Dashboard"
          style={{
            width: '100vw',
            height: 'calc(100vh - 60px)', // Ajusta según la altura del header
            border: 'none',
            }}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default AdminHomePage;
