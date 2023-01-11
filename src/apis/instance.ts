import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';

import { HTTP_METHODS } from '../constants/httpMethods';
import { getLocalStorage } from '../utils/storage';

const TOKEN_KEY = 'token';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const handleRequest = (config: AxiosRequestConfig) => {
  const token = getLocalStorage(TOKEN_KEY);

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
