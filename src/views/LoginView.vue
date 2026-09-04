<template>
  <div class="container">
    <img src="/src/assets/icons/logo.png" alt="Logo" class="container-logo" />

    <FormLogin />
    
    <p class="footer">
      <img src="/src/assets/icons/logo-original.png" alt="Logo" />
    </p>
  </div>
</template>

<script setup>

import FormLogin from '@/components/forms/user/FormLogin.vue';

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container-logo {
  width: 120px;
  margin-top: 120px;
  margin-bottom: 100px;
}

.footer {
  font-size: 10px;
}

.footer img {
  margin-top: 24px;
  width: 120px;
}
</style>
