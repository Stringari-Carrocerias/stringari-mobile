<template>
  <div class="container">

    <button class="back" @click="handleRoute">
      <LeftFillIcon height="30px"/>
    </button>

    <img src="/public/logo.png" alt="Logo" />

    <h2>Vamos começar!</h2>

    <form class="form" @submit.prevent="handleSignup">

      <label>Digite seu e-mail</label>

      <input
        type="email"
        placeholder="seu@email.com"
        v-model="email"
        required
      />

      <label>Digite sua senha</label>

      <input
        type="password"
        placeholder="Digite sua senha"
        v-model="password"
        required
        />

      <p class="login-link" @click="handleRoute">
        Já tem uma conta? Clique aqui
      </p>

    </form>

    <button class="btn-primary" type="submit" @click="handleSignup">
      {{ loading == true ? 'Criando..' : 'Criar nova conta' }}
    </button>

  </div>
</template>

<script setup>

import LeftFillIcon from "@iconify-vue/mingcute/left-fill";
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const loading = ref(false);

function handleRoute() {
  router.push({ name: 'login' })
}


async function handleSignup() {
  loading.value = false;
  try {
    await authStore.signup(email.value, password.value);
    router.push('/login');
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false;
  }
}

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

.form {
  width: 100%;
}

label {
  font-size: 16px;
  color: #777;
}

input {
  width: 100%;
  height: 50px;
  margin-top: 6px;
  margin-bottom: 14px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 0 12px;
  box-sizing: border-box;
  font-size: 16px;
}

.login-link {
  color: #C71E25;
  font-size: 12px;
}

.btn-primary {
  margin-top: auto;
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 28px;
  background: #C71E25;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.btn-primary:active {
  background-color: #991b20;
}


</style>