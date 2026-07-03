import { ref } from "vue";
import { defineStore } from "pinia";
import userApi from "@/api/userAPI";

export const useUsuarioStore = defineStore('usuario', () => {
    const usuario = ref([]);

    async function fetchUsuario() {
        try {
            const response = await userApi.getMe();
            usuario.value = response.data;
        } catch(err) {
            console.error(err);
        } 
    }

    return {
        usuario,
        fetchUsuario,
    }
})