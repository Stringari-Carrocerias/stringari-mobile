import { ref } from "vue";
import { defineStore } from "pinia";
import categoriaApi from "@/api/categoriaAPI";

export const useCategoriasStore = defineStore('categorias', () => {
    const categorias = ref([]);

    async function fetchCategorias() {
        try {
            const response = await categoriaApi.getAll();
            categorias.value = response.data.results;
        } catch (err) {
            console.error(err)
        }
    };

    return {
        categorias,
        fetchCategorias,
    };
});