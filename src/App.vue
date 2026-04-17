<script setup>
// import { onMounted } from "vue";
// import { useCarroceriasStore } from "./stores/carroceria";

import AppHeader from './components/layout/AppHeader.vue';

// import { onMounted } from 'vue'
// import { useCarroceriasStore } from './stores/carroceria';

// const store = useCarroceriasStore()
// const urlImage = import.meta.env.VITE_API_BASE_URL;

// onMounted(() => {
//   store.fetchCarrocerias();
// });

// const handleImage = (carroceria) => {
//     const imagem = urlImage + carroceria
//     return imagem
// }



</script>

<template>
    <AppHeader></AppHeader>

    <!-- <ul>
        <li v-for="carroceria in store.carrocerias">
            <p>
                {{ carroceria.nome }}
        <img :src="handleImage(carroceria.imagem.url)" alt="nada">
    </p>
    </li>
  </ul> -->
</template>

<style scoped></style>
