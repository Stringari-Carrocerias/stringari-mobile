<script setup>

import { computed } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';

const footerData = [
  {
    id: 1,
    nome: "Início",
    icon: "iconamoon:home-light",
    route: '/',
  },
  {
    id: 2,
    nome: "Modelos",
    icon: "bi:truck-flatbed",
    route: '/modelos',
  },
  {
    id: 3,
    nome: "Orçamento",
    icon: "mdi:file-document-edit-outline",
    route: '/orcamento',
  },
  {
    id: 4,
    nome: "Vagas",
    icon: "fluent:people-team-16-regular",
    route: '/vagas',
  },
];

const route = useRoute();

const currentPath = computed(() => route.path)

const paginaAtual = (path) => {
  return currentPath.value === path ? "active": "inactive";
}


</script>

<template>
  <div class="all">
    <ul v-for="rota in footerData" :key="rota.id">
      <li :class="paginaAtual(rota.route)" @click="router.push(rota.route)">
        <p style="font-size: 24px;">
          <Icon :icon="rota.icon" />
        </p>
        <p>
          {{ rota.nome }}
        </p>
      </li>
    </ul>
  </div>
</template>

<style scoped>

/* === Estilização Geral === */

.all {
  background-color: #F8F9FA;
  border-top: 1px solid red;
  position: fixed;
  bottom: 0;
  padding: 12px 24px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

ul {
  text-align: center;
}

/* === Estilização Menu de Navegação === */

li {
  padding: 10px 15px;
  border-radius: 40px;
  font-size: 16px;
}

.active {
  color: #ff0000;
  border: 1px solid #E2E8F0;
  box-sizing: border-box;
}

.inactive {
  color: #717171;
}


</style>
