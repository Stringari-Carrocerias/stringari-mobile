<script setup>

  export default {
    name: "App"
  };

import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';

</script>

<template>
    <AppHeader></AppHeader>
      <router-view />
    <AppFooter></AppFooter>
       
</template>

<style scoped></style>