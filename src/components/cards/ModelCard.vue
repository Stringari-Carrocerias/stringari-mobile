<template>
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
        <li>Largura: {{ parseDecimalReverse(carroceria.largura) }}m</li>
        <li>Comprimento: {{ parseDecimalReverse(carroceria.comprimento) }}m</li>
        <li>Altura: {{ parseDecimalReverse(carroceria.altura) }}m</li>
      </ul>

      <div class="actions">
        <button class="outline">Ver detalhes</button>
        <button class="primary">Solicitar orçamento</button>
      </div>
    </div>
    <AppButton />
  </section>
</template>

<script setup>

import { storeToRefs } from "pinia";
import { useCarroceriasStore } from "@/stores/carroceria.js";
import { parseDecimalReverse } from "@/utils/parseDecimal";

import AppButton from "@/components/forms/models/AppButton.vue";

// Modelos de Carrocerias

const { carrocerias } = storeToRefs(useCarroceriasStore());

</script>

<style scoped>

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
