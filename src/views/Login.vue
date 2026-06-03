<template>
  <div class="container">
    <img src="/logo.png" alt="Logo" />

    <div class="form">
      <input
        type="email"
        placeholder="seu@email.com"
      />

      <input
        type="password"
        placeholder="Digite sua senha"
      />

      <button class="btn-primary">
        Entrar
      </button>
    </div>

    <button class="btn-outline">
      Criar nova conta
    </button>

    <p class="footer">
    <img src="/logo-original.png" alt="Logo" />
    </p>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  background: #efefef;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 24px;
}

.footer img {
  width: 100px;
}

.container img {
  width: 120px;
  margin-top: 60px;
  margin-bottom: 100px;
}

.form {
  width: 100%;
  max-width: 320px;
}

input {
  width: 100%;
  height: 45px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0 12px;
  box-sizing: border-box;
}

.btn-primary {
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 25px;
  background: #ff2a0a;
  color: white;
  cursor: pointer;
}

.btn-outline {
  margin-top: 140px;
  width: 100%;
  max-width: 320px;
  height: 48px;
  border-radius: 25px;
  background: transparent;
  border: 1px solid #ff2a0a;
  color: #ff2a0a;
  margin-bottom: 20px;
}

.footer {
  font-size: 10px;
}
</style>