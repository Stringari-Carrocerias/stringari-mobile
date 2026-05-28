import apiClient from './config.js';

const carroceriasApi = {
  getAll(categoriaSelecionada) {
    return apiClient.get(`api/modelosCarrocerias/?categoria=${categoriaSelecionada}`);
  },

  create(title) {
    return apiClient.post('api/modelosCarrocerias', { title });
  },

  update(id, data) {
    return apiClient.patch(`api/modelosCarrocerias/${id}`, data);
  },

  remove(id) {
    return apiClient.delete(`api/modelosCarrocerias/${id}`);
  },
};

export default carroceriasApi;