<template>
  <div class="customer-page">
    <div class="search-container">
      <div class="search-card">
        <label>
          <input type="text" placeholder="Buscar por CNPJ, nome.." v-model="searchText" />
        </label>
        <div class="search-btn" @click="searchCustomer(loading)">
          <p>{{ loading ? "Buscando..." : "Buscar" }}</p>
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </div>
      </div>
      <div class="filter-container">
        <Icon icon="bi:filter" height="2em" />
      </div>
    </div>

    <CustomerCard />
    <AppButton class="add-customer" route="AddCustomer">Adicionar Cliente</AppButton>
  </div>
</template>

<script setup>
import CustomerCard from "@/components/cards/CustomerCard.vue";
import AppButton from "@/components/forms/global/AppButton.vue";

import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useCustomer } from "@/composables/useCustomer";

const { searchCustomer, searchText } = useCustomer();
const loading = ref(false);
</script>

<style scoped>
.search-container {
  margin-top: 4vw;
  display: flex;
  .search-card {
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 2px 4px 1px rgba(229, 229, 229, 0.5);
    align-items: center;
    border-radius: 24px;

    label {
      input {
        border: none;
        text-decoration: none;
        align-items: center;
        font-size: 12px;
      }
    }

    .search-btn {
      color: #767676;
      display: flex;
      gap: 8px;
      align-items: center;
    }
  }

  .filter-container {
    display: flex;
    margin-left: 1vw;
    align-items: center;
    color: #767676;
  }
}

@media (max-width: 768px) {
  .customer-page {
    margin: 0 4vw;
  }

  .search-container {
    .search-card {
      padding: 4vw;
      border-radius: 24px;
      font-size: 3vw;

      .search-btn {
        gap: 2vw;
      }
    }
  }
}

@media (min-width: 769px) {
  .customer-page {
    width: calc(100% - 48px);
    max-width: 1000px;
    margin: 0 auto;
    padding: 32px 0;
  }

  .search-container {
    margin-top: 0;
    gap: 16px;

    .search-card {
      min-width: 0;
      gap: 24px;
      padding: 20px 24px;
      font-size: 16px;

      label {
        flex: 1;
        min-width: 0;

        input {
          width: 100%;
          font-size: 16px;
        }
      }

      .search-btn {
        flex-shrink: 0;
        cursor: pointer;
      }
    }

    .filter-container {
      flex-shrink: 0;
      margin-left: 0;
    }
  }

  .add-customer {
    position: static;
    display: block;
    width: auto;
    margin: 32px 0 0 auto;
    padding: 16px 24px;
    transform: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 40px;
  }
}
</style>
