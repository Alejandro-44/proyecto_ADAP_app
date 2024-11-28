import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import employeeService from '@/services/employeeService'; // Ajustar según la estructura de tu proyecto
import CompanyEvaluationList from '@/components/CompanyEvaluationList';
import CompanyInfoCard from '@/components/CompanyInfoCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const CompanyHomePage = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [pendingEvaluations, setPendingEvaluations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('Token no encontrado. Por favor, inicie sesión.');

        const userData = await employeeService.getCurrentUserInfo(token);
        const evaluations = await employeeService.getIncompleteEvaluations(token);

        setCompanyInfo(userData.data);
        setPendingEvaluations(evaluations);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Cargando datos...</p>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Información de la compañía */}
        <div className="col-md-4">
          <CompanyInfoCard companyInfo={companyInfo} />
        </div>

        {/* Evaluaciones pendientes */}
        <div className="col-md-8">
          <CompanyEvaluationList
            evaluations={pendingEvaluations}
            onEvaluationClick={(evaluationId) => navigate(`/evaluation/${evaluationId}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyHomePage;
