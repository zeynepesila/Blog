calisan login ekranim:

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

const router = useRouter();

const email = ref('');
const password = ref('');

const login = async () => {
  try {
    const response = await api.post('/api/auth/login', {
      email: email.value,
      password: password.value
    });

    const { token, role } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    if (role === 'ROLE_ADMIN') {
      router.push('/admin');
    } else if (role === 'ROLE_EDITOR') {
      router.push('/editor');
    } else {
      router.push('/userhome');
    }

  } catch (error) {
    const message = error.response?.data?.message || "Giriş başarısız. Lütfen tekrar deneyin.";
    alert(message);
    console.error("Giriş hatası:", error);
  }
};
</script>


<template>
  <div class="login-container">
    <h2>LOG IN</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">E-posta:</label>
        <input id="email" type="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label for="password">Şifre:</label>
        <input id="password" type="password" v-model="password" required />
      </div>

      <button type="submit">Giriş Yap</button>
    </form>

    <p class="signup-link">
      Henüz üye değil misiniz?
      <router-link to="/signup">Kayıt Ol</router-link>
    </p>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

button {
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
}

.signup-link {
  margin-top: 10px;
}
</style>
