import AppButton from "@/components/forms/models/AppButton.vue";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useCarroceriasStore } from "@/stores/carroceria.js";
import { useCategoriasStore } from "@/stores/categoria.js";
// Toast
import { useToastStore } from "@/stores/toast.js";

export function useModelCard() {

    
    const toast = useToastStore();
    
    // Modelos de Carrocerias
    
    const { carrocerias } = storeToRefs(useCarroceriasStore());
    const { categorias } = storeToRefs(useCategoriasStore());
    
    const { fetchCarrocerias } = useCarroceriasStore();
    const { fetchCategorias } = useCategoriasStore();
    
    const categoriaSelect = ref(-1);
    
    const categoriaSelecionada =
    categoriaSelect.value === -1 ? "" : categoriaSelect.value;
    
    onMounted(async () => {
        try {
            await fetchCategorias();
        } catch (error) {
            toast.showToast("Erro ao carregar categorias.", "error");
        }
        
        try {
            await fetchCarrocerias(categoriaSelecionada);
        } catch (error) {
            toast.showToast("Erro ao carregar modelos.", "error");
        }
    });
    
    const handleFiltro = async () => {
        try {
            const categoriaSelecionada =
            categoriaSelect.value === -1 ? "" : categoriaSelect.value;
            await fetchCarrocerias(categoriaSelecionada);
        } catch (error) {
            toast.showToast(
                error.response?.data?.detail || "Erro ao filtrar.",
                "error",
            );
        }
    };
}