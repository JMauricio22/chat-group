import axios, { AxiosInstance } from 'axios';

export const fetch: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3300/api/v1',
});
