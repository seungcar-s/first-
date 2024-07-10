import axios from "axios"
import instance from "./axios"

interface Props {
    title: string
    id: number
}

async function PutEditMap({ title, id }: Props) {
    try {
        const response = await instance.put(`/dashboards/${id}`, {
            title: title,
            color: "#000000",
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

export default PutEditMap
