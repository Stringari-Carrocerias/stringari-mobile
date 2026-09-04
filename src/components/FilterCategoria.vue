<template>
  <div class="filter-border">
    <select
      name="categorias"
      id="categorias"
      v-model.number="categoriaSelect"
      @change="handleFiltro"
      class="filter"
    >
      <option :value="-1">Todos</option>
      <option
        v-for="categoria in categorias"
        :key="categoria.id"
        :value="categoria.id"
      >
        {{ categoria.nome }}
      </option>
    </select>
  </div>

  <div v-if="showCategoria === false"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useCarroceriasStore } from "@/stores/carroceria.js";
import { useCategoriasStore } from "@/stores/categoria.js";
import { useModels } from "@/composables/useModels";

const { categoriaSelect, categoriaSelecionada, handleFiltro } = useModels();

// Toast

import { useToastStore } from "@/stores/toast.js";

const toast = useToastStore();

// Modelos de Carrocerias

const { categorias } = storeToRefs(useCategoriasStore());

const { fetchCarrocerias } = useCarroceriasStore();
const { fetchCategorias } = useCategoriasStore();

let showCategoria = ref(false);

onMounted(async () => {
  try {
    await fetchCategorias();
  } catch (error) {
    toast.showToast("Erro ao carregar categorias.", "error");
  }

  try {
    await fetchCarrocerias(categoriaSelecionada);
  } catch (error) {
    toast.showToast("Erro ao carregar modelos.", "error");
  }
});
</script>

<style scoped>
.filter-border {
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid #ebebeb;
  background-color: #ebebeb;
  font-size: 16px;
  width: fit-content;
  color: #767676;
}

.filter {
  font-size: 16px;
  border: none;
  background-color: #ebebeb;
}
</style>
