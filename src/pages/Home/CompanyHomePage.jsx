import { useEffect, useState } from 'react';
import userService from '@/services/userService';
import employeeService from '@/services/employeeService';
import CompanyInfoCard from '@/components/CompanyInfoCard';
import EmployeeList from '@/components/EmployeeList';
import SearchBar from '@/components/SearchBar';
import Header from '@/components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

const CompanyHomePage = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Definir rutas para el header
  const companyRoutes = [
    { path: '/register-employee', label: 'Registrar Empleados' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/assign-evaluations', label: 'Asignar Evaluaciones' },
    { path: '/create-template', label: 'Crear Plantilla' },
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
    return <p className="text-center mt-5">Cargando datos...</p>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
    <div>
      {/* Header con rutas dinámicas */}
      <Header
        companyName={companyInfo.company_name}
        routes={companyRoutes}
        onLogout={handleLogout}
      />
      <div className="container mt-4">
        <div className="row">
          {/* Información de la compañía */}
          <div className="col-md-4">
            <CompanyInfoCard companyInfo={companyInfo} />
          </div>

          {/* Lista de empleados con buscador */}
          <div className="col-md-8">
            <h5 className="mb-3">Empleados de la Empresa</h5>
            <SearchBar onSearch={handleSearch} />
            <EmployeeList
              employees={filteredEmployees}
              onDeactivate={handleDeactivateEmployee}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHomePage;
