<template>
  <div class="container">
    <header class="topbar">
      <button class="icon">☰</button>
      <img class="avatar" src="https://i.pravatar.cc/40" />
    </header>

    <h2 class="title">Adicionar modelo</h2>

    <div class="card">

      <!-- Upload imagem -->
      <label class="upload">
        <input type="file" @change="handleImage" hidden />
        <span v-if="!image">Adicionar imagem</span>
        <img v-else :src="imagePreview" />
      </label>

      <input v-model="form.nome" placeholder="Adicionar nome da carroceria" />
      
      <select v-model="form.categoria">
        <option disabled value="">Selecione uma categoria</option>
        <option>SUV</option>
        <option>Sedan</option>
        <option>Hatch</option>
      </select>

      <input v-model="form.descricaoCurta" placeholder="Adicionar descrição curta" />

      <textarea v-model="form.descricao" placeholder="Adicionar descrição"></textarea>

      <input v-model="form.especificacoes" placeholder="Adicionar especificações" />

      <input v-model.number="form.preco" type="number" placeholder="Adicionar preço" />

      <div class="buttons">
        <button class="cancel">Cancelar</button>
        <button class="submit" @click="submit">Adicionar Modelo</button>
      </div>

    </div>

    <nav class="bottom">
      <span>Início</span>
      <span>Modelos</span>
      <span>Orçamento</span>
      <span>Vendas</span>
    </nav>
  </div>
</template>

<script setup>
import { ref } from "vue"

const image = ref(null)
const imagePreview = ref("")

const form = ref({
  nome: "",
  categoria: "",
  descricaoCurta: "",
  descricao: "",
  especificacoes: "",
  preco: null
})

function handleImage(e) {
  const file = e.target.files[0]
  image.value = file
  imagePreview.value = URL.createObjectURL(file)
}

function submit() {
  console.log("Dados enviados:", {
    ...form.value,
    image: image.value
  })

  alert("Modelo criado (simulado)")
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

input, select, textarea {
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