import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1', 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => {
    
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 400:
          alert("Bad Request: Please check your input.");
          break;
        case 401:
          localStorage.removeItem("access_token");
          localStorage.removeItem("userData");
          window.location.href = "/";
          break;
        case 404:
          alert("Resource Not Found: The requested resource could not be found.");
          break;
        case 500:
          alert("Server Error: Please try again later.");
          break;
        default:
          alert("An unexpected error occurred. Please try again.");
      }
    } else if (error.request) {
      
      alert("Network Error: Please check your internet connection.");
    } else {
      
      console.error("Error:", error.message);
      alert("An unexpected error occurred. Please try again.");
    }

    return Promise.reject(error); 
  }
);



export default api;
