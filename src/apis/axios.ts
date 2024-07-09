import axios from "axios"

const instance = axios.create({
    baseURL: "https://sp-taskify-api.vercel.app/4-31",
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default instance
