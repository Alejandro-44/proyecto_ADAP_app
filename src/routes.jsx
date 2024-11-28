import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterCompanyPage from '@/pages/Auth/RegisterCompanyPage';
import LoginPage from '@/pages/Auth/LoginPage';
import CompanyHomePage from '@/pages/Home/CompanyHomePage';
import EvaluationPage from '@/pages/Evaluation/EvaluationPage';
import DashboardPage from '@/pages/Dashboard/DashboardPage';
import RegisterEmployeePage from '@/pages/Auth/RegisterEmployeePage';
import EmployeeHomePage from '@/pages/Home/EmployeeHomePage';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} /> {/* Página principal */}
      <Route path="/employee-home" element={<EmployeeHomePage />} />
      <Route path="/register-employee" element={<RegisterEmployeePage />} />
      <Route path="/register-company" element={<RegisterCompanyPage />} />
      <Route path="/organization-home" element={<CompanyHomePage />} />
      <Route path="/evaluation/:evaluationId" element={<EvaluationPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
