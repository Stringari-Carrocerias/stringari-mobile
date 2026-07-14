<script setup>

import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute()

const noRoutes = ['cadastro', 'configuracoes', 'login', 'informacoes-pessoais']

const verifyRoute = computed(() => {
  return noRoutes.includes(route.name);
})

</script>

<template>
  <AppHeader v-if="!verifyRoute"></AppHeader>
  <div :style="!verifyRoute ? 'margin-top:20vw; margin-bottom:20vw' : ''">
    <router-view/>
  </div>
  <AppFooter v-if="!verifyRoute"></AppFooter>
       
</template>

<style scoped>
</style>