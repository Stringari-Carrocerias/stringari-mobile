import { ref } from "vue";
import carroceriaApi from "@/api/carroceriaAPI";

import { useCarroceriasStore } from "@/stores/carroceria";
import { useCategoriasStore } from "@/stores/categoria";
import { useToastStore } from "@/stores/toast";
import { parseDecimal } from "@/utils/parseDecimal";

export function useModels() {
  const { addCarroceria, fetchCarrocerias } = useCarroceriasStore();
  const categoriasStore = useCategoriasStore();
  const toast = useToastStore();

  const previewUrl = ref(null);
  const imgAttachmentKey = ref(null);
  const uploading = ref(false);
  const toggleCategoria = ref(false);

  const newModel = ref({
    imagem_attachment_key: imgAttachmentKey.value,
    nome: "",
    valor: null,
    comprimento: null,
    largura: null,
    altura: null,
    descricao: "",
    descricaoCurta: "",
    categoria_send: "",
  });

  async function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) return;
    uploading.value = true;

    try {
      const response = await carroceriaApi.uploadImage(file);
      previewUrl.value = response.data.url;
      imgAttachmentKey.value = response.data.attachment_key;
      newModel.value.imagem_attachment_key = response.data.attachment_key;
      toast.showToast("Upload realizado com sucesso.");
    } catch (error) {
      toast.showToast("Erro ao fazer upload da imagem ", error);
      previewUrl.value = null;
      imgAttachmentKey.value = null;
    } finally {
      uploading.value = false;
    }
  }

  function handleError(data, error) {
    if (data?.imagem_attachment_key) {
      if (newModel.value.imagem_attachment_key === null)
        return toast.showToast("Insira uma imagem", error);
      return toast.showToast("Erro em imagem", error);
    }
    if (data?.nome) {
      return toast.showToast("Nome inválido", error);
    }
    if (data?.categoria_send) {
      return toast.showToast("Categoria inválida.", error);
    }

    if (data?.descricaoCurta) {
      return toast.showToast("Descrição curta inválida.", error);
    }

    if (data?.descricao) {
      return toast.showToast("Descrição inválida.", error);
    }

    if (data?.largura) {
      return toast.showToast("Largura inválida.", error);
    }

    if (data?.comprimento) {
      return toast.showToast("Comprimento inválido.", error);
    }

    if (data?.altura) {
      return toast.showToast("Altura inválida.", error);
    }

    if (data?.valor) {
      return toast.showToast("Preço inválido.", error);
    }
    return false;
  }

  async function handleSubmit() {
    newModel.value.comprimento = parseDecimal(newModel.value.comprimento);
    newModel.value.largura = parseDecimal(newModel.value.largura);
    newModel.value.altura = parseDecimal(newModel.value.altura);

    // Adiciona Categoria

    const verificarCategoria = categoriasStore.categorias.filter(
      (categoria) => categoria.nome === newModel.value.categoria_send,
    );

    if (verificarCategoria.length === 0) {
      await categoriasStore.addCategoria(newModel.value.categoria_send);
      console.log(newModel.value.categoria_send);
    }

    try {
      await addCarroceria(newModel.value);
      toast.showToast("Carroceria adicionada com sucesso.");
      previewUrl.value = null;
      imgAttachmentKey.value = null;

      handleErase();
    } catch (error) {
      const data = error.response?.data;

      const handled = handleError(data, "error");

      if (handled === false) {
        return toast.showToast("Erro ao adicionar carroceria.", "error");
      }
    }
  }

  function handleCategoria() {
    if (newModel.value.categoria_send == "Outros") {
      toggleCategoria.value = !toggleCategoria.value;
    }
  }

  function handleErase() {
    newModel.value = {
      imagem_attachment_key: null,
      nome: "",
      valor: null,
      comprimento: null,
      largura: null,
      altura: null,
      descricao: "",
      descricaoCurta: "",
      categoria_send: "",
    };
  }

  // ==== Componente ModelCard ====

  const categoriaSelect = ref(-1);

  const categoriaSelecionada = categoriaSelect.value === -1 ? "" : categoriaSelect.value;

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

  return {
    newModel,
    previewUrl,
    imgAttachmentKey,
    uploading,
    toggleCategoria,
    categoriaSelect,
    
    handleImageChange,
    handleSubmit,
    handleCategoria,
    addCarroceria,
    handleErase,
    handleError,

    // === ModelCard ===
    
    categoriaSelecionada,
    categoriaSelect,
    handleFiltro,

  };
}
