import apiClient from "./config";

const userApi = {
  getCustomer(data) {
    return apiClient.get("/api/usuarios/?groups=1", data)
  },

  searchCustomer(text, data) {
    return apiClient.get(`/api/usuarios/?groups=1&search=${text}`, data);
  },

  createCustomerCNPJ(data) {
    return apiClient.post('api/registro/cnpj/', data);
  },

  createCustomerCPF(data) {
    return apiClient.post('api/registro/cpf/', data);
  },

  getMe(data) {
    return apiClient.get("/api/usuarios/me/", data);
  },
  update(id, data) {
    return apiClient.patch(`api/usuarios/me/`, data);
  },
  uploadImage(file, description = "") {
    const formData = new FormData();
    formData.append("file", file);
    if (description) formData.append("description", description);
    return apiClient.post("api/media/images/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default userApi;
