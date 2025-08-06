// api.js
import axios from 'axios';

const api = axios.create({
 baseURL: 'http://localhost:8082',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Giriş yapıldıysa token'ı başlığa ekle
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;
