import axios from "axios"


export const axiosInstance = axios.create(
    {
        baseURL: "https://real-time-chat-application-xc7n.onrender.com/api",
        withCredentials: true
    }
)
