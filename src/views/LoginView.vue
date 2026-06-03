<template>
  <div class="container">
    <img src="/logo.png" alt="Logo" />

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    <form class="form" @submit.prevent="handleLogin">
      <input
        type="email"
        v-model="email"
        placeholder="seu@email.com"
        required
      />

      <input
        type="password"
        v-model="password"
        placeholder="Digite sua senha"
        required
      />

      <button type="submit" :disabled="loading" class="btn-primary">
        {{ loading ? 'Entrando..' : 'Entrar' }}
      </button>
    </form>

    <button class="btn-outline" @click="handleRoute()">
      Criar nova conta
    </button>

    <p class="footer">
    <img src="/logo-original.png" alt="Logo" />
    </p>
  </div>
</template>

<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

function handleRoute() {
  router.push({ name: 'cadastro' })
}

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const loading = ref(false);

async function handleLogin() {
  loading.value = true;
  errorMessage.value = '';
  try {
    await authStore.login(email.value, password.value);
    console.log('passou aqui')
    router.push('/');
  } catch (err) {
    console.error()
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
  align-items: center;
  padding: 40px 24px;
}

.footer img {
  width: 100px;
}

.container img {
  width: 120px;
  margin-top: 60px;
  margin-bottom: 100px;
}

.form {
  width: 100%;
  max-width: 320px;
}

input {
  width: 100%;
  height: 45px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0 12px;
  box-sizing: border-box;
}

.btn-primary {
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 25px;
  background: #ff2a0a;
  color: white;
  cursor: pointer;
}

.btn-outline {
  margin-top: 140px;
  width: 100%;
  max-width: 320px;
  height: 48px;
  border-radius: 25px;
  background: transparent;
  border: 1px solid #ff2a0a;
  color: #ff2a0a;
  margin-bottom: 20px;
}

.footer {
  font-size: 10px;
}
</style>