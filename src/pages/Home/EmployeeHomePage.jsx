import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import employeeService from '@/services/employeeService';
import userService from '@/services/userService';
import EvaluationList from '@/components/EvaluationList';
import UserInfoCard from '@/components/UserInfoCard';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        const completed = evaluations.filter((evaluation) => evaluation.is_completed);

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

  if (loading) {
    return <p className="text-center mt-5">Cargando datos...</p>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  const { employee_info: employeeInfo, company_info: companyInfo } = userInfo;

  return (
    <div className="container mt-5">
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
            onEvaluationClick={(evaluationId) => navigate(`/results/${evaluationId}`)}
            showCompletionDate
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeHomePage;
