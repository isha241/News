import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://newsapi.org",
});

export default axiosInstance;
