<template>
  <form class="form-container" @submit.prevent="handleCNPJ">
    <div class="info-container">
      <p>Nome do Solicitante</p>
      <label name="requesterName">
        <input
          name="requesterName"
          v-model="cpfObject.requesterName"
          placeholder="Ex: Douglas Stringari"
        />
      </label>
    </div>

    <div class="info-container">
      <p>Endereço</p>
      <label name="address">
        <input
          name="address"
          v-model="cpfObject.address"
          placeholder="Ex: Rua Ribeirão do Salto, 1283"
        />
      </label>
    </div>

    <div class="info-container">
      <p>Email</p>
      <label name="email">
        <input
          name="email"
          v-model="cpfObject.email"
          placeholder="Ex: email@exemplo.com"
        />
      </label>
    </div>

    <div class="info-container">
      <p>Telefone</p>
      <label name="phoneNumber">
        <input
          name="phoneNumber"
          v-model="cpfObject.phoneNumber"
          v-maska
          data-maska="+55 (##) #####-####"
          placeholder="+55 (##) #####-####"
        />
      </label>
    </div>

    <div class="btn-container">
      <button class="btn-cancel" type="button" @click="handleErase">
        Cancelar
      </button>
      <button class="btn-submit" type="submit">Criar</button>
    </div>
  </form>
</template>

<script setup>
import { vMaska } from "maska/vue";
import { useBudget } from "@/composables/useBudget";

const { cpfObject } = useBudget();

</script>

<style scoped>
/* ==== GENERAL ==== */

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
