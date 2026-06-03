<template>
  <div class="page">

    <header class="topbar">
      <button class="menu">☰</button>
      <div class="avatar"></div>
    </header>

    <section class="header">
      <h1>Modelos de Carrocerias</h1>
      <p>Conheça nossos modelos e escolha o ideal para sua necessidade</p>
      <span class="chip">Categorias</span>
    </section>

    <section class="list">

      <div class="card" v-for="item in dados" :key="item.id">

        <img
          class="image"
          :src="item.imagem || 'https://via.placeholder.com/400x200'"
        />

        <h2>{{ item.nome || 'Carroceria' }}</h2>

        <span class="tag">Transporte de carga</span>

        <p class="desc">
          {{ item.descricao || 'Descrição do modelo de carroceria.' }}
        </p>

        <h3>Especificações:</h3>

        <ul class="specs">
          <li>Largura: {{ item.largura || '2.5m' }}</li>
          <li>Comprimento: {{ item.comprimento || '7m' }}</li>
          <li>Altura: {{ item.altura || '3m' }}</li>
        </ul>

        <div class="actions">
          <button class="outline">Ver detalhes</button>
          <button class="primary">Solicitar orçamento</button>
        </div>

      </div>

    </section>

  </div>
</template>

<script>
export default {
  data() {
    return {
      dados: []
    };
  },

  mounted() {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/modelosCarrocerias/`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Erro HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Dados recebidos:", data);

        this.dados = Array.isArray(data)
          ? data
          : data.results || data.data || [];
      })
      .catch(error => {
        console.error("Erro ao buscar carrocerias:", error);
      });
  }
};
</script>

<style scoped>
.page {
  font-family: system-ui, Arial;
  padding: 20px;
  background: #f4f6f8;
  min-height: 100vh;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.menu {
  font-size: 26px;
  background: none;
  border: none;
  cursor: pointer;
}

.avatar {
  width: 38px;
  height: 38px;
  background: #bbb;
  border-radius: 50%;
}

.header {
  margin-top: 10px;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 26px;
  color: #C6070C;
  margin-bottom: 6px;
}

.header p {
  color: #6b7280;
  margin-bottom: 10px;
}

.chip {
  display: inline-block;
  padding: 6px 12px;
  background: #e5e7eb;
  border-radius: 999px;
  font-size: 12px;
  color: #374151;
}

/* LIST */
.list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* CARD */
.card {
  background: white;
  border-radius: 18px;
  padding: 14px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  transition: 0.2s ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 14px;
  margin-bottom: 10px;
}

.card h2 {
  font-size: 18px;
  margin-bottom: 6px;
  color: #111827;
}

.tag {
  display: inline-block;
  font-size: 12px;
  background: #f3f4f6;
  padding: 4px 10px;
  border-radius: 999px;
  margin-bottom: 10px;
  color: #374151;
}

.desc {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 10px;
}

/* SPECS */
.specs {
  padding-left: 18px;
  margin-bottom: 12px;
}

.specs li {
  font-size: 13px;
  color: #4b5563;
  margin-bottom: 4px;
}

/* ACTIONS */
.actions {
  display: flex;
  gap: 10px;
}

.outline {
  flex: 1;
  border: 1px solid #d1d5db;
  background: transparent;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
}

.outline:hover {
  background: #f3f4f6;
}

.primary {
  flex: 1;
  background: #16a34a;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
}

.primary:hover {
  background: #15803d;
}
</style>