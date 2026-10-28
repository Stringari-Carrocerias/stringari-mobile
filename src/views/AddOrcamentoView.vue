<template>
  <div class="container">
    <div class="title-container">
      <h1>Criar Orçamento</h1>
    </div>
    <form
      class="form-container"
      @submit.prevent="handleSubmit"
    >
      <div class="cnpj-container">
        <div class="cnpj-search">
          <label>
            <input
              type="text"
              v-model="cnpjValue"
              placeholder="Digite o CNPJ"
            />
          </label>
          <div class="cnpj-btn" @click="handleCNPJ">
            <p>{{ loading ? "Buscando..." : "Buscar" }}</p>
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </div>
        </div>
      </div>

      <div class="form-input">
        <div class="info-container">
          <p>Nome do Solicitante</p>
          <label name="requesterName">
            <input
              name="requesterName"
              v-model="requesterName"
              placeholder="Ex: Douglas Stringari"
            />
          </label>
        </div>

        <div class="info-container">
          <p>Nome da Empresa</p>
          <label name="businessName">
            <input
              name="businessName"
              v-model="businessName"
              placeholder="Ex: Stringari Carrocerias, LTDA..."
            />
          </label>
        </div>

        <div class="info-container">
          <p>Endereço</p>
          <label name="address">
            <input
              name="address"
              v-model="address"
              placeholder="Ex: Rua Ribeirão do Salto, 1283"
            />
          </label>
        </div>

        <div class="info-container">
          <p>Nome Fantasia</p>
          <label name="legalName">
            <input
              name="legalName"
              v-model="legalName"
              placeholder="Ex: Stringari Carroceerias"
            />
          </label>
        </div>

        <div class="info-container">
          <p>Email</p>
          <label name="email">
            <input
              name="email"
              v-model="email"
              placeholder="Ex: email@exemplo.com"
            />
          </label>
        </div>

        <div class="info-container">
          <p>Telefone</p>
          <label name="phoneNumber">
            <input
              name="phoneNumber"
              v-model="phoneNumber"
              v-maska
              data-maska="+55 (##) #####-####"
              placeholder="+55 (##) #####-####"
            />
          </label>
        </div>
      </div>
      <div class="btn-container">
        <button class="btn-cancel" type="button" @click="handleErase">
          Cancelar
        </button>
        <button class="btn-submit" type="submit">Criar</button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";
import { useCNPJStore } from "@/stores/cnpj";
import { vMaska } from "maska/vue";

import { capitalize } from "@/utils/capitalizeFirstLetter";

const cnpjStore = useCNPJStore();

const cnpjValue = ref("");
const requesterName = ref("");
const businessName = ref("");
const email = ref("");
const address = ref("");
const phoneNumber = ref("");
const legalName = ref("");
const loading = ref(false);

const cnpjObject = ref({
  cnpj: cnpjValue.value,
  requesterName: requesterName.value,
  businessName: businessName.value,
  email: email.value,
  address: address.value,
  phoneNumber: phoneNumber.value,
  legalName: legalName.value,
});

async function handleCNPJ() {
  loading.value = true;
  await cnpjStore.fetchCNPJ(cnpjValue.value);

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

  cnpjValue.value = cnpjObject.value.cnpj;
  requesterName.value = cnpjObject.value.requesterName;
  businessName.value = cnpjObject.value.businessName;
  email.value = cnpjObject.value.email;
  address.value = cnpjObject.value.address;
  phoneNumber.value = cnpjObject.value.phoneNumber;
  legalName.value = cnpjObject.value.legalName;

  loading.value = false;

}
</script>
<style scoped>

/* ===== ESTILOS GERAIS ===== */

.cnpj-container {
  .cnpj-search {
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 2px 4px 1px rgba(229, 229, 229, 0.5);
    align-items: center;

    border-radius: 24px;

    label {
      input {
        border: none;
        text-decoration: none;
      }
    }

    .cnpj-btn {
      color: #767676;
      display: flex;
      gap: 8px;
      align-items: center;
    }
  }
}

.info-container {
  border-bottom: 1px solid #e5e5e5;

  p {
    font-weight: 600;
  }

  input {
    width: 100%;
    border: none;
    outline: none;
    font-weight: 400;
  }
}

.btn-container {
  display: flex;

  .btn-cancel {
    background: none;
    border: 1px solid #767676;
  }

  .btn-submit {
    border: none;
    background: #c71e25;
    color: white;
    font-weight: 500;
    cursor: pointer;
  }
}

/* ===== MOBILE ===== */

@media (max-width: 767px) {
  .title-container {
    padding: 4vw;
    font-size: 5vw;
  }

  .form-container {
    margin: 0 6vw;
  }

  .cnpj-container {
    .cnpj-search {
      padding: 4vw;
      border-radius: 24px;
      font-size: 3vw;

      .cnpj-btn {
        gap: 2vw;
      }
    }
  }

  .info-container {
    padding-bottom: 1vw;
    font-size: 3vw;

    p {
      margin: 3vw 0;
    }
  }

  .btn-container {
    position: fixed;
    bottom: 15%;
    right: 8vw;
    left: 8vw;
    margin-top: 4vw;
    width: 100%;
    gap: 8px;

    .btn-cancel {
      width: 35%;
      padding: 10px;
      border-radius: 10px;
    }

    .btn-submit {
      padding: 10px;
      border-radius: 10px;
      width: 50%;
    }
  }
}

/* ===== DESKTOP ===== */

@media (min-width: 768px) {
  .container {
    max-width: 1300px;
    margin: 0 auto;
  }

  .title-container {
    padding: 0 0 24px;
    
    h1 {
      font-size: 32px;
    }
  }

  .cnpj-container {
    .cnpj-search {
      padding: 20px 24px;
      font-size: 16px;

      label {
        flex: 1;

        input {
          width: 100%;
          font-size: 16px;
        }
      }
    }
  }

  .form-input {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 32px;
  }

  .info-container {
    padding-bottom: 12px;
    margin-top: 24px;
    font-size: 16px;

    p {
      margin: 0 0 12px;
    }
  }

  .btn-container {
    width: 360px;
    margin: 4vw 0 0 auto;

    .btn-cancel {
      width: 40%;
      padding: 10px;
      border-radius: 40px;
    }

    .btn-submit {
      padding: 12px;
      margin-left: 8px;
      width: 60%;
      border-radius: 40px;
    }
  }
}

</style>
