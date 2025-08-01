<template>
  <div class="login-container">
    <h2>LOG IN</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">E-posta:</label>
        <input type="email" v-model="email" id="email" required />
      </div>

      <div class="form-group">
        <label for="password">Şifre:</label>
        <input type="password" v-model="password" id="password" required />
      </div>

      <button type="submit">Giriş Yap</button>
    </form>

    <p class="signup-link">
      Henüz üye değil misiniz?
      <router-link to="/signup">Kayıt Ol</router-link>
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:8081/api/auth/login', {
          email: this.email,
          password: this.password
        });

        const { token, role } = response.data;

        // Token ve rol bilgisini localStorage'a kaydet
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        // Axios isteklerine otomatik token eklemek istersen (opsiyonel)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Role göre yönlendirme
        if (role === 'ROLE_ADMIN') {
          this.$router.push('/admin');
        } else if (role === 'ROLE_EDITOR') {
          this.$router.push('/editor');
        } else {
          this.$router.push('/userhome');
        }

      } catch (error) {
        const message = error.response?.data?.message || "Giriş başarısız. Lütfen tekrar deneyin.";
        alert(message);
        console.error("Giriş hatası:", error);
      }
    }
  }
};
</script>

<style>
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
