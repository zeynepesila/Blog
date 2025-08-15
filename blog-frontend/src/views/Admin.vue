<template>
  <div class="admin-panel">
    <h1>Admin Paneli</h1>

    <h2>Yazılar</h2>
    <div v-for="post in posts" :key="post.id" class="post">
      <h3>{{ post.title }}</h3>
      <p><em>{{ post.summary }}</em></p>

      <button @click="deletePost(post.id)">Yazıyı Sil</button>
      <button @click="editPost(post.id)">Düzenle</button>

      <div class="comments" v-if="post.comments && post.comments.length">
        <h4>Yorumlar</h4>
        <ul>
          <li v-for="comment in post.comments" :key="comment.id">
            {{ comment.authorName }}: {{ comment.content }}
            <button @click="deleteComment(comment.id, post.id)">Sil</button>
            <button @click="editComment(comment.id, post.id)">Düzenle</button>
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
const comments = ref({});
const newComment = ref({});
const loading = ref(false);
const error = ref(null);

// Tüm yazıları ve yorumları getir
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


// Yazı sil
const deletePost = async (postId) => {
  if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return;

  try {
    await api.delete(`/api/admin/posts/${postId}`);
    posts.value = posts.value.filter(post => post.id !== postId);
  } catch (error) {
    console.error('Yazı silinemedi:', error);
    alert('Yazı silinirken bir hata oluştu.');
  }
};

// Yorum sil
const deleteComment = async (commentId, postId) => {
  if (!confirm('Bu yorumu silmek istediğinize emin misiniz?')) return;

  try {
    await api.delete(`/api/admin/comments/${commentId}`);
    const post = posts.value.find(p => p.id === postId);
    if (post) {
      post.comments = post.comments.filter(comment => comment.id !== commentId);
    }
  } catch (error) {
    console.error('Yorum silinemedi:', error);
    alert('Yorum silinirken bir hata oluştu.');
  }
};

// Düzenleme yönlendirmeleri
const editPost = (postId) => router.push(`/admin/edit-post/${postId}`);
const editComment = (commentId, postId) => router.push(`/admin/edit-comment/${postId}/${commentId}`);

// Giriş kontrolü ve token ekleme
onMounted(() => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token || role !== 'ROLE_ADMIN') {
    alert('Bu sayfaya sadece yöneticiler erişebilir.');
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
