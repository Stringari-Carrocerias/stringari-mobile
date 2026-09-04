<template>
  <form @submit.prevent="handleSubmit">
    <div class="card">
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

      <div>
        <p class="input-title">Adicionar nome da carroceria</p>
        <input
          v-model="newModel.nome"
          placeholder="Ex: Carroceria de Madeira..."
        />
      </div>

      <div>
        <p class="input-title">Selecione uma categoria</p>
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
      </div>

      <div>
        <p class="input-title">Adicionar descrição curta</p>
        <input
          v-model="newModel.descricaoCurta"
          placeholder="Máximo 100 caracteres"
        />
      </div>

      <div>
        <p class="input-title">Adicionar descrição</p>
        <textarea
          v-model="newModel.descricao"
          placeholder="Máximo 255 caracteres"
        ></textarea>
      </div>

      <div>
        <p class="input-title">Adicionar especificações</p>

        <div class="especification-group">
          <p class="especification-name">Largura</p>
          <input
            v-model="newModel.largura"
            @input="newModel.largura = newModel.largura.replace(',', '.')"
            placeholder="Digite aqui"
            class="especification-input"
          />
          <p class="especification-unit">m</p>
        </div>

        <div class="especification-group">
          <p class="especification-name">Comprimento</p>
          <input
            v-model="newModel.comprimento"
            @input="
              newModel.comprimento = newModel.comprimento.replace(',', '.')
            "
            placeholder="Digite aqui"
            class="especification-input"
          />
          <p class="especification-unit">m</p>
        </div>

        <div class="especification-group">
          <p class="especification-name">Altura</p>
          <input
            v-model="newModel.altura"
            @input="newModel.altura = newModel.altura.replace(',', '.')"
            placeholder="Digite aqui"
            class="especification-input"
          />
          <p class="especification-unit">m</p>
        </div>
      </div>

      <div>
        <p class="input-title">Adicionar preço</p>
        <input
          v-model="newModel.valor"
          @input="newModel.valor = newModel.valor.replace(',', '.')"
          type="number"
          placeholder="R$ Digite aqui o valor"
        />
      </div>
    </div>
    <div class="buttons">
      <button class="cancel" type="button" @click="handleErase">Cancelar</button>
      <button class="submit" type="submit">Adicionar Modelo</button>
    </div>
  </form>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { useToastStore } from "@/stores/toast";

import { useCategoriasStore } from "@/stores/categoria";

import { useModels } from "@/composables/useModels";

const toast = useToastStore();

const {
  newModel,
  previewUrl,
  uploading,
  toggleCategoria,
  handleImageChange,
  handleSubmit,
  handleCategoria,
  handleErase,
} = useModels();

const categoriasStore = useCategoriasStore();

onMounted(async () => {
  try {
    await categoriasStore.fetchCategorias();
  } catch (error) {
    toast.showToast(
      error.response?.data?.detail || "Erro em categorias",
      "error",
    );
  }
});
</script>

<style scoped>
.card {
  background: #fff;
  padding: 28px;
  margin: 24px 24px 0 24px;
  border: 1px solid #eee;
  border-radius: 32px;
}

.upload {
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
  overflow: hidden;
  height: 180px;
  border: 1px dashed #c71e25;
  border-radius: 14px;
  margin-bottom: 20px;
  cursor: pointer;
}

.upload img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.input-title {
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #000;
}

input,
select,
textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
}

.especification-group {
  font-size: 12px;
  color: #7a7a7a;
  display: flex;
  align-items: center;
  max-width: 240px;
  height: 28px;
  border: 1px solid #8a8a8a;
  border-radius: 999px;
  margin-bottom: 12px;
  background: #fff;
}

.especification-name {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 1.25rem;
  border-right: 2px solid #8a8a8a;
  border-radius: 50px;
}

.especification-input {
  display: flex;
  border: none;
  outline: none;
  color: #555;
  background: transparent;
  margin-bottom: 0;
}

.especification-unit {
  padding-right: 16px;
}

.buttons {
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  padding: 24px 24px 40px 24px;
}

.cancel {
  background: none;
  border: 1px solid #767676;
  width: 40%;
  padding: 10px;
  border-radius: 10px;
}

.submit {
  border: none;
  background: #c71e25;
  color: white;
  padding: 10px;
  margin-left: 8px;
  border-radius: 10px;
  width: 60%;
  font-weight: 500;
  cursor: pointer;
}

.bottom {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
  font-size: 12px;
}
</style>
