<script setup>

import AppHeader from '@/components/layout/page/AppHeader.vue';
import AppFooter from '@/components/layout/page/AppFooter.vue';
import ToastMessage from '@/components/layout/page/ToastMessage.vue';

import { useToastStore } from './stores/toast.js';

import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute()

const noRoutes = ['cadastro', 'configuracoes', 'login', 'informacoes-pessoais', 'modelosDetalhes']

const verifyRoute = computed(() => {
  return noRoutes.includes(route.name);
})

const toastStore = useToastStore();

</script>

<template>
  <AppHeader v-if="!verifyRoute"></AppHeader>
  <ToastMessage ></ToastMessage>
  <div class="main-content" :class="{ 'withLayout' : !verifyRoute}">
    <router-view/>
  </div>
  <AppFooter v-if="!verifyRoute"></AppFooter>
  
</template>

<style scoped>

.main-content {
  padding-top: 0;
  padding-bottom: 0;
}

.main-content.withLayout {
  padding-top: var(--header-height);
  padding-bottom: var(--footer-height);
}

/* ==== MOBILE ==== */

@media (max-width: 767px) {
  .main-content {
    --header-height: 19vw;
    --footer-height: 20vw;
  }
}

/* ==== DESKTOP ==== */

@media (min-width: 768px) {
  .main-content {
    --header-height: 120px;
    --footer-height: 120px;
  }
}



</style>