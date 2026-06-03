import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Carrocerias from '../views/Carrocerias.vue'
import AddModelo from '../views/Add.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/carrocerias',
    name: 'carrocerias',
    component: Carrocerias
  },
  {
    path: '/add',
    name: 'add-modelo',
    component: AddModelo
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router