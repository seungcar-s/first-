import { useAuth } from "@/context/AuthContext"
import { Link } from "react-router-dom"
import BaseModal from "./Modals/BaseModal"
import Popup from "./Modals/Popup"
// import { useState } from "react"
import { useData } from "@/context/DataContext"
import useSideBar from "@/hooks/useSidebar"

function SideBar() {
    const { canScroll, scrollContainerRef, handleGetPrevData, handleGetNextData, selected, handleSelect } = useSideBar()
    const { userData, mapLists } = useData()
    const { auth } = useAuth()
    // const [openModal, setOpenModal] = useState(false)
    // const [openPopup, setOpenPopup] = useState(false)
    // const [popupMessage, setPopupMessage] = useState("")
    // const [title, setTitle] = useState(false)

    if (!auth) {
        return null
    }

    // const handleNewMap = () => {
    //     setTitle(true)
    //     setOpenModal(true)
    // }

    // const handleCloseModal = () => {
    //     setTitle(false)
    //     setOpenModal(false)
    // }

    // const handleOpenPopup = (message: string) => {
    //     setPopupMessage(message)
    //     setOpenPopup(true)
    // }

    // const handleClosePopup = () => {
    //     setOpenPopup(false)
    // }

    return (
        <>
            <aside className="fixed">
                <button id="newMap" className="outline">
                    친구 신청 하기
                </button>
                <nav className="overflow" ref={scrollContainerRef}>
                    <ul>
                        {mapLists.map((data, index) => (
                            <Link
                                className="text-default-color"
                                to={`/friend-utmi/${data.id}`}
                                key={data.id}
                                state={{ data: data }}>
                                <li
                                    className={`cursor width-90 ${selected === index ? "side-title" : "side-hover"}`}
                                    onClick={() => handleSelect(index)}>
                                    {data.title}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </nav>
                {canScroll && (
                    <li id="button">
                        <button className="scroll-button" onClick={handleGetPrevData}>
                            ↑
                        </button>
                        <button className="scroll-button" onClick={handleGetNextData}>
                            ↓
                        </button>
                    </li>
                )}
            </aside>
            {/* <BaseModal isOpen={openModal} closeModal={handleCloseModal}>
                {title ? <NewMap closeModal={handleCloseModal} /> : <div></div>}
            </BaseModal>
            <Popup isOpen={openPopup} closePopup={handleClosePopup}>
                {popupMessage}
            </Popup> */}
        </>
    )
}

export default SideBar
