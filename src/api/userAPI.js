import apiClient from "./config";

const userApi = {
  getMe(data) {
    return apiClient.get("/api/usuarios/me/", data);
  },
  update(id, data) {
    return apiClient.patch(`api/usuarios/${id}/`, data);
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
