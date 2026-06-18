import { defineStore } from "pinia";
import authService from "../services/auth.service";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },

  actions: {
    async login(loginData) {
      try {
        const response = await authService.loginUser(loginData);

        this.user = response.data.user;
        this.accessToken = response.data.accessToken;
        this.refreshToken = response.data.refreshToken;

        localStorage.setItem("accessToken", this.accessToken);
        localStorage.setItem("refreshToken", this.refreshToken);
        localStorage.setItem("user", JSON.stringify(this.user));

        return response;
      } catch (error) {
        throw error;
      }
    },
    initializeAuth() {
      const user = localStorage.getItem("user");

      this.user = user ? JSON.parse(user) : null;
      this.accessToken = localStorage.getItem("accessToken");
      this.refreshToken = localStorage.getItem("refreshToken");
    },

    async register(registerData) {
      try {
        const response = await authService.registerUser(registerData);

        return response;
      } catch (error) {
        throw error;
      }
    },

    async logout() {
      try {
        await authService.logoutUser();
      } catch (error) {
        console.error(error);
      }

      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
  },
});
