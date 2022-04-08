import axios, { AxiosInstance } from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API}/api/v1`;

export const fetch: AxiosInstance = axios.create({
  baseURL: API_URL,
});
