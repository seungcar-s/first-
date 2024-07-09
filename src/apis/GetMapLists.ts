import instance from "./axios"

async function getMapLists(maximum: number) {
    const response = await instance.get("/dashboards", {
        params: {
            navigationMethod: "infiniteScroll",
            size: maximum,
        },
    })
    return response.data
}

export default getMapLists
