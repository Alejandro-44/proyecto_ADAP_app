import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import employeeService from '@/services/employeeService';
import userService from '@/services/userService';
import EvaluationList from '@/components/EvaluationList';
import UserInfoCard from '@/components/UserInfoCard';
import Header from '@/components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from '@/components/Loader';
import './EmployeeHomePage.css';

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

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  const { employee_info: employeeInfo, company_info: companyInfo } = userInfo;

  return (
    <div className="d-flex flex-column min-vh-100">
    {/* Header personalizado */}
    <Header
      companyName={companyInfo?.company_name || 'Mi Empresa'}
      routes={[]} // Sin rutas en este caso
      onLogout={handleLogout}
    />
  
    <div className="container-fluid d-flex flex-column flex-grow-1 p-0">
      <div className="row flex-grow-1 g-0">
        {/* Información del usuario */}
        <div className="col-md-3 d-flex align-items-stretch p-0 border-end">
          <UserInfoCard employeeInfo={employeeInfo} companyInfo={companyInfo} />
        </div>
  
        {/* Evaluaciones */}
        <div className="col-md-9 p-0">
          {/* Contenedor de Evaluaciones Pendientes */}
          <div className="row g-0 row-bg-1">
            <div className="evaluation-container col-12 p-4">
              <div className="evaluation-container-list overflow-auto" style={{ maxHeight: '500px' }}>
                <EvaluationList
                  title="Evaluaciones Pendientes"
                  evaluations={pendingEvaluations}
                  onEvaluationClick={(evaluationId) => navigate(`/evaluation/${evaluationId}`)}
                  showDeadline
                />
              </div>
            </div>
          </div>
  
          {/* Contenedor de Evaluaciones Completadas */}
          <div className="row g-0 row-bg-2">
            <div className="evaluation-container col-12 p-4">
              <div className="evaluation-container-list overflow-auto" style={{ maxHeight: '500px' }}>
                <EvaluationList
                  title="Evaluaciones Completadas"
                  evaluations={completedEvaluations}
                  onViewResults={(templateId) => navigate(`/mydashboard/${templateId}`)}
                  showCompletionDate
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default EmployeeHomePage;