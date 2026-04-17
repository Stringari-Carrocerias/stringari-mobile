<script setup>
// A borda do header tá ficando errada
// Trocar os valores do toggle antes de commitar

import router from "@/router";
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const currentPath = computed(() => route.path)

const paginaAtual = (path) => {
  return currentPath.value === path ? "active": "inactive";
}
const toggle = ref(false);

const handleToggle = () => {
  toggle.value = !toggle.value;
};

const menuTarget = ref(null);
onClickOutside(menuTarget, () => {
  toggle.value = false;
});

const isActive = ref(false);

</script>

<template>
  <div class="all">
    <nav>
      <div v-if="!toggle" @click="handleToggle" id="primary-user">
        <img src="/icons/hamburger-button.svg" alt="hamburger-button" />
      </div>
      <div>
        <div
          v-if="toggle"
          ref="menuTarget"
          style="box-shadow: 0 0 10px 1000px rgb(118, 118, 118, 0.5)"
        >
          <div class="handle-acess">
            <div class="handle-up">
              <img src="/icons/logo-original.png" alt="logo-criada" />
            </div>
            <div class="handle-down">
              <ul>
                <li
                  :class="paginaAtual('/meusorcamentos')"
                  @click="router.push('/meusorcamentos')"
                >
                  <span
                    class="mdi mdi-file-document-check-outline"
                    id="icon"
                  ></span
                  >Meus orçamentos
                </li>
                <li
                  :class="paginaAtual('/meuscurriculos')"
                  @click="router.push('/meuscurriculos')"
                >
                  <span class="mdi mdi-account-file-outline" id="icon"></span
                  >Meus currículos
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="circle" id="primary-user" :style="toggle ? 'opacity: 0.5;' : ''">
        <img src="/icons/icon-512x512.png" alt="foto" />
      </div>
    </nav>
    <div
      style="
        border-bottom: 1px solid black;
        width: 100%;
        position: fixed;
        top: 80px;
      "
      :style="toggle ? 'opacity: 0.5;' : ''";
    ></div>
  </div>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
}

#primary-user {
  margin: 20px 5vw;
}

.handle-acess {
  position: fixed;
  top: 0;
  margin: 0;
  z-index: 100;
  background-color: #ffffff;
  padding: 0 10%;
  padding-bottom: 24px;
  border-bottom-right-radius: 10px;
  list-style-type: none;
  box-shadow: 0 0 10px 1px rgba(118, 118, 118, 0.2);
}

.handle-up {
  margin: 0;
  max-width: 150px;
  overflow: hidden;
}

.handle-up img {
  margin-top: 20px;
  margin-bottom: 24px;
  max-width: 150px;
}

.handle-down ul {
  list-style-type: none;
}

.handle-down ul li {
  font-size: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 20px;
}

.active {
  color: #ff0000;
  border: 1px solid #E2E8F0;
  box-sizing: border-box;
}

.inactive {
  color: #717171;
}

#icon {
  font-size: 20px;
  margin-right: 10px;
}

.circle {
  margin: 20px 0;
  max-width: 40px;
  max-height: 40px;
  border-radius: 100%;
  overflow: hidden;
  border: 1px solid black;
}

.circle img {
  max-width: 40px;
  max-height: 40px;
}
</style>
