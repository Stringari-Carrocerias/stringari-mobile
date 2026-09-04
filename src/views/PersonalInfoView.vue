<script setup>

import { usePersonalInfo } from "@/composables/usePersonalInfo";
import FormUser from "@/components/forms/user/FormUser.vue";

import CloseIcon from "@iconify-vue/material-symbols/close";

const { handleRoute } = usePersonalInfo();

</script>
<template>
  <div class="header">
    <CloseIcon
      class="close-icon"
      alt="Ícone de fechar"
      @click="handleRoute('/')"
    />
    <div>
      <h1>Informações Pessoais</h1>
    </div>
  </div>
  <FormUser />
</template>
<style scoped>

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

</style>