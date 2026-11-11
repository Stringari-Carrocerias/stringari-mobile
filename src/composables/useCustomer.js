import { ref } from "vue";
import { useCNPJStore } from "@/stores/cnpj";
import { useUsuarioStore } from "@/stores/usuario";
import { capitalize } from "@/utils/capitalizeFirstLetter";

export function useCustomer() {
  const cnpjStore = useCNPJStore();
  const usuarioStore = useUsuarioStore();

  const loading = ref(false);

  const cnpjObject = ref({
    cnpj: "",
    requesterName: "",
    fullName: "",
    email: "",
    address: "",
    phoneNumber: "",
    legalName: "",
  });

  const cpfObject = ref({
    requesterName: "",
    email: "",
    address: "",
    phoneNumber: "",
  });


  const personType = ref("CNPJ");

  async function addCustomerCNPJ() {
    try {
      const payloadCNPJ = {
        cnpj: cnpjObject.value.cnpj,
        fullName: cnpjObject.value.fullName,
        email: cnpjObject.value.email,
        address: cnpjObject.value.address,
        phone: cnpjObject.value.phoneNumber,
        legalName: cnpjObject.value.legalName, 
        password: "teste.123",
      };
      loading.value = true;
      await usuarioStore.addCustomerCNPJ(payloadCNPJ);
      toast.showToast("Cliente adicionado com sucesso.");
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function handleCNPJ() {
    loading.value = true;
    await cnpjStore.fetchCNPJ(cnpjObject.value.cnpj);

    const cnpjData = cnpjStore.cnpjData;

    const capitalizedObject = {
      descricao_tipo_de_logradouro: capitalize(
        cnpjData.descricao_tipo_de_logradouro,
      ),
      logradouro: capitalize(cnpjData.logradouro),
      complemento: capitalize(cnpjData?.complemento),
      bairro: capitalize(cnpjData.bairro),
      municipio: capitalize(cnpjData.municipio),
    };

    const endereco = `${capitalizedObject.descricao_tipo_de_logradouro} ${capitalizedObject.logradouro}, ${cnpjData.numero} ${capitalizedObject.complemento ? "" : `- ${capitalizedObject.complemento}`} ${capitalizedObject.bairro}, ${capitalizedObject.municipio ? `${capitalizedObject.municipio} -` : ``} ${cnpjData.uf} - ${cnpjData.cep}`;
    cnpjObject.value = {
      cnpj: cnpjData.cnpj,
      fullName: cnpjData.razao_social,
      email: cnpjData.email,
      address: endereco,
      phoneNumber: cnpjData.phoneNumber,
      legalName: cnpjData.nome_fantasia,
    };

    loading.value = false;
  }

  async function handleErase() {
    cnpjObject.value = {
      cnpj: "",
      requesterName: "",
      fullName: "",
      email: "",
      address: "",
      phoneNumber: "",
      legalName: "",
    };
  }

  async function addCustomerCPF() {
    try {
      const payloadCPF = {
        fullName: cpfObject.value.requesterName,
        email: cpfObject.value.email,
        address: cpfObject.value.address,
        phone: cpfObject.value.phoneNumber,
        password: "teste.123",
      };
      loading.value = true;
      await usuarioStore.addCustomerCPF(payloadCPF);
      toast.showToast("Cliente adicionado com sucesso.");
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  }


  return {
    cpfObject,
    cnpjObject,
    loading,
    personType,

    addCustomerCNPJ,
    addCustomerCPF,
    handleCNPJ,
    handleErase,
  };
}
