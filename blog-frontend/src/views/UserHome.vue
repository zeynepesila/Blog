<script setup>
import { ref, onMounted } from 'vue';
import api from 'axios';

const posts = ref([]);
const comments = ref({});
const newComment = ref({});
const loading = ref(false);
const error = ref(null);

const fetchPosts = async () => {
  try {
    loading.value = true;
    const response = await api.get('http://localhost:8082/api/posts');
    posts.value = response.data;
    loading.value = false;
  } catch (err) {
    error.value = 'Postlar yüklenirken hata oluştu';
    loading.value = false;
  }
};

const fetchComments = async (postId) => {
  try {
    const response = await api.get(`/api/posts/${postId}/comments`);
    comments.value[postId] = response.data;
  } catch (err) {
    console.error('Yorumlar yüklenemedi:', err);
  }
};

const addComment = async (postId) => {
  if (!newComment.value[postId]) return;
  try {
    await api.post(`/api/posts/${postId}/comments`, {
      content: newComment.value[postId]
    });
    newComment.value[postId] = '';
    fetchComments(postId); // Yorum listesi güncellensin
  } catch (err) {
    console.error('Yorum eklenemedi:', err);
  }
};

onMounted(() => {
  fetchPosts();
});
</script>

<template>
  <div>
    <h1>Kullanıcı Anasayfa</h1>

    <div v-if="loading">Yükleniyor...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-for="post in posts" :key="post.postId" class="post">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>

      <!-- Yorumları yükle -->
      <button @click="fetchComments(post.postId)">Yorumları Göster</button>

      <!-- Yorum listesi -->
      <div v-if="comments[post.postId]">
        <h4>Yorumlar:</h4>
        <ul>
          <li v-for="c in comments[post.postId]" :key="c.commentId">{{ c.content }}</li>
        </ul>
      </div>

      <!-- Yorum ekleme -->
      <div>
        <input
          v-model="newComment[post.postId]"
          placeholder="Yorum yaz..."
        />
        <button @click="addComment(post.postId)">Gönder</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 20px;
}
.error {
  color: red;
}
</style>