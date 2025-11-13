import axios, { AxiosInstance } from 'axios';
import { useAuthSessionStore } from '../../../features/auth/state/authSession.store';

const { token } = useAuthSessionStore();

console.log('token', token);

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
