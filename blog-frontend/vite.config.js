import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8082',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
},
  build: {
    sourcemap: false,
    outDir: '../demo/src/main/resources/static', 
  },
})