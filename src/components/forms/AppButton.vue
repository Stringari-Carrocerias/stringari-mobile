<script setup>

import { useRouter } from 'vue-router';

const router = useRouter();

function handleRoute() {
  router.push({ name: 'adicionarModelo' })
}


</script>

<template>

    <button class="btn-model" @click="handleRoute">
        <p>Adicionar Modelo</p>
    </button>

</template>

<style scoped>

.btn-model {
    position: fixed;
    z-index: 900;
    width: 90%;
    height: 8%;
    bottom: 0;
    margin-bottom: 30%;
    background-color: #C71E25;
    border-style: none;
    border-radius: 16px;
    box-shadow: 0 0 3px 0 #E7E7E7;
    transition: background-color 0.2s;
}

.btn-model:active {
    background-color: #991b20;
}

p {
    font-size: 20px;
    color: #FFFFFF;
}

</style>