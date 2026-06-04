<template>
  <div class="container">
    <header class="topbar"></header>

    <h2 class="title">Adicionar</h2>

    <form class="card" @submit.prevent="handleSubmit">
      <label class="upload">
        <input
          type="file"
          accept="image/jpeg,image/png"
          :disabled="uploading"
          @change="handleImageChange"
          hidden
        />
        <span v-if="!previewUrl">Adicionar imagem</span>
        <img v-else :src="previewUrl" alt="Prévia da imagem" />
      </label>

      <input
        v-model="newModel.nome"
        placeholder="Adicionar nome da carroceria"
      />

      <select v-model="newModel.categoria_send" @change="handleCategoria">
        <option disabled value="">Selecione uma categoria</option>
        <option
          v-for="categoria in categoriasStore.categorias"
          :key="categoria.id"
        >
          {{ categoria.nome }}
        </option>

        <option>Outros</option>
      </select>

      <input
        v-model="newModel.categoria_send"
        placeholder="Adicionar categoria"
        v-if="toggleCategoria === true"
      />

      <input
        v-model="newModel.descricaoCurta"
        placeholder="Adicionar descrição curta"
      />

      <textarea
        v-model="newModel.descricao"
        placeholder="Adicionar descrição"
      ></textarea>

      <div>
        <p>Adicionar especificações</p>
        <input
          v-model="newModel.comprimento"
          placeholder="Adicionar especificações"
        />
        <input
          v-model="newModel.largura"
          placeholder="Adicionar especificações"
        />
        <input
          v-model="newModel.altura"
          placeholder="Adicionar especificações"
        />
      </div>

      <input
        v-model.number="newModel.valor"
        type="number"
        placeholder="Adicionar preço"
      />

      <div class="buttons">
        <button class="cancel" @click="handleErase">Cancelar</button>
        <button class="submit" type="submit">Adicionar Modelo</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { useCategoriasStore } from "@/stores/categoria";

import { useCarroceriasStore } from "@/stores/carroceria";
import carroceriaApi from "@/api/carroceriaAPI";


const { addCarroceria } = useCarroceriasStore();
const categoriasStore = useCategoriasStore();

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const previewUrl = ref(null);
const imgAttachmentKey = ref(null);
const uploading = ref(false);
const toggleCategoria = ref(false);

const newModel = ref({
  imagem_attachment_key: imgAttachmentKey.value,
  nome: "",
  valor: null,
  comprimento: null,
  largura: null,
  altura: null,
  descricao: "",
  descricaoCurta: "",
  categoria_send: "",
});

onMounted(() => {
  categoriasStore.fetchCategorias();
});

function handleCategoria() {
  if (newModel.value.categoria_send == "Outros") {
    toggleCategoria.value = !toggleCategoria.value;
  }
}

async function handleImageChange(event) {
  const file = event.target.files[0];
  if (!file) return;
  uploading.value = true;

  try {
    const response = await carroceriaApi.uploadImage(file);
    previewUrl.value = BASE_URL + response.data.url;
    imgAttachmentKey.value = response.data.attachment_key;
    newModel.value.imagem_attachment_key = response.data.attachment_key;
  } catch (err) {
    console.error("Erro ao fazer upload da imagem ", err);
    previewUrl.value = null;
    imgAttachmentKey.value = null;
  } finally {
    uploading.value = false;
  }
}

async function handleSubmit() {
  const verificarCategoria = categoriasStore.categorias.filter(
    (categoria) => categoria.nome === newModel.value.categoria_send,
  );

  if (verificarCategoria.length == 0) {
    await categoriasStore.addCategoria(newModel.value.categoria_send);
    const achaTudo = categoriasStore.categorias.findIndex(
      (categoria) => categoria.nome == newModel.value.categoria_send,
    );
    newModel.value.categoria_send = categoriasStore.categorias[achaTudo].nome;
  }

  await addCarroceria(newModel.value);

  previewUrl.value = null;
  imgAttachmentKey.value = null;

  handleErase();
}

function handleErase() {
  newModel.value = {
    imagem_attachment_key: imgAttachmentKey.value,
    nome: "",
    valor: null,
    comprimento: null,
    largura: null,
    altura: null,
    descricao: "",
    descricaoCurta: "",
    categoria_send: "",
  };
}
</script>

<style scoped>
.container {
  max-width: 420px;
  margin: auto;
  font-family: sans-serif;
}

.topbar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.title {
  color: red;
  font-weight: bold;
  margin-left: 10px;
}

.card {
  background: #fff;
  padding: 15px;
  border-radius: 15px;
  border: 1px solid #eee;
}

.upload {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  border: 2px dashed red;
  border-radius: 12px;
  margin-bottom: 10px;
  cursor: pointer;
}

.upload img {
  max-height: 100%;
}

input,
select,
textarea {
  width: 100%;
  margin: 6px 0;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.cancel {
  background: #eee;
  padding: 10px;
  border-radius: 10px;
}

.submit {
  background: red;
  color: white;
  padding: 10px;
  border-radius: 10px;
}

.bottom {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
  font-size: 12px;
}
</style>
