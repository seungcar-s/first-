import instance from "./axios"
interface Response {
    profileImageUrl: string
}

const uploadImageFiles = async (file: File): Promise<Response> => {
    const formData = new FormData()
    formData.append("image", file)

    try {
        const response = await instance.post("/users/me/image", formData)
        return response.data
    } catch (error) {
        throw error
    }
}

export default uploadImageFiles
