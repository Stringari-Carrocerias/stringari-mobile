import { ref } from 'vue';
import { defineStore } from 'pinia';
import carroceriasApi from '../api/carroceriaAPI.js';

export const useCarroceriasStore = defineStore('carrocerias', () => {
  const carrocerias = ref([]);

  async function fetchCarrocerias() {
    try {
      const response = await carroceriasApi.getAll();
      carrocerias.value = response.data.results;
    } catch (err) {
      console.error(err);
    }
  }

  return {
    carrocerias,
    fetchCarrocerias,
  };
});