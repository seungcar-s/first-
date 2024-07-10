import { useData } from "@/context/DataContext"
import { useEffect, useRef, useState } from "react"

function useElementHeight() {
    // const [canScroll, setCanScroll] = useState(false)
    const scrollContainerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleResize = () => {
            if (scrollContainerRef.current) {
                const headerHeight = document.getElementById("header")?.clientHeight ?? 0
                const windowHeight = window.innerHeight
                const elementHeight = windowHeight - headerHeight - 19
                scrollContainerRef.current.style.height = `${elementHeight}px`
                // const { scrollHeight } = scrollContainerRef.current
                // setCanScroll(scrollHeight > elementHeight)
            }
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return {
        // canScroll,
        scrollContainerRef,
    }
}

export default useElementHeight
