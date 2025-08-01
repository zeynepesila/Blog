<template>
  <div class="sidebar">
    <h3>Admin Panel</h3>
    <router-link to="/">🏠 Ana Sayfa</router-link> 
    <router-link to="/admin">📊 Dashboard</router-link>
    <router-link to="/admin/posts">✏️ Yazi Yönetimi</router-link>
    <router-link to="/admin/users">👥 Kullanici Yönetimi</router-link>
    <router-link to="/admin/comments">💬 Yorum Yönetimi</router-link>
  </div>
</template>

<style scoped>
.sidebar {
  width: 200px;
  height: 100vh;
  padding: 20px;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
router-link {
  text-decoration: none;
  color: #333;
}
</style>
