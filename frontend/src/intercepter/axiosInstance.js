import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(import.meta.env.VITE_WINE_TOKEN);
        const guestId = localStorage.getItem("guestId");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (!token && guestId) {
            if (config.method === "get") {
                config.params = { ...config.params, guestId };
            } else {
                config.data = { ...config.data, guestId };
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Auto logout or notify on unauthorized
        if (error.response?.status === 401) {
            console.log("Unauthorized: Token expired or invalid");
            localStorage.removeItem(import.meta.env.VITE_WINE_TOKEN);
            Optional: // redirect to login
            window.location.href = "/account/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
