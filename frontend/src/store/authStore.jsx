import { create } from "zustand"
import axios from "axios"



const baseUrl = "http://localhost:8000/api/auth"
axios.defaults.withCredentials = true;


export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: false,
    isLoading: false,
    isCheckingAuth: true,
    message: null,


    register: async (email, password, name) => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.post(`${baseUrl}/register`, { email, password, name });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.message || "Error registering ", isLoading: false });
            throw error
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.post(`${baseUrl}/login`, { email, password });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.message || "Error while login ", isLoading: false });
            throw error
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.post(`${baseUrl}/logout`);
            set({ user: null, isAuthenticated: false, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response.data.message || "Error while logout ", isLoading: false });
            throw error
        }
    },

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.post(`${baseUrl}/verify-email`, { code });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.message || "Error registering ", isLoading: false });
            throw error
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null })

        try {
            const response = await axios.post(`${baseUrl}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            set({ isCheckingAuth: false, isAuthenticated: false, error: null });
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.post(`${baseUrl}/forgot-password`, { email })
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.message || "Error sending reset password email",
            });
            throw error;
        }
    },

    resetPassword: async (token, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${baseUrl}/reset-password/${token}`, { password });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.message || "Error resetting password",
            });
            throw error;
        }
    },



}))