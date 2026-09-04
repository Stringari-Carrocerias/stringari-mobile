<template>
  <div class="container">

    <button class="back" @click="handleRoute(login)">
      <LeftFillIcon height="30px"/>
    </button>

    <img src="../assets/icons/logo.png" alt="Logo" />

    <h2>Vamos começar!</h2>

    <FormSignup />

  </div>
</template>

<script setup>

import LeftFillIcon from "@iconify-vue/mingcute/left-fill";
import FormSignup from "@/components/forms/user/FormSignup.vue";

import { useAuth } from "@/composables/useAuth";

const { handleRoute } = useAuth()

</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 24px;
}

.back {
  border: none;
  background: none;
  font-size: 24px;
  width: fit-content;
}

.container img {
  width: 132px;
  margin-top: 60px;
  margin-bottom: 48px;
  align-self: center;
}

h2 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 24px;
  font-weight: 600;
}


</style>