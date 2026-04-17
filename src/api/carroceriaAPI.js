import apiClient from './config.js';

const carroceriasApi = {
  getAll() {
    return apiClient.get('api/modelos%20carrocerias');
  },

  create(title) {
    return apiClient.post('api/modelos%20carrocerias', { title });
  },

  update(id, data) {
    return apiClient.patch(`api/modelos%20carrocerias/${id}`, data);
  },

  remove(id) {
    return apiClient.delete(`api/modelos%20carrocerias/${id}`);
  },
};

export default carroceriasApi;