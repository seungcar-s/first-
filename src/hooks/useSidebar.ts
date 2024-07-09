import { useEffect, useRef, useState } from "react"
import getMapLists from "@/apis/GetMapLists"
import { useAuth } from "@/context/AuthContext"

interface TitleLists {
    id: number
    title: string
}

function useSideBar(maximum: number) {
    const [openModal, setOpenModal] = useState(false)
    const [openPopup, setOpenPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState("")
    const [title, setTitle] = useState(false)
    const [canScroll, setCanScroll] = useState(false)
    const [selected, setSelected] = useState(0)
    const [titleLists, setTitleLists] = useState<TitleLists[]>([])
    const scrollContainerRef = useRef<HTMLDivElement | null>(null)
    const { auth } = useAuth()

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
        const fetchMapLists = async () => {
            try {
                const data = await getMapLists(maximum)
                setTitleLists(data.dashboards)
            } catch (error) {
                console.error("에러처리 나중에")
            }
        }

        fetchMapLists()
    }, [openModal, auth])

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
    }, [titleLists])

    const handleNewMap = () => {
        if (titleLists.length >= maximum) {
            handleOpenPopup(`더 이상 만들 수 없습니다. ( 최대 ${maximum}개 )`)
            return
        }
        setTitle(true)
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setTitle(false)
        setOpenModal(false)
    }

    const handleOpenPopup = (message: string) => {
        setPopupMessage(message)
        setOpenPopup(true)
    }

    const handleClosePopup = () => {
        setOpenPopup(false)
    }

    const handleSelect = (index: number) => {
        setSelected(index)
    }

    return {
        openModal,
        openPopup,
        popupMessage,
        title,
        canScroll,
        titleLists,
        scrollContainerRef,
        handleGetPrevData,
        handleGetNextData,
        handleNewMap,
        handleCloseModal,
        handleOpenPopup,
        handleClosePopup,
        selected,
        handleSelect,
    }
}

export default useSideBar
