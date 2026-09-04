<template>
  <form class="form" @submit.prevent="handleLogin">
    <input type="email" v-model="email" placeholder="seu@email.com" required/>

    <input type="password" v-model="password" placeholder="Digite sua senha" />

    <button type="submit" :disabled="loading" class="btn-primary">
      {{ loading ? "Entrando.." : "Entrar" }}
    </button>
  </form>
  <div class="group-btn">
    <button class="btn-outline" @click="handleRoute('cadastro')">
      Criar nova conta
    </button>
  </div>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth';

const { email, password, loading, handleRoute, handleLogin } = useAuth();

</script>

<style scoped>

.form {
  padding: 0 24px;
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
  font-weight: 500;
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 25px;
  background: #c71e25;
  color: white;
  cursor: pointer;
  margin-top: 24px;
}

.group-btn {
  width: 100%;
  padding: 0 24px;
}

.btn-outline {
  font-weight: 500;
  margin-top: 40%;
  width: 100%;
  height: 48px;
  border-radius: 25px;
  background: transparent;
  border: 1px solid #c71e25;
  color: #c71e25;
}

</style>