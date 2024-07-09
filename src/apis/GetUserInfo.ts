import instance from "./axios"

async function getUserInfo() {
    const token = localStorage.getItem("token")
    if (token) {
        try {
            const response = await instance.get("/users/me")
            return response.data
        } catch (error) {
            throw new Error()
        }
    }
}

export default getUserInfo
