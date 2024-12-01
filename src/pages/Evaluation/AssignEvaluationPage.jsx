import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import evaluationService from '@/services/evaluationService';
import userService from '@/services/userService';
import Header from '@/components/Header'; // Importar el Header
import 'bootstrap/dist/css/bootstrap.min.css';

const AssignEvaluationPage = () => {
  const [templates, setTemplates] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [companyInfo, setCompanyInfo] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const companyRoutes = [
    { path: '/register-employee', label: 'Registrar Empleados' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/assign-evaluations', label: 'Asignar Evaluaciones' },
    { path: '/create-template', label: 'Crear Plantilla' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('Token no encontrado. Por favor, inicie sesión.');

        const templates = await evaluationService.getTemplates(token);
        const employees = await userService.getEmployees(token);
        const userData = await userService.getCurrentUserInfo(token);

        setTemplates(templates);
        setEmployees(employees);
        setCompanyInfo(userData.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTemplate || selectedEmployees.length === 0 || !dueDate) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('Token no encontrado. Por favor, inicie sesión.');

      await evaluationService.assignEvaluation(
        {
          template_id: selectedTemplate,
          employee_ids: selectedEmployees,
          due_date: dueDate,
        },
        token
      );

      setSuccess('Evaluación asignada exitosamente.');
      setError('');
      setSelectedTemplate('');
      setSelectedEmployees([]);
      setDueDate('');
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  const handleEmployeeSelection = (employeeId) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  };

  return (
    <div>
      {/* Header con rutas dinámicas */}
      <Header
        companyName={companyInfo?.company_name || 'Mi Empresa'}
        routes={companyRoutes}
        onLogout={handleLogout}
      />

      <div className="container mt-5">
        <h1 className="text-center">Asignar Evaluación</h1>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          {/* Selección de template */}
          <div className="mb-3">
            <label htmlFor="template" className="form-label">Seleccionar Template</label>
            <select
              id="template"
              className="form-select"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              required
            >
              <option value="">Seleccione un template</option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.title}
                </option>
              ))}
            </select>
          </div>

          {/* Lista de empleados */}
          <div className="mb-3">
            <label htmlFor="employees" className="form-label">Seleccionar Empleados</label>
            <div className="border p-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {employees.map((employee) => (
                <div className="form-check" key={employee.employee_id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`employee-${employee.employee_id}`}
                    value={employee.employee_id}
                    onChange={() => handleEmployeeSelection(employee.employee_id)}
                    checked={selectedEmployees.includes(employee.employee_id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`employee-${employee.employee_id}`}
                  >
                    {employee.first_name} {employee.last_name} ({employee.email})
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Fecha límite */}
          <div className="mb-3">
            <label htmlFor="dueDate" className="form-label">Fecha Límite</label>
            <input
              type="date"
              id="dueDate"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">Asignar Evaluación</button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => navigate('/company-home')}
          >
            Volver
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignEvaluationPage;
