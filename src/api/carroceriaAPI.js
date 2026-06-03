import apiClient from './config.js';

const carroceriasApi = {
  getAll(categoriaSelecionada) {
    return apiClient.get(`api/modelosCarrocerias/?categoria=${categoriaSelecionada}`);
  },

  create(title) {
    return apiClient.post('api/modelosCarrocerias/', { title });
  },

  update(id, data) {
    return apiClient.patch(`api/modelosCarrocerias/${id}`, data);
  },

  remove(id) {
    return apiClient.delete(`api/modelosCarrocerias/${id}`);
  },

  uploadImage(file, description = '') {
    const formData = new FormData();
    formData.append('file', file);
    if (description) formData.append('description', description);
    return apiClient.post('api/media/images/', formData, {
      headers: { 'Content-Type' : 'multipart/form-data' },
    });
  },
};

export default carroceriasApi;