<template>
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
          <input
            type="text"
            v-model="userInfo.fullName"
            placeholder="Toque para adicionar"
            style="overflow: hidden"
          />
        </div>
        <div class="form-bar"></div>
        <div class="form-group" style="border: none">
          <p>Telefone</p>
          <input
            type="tel"
            v-model="userInfo.phone"
            v-maska
            data-maska="(##) #####-####"
            placeholder="Toque para adicionar"
          />
        </div>
      </div>
    </div>
    <div class="btn-submit">
      <button type="submit">Salvar alterações</button>
    </div>
  </form>
</template>

<script setup>

import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useUsuarioStore } from "@/stores/usuario.js";
import { vMaska } from "maska/vue";
import { usePersonalInfo } from "@/composables/usePersonalInfo";

import CameraIcon from "@iconify-vue/gridicons/camera";

const { usuario } = storeToRefs(useUsuarioStore());

const { fetchUsuario } = useUsuarioStore();
const {
  userInfo,
  userInfoBackup,
  previewUrl,
  imgAttachmentKey,
  uploading,
  userGroup,

  handleImageChange,
  handleUpdate,
} = usePersonalInfo();

onMounted(async () => {
  await fetchUsuario();
  userInfo.value = {
    email: usuario.value.email,
    foto_attachment_key: imgAttachmentKey?.value || usuario.value.foto?.attachment_key,
    fullName: usuario.value?.fullName || null,
    phone: usuario.value?.phone || "",
  };

  userGroup.value = usuario.value.name;
  previewUrl.value = usuario.value.foto?.url;
  userInfoBackup.value = { ...userInfo.value };
});
</script>

<style scoped>

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
  width: 100%;
  display: flex;
  justify-content: center;
}

.handle-image {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 1vw 3vw;
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
  padding: 0 1rem;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0;
}

.form-group p {
  color: #7c7c7c;
  white-space: nowrap;
}

.form-group input {
  color: #1a1a1a;
  font-size: 14px;
}

.form-group input::placeholder {
  color: #1a1a1a;
}

.form-container input {
  border: none;
  text-align: right;
  color: #1a1a1a;
}

.form-bar {
  border: 0.5px solid #e5e5e5;
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