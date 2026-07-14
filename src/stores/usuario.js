import { ref } from "vue";
import { defineStore } from "pinia";
import userApi from "@/api/userAPI";

export const useUsuarioStore = defineStore('usuario', () => {
    const usuario = ref({});

    async function fetchUsuario() {
        try {
            const response = await userApi.getMe();
            usuario.value = response.data;
        } catch(err) {
            console.error(err);
        } 
    }

    async function updateUsuario(id, usuarioData) {
        try {
            const response = await userApi.update(id, usuarioData);
            usuario.value = response.data;
        } catch(err) {
            err.value = 'Erro ao atualizar usuario',
            console.error(err);
        }
    }

    return {
        fetchUsuario,
        updateUsuario,
        usuario,
    }
})