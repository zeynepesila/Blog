<template>
  <div class="editor-page">
    <h2>Konu Oluştur</h2>

    <form @submit.prevent="submitPost">
      <div class="form-group">
        <label for="title">Konu Başlığı:</label>
        <input type="text" v-model="title" id="title" required />
      </div>

      <div class="form-group">
        <label for="summary">Özet:</label>
        <textarea v-model="summary" id="summary" rows="3" required></textarea>
      </div>

      <div class="form-group">
        <label for="content">Metin:</label>
        <textarea v-model="content" id="content" rows="8" required></textarea>
      </div>

      <button type="submit" class="submit-button">Yayınla</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const title = ref('')
const summary = ref('')
const content = ref('')

const submitPost = async () => {
  const token = localStorage.getItem('token')

  try {
    const response = await axios.post('http://localhost:8082/api/posts', {
      title: title.value,
      summary: summary.value,
      content: content.value
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    alert('İçerik başarıyla yayınlandı!')

    // Formu temizle
    title.value = ''
    summary.value = ''
    content.value = ''
  } catch (error) {
    console.error('Yayınlama hatası:', error)
    alert('Bir hata oluştu, lütfen tekrar deneyin.')
  }
}
</script>

<style scoped>
.editor-page {
  max-width: 800px;
  margin: auto;
  padding: 30px;
  font-family: Arial, sans-serif;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin-top: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  background-color: #2c7be5;
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.submit-button:hover {
  background-color: #1a5ec4;
}
</style>
