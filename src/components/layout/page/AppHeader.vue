<script setup>
import router from "@/router";
import { onClickOutside } from "@vueuse/core";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useUsuarioStore } from "@/stores/usuario";
import { useToastStore } from "@/stores/toast";
import { useAuth } from "@/composables/useAuth";

// Toast

const toast = useToastStore();

// Route

const route = useRoute();

const currentPath = computed(() => route.path);

const paginaAtual = (path) => {
  return currentPath.value === path ? "active" : "inactive";
};

// Left menu

const toggleLeft = ref(false);

const handleToggleLeft = () => {
  toggleLeft.value = !toggleLeft.value;
};

const menuLeftTarget = ref(null);

onClickOutside(menuLeftTarget, () => {
  toggleLeft.value = false;
});

// Right menu

const toggleRight = ref(false);

const handleToggleRight = () => {
  toggleRight.value = !toggleRight.value;
};

const menuRightTarget = ref(null);

onClickOutside(menuRightTarget, () => {
  toggleRight.value = false;
});

// User Photo

const usuarioStore = useUsuarioStore();
const photoUrl = ref(null);

onMounted(async () => {
  try {
    if (useAuthStore().isAuthenticated) {      
      await usuarioStore.fetchUsuario();
    }
    photoUrl.value = usuarioStore.usuario.foto?.url || null;
  } catch (error) {
    toast.showToast('Erro ao carregar dados do usuário.', 'error');
  }
});

// Logout

const { handleLogout } = useAuth();

</script>

<template>
  <div class="all">
    <nav>
      <div v-if="!toggleLeft" @click="handleToggleLeft" id="primary-user">
        <img src="/src/assets/icons/hamburger-button.svg" alt="hamburger-button" />
      </div>
      <div>
        <div v-if="toggleLeft" ref="menuLeftTarget">
          <div class="left-handle-acess">
            <div class="left-handle-up">
              <img src="/src/assets/icons/logo-original.png" alt="logo-criada" />
            </div>
            <div class="left-handle-down">
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

      <div class="circle" id="primary-user" @click="handleToggleRight">
        <img :src="photoUrl" alt="foto" />
      </div>
      <div v-if="toggleRight" ref="menuRightTarget">
        <div class="right-handle-acess">
          <div class="row-image">
            <div class="right-image">
              <img :src="photoUrl" alt="foto" />
            </div>
          </div>
          <ul>
            <li
              :class="paginaAtual('/informacoes-pessoais')"
              @click="router.push('/informacoes-pessoais')"
            >
              <p>Informações Pessoais</p>
            </li>
            <li
              :class="paginaAtual('/configuracoes')"
              @click="router.push('/configuracoes')"
            >
              <p>Configurações</p>
            </li>
            <li class="leave-account" @click="handleLogout">
              <p>Sair da sua conta</p>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div
      style="
        border-bottom: 1px solid black;
        width: 100%;
        position: fixed;
        top: 80px;
      "
    ></div>
  </div>
</template>

<style scoped>
.all {
  background-color: #f8f9fa;
  position: fixed;
  top: 0;
  margin-bottom: 70px;
  width: 100%;
}

nav {
  display: flex;
  justify-content: space-between;
}

#primary-user {
  display: flex;
  align-items: center;
  text-align: center;
  margin-right: 24px;
  margin-left: 24px;
}

/*=============== LEFT MENU ===============*/

.left-handle-acess {
  position: fixed;
  top: 0;
  margin: 0;
  z-index: 30;
  background-color: #ffffff;
  padding: 0 10%;
  padding-bottom: 24px;
  border-bottom-right-radius: 10px;
  box-shadow: 0 0 10px 1px rgba(118, 118, 118, 0.3);
}

.left-handle-up {
  margin: 0;
  max-width: 150px;
  overflow: hidden;
}

.left-handle-up img {
  margin-top: 20px;
  margin-bottom: 24px;
  max-width: 150px;
}

.left-handle-down ul {
  list-style-type: none;
}

.left-handle-down ul li {
  font-size: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 20px;
}

.active {
  color: #ff0000;
  border: 1px solid #e2e8f0;
  box-sizing: border-box;
}

.inactive {
  color: #717171;
}

#icon {
  font-size: 20px;
  margin-right: 10px;
}

/*=============== RIGHT MENU ===============*/

.circle {
  margin: 20px 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #767676;
}

.circle img {
  object-fit: cover;
  width: 40px;
  height: 40px;
  align-self: center;
}

/*===== USER MENU PROFILE ===== */

.right-handle-acess {
  position: fixed;
  top: 0;
  right: 0;
  margin: 0;
  background-color: #ffffff;
  z-index: 31;
  padding: 40px 5%;
  border-bottom-left-radius: 10px;
  box-shadow: 0 0 10px 1px rgba(118, 118, 118, 0.3);
}

.row-image {
  display: flex;
  justify-content: center;
}

.right-image {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  overflow: hidden;
  border: 1px solid #767676;
}

.right-image img {
  width: 60px;
  height: 60px;
  object-fit: cover;
}

/*===== TEXT MENU =====*/

.right-handle-acess ul {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  justify-content: center;
  display: flex;
  align-items: center;
}

.right-handle-acess ul li {
  font-size: 16px;
  margin-top: 12px;
  display: flex;
  padding: 10px 20px;
  border-radius: 20px;
}

.leave-account {
  margin-top: 28px;
  color: #ff0007;
}
</style>
