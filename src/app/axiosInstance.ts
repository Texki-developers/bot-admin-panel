import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5200/v2/',
  // baseURL: 'https://api.splicex.ae/api/v1/',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
  withCredentials: true
});

// axiosInstance.interceptors.request.use(validateAuthToken);
