import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';

import { TOKEN_KEY } from '../constants/auth';
import { HTTP_METHODS } from '../constants/httpMethods';
import { getStorage } from '../utils/storage';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const handleRequest = (config: AxiosRequestConfig) => {
  const token = getStorage(TOKEN_KEY);

  return token
    ? ({
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      } as AxiosRequestConfig)
    : config;
};

const createApiMethod =
  (axiosInstance: AxiosInstance, methodType: Method) =>
  (config: AxiosRequestConfig) => {
    return axiosInstance({ ...handleRequest(config), method: methodType });
  };

export default {
  get: createApiMethod(axiosInstance, HTTP_METHODS.GET),
  post: createApiMethod(axiosInstance, HTTP_METHODS.POST),
  put: createApiMethod(axiosInstance, HTTP_METHODS.PUT),
  delete: createApiMethod(axiosInstance, HTTP_METHODS.DELETE),
};
