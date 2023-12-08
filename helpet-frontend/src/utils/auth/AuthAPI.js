
import api from './../api';

export const getCurrentUser = async (token) => {
  try {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error;
  }
};
