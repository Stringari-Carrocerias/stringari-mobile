<template>
  <div class="customer-container">
    <div class="customer-card" v-for="customer in customers" :key="customer.id">
      <img
        :src="customer?.foto?.url"
        class="customer-photo"
        alt="foto-usuario"
      />
      <div class="customer-name">
        {{ customer.fullName }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useCustomer } from "@/composables/useCustomer";

const { customers, fetchCustomer } = useCustomer();

onMounted(async () => {
  await fetchCustomer();
});
</script>

<style scoped>
.customer-container {
  padding-top: 2vw;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;

  .customer-card {
    margin-top: 2vw;
    width: 100%;
  }

  .customer-photo {
    width: 40vw;
    height: 40vw;
    object-fit: cover;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 2px 4px 1px rgba(229, 229, 229, 0.5);
  }

  .customer-name {
    font-size: 3vw;
    white-space: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 2vw;
  }
}
</style>
