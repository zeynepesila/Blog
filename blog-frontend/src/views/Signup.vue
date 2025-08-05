<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api'; // axios instance

const router = useRouter();

const username = ref('');
const email = ref('');
const password = ref('');
const role = ref('');

const handleSignup = async () => {
  try {
    await api.post('/api/auth/register', {
      username: username.value,
      email: email.value,
      password: password.value,
      role: role.value
    });

    alert('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.');
    router.push('/');

  } catch (error) {
    const message = error.response?.data?.message || 'Kayıt başarısız! Lütfen tekrar deneyin.';
    alert(message);
    console.error('Kayıt hatası:', error);
  }
};
</script>

<template>
  <div class="signup-container">
    <h2>SIGN UP</h2>
    <form @submit.prevent="handleSignup">
      <div class="form-group">
        <label for="username">Username:</label>
        <input id="username" v-model="username" type="text" required />
      </div>

      <div class="form-group">
        <label for="email">E-posta:</label>
        <input id="email" v-model="email" type="email" required />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" required />
      </div>

      <div class="form-group">
        <label for="role">User Role:</label>
        <select id="role" v-model="role" required>
          <option value="" disabled>Choose Role</option>
          <option value="ROLE_USER">Normal User</option>
          <option value="ROLE_EDITOR">Editor</option>
        </select>
      </div>

      <button type="submit">Sign up</button>
    </form>

    <p class="login-link">
      Do you already have an account?
      <router-link to="/">Sign in</router-link>
    </p>
  </div>
</template>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

button {
  padding: 8px 16px;
  background-color: #2ecc71;
  color: white;
  border: none;
  cursor: pointer;
}

.login-link {
  margin-top: 10px;
}
</style>

