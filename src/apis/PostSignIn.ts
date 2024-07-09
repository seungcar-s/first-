import axios from "axios"
import instance from "./axios"

interface Props {
    email: string
    password: string
}

async function postSignIn({ email, password }: Props) {
    try {
        const response = await instance.post("/auth/login", {
            email: email,
            password: password,
        })
        localStorage.setItem("token", response.data.accessToken)
        return response.data.accessToken
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message)
        } else {
            throw new Error("알 수 없는 오류가 발생하였습니다.")
        }
    }
}

export default postSignIn
