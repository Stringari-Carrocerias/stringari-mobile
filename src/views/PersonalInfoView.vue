<script setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

import { useUsuarioStore } from "@/stores/usuario.js";
import CloseIcon from "@iconify-vue/material-symbols/close";
import CameraIcon from "@iconify-vue/gridicons/camera";
import userApi from "@/api/userAPI";
import { useRouter } from "vue-router";
import { vMaska } from "maska/vue";

const { usuario } = storeToRefs(useUsuarioStore());
const router = useRouter();

const { fetchUsuario, updateUsuario } = useUsuarioStore();

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
const previewUrl = ref(null);
const imgAttachmentKey = ref(null);
const uploading = ref(false);

const userInfo = ref({
  email: "",
  foto: imgAttachmentKey.value,
  fullName: null,
  phone: '',
});

const userGroup = ref();

onMounted(async () => {
  await fetchUsuario();
  userInfo.value = {
    email: usuario.value.email,
    foto_attachment_key: imgAttachmentKey.value || usuario.value.foto.foto,
    fullName: usuario.value.fullName || null,
    phone: usuario.value.phone || '',
  };
  userGroup.value = usuario.value.name;
  previewUrl.value = usuario.value.foto.url;
});

async function handleImageChange(event) {
  const file = event.target.files[0];
  if (!file) return;
  uploading.value = true;

  try {
    const response = await userApi.uploadImage(file);
    previewUrl.value = response.data.url;
    imgAttachmentKey.value = response.data.attachment_key;
    userInfo.value.foto_attachment_key = imgAttachmentKey.value;
  } catch (err) {
    console.error("Erro ao fazer upload da imagem ", err);
    previewUrl.value = null;
    imgAttachmentKey.value = null;
  } finally {
    uploading.value = false;
  }
}

const handleUpdate = (id, userData) => {
  updateUsuario(id, userData);
};

function handleRoute(route){
  router.push(route)
}

</script>
<template>
  <div class="header">
    <CloseIcon class="close-icon" alt="Ícone de fechar" @click="handleRoute('/')"/>
    <div>
      <h1>Informações Pessoais</h1>
    </div>
  </div>
  <form @submit.prevent="handleUpdate(usuario.id, userInfo)" class="form-row">
    <div class="image-container">
      <div class="show-image">
        <label class="user-photo">
          <img v-if="previewUrl" :src="previewUrl" alt="Prévia da imagem" />
        </label>
      </div>
      <div class="handle-container-image">
        <div>
          <input
            id="file-input"
            type="file"
            accept="image/jpeg,image/png"
            :disabled="uploading"
            @change="handleImageChange"
            hidden
          />
          <label
            for="file-input"
            id="file-input"
            class="handle-image"
            :style="previewUrl ? 'margin: 0 13vw;' : 'margin: 0 10vw;'"
          >
            <p class="camera-icon"><CameraIcon height="20px" /></p>
            <p>{{ previewUrl ? "Editar" : "Adicionar" }}</p>
          </label>
        </div>
      </div>
    </div>
    <div class="user-group">
      <p>{{ userGroup }}</p>
    </div>
    <div class="form-row">
      <div class="form-container">
        <div class="form-group">
          <p>Email</p>
          <input type="text" v-model="userInfo.email" />
        </div>
        <div class="form-bar"></div>
        <div class="form-group">
          <p>Nome Completo</p>
          <input type="text" v-model=userInfo.fullName placeholder="Toque para adicionar" />
        </div>
        <div class="form-bar"></div>
        <div class="form-group" style="border: none;">
          <p>Telefone</p>
          <input type="tel" v-model="userInfo.phone" v-maska data-maska="(##) #####-####" placeholder="Toque para adicionar"/>
        </div>
      </div>
    </div>
    <div class="btn-submit">
      <button type="submit">Salvar alterações</button>
    </div>
  </form>
</template>
<style scoped>

/* ===== HEADER ===== */

.header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 0 16px 0;
  margin-bottom: 48px;
  border-bottom: 1px solid #767676;
}

.close-icon {
  position: absolute;
  left: 20px;
  height: 32px;
}

.header h1 {
  font-size: 20px;
  align-self: center;
  font-weight: 600;
}

.header div {
  justify-content: center;
}

/* ===== Informações Pessoais ===== */

.form-row {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* == IMAGEM == */

.image-container {
  position: relative;
  text-align: center;
  justify-content: center;
  margin-bottom: 30px;
}

.show-image {
  overflow: hidden;
  border-radius: 50%;
  width: 210px;
  height: 210px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 5px 0 #cecece;
}

.user-photo {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.user-photo img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  display: block;
}

.handle-container-image {
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
}

.handle-image {
  display: flex;
  background-color: #fff;
  padding: 1vw 5vw;
  border-radius: 20px;
  text-align: center;
  justify-content: center;
  align-self: center;
  margin: 0 13vw;
  box-shadow: 0 4px 5px 0 #cecece;
}

.handle-image p {
  font-size: 16px;
  font-weight: 600;
}

.camera-icon {
  margin-right: 8px;
}

/* == USER-GROUP ==  */

.user-group {
  margin-bottom: 40px;
  font-size: 16px;
}

.user-group p {
  font-weight: 600;
}

/* == FORM TEXTO == */

.form-container {
  border: 1px solid #e5e5e5;
  border-radius: 30px;
  height: 50%;
  width: 90%;
}

.form-group {
  padding: 0 16px;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 24px 0;
}

.form-group p {
  color: #7C7C7C;
  white-space: nowrap;
}

.form-group input {
  color: #1A1A1A;
  font-size: 14px;
}

.form-group input::placeholder {
  color: #1A1A1A;
}

.form-container input {
  border: none;
  text-align: right;
  color: #1A1A1A;
}

.form-bar {
  border: 0.5px solid #E5E5E5;
}

/* ===== Botão de Salvar alterações ===== */

.btn-submit {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 40px;
  display: flex;
  justify-content: center;
  text-align: center;
}

.btn-submit button {
  bottom: 0;
  width: 90%;
  height: 64px;
  border-radius: 28px;
  background-color: #c71e25;
  color: #fff;
  border: none;
  font-size: 20px;
  font-weight: 600;
}
</style>
