<template>
  <div class="container">
    <img src="/logo.png" alt="Logo" class="container-logo" />

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
        {{ loading ? "Entrando.." : "Entrar" }}
      </button>
    </form>
    <div class="group-btn">
      <button class="btn-outline" @click="handleRoute()">
        Criar nova conta
      </button>
    </div>

    <p class="footer">
      <img src="/logo-original.png" alt="Logo" />
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useToastStore } from "@/stores/toast";

const toast = useToastStore();

const router = useRouter();
const authStore = useAuthStore();

function handleRoute() {
  router.push({ name: "cadastro" });
}

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const loading = ref(false);

async function handleLogin() {
  loading.value = true;
  errorMessage.value = "";
  try {
    await authStore.login(email.value, password.value);
    toast.showToast('Login realizado com sucesso.')
    router.push("/");
  } catch (error) {
    toast.showToast('Erro ao realizar login.', 'error')
  } finally {
    loading.value = false;
  }
}
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

.footer {
  font-size: 10px;
}

.footer img {
  margin-top: 24px;
  width: 120px;
}
</style>
