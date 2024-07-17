import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.log(error)
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use((response) => {
    if (response.config.parse) {
        return response.data
        //perform the manipulation here and change the response object
    }
    return response;
}, (error) => {
    if (error.response.status == 401) {
        Cookies.remove('token')
        window.location.href = "/auth/login"
    }
    return Promise.reject(error.message);
});


export default axiosInstance;
