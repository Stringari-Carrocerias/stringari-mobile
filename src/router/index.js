import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Carrocerias from '../views/Carrocerias.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/carrocerias', 
      name: 'carrocerias',
      component: Carrocerias,
    },
  ],
})

export default router