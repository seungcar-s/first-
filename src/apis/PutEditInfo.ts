import axios from "axios"
import instance from "./axios"

interface Props {
    nickname: string
    profileImageUrl?: string | null
}

async function PutEditInfo({ nickname, profileImageUrl = null }: Props) {
    try {
        const response = await instance.put(`/users/me`, {
            nickname: nickname,
            profileImageUrl: profileImageUrl,
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

export default PutEditInfo
