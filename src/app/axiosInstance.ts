import axios from 'axios';
import { validateAuthToken } from '../utils/validateJWT/validateJWT';

export const axiosInstance = axios.create({
  baseURL: 'https://api.apescommunity.com/v2/',
  // baseURL: 'http://localhost:5200/v2/',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  }
});

axiosInstance.interceptors.request.use(validateAuthToken);
