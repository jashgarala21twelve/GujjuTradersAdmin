import {
  ApiErrorToast,
  showApiErrorToast,
} from '@/components/toast/errorToast';
import { BASE_API_URL } from '@/utils/constants';
import { getToken } from '@/utils/sessionStorage';
import axios, { AxiosError, AxiosResponse } from 'axios';
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
  requestFn: (...args: unknown[]) => Promise<AxiosResponse<T>>,
  ...args: unknown[]
): Promise<T> => {
  try {
    const response = await requestFn(...args);
    return response.data;
  } catch (error) {
    let errorMessage = 'An unexpected error occurred';
    let statusCode: number | undefined;
    let endpoint: string | undefined;

    if (error instanceof AxiosError) {
      statusCode = error.response?.status;
      errorMessage =
        (error.response?.data as { message?: string })?.message ||
        error.message;
      endpoint = error.config?.url;
    }

    Toast('destructive', errorMessage, '', 5000);
    throw error;
  }
};

// Type for the Toast function (add this if you don't have it defined elsewhere)

export default api;
