import axios from 'axios';

const API_URL = 'https://free-ap-south-1.cosmocloud.io/development/api'; // Replace with the actual API URL

export const getEmployees = async () => {
    return await axios.get(`${API_URL}/employees`);
};

export const getEmployeeById = async (id) => {
    return await axios.get(`${API_URL}/employees/${id}`);
};

export const addEmployee = async (employee) => {
    return await axios.post(`${API_URL}/employees`, employee);
};

export const deleteEmployee = async (id) => {
    return await axios.delete(`${API_URL}/employees/${id}`);
};
