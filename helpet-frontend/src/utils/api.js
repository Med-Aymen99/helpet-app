import Axios from 'axios';
import { useAuth } from './auth/AuthContext';
import config from './config';


const apiInstance = Axios.create({
  baseURL: config.apiBaseUrl
});

export default function useApi() {
    const {auth} = useAuth();
    const token = auth.token || localStorage.getItem(config.storage.tokenKey);
    apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return apiInstance;
}