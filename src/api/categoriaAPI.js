import apiClient from './config.js';

const categoriaApi = {
  getAll() {
    return apiClient.get('api/categorias/');
  },

  create(nome) {
    return apiClient.post('api/categorias/', { nome });
  },

  update(id, data) {
    return apiClient.patch(`api/categorias/${id}`, data);
  },

  remove(id) {
    return apiClient.delete(`api/categorias/${id}`);
  },
};

export default categoriaApi;