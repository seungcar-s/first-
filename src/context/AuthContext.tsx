import { useState, createContext, useEffect, useContext } from "react"

interface Props {
    auth: string
    setAuth: (auth: string) => void
}

const AuthContext = createContext<Props | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setAuth(token)
        } else {
            setAuth("")
        }
    }, [])

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("알 수 없는 에러")
    }
    return context
}
