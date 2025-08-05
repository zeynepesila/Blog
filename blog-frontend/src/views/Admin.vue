<template>
  <div class="admin-panel">
    <h1>Admin Paneli</h1>

    <h2>Yazılar</h2>
    <div v-for="post in posts" :key="post.id" class="post">
      <h3>{{ post.title }}</h3>
      <p><em>{{ post.summary }}</em></p>

      <button @click="deletePost(post.id)">Yazıyı Sil</button>

      <div class="comments">
        <h4>Yorumlar</h4>
        <ul>
          <li v-for="comment in post.comments" :key="comment.id">
            {{ comment.authorName }}: {{ comment.content }}
            <button @click="deleteComment(comment.id)">Sil</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

const router = useRouter();
const posts = ref([]);

const fetchPosts = async () => {
  try {
    const response = await api.get('/api/posts');
    posts.value = response.data;
  } catch (error) {
    alert('Yazılar alınamadı. Lütfen tekrar deneyin.');
    console.error('Yazılar alınamadı', error);
  }
};

const deletePost = async (postId) => {
  if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return;

  try {
    await api.delete(`/api/posts/${postId}`);
    fetchPosts();
  } catch (error) {
    alert('Yazı silinemedi. Lütfen tekrar deneyin.');
    console.error('Yazı silinemedi', error);
  }
};

const deleteComment = async (commentId) => {
  if (!confirm('Bu yorumu silmek istediğinize emin misiniz?')) return;

  try {
    await api.delete(`/api/comments/${commentId}`);
    fetchPosts();
  } catch (error) {
    alert('Yorum silinemedi. Lütfen tekrar deneyin.');
    console.error('Yorum silinemedi', error);
  }
};

onMounted(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Yetkisiz erişim, lütfen giriş yapınız.');
    router.push('/');
  } else {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchPosts();
  }
});
</script>

<style scoped>
.admin-panel {
  padding: 20px;
}
.post {
  border: 1px solid #bbb;
  padding: 15px;
  margin-bottom: 25px;
  border-radius: 5px;
}
.comments {
  margin-top: 10px;
}
button {
  margin-top: 10px;
  margin-right: 10px;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
