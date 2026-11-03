<template>
  <div class="container">
    <div class="title-container">
      <h1>Criar Orçamento</h1>
    </div>
    <FormCNPJ />
  </div>
</template>
<script setup>
import FormCNPJ from "@/components/forms/budget/FormCNPJ.vue";
</script>
<style scoped>

/* ==== MOBILE ==== */

@media (max-width: 767px) {
  .title-container {
    padding: 4vw;
    font-size: 5vw;
  }
}

/* ==== DESKTOP ==== */

@media (min-width: 768px) {
  .container {
    max-width: 1300px;
    margin: 0 auto;
  }

  .title-container {
    padding: 0 0 24px;

    h1 {
      font-size: 32px;
    }
  }
}
</style>
