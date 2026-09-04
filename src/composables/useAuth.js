import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useToastStore } from "@/stores/toast";

export function useAuth() {
  const router = useRouter();
  const authStore = useAuthStore();
  const toast = useToastStore();

  const email = ref("");
  const password = ref("");

  const loading = ref(false);

  async function handleLogin() {
    if (!email.value) return toast.showToast('Email inválido', 'error')
    if (!password.value || password.value.length < 8) return toast.showToast('Senha inválida', 'error')
    
    loading.value = true;
    try {
      await authStore.login(email.value, password.value);
      toast.showToast("Login realizado com sucesso.");
      router.push("/");
    } catch (error) {
      toast.showToast("Erro ao realizar login.", "error");
    } finally {
      loading.value = false;
    }
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

  const handleLogout = () => {
    try {
      authStore.logout();
      handleRoute('login')
      toast.showToast("Volte sempre 😁.");
    } catch (error) {
      toast.showToast("Erro ao sair da conta.", "error");
    }
  };

  function handleRoute(value) {
    router.push({ name: value });
  }

  return {
    email,
    password,
    loading,

    handleLogin,
    handleSignup,
    handleRoute,
    handleLogout,
  };
}
