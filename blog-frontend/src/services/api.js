import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/auth/register', // Spring Boot API adresi
  withCredentials: true, 
});

export default api;
