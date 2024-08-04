import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployeeById } from '../services/employeeService';
import './EmployeeDetails.css';

const EmployeeDetails = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        fetchEmployee();
    }, []);

    const fetchEmployee = async () => {
        const response = await getEmployeeById(id);
        setEmployee(response.data);
    };

    if (!employee) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container">
            <h1>Employee Details</h1>
            <p>Name: {employee.name}</p>
            <p>Address: {employee.address.line1}, {employee.address.city}, {employee.address.country}, {employee.address.zip}</p>
            <h2>Contact Methods</h2>
            <ul>
                {employee.contactMethods.map((method, index) => (
                    <li key={index}>{method.contact_method}: {method.value}</li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeDetails;
