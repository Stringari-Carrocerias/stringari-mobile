import { ref } from "vue";
import { defineStore } from "pinia";
import userApi from "@/api/userAPI";
import { useToastStore } from "./toast";

export const useUsuarioStore = defineStore("usuario", () => {
  const usuario = ref({});
  const customers = ref([]);
  const toast = useToastStore();

  async function fetchCustomer() {
    try {
      const response = await userApi.getCustomer();
      customers.value = response.data;
    } catch (err) {
      toast.showToast(err, "error");
    }
  }

  async function addCustomerCNPJ(payload) {
    try {
      console.log("Payload CNPJ:", payload);
      const response = await userApi.createCustomerCNPJ(payload);
      customers.value.push(response.data);
    } catch (err) {
      toast.showToast(err.response.data, "error");
    }
  }

  async function addCustomerCPF() {
    try {
      const response = await userApi.createCustomerCPF();
      customers.value.push(response.data);
    } catch (err) {
      toast.showToast(err, "error");
    }
  }

  async function fetchUsuario() {
    try {
      const response = await userApi.getMe();
      usuario.value = response.data;
    } catch (err) {
      console.error(err);
    }
  }

  async function updateUsuario(id, usuarioData) {
    try {
      const response = await userApi.update(id, usuarioData);
      usuario.value = response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return {
    customers,
    usuario,

    addCustomerCNPJ,
    addCustomerCPF,
    fetchCustomer,
    fetchUsuario,
    updateUsuario,
  };
});
