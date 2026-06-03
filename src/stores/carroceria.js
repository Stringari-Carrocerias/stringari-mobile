import { ref } from 'vue';
import { defineStore } from 'pinia';
import carroceriasApi from '../api/carroceriaAPI.js';

export const useCarroceriasStore = defineStore('carrocerias', () => {
  const carrocerias = ref([]);

  async function fetchCarrocerias(categoriaSelecionada) {
    try {
      const response = await carroceriasApi.getAll(categoriaSelecionada);
      carrocerias.value = response.data.results;
    } catch (err) {
      console.error(err);
    }
  }

async function addCarroceria(carroceriaData) {
  try {
    const response = await carroceriasApi.create(carroceriaData);
    carrocerias.value.push(response.data);
  } catch (err) {
    console.error(err);
  }
}

  return {
    carrocerias,
    fetchCarrocerias,
    addCarroceria,
  };
});