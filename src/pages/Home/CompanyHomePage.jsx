import { useEffect, useState } from 'react';
import userService from '@/services/userService';
import employeeService from '@/services/employeeService';
import CompanyInfoCard from '@/components/CompanyInfoCard';
import EmployeeList from '@/components/EmployeeList';
import Loader from '@/components/Loader';
import SearchBar from '@/components/SearchBar';
import Header from '@/components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

const CompanyHomePage = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const companyRoutes = [
    { path: '/register-employee', label: 'Registrar Miembros' },
    { path: '/assign-evaluations', label: 'Asignar Evaluaciones' },
    { path: '/create-template', label: 'Crear Plantilla' },
    { path: '/dashboard', label: 'Dashboard' },
  ];

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('Token no encontrado. Por favor, inicie sesión.');

        const userData = await userService.getCurrentUserInfo(token);
        const employeeList = await userService.getEmployees(token);

        setCompanyInfo(userData.data);
        setEmployees(employeeList);
        setFilteredEmployees(employeeList); // Inicialmente todos los empleados
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = employees.filter((employee) =>
      `${employee.first_name} ${employee.last_name}`.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredEmployees(filtered);
  };

  const handleDeactivateEmployee = async (employeeId) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('Token no encontrado. Por favor, inicie sesión.');

      await employeeService.deactivateEmployee(employeeId, token);

      // Actualizar la lista de empleados
      const updatedEmployees = employees.map((employee) =>
        employee.employee_id === employeeId
          ? { ...employee, is_active: false }
          : employee
      );
      setEmployees(updatedEmployees);
      setFilteredEmployees(updatedEmployees);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // Remover token
    window.location.href = '/login'; // Redirigir al login
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
    {/* Header con rutas dinámicas */}
    <Header
      companyName={companyInfo.company_name}
      routes={companyRoutes}
      onLogout={handleLogout}
    />
    <div className="container-fluid d-flex flex-column flex-grow-1 p-0">
      <div className="row flex-grow-1 g-0">
        {/* Información de la compañía */}
        <div className="col-md-3 d-flex align-items-stretch p-0 border-end">
          <CompanyInfoCard companyInfo={companyInfo} />
        </div>
  
        {/* Lista de empleados con buscador */}
        <div className="col-md-9 d-flex flex-column pt-4 px-4">
          <h5 className="mb-3">Miembros de la organización</h5>
          <SearchBar onSearch={handleSearch} />
          <div className="flex-grow-1 overflow-auto">
            <EmployeeList
              employees={filteredEmployees}
              onDeactivate={handleDeactivateEmployee}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default CompanyHomePage;
