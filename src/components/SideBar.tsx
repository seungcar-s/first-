import useSideBar from "@/hooks/useSidebar"
import { useAuth } from "@/context/AuthContext"
import BaseModal from "./Modals/BaseModal"
import Popup from "./Modals/Popup"
import NewMap from "./Modals/NewMap"
import { Link } from "react-router-dom"

function SideBar() {
    const {
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
        handleClosePopup,
        selected,
        handleSelect,
    } = useSideBar(20)

    const { auth } = useAuth()

    if (!auth) {
        return null
    }

    return (
        <>
            <aside className="fixed">
                <button id="newMap" className="outline" onClick={handleNewMap}>
                    새로운 Tmi 맵 생성
                </button>
                <nav className="overflow" ref={scrollContainerRef}>
                    <ul>
                        {titleLists.map((data, index) => (
                            <Link className="text-default-color" to={`/tmiMap/${data.id}`} key={data.id}>
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
            <BaseModal isOpen={openModal} closeModal={handleCloseModal}>
                {title ? <NewMap closeModal={handleCloseModal} /> : <div></div>}
            </BaseModal>
            <Popup isOpen={openPopup} closePopup={handleClosePopup}>
                {popupMessage}
            </Popup>
        </>
    )
}

export default SideBar
