<template>
  <div class="customer-container">
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
  </div>
</template>

<script setup>
import CustomerCard from "@/components/cards/CustomerCard.vue";
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
  .customer-container {
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
  * {
    max-width: 1000px;
    margin: 0 auto;
  }

  .search-container {
    .search-card {
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
}
</style>
