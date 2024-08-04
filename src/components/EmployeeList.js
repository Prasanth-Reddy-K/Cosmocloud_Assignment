import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEmployees, deleteEmployee } from '../services/employeeService';
import './EmployeeList.css';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const response = await getEmployees();
        setEmployees(response.data);
    };

    const handleDelete = async (id) => {
        await deleteEmployee(id);
        fetchEmployees();
    };

    return (
        <div className="container">
            <h1>Employees</h1>
            {employees.length === 0 ? (
                <p className="no-employees">No Employees in the system</p>
            ) : (
                <ul>
                    {employees.map((employee) => (
                        <li key={employee.emp_id}>
                            {employee.name} (ID: {employee.emp_id})
                            <button className="link-button">
                                <Link to={`/employees/${employee.emp_id}`}>View</Link>
                            </button>
                            <button onClick={() => handleDelete(employee.emp_id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
            <Link to="/add">
                <button>Add Employee</button>
            </Link>
        </div>
    );
};

export default EmployeeList;
