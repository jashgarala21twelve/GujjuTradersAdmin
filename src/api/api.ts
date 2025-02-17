import {
  ApiErrorToast,
  showApiErrorToast,
} from '@/components/toast/errorToast';
import { BASE_API_URL } from '@/utils/constants';
import { getToken } from '@/utils/sessionStorage';
import axios, { AxiosError } from 'axios';
import Toast from '@/components/toast/commonToast';

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000, // Optional: Set request timeout
});

// Optional: Add request interceptor (e.g., for auth tokens)
api.interceptors.request.use(
  config => {
    // Example: Attach token if needed
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Optional: Add response interceptor (e.g., for error handling)
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const axiosRequestWrapper = async <T>(
  requestFn: (...args: any[]) => Promise<{ data: T }>,
  ...args: any[]
): Promise<T> => {
  try {
    const response = await requestFn(...args);
    return response.data;
  } catch (error) {
    let errorMessage = 'An unexpected error occurred';
    let statusCode;
    let endpoint;

    if (error instanceof AxiosError) {
      statusCode = error.response?.status;
      errorMessage = error.response?.data?.message || error.message;
      endpoint = error.config?.url; // Get the endpoint
    }
    Toast('destructive', errorMessage, '', 5000);
    // showApiErrorToast(errorMessage, statusCode, endpoint);
    throw error; // Rethrow error for further handling
  }
};
export default api;
