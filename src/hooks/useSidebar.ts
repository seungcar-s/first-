import { useData } from "@/context/DataContext"
import { useEffect, useRef, useState } from "react"

function useSideBar() {
    const [canScroll, setCanScroll] = useState(false)
    const [selected, setSelected] = useState(0)
    const scrollContainerRef = useRef<HTMLDivElement | null>(null)
    const { mapLists } = useData()

    const handleGetPrevData = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                top: -45,
                behavior: "smooth",
            })
        }
    }

    const handleGetNextData = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                top: 45,
                behavior: "smooth",
            })
        }
    }

    useEffect(() => {
        const handleResize = () => {
            if (scrollContainerRef.current) {
                const headerHeight = document.getElementById("header")?.clientHeight ?? 0
                const buttonHeight = document.getElementById("button")?.clientHeight ?? 0
                const newMapHeight = document.getElementById("newMap")?.clientHeight ?? 0
                const windowHeight = window.innerHeight
                const navHeight = windowHeight - headerHeight - buttonHeight - newMapHeight
                scrollContainerRef.current.style.height = `${navHeight}px`
                const { scrollHeight } = scrollContainerRef.current
                setCanScroll(scrollHeight > navHeight)
            }
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [mapLists])

    const handleSelect = (index: number) => {
        setSelected(index)
    }

    return {
        canScroll,
        scrollContainerRef,
        handleGetPrevData,
        handleGetNextData,
        selected,
        handleSelect,
    }
}

export default useSideBar
