<template>
  <form class="form" @submit.prevent="handleSignup">
    <label>Digite seu e-mail</label>

    <input type="email" placeholder="seu@email.com" v-model="email" required />

    <label>Digite sua senha</label>

    <input
      type="password"
      placeholder="Digite sua senha"
      v-model="password"
      required
    />

    <p class="login-link" @click="handleRoute('login')">Já tem uma conta? Clique aqui</p>
  </form>

  <button class="btn-primary" type="submit" @click="handleSignup">
    {{ loading == true ? "Criando.." : "Criar nova conta" }}
  </button>
</template>

<script setup>

import { useAuth } from "@/composables/useAuth";

const {
  email,
  password,
  loading,
  handleRoute,
  handleSignup,
} = useAuth();

</script>

<style scoped>
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
  color: #c71e25;
  font-size: 12px;
}

.btn-primary {
  margin-top: auto;
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 28px;
  background: #c71e25;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.btn-primary:active {
  background-color: #991b20;
}
</style>
