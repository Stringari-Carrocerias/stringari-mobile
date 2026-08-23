<script setup>

import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
import ToastMessage from './components/layout/ToastMessage.vue';

import { useToastStore } from './stores/toast.js';

import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute()

const noRoutes = ['cadastro', 'configuracoes', 'login', 'informacoes-pessoais']

const verifyRoute = computed(() => {
  return noRoutes.includes(route.name);
})

const toastStore = useToastStore();

</script>

<template>
  <AppHeader v-if="!verifyRoute"></AppHeader>
  <ToastMessage ></ToastMessage>
  <div :style="!verifyRoute ? 'margin-top:20vw; margin-bottom:20vw' : ''">
    <router-view/>
  </div>
  <AppFooter v-if="!verifyRoute"></AppFooter>
  
</template>

<style scoped>
</style>