import { ref } from "vue";
import { defineStore } from "pinia";
import cnpjApi from "@/api/cnpjAPI";

export const useCNPJStore = defineStore('cnpj', () => {
    const cnpjData = ref();

    async function fetchCNPJ(id) {
        try {
            const response = await cnpjApi.getByCNPJ(id)
            cnpjData.value = response.data
        } catch (err) {
            console.error(err)  
        }
    };

    return {
        cnpjData,
        fetchCNPJ,
    }
})