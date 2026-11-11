<template>
  <div class="container">
    <div class="title-container">
      <h1>Criar Orçamento</h1>
    </div>
    <div class="select-container">
      <label v-for="select in ['CNPJ', 'CPF']" :key="select" class="option">
        <input
          v-model="personType"
          type="radio"
          name="personType"
          :value="select"
        />
        <p class="select">{{ select }}</p>
      </label>
    </div>
    <FormCNPJ v-if="personType == 'CNPJ'" />
    <FormCPF v-if="personType == 'CPF'" />
  </div>
</template>
<script setup>
import FormCPF from "@/components/forms/customer/FormCPF.vue";
import FormCNPJ from "@/components/forms/customer/FormCNPJ.vue";
import { useCustomer } from "@/composables/useCustomer";

const { personType } = useCustomer();
</script>
<style scoped>
.select-container {
  display: flex;
  gap: 4vw;
  margin: 0 0 4vw 4vw;
  .option {
    padding: 2vw 4vw;
    box-shadow: 0 2px 4px 1px rgba(229, 229, 229, 0.5);
    display: flex;
    gap: 2vw;
    border-radius: 24px;

    input {
      color: black;
    }
  }
}

/* ==== MOBILE ==== */

@media (max-width: 767px) {
  .title-container {
    padding: 4vw;
    font-size: 5vw;
  }
}

/* ==== DESKTOP ==== */

@media (min-width: 768px) {
  .select-container {
    flex-wrap: wrap;
    gap: 16px;
    margin: 0 0 24px;

    .option {
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      font-size: 16px;
    }
  }

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
