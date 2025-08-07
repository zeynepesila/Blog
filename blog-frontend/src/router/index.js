import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Admin from '../views/Admin.vue'
import Editor from '../views/Editor.vue'


// Token'ın geçerliliğini kontrol eden fonksiyon
function isTokenValid(token) {
  if (!token) return false
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const exp = payload.exp
    return exp * 1000 > Date.now()
  } catch {
    return false
  }
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true, role: ['ROLE_ADMIN'] } // BÜYÜK HARFLE
  },
 {
    path:'/editor',
    name:'Editor',
    component: Editor
  } 
 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const role = (localStorage.getItem('role') || '').toUpperCase();

  if (to.meta.requiresAuth) {
    if (!token || !isTokenValid(token)) {
      return next({ path: '/', query: { redirect: to.fullPath } })
    }

    if (to.meta.role && !to.meta.role.includes(role)) {
      alert('Bu sayfaya erişim yetkiniz yok.')
      return next('/')
    }
  }

  next()
})

export default router
