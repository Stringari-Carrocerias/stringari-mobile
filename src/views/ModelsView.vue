<template>
  <div class="page">
    <section class="header">
      <h1>Modelos de Carrocerias</h1>
      <p>Conheça nossos modelos e escolha o ideal para sua necessidade</p>
      <FilterCategoria />
    </section>
    <ModelCard />

  </div>
</template>

<script setup>

import ModelCard from "@/components/cards/ModelCard.vue";
import FilterCategoria from "@/components/FilterCategoria.vue";

</script>

<style scoped>
.page {
  padding: 20px;
  padding-bottom: 30vw;
}

.header {
  margin-top: 10px;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 26px;
  color: #c6070c;
  margin-bottom: 6px;
}

.header p {
  color: #6b7280;
  margin-bottom: 10px;
}

</style>
