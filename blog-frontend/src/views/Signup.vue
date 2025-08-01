<template>
  <div class="signup-container">
    <h2>SIGN UP</h2>
    <form @submit.prevent="handleSignup">
     
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" required />
      </div>

      <div class="form-group">
        <label for="email">E-posta:</label>
        <input type="email" v-model="email" id="email" required />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>

      <div class="form-group">
        <label for="role">User Role:</label>
        <select v-model="role" id="role" required>
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

<script>
import axios from 'axios';

export default {
  name: 'Signup',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      role: ''
    };
  },
  methods: {
    async handleSignup() {
      try {
        await axios.post('http://localhost:8080/api/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password,
          role: this.role
        });

        alert("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.");
        this.$router.push('/');

      } catch (error) {
        const message = error.response?.data?.message || "Kayıt başarısız! Lütfen tekrar deneyin.";
        alert(message);
        console.error("Kayıt hatası:", error);
      }
    }
  }
};
</script>

<style>
.signup-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
.form-group {
  margin-bottom: 15px;
}
</style>
