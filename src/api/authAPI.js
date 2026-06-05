import apiClient from "./config";

const authAPI = {
  login(email, password) {
    return apiClient.post("/api/token/", { email, password });
  },

  cadastro(email, password) {
    return apiClient.post("api/registro/", { email, password });
  }
};

export default authAPI;
