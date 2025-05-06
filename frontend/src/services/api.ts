import axios from "axios";

const API_URLS = {
  userService: import.meta.env.VITE_API_USER_URL || "http://localhost:5000",
  blogService: import.meta.env.VITE_API_BLOG_URL || "http://localhost:5001",
};

const userApi = axios.create({
  baseURL: API_URLS.userService,
  headers: {
    "Content-Type": "application/json",
  },
});

const blogApi = axios.create({
  baseURL: API_URLS.blogService,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to add auth token
const addAuthToken = (config: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

userApi.interceptors.request.use(addAuthToken);
blogApi.interceptors.request.use(addAuthToken);

export { userApi, blogApi };
