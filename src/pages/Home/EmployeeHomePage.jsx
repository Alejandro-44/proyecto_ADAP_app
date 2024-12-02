import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import employeeService from '@/services/employeeService';
import userService from '@/services/userService';
import EvaluationList from '@/components/EvaluationList';
import UserInfoCard from '@/components/UserInfoCard';
import Header from '@/components/Header'; // Importar el componente Header
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from '../../components/Loader';

const EmployeeHomePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [pendingEvaluations, setPendingEvaluations] = useState([]);
  const [completedEvaluations, setCompletedEvaluations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('Token no encontrado. Por favor, inicie sesión.');

        const userData = await userService.getCurrentUserInfo(token);
        const evaluations = await employeeService.getAssignedEvaluations(token);

        const pending = evaluations.filter((evaluation) => !evaluation.is_completed);
        const completed = evaluations
          .filter((evaluation) => evaluation.is_completed)
          .sort((a, b) => new Date(b.completion_date) - new Date(a.completion_date)); // Ordenar por fecha más reciente

        setUserInfo(userData.data);
        setPendingEvaluations(pending);
        setCompletedEvaluations(completed);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login'); // Redirige al login al cerrar sesión
  };

  const handleViewResults = (templateId) => {
    // Redirige a la página del dashboard con el templateId como parámetro
    navigate(`/mydashboard/${templateId}`);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  const { employee_info: employeeInfo, company_info: companyInfo } = userInfo;

  return (
    <div>
      {/* Header personalizado */}
      <Header
        companyName={companyInfo?.company_name || 'Mi Empresa'}
        routes={[]} // Sin rutas en este caso
        onLogout={handleLogout}
      />

      <div className="container-fluid">
        <div className="row">
          {/* Información del usuario */}
          <div className="col-md-4">
            <UserInfoCard employeeInfo={employeeInfo} companyInfo={companyInfo} />
          </div>

          {/* Evaluaciones */}
          <div className="col-md-8">
            <EvaluationList
              title="Evaluaciones Pendientes"
              evaluations={pendingEvaluations}
              onEvaluationClick={(evaluationId) => navigate(`/evaluation/${evaluationId}`)}
              showDeadline
            />
            <EvaluationList
              title="Evaluaciones Completadas"
              evaluations={completedEvaluations}
              onEvaluationClick={(evaluationId) => navigate(`/mydashboard/${evaluationId}`)}
              onViewResults={handleViewResults} // Pasar la nueva función
              showCompletionDate
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHomePage;
