import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

import { useUsuarioStore } from "@/stores/usuario.js";
import { useToastStore } from "@/stores/toast.js";
import { useRouter } from "vue-router";

import userApi from "@/api/userAPI";

export function usePersonalInfo() {
  const router = useRouter();

  const { updateUsuario } = useUsuarioStore();
  const toast = useToastStore();

  const previewUrl = ref(null);
  const imgAttachmentKey = ref(null);
  const uploading = ref(false);

  const userInfo = ref({
    email: "",
    foto: imgAttachmentKey.value,
    fullName: null,
    phone: "",
  });

  const userGroup = ref();

  let userInfoBackup = ref({});

  async function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) return;
    uploading.value = true;

    try {
      const response = await userApi.uploadImage(file);

      previewUrl.value = response.data.url;
      imgAttachmentKey.value = response.data.attachment_key;
      userInfo.value.foto_attachment_key = imgAttachmentKey.value;

      toast.showToast("Upload realizado com sucesso.");
    } catch (error) {
      toast.showToast("Erro ao fazer upload da imagem", "error");
      previewUrl.value = null;
      imgAttachmentKey.value = null;
    } finally {
      uploading.value = false;
    }
  }

  function handleError(data) {
    if (data?.foto_attachment_key) {
      return toast.showToast("Erro ao adicionar imagem.", "error");
    }
    if (data?.email) {
      return toast.showToast("Email inválido", "error");
    }
    if (data?.fullName) {
      console.log("Error", userInfoBackup.value);
      return toast.showToast(
        data.fullName[0] || "Nome completo inválido",
        "error",
      );
    }
    if (data?.phone) {
      return toast.showToast("Telefone inválido", "error");
    }
    return false;
  }

  const handleUpdate = async (id, userData) => {
    console.log("Clicou", userInfoBackup.value);
    try {
      await updateUsuario(id, userData);
      toast.showToast("Alteração salva com sucesso.");
      userInfoBackup.value = { ...userInfo.value };
    } catch (error) {
      const data = error.response?.data;

      const handled = handleError(data);

      if (handled === false) {
        toast.showToast("Erro ao salvar alterações.", "error");
      }

      userInfo.value = { ...userInfoBackup.value };
    }
  };

  function handleRoute(route) {
    router.push(route);
  }

  return {
    userInfo,
    userInfoBackup,
    previewUrl,
    imgAttachmentKey,
    uploading,
    userGroup,

    handleImageChange,
    handleUpdate,
    handleRoute,
  };
}
