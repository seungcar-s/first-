import axios from "axios"
import instance from "./axios"

interface Props {
    email: string
    nickname: string
    password: string
}

async function postSignUp({ email, nickname, password }: Props) {
    try {
        const response = await instance.post("/users/", {
            email: email,
            nickname: nickname,
            password: password,
        })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message)
        } else {
            throw new Error("알 수 없는 오류가 발생하였습니다.")
        }
    }
}

export default postSignUp
