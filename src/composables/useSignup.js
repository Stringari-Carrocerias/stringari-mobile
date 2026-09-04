import LeftFillIcon from "@iconify-vue/mingcute/left-fill";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useToastStore } from "@/stores/toast";

export function useSignup() {
  const router = useRouter();
  const authStore = useAuthStore();

  const toast = useToastStore();

  const email = ref("");
  const password = ref("");
  const loading = ref(false);

  function handleRoute() {
    router.push({ name: "login" });
  }

  async function handleSignup() {
    loading.value = true;
    try {
      await authStore.signup(email.value, password.value);
      toast.showToast("Cadastro realizado com sucesso.");
      router.push("/login");
    } catch (error) {
      const data = error.response?.data;
      if (data?.email) {
        return toast.showToast("Digite um e-mail válido.", "error");
      }
      if (data?.password) {
        return toast.showToast("A senha deve ter 8 caracteres.", "error");
      }
      toast.showToast(
        error.response?.data?.detail || "Erro ao fazer cadastro.",
        "error",
      );
    } finally {
      loading.value = false;
    }
  }

  return {
    email,
    password,
    loading,

    handleRoute,
    handleSignup,
  }

}
