<template>
  <div class="container">
    <h2 class="title">Adicionar</h2>
    <FormModel/>
  </div>
</template>

<script setup>
  import FormModel from "@/components/forms/models/FormModel.vue";
</script>

<style scoped>
.title {
  color: #c71e25;
  font-weight: bold;
  margin-left: 10px;
}
</style>