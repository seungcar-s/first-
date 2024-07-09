import getMapInfo from "@/apis/GetMapInfo"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

interface Props {
    id: number
    title: string
}

const TmiMapPage = () => {
    const { id } = useParams()
    const [data, setData] = useState<Props>()

    useEffect(() => {
        const fetchMapLists = async () => {
            try {
                const data = await getMapInfo(Number(id))
                setData(data)
            } catch (error) {
                console.error("에러처리 나중에")
            }
        }

        fetchMapLists()
    }, [id])

    return (
        <div>
            <h1>{data?.title}</h1>
        </div>
    )
}

export default TmiMapPage
