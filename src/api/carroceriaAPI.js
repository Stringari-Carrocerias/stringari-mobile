import apiClient from './config.js';

const carroceriasApi = {
  getAll() {
    return apiClient.get('/modelos%20carrocerias');
  },

  create(title) {
    return apiClient.post('/modelos%20carrocerias', { title });
  },

  update(id, data) {
    return apiClient.patch(`/modelos%20carrocerias/${id}`, data);
  },

  remove(id) {
    return apiClient.delete(`/modelos%20carrocerias/${id}`);
  },
};

export default carroceriasApi;