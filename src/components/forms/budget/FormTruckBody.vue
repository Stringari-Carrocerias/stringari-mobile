<template>
  <div>
    
  </div>
</template>

<script setup>
import { ref } from "vue";

import { useBudget } from "@/composables/useBudget";

const { truckBody } = useBudget();

</script>

<style scoped>
.form-container {
  margin: 0 6vw;
}

fieldset {
  min-width: 0;
  margin-bottom: 24px;
  padding: 0;
  border: none;
}

legend {
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
}

.form-input {
  display: grid;
  gap: 20px 32px;
}

.info-container {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e5e5;
}

.info-container span {
  font-weight: 600;
}

.info-container input {
  width: 100%;
  min-width: 0;
  padding: 8px 0;
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  font-weight: 400;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  margin-top: 16px;
  cursor: pointer;
}

.checkbox-container input {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  accent-color: #c71e25;
}

input:focus-visible,
button:focus-visible {
  outline: 2px solid #c71e25;
  outline-offset: 4px;
}

.btn-container {
  display: flex;
  gap: 8px;
  margin-top: 24px;
}

.btn-container button {
  min-height: 44px;
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  font: inherit;
  cursor: pointer;
}

.btn-cancel {
  border: 1px solid #767676;
  background: none;
  color: inherit;
}

.btn-submit {
  border: none;
  background: #c71e25;
  color: white;
}

@media (min-width: 768px) {
  .form-container {
    margin: 0;
  }

  .form-input {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .btn-container {
    width: 360px;
    margin-left: auto;
  }

  .btn-container button {
    border-radius: 40px;
  }
}
</style>
