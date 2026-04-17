<script setup>

import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';

// import { onMounted } from 'vue'
// import { useCarroceriasStore } from './stores/carroceria';

// const store = useCarroceriasStore()

// onMounted(() => {
//   store.fetchCarrocerias();
// });

</script>

<template>
    <AppHeader></AppHeader>

    <!-- <ul>
        <li v-for="carroceria in store.carrocerias">
            <p>
                {{ carroceria.nome }}
            </p>
        </li>
    </ul> -->
    <AppFooter></AppFooter>
</template>

<style scoped>
</style>
