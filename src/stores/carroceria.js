import { ref } from 'vue';
import { defineStore } from 'pinia';
import carroceriasApi from '../api/carroceriaAPI.js';
import { useToastStore } from './toast.js';

export const useCarroceriasStore = defineStore('carrocerias', () => {
  const carrocerias = ref([]);
  const carroceriaDetail = ref({});
  const toast = useToastStore();

  async function fetchCarrocerias(categoriaSelecionada) {
    try {
      const response = await carroceriasApi.getAll(categoriaSelecionada);
      carrocerias.value = response.data.results;
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchCarroceriaDetail(id) {
    try {
      const response = await carroceriasApi.getById(id);
      carroceriaDetail.value = response.data;
    } catch (err) {
      toast.showToast('Erro ao buscar detalhes da carroceria', 'error')
      window.history.back();
    }
  }

async function addCarroceria(carroceriaData) {
  try {
    const response = await carroceriasApi.create(carroceriaData);
    carrocerias.value.push(response.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

  return {
    carrocerias,
    carroceriaDetail,

    fetchCarrocerias,
    fetchCarroceriaDetail,
    addCarroceria,
  };
});