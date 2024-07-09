import instance from "./axios"

async function getMapInfo(id: number) {
    const response = await instance.get(`/dashboards/${id}`, {})
    return response.data
}

export default getMapInfo
