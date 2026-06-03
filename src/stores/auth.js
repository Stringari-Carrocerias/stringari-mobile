import { defineStore } from "pinia";
import { ref, computed } from "vue";
import authAPI from "@/api/authAPI";

export const useAuthStore = defineStore('auth', () => {
    const accessToken = ref(localStorage.getItem('access_token'));
    const refreshToken = ref(localStorage.getItem('refresh_token'));

    const isAuthenticated = computed(() => !!accessToken.value);

    async function login(email, password) {
        const { data } = await authAPI.login(email, password);
        accessToken.value = data.access;
        console.log('passou aqui ', data)
        refreshToken.value = data.refresh;
        localStorage.setItem('access_token', data.access)
        localStorage.setItem('refresh_token', data.refresh)
    }

    function logout() {
        accessToken.value = null;
        refreshToken.value = null;
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }

    return {
        accessToken,
        refreshToken,
        isAuthenticated,
        login,
        logout,
    }

})