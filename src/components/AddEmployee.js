import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddEmployee.css'; // Ensure this file exists for styling

const API_URL = 'https://free-ap-south-1.cosmocloud.io/development/api/employees'; // Replace with your actual API URL
const PROJECT_ID = '66a9e28d7104b5169460164e'; // Replace with your actual project ID
const ENVIRONMENT_ID = '66a9e28d7104b5169460164f';
function AddEmployee() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState({ line1: '', city: '', country: '', zip: '' });
    const [contactMethods, setContactMethods] = useState([{ contact_method: 'EMAIL', value: '' }]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name || !address.line1 || !address.city || !address.country || !address.zip || contactMethods.some(cm => !cm.value)) {
            setError('Please fill in all required fields.');
            return;
        }

        const employeeData = {
            name,
            address,
            contactMethods
        };

        try {
            console.log('Sending request to API:', employeeData); // Log the request data
            const response = await axios.post(`${API_URL}/employees`, employeeData, {
                headers: {
                    'projectId': PROJECT_ID,
                    'environmentId': ENVIRONMENT_ID,
                    'Content-Type': 'application/json'
                }
            });
            console.log('API response:', response.data); // Log the API response
            setSuccess('Employee added successfully!');
            setError('');
            setName('');
            setAddress({ line1: '', city: '', country: '', zip: '' });
            setContactMethods([{ contact_method: 'EMAIL', value: '' }]);
            navigate('/');
        } catch (err) {
            console.error('Error response:', err.response); // Log the error response
            if (err.response && err.response.data && err.response.data.message) {
                setError(`Failed to add employee. Error: ${err.response.data.message}`);
            } else {
                setError('Failed to add employee. Please try again.');
            }
            setSuccess('');
        }
    };

    const handleContactMethodChange = (index, value) => {
        const newContactMethods = [...contactMethods];
        newContactMethods[index].value = value;
        setContactMethods(newContactMethods);
    };

    const addContactMethod = () => {
        setContactMethods([...contactMethods, { contact_method: 'EMAIL', value: '' }]);
    };

    return (
        <div className="add-employee">
            <h1>Add Employee</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <fieldset>
                    <legend>Address:</legend>
                    <label>
                        Line 1:
                        <input type="text" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} />
                    </label>
                    <label>
                        City:
                        <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                    </label>
                    <label>
                        Country:
                        <input type="text" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} />
                    </label>
                    <label>
                        Zip Code:
                        <input type="text" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} />
                    </label>
                </fieldset>
                <fieldset>
                    <legend>Contact Methods:</legend>
                    {contactMethods.map((method, index) => (
                        <div key={index}>
                            <label>
                                Method:
                                <select value={method.contact_method} onChange={(e) => {
                                    const newMethods = [...contactMethods];
                                    newMethods[index].contact_method = e.target.value;
                                    setContactMethods(newMethods);
                                }}>
                                    <option value="EMAIL">Email</option>
                                    <option value="PHONE">Phone</option>
                                </select>
                            </label>
                            <label>
                                Value:
                                <input type="text" value={method.value} onChange={(e) => handleContactMethodChange(index, e.target.value)} />
                            </label>
                        </div>
                    ))}
                    <button type="button" onClick={addContactMethod}>Add Contact Method</button>
                </fieldset>
                <button type="submit">Add Employee</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
}

export default AddEmployee;
