import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

import { 
  HomeView,
  LoginView,
  SignupView,
  ModelsView,
  AddModelView,
  PersonalInfoView,
  SettingsView,
  ModelDetailsView,
  AddBudgetView,
  CustomerView,
  AddCustomerView
} from '@/views/index.js'

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
  },
  {
    path: '/modelos/detalhes/:id',
    name: 'modelosDetalhes',
    component: ModelDetailsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/orcamentos/adicionar',
    name: 'AddBudgets',
    component: AddBudgetView,
    meta: { requiresAuth: true },
  },
  {
    path: '/clientes/',
    name: 'clientes',
    component: CustomerView,
    meta: { requiresAuth: true },
  },

  {
    path: '/clientes/adicionar',
    name: 'AddCustomer',
    component: AddCustomerView,
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