import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import axios from 'axios';

// Axios için temel URL'yi ayarla
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const app = createApp(App)

app.use(router)

app.mount('#app')


axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});