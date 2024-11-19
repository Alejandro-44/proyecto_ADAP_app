import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '@/pages/Auth/LoginPage';
import DashboardHome from '@/pages/Dashboard/DashboardHome';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardHome />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
