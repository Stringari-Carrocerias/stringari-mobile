import apiClient from "./cnpj";

const cnpjApi = {
    getByCNPJ(cnpj) {
        return apiClient.get(`/${cnpj}`);
    }
}

export default cnpjApi;