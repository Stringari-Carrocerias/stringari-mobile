<template>
  <div class="page">
    <section class="header">
      <h1>Modelos de Carrocerias</h1>
      <p>Conheça nossos modelos e escolha o ideal para sua necessidade</p>
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
    </section>

    <section class="list">
      <div class="card" v-for="carroceria in carrocerias" :key="carroceria.id">
        <img :src="carroceria.imagem.file" class="image" />

        <h2>{{ carroceria.nome }}</h2>

        <p class="tag">{{ carroceria.categoria.nome }}</p>

        <p class="desc">
          {{ carroceria.descricaoCurta }}
        </p>

        <h3>Especificações:</h3>

        <ul class="specs">
          <li>Largura: {{ carroceria.largura }}</li>
          <li>Comprimento: {{ carroceria.comprimento }}</li>
          <li>Altura: {{ carroceria.altura }}</li>
        </ul>

        <div class="actions">
          <button class="outline">Ver detalhes</button>
          <button class="primary">Solicitar orçamento</button>
        </div>
      </div>
      <AppButton />
    </section>
  </div>
</template>

<script setup>
import LeftFillIcon from "@iconify-vue/mingcute/left-fill";
import AppButton from "@/components/forms/AppButton.vue";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useCarroceriasStore } from "../stores/carroceria.js";
import { useCategoriasStore } from "@/stores/categoria.js";

// Toast

import { useToastStore } from "@/stores/toast.js";

const toast = useToastStore();

// Modelos de Carrocerias

const { carrocerias } = storeToRefs(useCarroceriasStore());
const { categorias } = storeToRefs(useCategoriasStore());

const { fetchCarrocerias } = useCarroceriasStore();
const { fetchCategorias } = useCategoriasStore();

const categoriaSelect = ref(-1);

let showCategoria = ref(false);

const categoriaSelecionada = categoriaSelect.value === -1 ? "" : categoriaSelect.value;

onMounted(async () => {
  try {
    await fetchCategorias();
  } catch (error) {
    toast.showToast('Erro ao carregar categorias.', 'error');
  }

  try {
    await fetchCarrocerias(categoriaSelecionada);
  } catch (error) {
    toast.showToast('Erro ao carregar modelos.', 'error');
  }
});

const handleFiltro = async () => {
  try {
    const categoriaSelecionada = categoriaSelect.value === -1 ? "" : categoriaSelect.value;
    await fetchCarrocerias(categoriaSelecionada);
  } catch(error) {
    toast.showToast( error.response?.data?.detail || 'Erro ao filtrar.', 'error')
  }
};

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

/* FILTER */

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

/* LIST */
.list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* CARD */
.card {
  background: white;
  border-radius: 18px;
  padding: 14px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  transition: 0.2s ease;
}

.card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 14px;
  margin-bottom: 10px;
}

.card h2 {
  font-size: 18px;
  margin-bottom: 6px;
  color: #111827;
}

.tag {
  display: inline-block;
  font-size: 12px;
  background: #f3f4f6;
  padding: 4px 10px;
  border-radius: 999px;
  margin-bottom: 10px;
  color: #374151;
}

.desc {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 10px;
}

/* SPECS */
.specs {
  padding-left: 18px;
  margin-bottom: 12px;
}

.specs li {
  font-size: 13px;
  color: #4b5563;
  margin-bottom: 4px;
}

/* ACTIONS */
.actions {
  display: flex;
  gap: 10px;
}

.outline {
  flex: 1;
  border: 1px solid #d1d5db;
  background: transparent;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
}

.outline:hover {
  background: #f3f4f6;
}

.primary {
  flex: 1;
  background: #16a34a;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
}

.primary:hover {
  background: #15803d;
}
</style>
