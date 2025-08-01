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

<script>
import axios from 'axios'

export default {
  name: 'Admin',
  data() {
    return {
      posts: []
    }
  },
  mounted() {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Yetkisiz erişim, lütfen giriş yapınız.')
      this.$router.push('/')
      return
    }
    this.fetchPosts()
  },
  methods: {
    async fetchPosts() {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:8080/api/posts', {
          headers: { Authorization: `Bearer ${token}` }
        })
        this.posts = response.data
      } catch (error) {
        alert('Yazılar alınamadı. Lütfen tekrar deneyin.')
        console.error('Yazılar alınamadı', error)
      }
    },
    async deletePost(postId) {
      if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return

      try {
        const token = localStorage.getItem('token')
        await axios.delete(`http://localhost:8080/api/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        this.fetchPosts()
      } catch (error) {
        alert('Yazı silinemedi. Lütfen tekrar deneyin.')
        console.error('Yazı silinemedi', error)
      }
    },
    async deleteComment(commentId) {
      if (!confirm('Bu yorumu silmek istediğinize emin misiniz?')) return

      try {
        const token = localStorage.getItem('token')
        await axios.delete(`http://localhost:8080/api/comments/${commentId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        this.fetchPosts()
      } catch (error) {
        alert('Yorum silinemedi. Lütfen tekrar deneyin.')
        console.error('Yorum silinemedi', error)
      }
    }
  }
}
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
