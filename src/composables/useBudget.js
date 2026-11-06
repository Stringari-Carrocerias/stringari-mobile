import { ref } from "vue";
import { useCNPJStore } from "@/stores/cnpj";
import { capitalize } from "@/utils/capitalizeFirstLetter";

export function useBudget() {
  const cnpjStore = useCNPJStore();

  const loading = ref(false);

  const cnpjObject = ref({
    cnpj: "",
    requesterName: "",
    businessName: "",
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
      businessName: cnpjData.razao_social,
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
      businessName: "",
      email: "",
      address: "",
      phoneNumber: "",
      legalName: "",
    };
  }

  const truckBody = ref({
    type: "",
    model: "",
    length: null,
    width: null,
    sidePanels: null,
    material: "",
  });

  const includedAcessories = ref({
    mudguards: "4 Para-barros",
    floor: "Assoalho 2cm",
    retroreflective: "Faixas Refletivas Conforme Norma",
    toolbox: "01 Caixa de ferramenta pequena",
    tieDownDevices: "Dispositivos de amarração em todas as travessas",
    finish: "Acabamento em Tinta PU",
    approved: "Carroceria homologada (C.A.T.)",
  });

  return {
    truckBody,
    cpfObject,
    cnpjObject,
    handleCNPJ,
    handleErase,
    loading,
    personType,
  };
}
