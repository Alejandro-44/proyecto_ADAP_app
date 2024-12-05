import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterCompanyPage from '@/pages/Auth/RegisterCompanyPage';
import LoginPage from '@/pages/Auth/LoginPage';
import CompanyHomePage from '@/pages/Home/CompanyHomePage';
import EvaluationPage from '@/pages/Evaluation/EvaluationPage';
import AssignEvaluationPage from '@/pages/Evaluation/AssignEvaluationPage';
import DashboardPage from '@/pages/Dashboard/DashboardPage';
import RegisterEmployeePage from '@/pages/Auth/RegisterEmployeePage';
import EmployeeHomePage from '@/pages/Home/EmployeeHomePage';
import CreateTemplatePage from '@/pages/Evaluation/CreateTemplate';
import CompanyDashboardPage from '@/pages/Dashboard/CompanyDashboardPage';
import AdminHomePage from '@/pages/Home/AdminHomePage';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} /> 
      <Route path="/login" element={<LoginPage />} /> 
      <Route path="/employee-home" element={<EmployeeHomePage />} />
      <Route path="/register-employee" element={<RegisterEmployeePage />} />
      <Route path="/register-company" element={<RegisterCompanyPage />} />
      <Route path="/organization-home" element={<CompanyHomePage />} />
      <Route path="/evaluation/:evaluationId" element={<EvaluationPage />} />
      <Route path="/dashboard" element={<CompanyDashboardPage />} />
      <Route path="/mydashboard/:templateId" element={<DashboardPage />} />
      <Route path="/assign-evaluations" element={<AssignEvaluationPage />} />
      <Route path="/create-template" element={<CreateTemplatePage />} />
      <Route path="/admin-home" element={<AdminHomePage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
