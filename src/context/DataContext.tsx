import React, { createContext, useContext, useState, useEffect } from "react"
import getUserInfo from "@/apis/GetUserInfo"
import { useAuth } from "./AuthContext"
import getMapLists from "@/apis/GetMapLists"

interface MyInfo {
    email: string
    nickname: string
    profileImageUrl: string
}

interface MapLists {
    id: number
    title: string
    createdByMe: boolean
}

interface DataContext {
    userData: MyInfo | null
    mapLists: MapLists[]
    myMap: MapLists[]
    isLoading: boolean
    isError: boolean
    newData: boolean
    setNewData: React.Dispatch<React.SetStateAction<boolean>>
    imageUrl: string | null
    setImageUrl: (url: string | null) => void
}

const DataContext = createContext<DataContext | undefined>(undefined)

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [userData, setUserData] = useState<MyInfo | null>(null)
    const [mapLists, setMapLists] = useState<MapLists[]>([])
    const [myMap, setMyMap] = useState<MapLists[]>([])
    const { auth, setAuth } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [newData, setNewData] = useState(false)
    const [imageUrl, setImageUrl] = useState<string | null>(null)

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await getUserInfo()
                setUserData(response)
                if (response?.profileImageUrl) {
                    if (response.profileImageUrl.includes("fake-profile-")) {
                        const checkUrl = response.profileImageUrl.replace(
                            "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/",
                            ""
                        )
                        return setImageUrl(checkUrl)
                    }
                }
                return setImageUrl(response.profileImageUrl)
            } catch (error) {
                setAuth("")
                localStorage.clear()
            }
        }

        fetchUserInfo()
    }, [auth, setAuth, newData]) //나중에 개인정보 수정하면 newData도 의존배열넣어서 렌더링되게

    useEffect(() => {
        const fetchData = async () => {
            if (auth) {
                setIsLoading(true)
                setIsError(false)
                try {
                    const data = await getMapLists(50)
                    const allMapLists = data.dashboards
                    const createdFalseLists = allMapLists.filter((item: MapLists) => !item.createdByMe)
                    const createdTrueLists = allMapLists.filter((item: MapLists) => item.createdByMe)
                    setMapLists(createdFalseLists)
                    setMyMap(createdTrueLists)
                } catch (error) {
                    setIsError(true)
                } finally {
                    setIsLoading(false)
                }
            } else {
                setMapLists([])
                setMyMap([])
            }
        }
        fetchData()
    }, [newData, auth])

    return (
        <DataContext.Provider
            value={{ userData, mapLists, myMap, isLoading, isError, newData, setNewData, imageUrl, setImageUrl }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => {
    const context = useContext(DataContext)
    if (!context) {
        throw new Error("알수 없는 에러")
    }
    return context
}
