import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import Cookies from 'js-cookie';
import { apiConfig } from "../config/apiConfig";
const baseUrl = apiConfig;

// Helper untuk mendapatkan Token (customize sesuai kebutuhan Anda, misal dari localStorage)
const getToken = (): string | null => {
    return Cookies.get("accessToken"); 
};

// Fungsi untuk membuat instance Axios tanpa autentikasi
export const createAxiosWithoutAuth = (proxy: string): AxiosInstance => {
    const axiosInstance = axios.create({
        baseURL: baseUrl+proxy,
        timeout: 10000, // Timeout untuk request
        headers: {
            "Accept": "application/json", // Default headers
            "Content-Type": "application/json", // Default headers
        },
    });

    // Interceptor untuk menambahkan Authorization header
    axiosInstance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            // 🔍 Log request detail
            console.log('[Axios Request]', {
                url: config.baseURL + config.url,
                method: config.method,
                headers: config.headers,
                data: config.data,
            });

            return config;
        },
        (error) => {
            console.error('[Axios Request Error]', error);
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            // 🔍 Log response detail
            console.log('[Axios Response]', {
                status: response.status,
                url: response.config.url,
                data: response.data,
            });

            return response;
        },
        (error) => {
            // 🔍 Log error response (e.g. 404, 500)
            if (error.response) {
                console.error('[Axios Response Error]', {
                    status: error.response.status,
                    url: error.config.url,
                    data: error.response.data,
                });
            } else {
                console.error('[Axios Error]', error.message);
            }

            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

// Fungsi untuk membuat instance Axios dengan autentikasi Bearer token
export const createAxiosWithAuth = (proxy: string): AxiosInstance => {
    const axiosInstance = axios.create({
        baseURL: baseUrl+proxy,
        timeout: 10000,
        headers: {
            "Accept": "application/json", // Default headers
            "Content-Type": "application/json",
        },
    });

    // Interceptor untuk menambahkan Authorization header
    axiosInstance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = getToken(); // Ambil token
            if (token) {
                // @ts-ignore
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${token}`; // Tambahkan Bearer token ke header
            }

            // 🔍 Log request detail
            console.log('[Axios Request]', {
                url: config.baseURL + config.url,
                method: config.method,
                headers: config.headers,
                data: config.data,
            });

            return config;
        },
        (error) => {
            console.error('[Axios Request Error]', error);
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            // 🔍 Log response detail
            console.log('[Axios Response]', {
                status: response.status,
                url: response.config.url,
                data: response.data,
            });

            return response;
        },
        (error) => {
            // 🔍 Log error response (e.g. 404, 500)
            if (error.response) {
                console.error('[Axios Response Error]', {
                    status: error.response.status,
                    url: error.config.url,
                    data: error.response.data,
                });
            } else {
                console.error('[Axios Error]', error.message);
            }

            return Promise.reject(error);
        }
    );

    return axiosInstance;
};