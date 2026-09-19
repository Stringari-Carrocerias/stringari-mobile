<script setup>
// Precisa ser feito: css, adicionar acessórios ao backend também

import ChevronBackCircleIcon from "@iconify-vue/famicons/chevron-back-circle";
import { handleRoute } from "@/utils/handleRoute";
import { useRoute } from "vue-router";
import { useCarroceriasStore } from "@/stores/carroceria";
import { onMounted, ref } from "vue";
import {
  parseDecimalCurrency,
  parseDecimalReverse,
} from "@/utils/parseDecimal";

const idCarroceria = useRoute().params.id;
const carroceriasStore = useCarroceriasStore();

const carroceriaDetail = ref({});

onMounted(async () => {
  await carroceriasStore.fetchCarroceriaDetail(idCarroceria);
  carroceriaDetail.value = carroceriasStore.carroceriaDetail;
});

const acessoriesList = [
  "Assoalho",
  "Laterais",
  "Cabeceira",
  "Tampa traseira",
  "Estrutura de suporte",
];
</script>

<template>
  <div class="page">
    <div class="image-container">
      <img :src="carroceriaDetail.imagem?.url" class="image" />
      <div class="image-extra">
        <ChevronBackCircleIcon
          class="close-icon"
          data-testid="test-closeicon"
          alt="Ícone de fechar"
          @click="handleRoute('/modelos')"
        />
        <p class="category">{{ carroceriaDetail.categoria?.nome }}</p>
      </div>
    </div>

    <div class="details-container">
      <div class="title-container">
        <h2>{{ carroceriaDetail.nome }}</h2>
        <p class="tag">
          {{ carroceriaDetail?.caminhao }}
        </p>
        <ul class="sides-container">
          <li>{{ parseDecimalReverse(carroceriaDetail.largura) }}m largura</li>
          <li>
            · {{ parseDecimalReverse(carroceriaDetail.comprimento) }}m
            comprimento
          </li>
          <li>· {{ parseDecimalReverse(carroceriaDetail.altura) }}m altura</li>
        </ul>
      </div>

      <div class="info-container">
        <div class="description">
          <h3>Descrição</h3>
          <p>
            {{ carroceriaDetail.descricao }}
          </p>
        </div>
        <div class="acessorie-container">
          <h3>Acessórios inclusos</h3>
          <ul v-for="acessorie in acessoriesList" :key="acessorie">
            <li>· {{ acessorie }}</li>
          </ul>
        </div>
        <p class="info-extra">
          Precisa de mais?
          <span @click="handleRoute('/orcamento')"
            >Solicite seu orçamento.</span
          >
        </p>
      </div>
    </div>
    <div class="actions-container">
      <div class="border"></div>
      <div class="row-container">
        <p class="price">{{ parseDecimalCurrency(carroceriaDetail.valor) }}</p>
        <button class="budget-btn" @click="handleRoute('/orcamento')">
          Solicitar orçamento
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* =========== GERAL ========= */

.page {
  padding-bottom: 40vw;
}

body {
  color: #1a1a1a;
}

/* =========== IMAGE ========= */

.image-container {
  position: relative;
  max-width: 100%;
  overflow: hidden;
  z-index: 0;
}

.image {
  width: 100vw;
}

.image-container::after {
  content: "";
  position: absolute;
  inset: 0;
  box-shadow: inset 0 15vw 5vw 0 rgba(0, 0, 0, 0.15);
  z-index: 1;
}

.image-extra {
  position: fixed;
  top: 10vw;
  left: 6vw;
  right: 6vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
}

.close-icon {
  height: 10vw;
  color: white;
}

.category {
  border: 1px solid #fff;
  border-radius: 20px;
  padding: 8px 16px;
  background-color: rgba(255, 255, 255, 0.95);
  font-size: 12px;
  font-weight: 600;
  color: black;
}

/* ====== DETAILS CONTAINER ====== */

.details-container {
  position: relative;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  transform: translateY(-24px);
  text-align: center;
  background-color: #fff;
  z-index: 3;
  padding: 0 4vw;
}

/* TITLE */

.title-container {
  color: #1a1a1a;
  text-align: center;
  padding: 8vw 0 0 0;
}

.title-container h2 {
  font-size: 28px;
  font-weight: 600;
}

.title-container p {
  font-size: 24px;
  font-weight: 600;
}

/* SIDES */

.sides-container {
  color: #1a1a1a;
  display: flex;
  justify-content: center;
  margin-top: 4.5vw;
}

.sides-container li {
  font-size: 16px;
  margin-right: 4px;
  font-weight: 400;
}

/* ====== INFO ======*/

.info-container {
  margin-top: 4.5vw;
  border-top: 1px solid #e5e5e5;
}

.info-container h3 {
  margin-top: 4.5vw;
  margin-bottom: 4vw;
  text-align: left;
  font-size: 16px;
  font-weight: 500;
}

.description {
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 4.5vw;
}

.description p {
  text-align: justify;
  margin: 0 4vw;
}

.acessorie-container li {
  margin: 0 4vw;
  text-align: left;
}

.info-extra {
  margin-top: 4.5vw;
  margin-top: 2vw;
  text-align: left;
}

.info-extra span {
  font-weight: 700;
}

/* ====== ACTIONS ======*/

.actions-container {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
  border-top: 1px solid #e5e5e5;
  box-shadow: 0 -2px 10px 1px rgba(229, 229, 229, 0.5);
  background-color: #fff;
}

.row-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4vw;
}

.price {
  font-weight: 600;
  font-size: 20px;
}

.budget-btn {
  background-color: #10b981;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  border: none;
  padding: 4vw 7vw;
}
</style>
