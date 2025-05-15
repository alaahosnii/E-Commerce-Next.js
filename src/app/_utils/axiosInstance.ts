import axios from "axios";
import axiosInstance from "@/app/_redux/services/axiosInstance";
import { cookies, headers } from "next/headers";

const isBrowser = typeof window !== "undefined";

const instance = axios.create({
    baseURL: "https://node-js-e-comm-server.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
instance.interceptors.request.use(
    (config) => {
        if (isBrowser) {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log("Error response:", {
            status: error.response?.status,
            message: error.response?.data?.message,
            fullError: error
        });

        if (error.code === "ERR_NETWORK") {
            return Promise.reject(error.message);
        }

        if (error.response?.status === 401 && error.response?.data?.message === "Token Expired") {
            console.log("Token expired detected, attempting to refresh...");
            
            // Only attempt token refresh in browser environment
            // if (!isBrowser) {
            //     console.log("Not in browser environment, skipping token refresh");
            //     return Promise.reject(error);
            // }

            try {
                const token =  (await cookies()).get("token")?.value;
                if (!token) {
                    console.log("No token found in localStorage");
                    return Promise.reject(error);
                }

                const response = await axiosInstance.get("/auth/refreshToken", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                if (response.status === 200) {
                    console.log("Token refreshed successfully");
                    // (await cookies()).set("token", response.data.token);
                    error.config.headers.Authorization = `Bearer ${response.data.token}`;
                    return instance.request(error.config);
                }
            } catch (refreshError) {
                console.error("Failed to refresh token:", refreshError);
                // Clear token if refresh fails
                if (isBrowser) {
                    localStorage.removeItem("token");
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default instance;