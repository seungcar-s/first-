import React, { createContext, useContext, useState, useEffect } from "react"
import getUserInfo from "@/apis/GetUserInfo"
import { useAuth } from "./AuthContext"

interface Response {
    email: string
    nickname: string
    profileImageUrl: string
}

interface UserContextType {
    userData: Response | null
    setUserData: React.Dispatch<React.SetStateAction<Response | null>>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [userData, setUserData] = useState<Response | null>(null)
    const { auth, setAuth } = useAuth()

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await getUserInfo()
                setUserData(response)
            } catch (error) {
                setAuth("")
                localStorage.clear()
            }
        }
        fetchUserInfo()
    }, [auth])

    return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("알수 없는 에러")
    }
    return context
}
