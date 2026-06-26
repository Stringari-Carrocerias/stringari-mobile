import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

import HomeView from '@/views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import ModelsView from '../views/ModelsView.vue'
import AddModelView from '../views/AddModelView.vue'
import PersonalInfoView from '../views/PersonalInfoView.vue'
import SettingsView from '../views/SettingsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: SignupView,
  },
  {
    path: '/configuracoes',
    name: 'configuracoes',
    component: SettingsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/informacoes-pessoais',
    name: 'informacoes-pessoais',
    component: PersonalInfoView,
    meta: { requiresAuth: true },
  },
  {
    path: '/modelos',
    name: 'modelos',
    component: ModelsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/modelos/adicionar',
    name: 'adicionarModelo',
    component: AddModelView,
    meta: { requiresAuth: true },
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login' };
  }
});

export default router