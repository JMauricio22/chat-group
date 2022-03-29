import Cookies from 'js-cookie';
import { fetch } from '@services/config';

fetch.interceptors.request.use(
  function (config) {
    const token = Cookies.get('token');

    if (token) {
      (config.headers as any)['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
