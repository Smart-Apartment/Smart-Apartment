import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create();

api.interceptors.request.use(
  async (config) => {
    const token = Cookies.get('token');
    if (token) {
      const expirationTime = getTokenExpirationTime(token);

      const isTokenExpired = expirationTime && expirationTime < Date.now() + 5 * 60 * 1000;

      if (isTokenExpired) {
        try {
          const response = await axios.post('http://127.0.0.1:8000/auth/refresh', {}, { withCredentials: true });

          if (response.status === 200) {
            const newToken = response.data.access_token;
            Cookies.set('token', newToken);
            config.headers.Authorization = `Bearer ${newToken}`;
          }
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          Cookies.remove('token');
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function getTokenExpirationTime(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    if (payload && payload.exp) {
      return payload.exp * 1000; 
    }
  } catch (error) {
    console.error('Error parsing token:', error);
  }
  return null;
}

export default api;
