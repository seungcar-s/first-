import { createContext, useContext, useState, useEffect } from "react"

const DarkModeContext = createContext({
    isDarkMode: false,
    toggleDarkMode: () => {},
})

export const DarkModeProvider = ({ children }: { children: React.ReactNode }) => {
    const localDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    const [isDarkMode, setIsDarkMode] = useState(localDarkMode)

    useEffect(() => {
        document.documentElement.dataset.theme = isDarkMode ? "dark" : "light"
    }, [isDarkMode])

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
    }

    return <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>
}

export const useDarkMode = () => useContext(DarkModeContext)
