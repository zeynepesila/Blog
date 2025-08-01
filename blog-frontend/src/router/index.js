import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Admin from '../views/Admin.vue'
//import Editor from '../views/Editor.vue'
//import UserHome from '../views/UserHome.vue'

// Basit JWT token süresi kontrolü için yardımcı fonksiyon
function isTokenValid(token) {
  if (!token) return false
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const exp = payload.exp
    if (!exp) return false
    // exp timestamp saniye cinsinden, Date.now() milisaniye
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
  /*{
    path: '/user',
    name: 'UserHome',
    component: UserHome,
    meta: { requiresAuth: true, role: ['user'] }
  },
  {
    path: '/editor',
    name: 'Editor',
    component: Editor,
    meta: { requiresAuth: true, role: ['editor'] }
  },*/
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true, role: ['admin'] }
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (to.meta.requiresAuth) {
    if (!token || !isTokenValid(token)) {
      // Token yok veya geçersizse login sayfasına redirect, orijinal hedefi query ile gönder
      return next({ path: '/', query: { redirect: to.fullPath } })
    }

    if (to.meta.role && !to.meta.role.includes(role)) {
      alert('Bu sayfaya erişim izniniz yok.')
      return next('/')
    }
  }

  next()
})

export default router
