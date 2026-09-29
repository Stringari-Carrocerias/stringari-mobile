import axios from "axios";

const BASE_URL = 'https://minhareceita.org'

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient