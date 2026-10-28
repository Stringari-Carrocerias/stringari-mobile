import axios from "axios";

const BASE_URL = 'https://minhareceita.org/'

// 'https://receitaws.com.br/v1/cnpj/{cnpj}';


const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient