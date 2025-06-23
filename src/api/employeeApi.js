import axios from 'axios';


const BASE_URL = 'http://localhost:8080/api/employee';

export const getAllEmployees = () => axios.get(BASE_URL);

export const getEmployeeById = (id) => axios.get(`${BASE_URL}/${id}`);
 
export const searchEmployees = (query) => {
  return axios.get(`${BASE_URL}/search?query=${encodeURIComponent(query)}`);
};

export const createEmployee = (employee) => axios.post(BASE_URL, employee);
 
export const updateEmployee = (id, employee) => axios.put(`${BASE_URL}/${id}`, employee);

export const deleteEmployee = (id) => axios.delete(`${BASE_URL}/${id}`);