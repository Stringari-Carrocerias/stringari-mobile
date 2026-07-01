<template>
  <div class="home">

    <section class="hero">
      <h1>Sistema de Carrocerias</h1>
      <p>Explore modelos e solicite orçamentos de forma rápida</p>
    </section>

    <section class="card-action">
      <h2>Carrocerias</h2>
      <p>Acesse a lista de modelos disponíveis no sistema</p>

      <router-link to="/modelos">
        <button class="btn">
          Entrar na seção
        </button>
      </router-link>
    </section>

  </div>
</template>

<style scoped>
.home {
  font-family: Arial;
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
}


.hero {
  background: #C6070C;
  color: white;
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 20px;
  box-shadow: 0 8px 20px rgba(198, 7, 12, 0.25);
}

.hero h1 {
  margin: 0;
  font-size: 22px;
}

.hero p {
  margin-top: 8px;
  font-size: 14px;
  opacity: 0.9;
}


.card-action {
  background: white;
  padding: 18px;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
}

.card-action h2 {
  margin: 0;
  font-size: 18px;
  color: #111;
}

.card-action p {
  color: #6b7280;
  margin: 8px 0 16px;
}


.btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 12px;
  background: #C6070C;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
}

.btn:hover {
  background: #a9050a;
}
</style>