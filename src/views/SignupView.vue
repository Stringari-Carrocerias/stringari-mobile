<template>
  <div class="container">

    <button class="back" @click="handleRoute">
      <LeftFillIcon height="30px"/>
    </button>

    <img src="/logo.png" alt="Logo" />

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
  background: #efefef;
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
  width: 120px;
  margin-top: 60px;
  margin-bottom: 100px;
  align-self: center;
}

h2 {
  text-align: center;
  margin-bottom: 40px;
}

.form {
  width: 100%;
}

label {
  font-size: 12px;
  color: #777;
}

input {
  width: 100%;
  height: 45px;
  margin-top: 6px;
  margin-bottom: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  padding: 0 12px;
  box-sizing: border-box;
}

.login-link {
  color: #ff2a0a;
  font-size: 11px;
}

.btn-primary {
  margin-top: auto;
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 25px;
  background: #ff2a0a;
  color: white;
  cursor: pointer;
}
</style>