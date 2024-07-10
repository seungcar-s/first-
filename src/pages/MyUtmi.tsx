import BaseModal from "@/components/Modals/BaseModal"
import MyMap from "@/components/Modals/MyMap"
import { useDarkMode } from "@/context/DarkModeContext"
import { useData } from "@/context/DataContext"
import useElementHeight from "@/hooks/useElementHeight"
import { useState } from "react"

function MyUtmi() {
    const { isLoading, isError, myMap, userData } = useData()
    const [openModal, setOpenModal] = useState(false)
    const { isDarkMode } = useDarkMode()
    const { scrollContainerRef } = useElementHeight()
    const [modalType, setModalType] = useState<"New" | "Edit" | "">("")

    const handleNewMap = () => {
        if (myMap.length > 0) {
            return window.location.reload()
        }
        setModalType("New")
        setOpenModal(true)
    }

    const handleEditMap = () => {
        setModalType("Edit")
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
        setModalType("")
    }

    return (
        <>
            <article className="center overflow" ref={scrollContainerRef}>
                {isLoading ? (
                    <h1>로딩 중..</h1>
                ) : isError ? (
                    <h1>에러</h1>
                ) : myMap.length === 0 ? (
                    <div className="center-col">
                        <h1>환영합니다!</h1>
                        <h2>{userData?.nickname} 님</h2>
                        <div className="center">
                            <button className="margin-button" onClick={handleNewMap}>
                                클릭해서 맵 생성
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="circle relative center bg-default padding-15">
                        {myMap[0].title}
                        <img
                            src="/public/pen-icon.svg"
                            alt="맵 정보 수정 아이콘"
                            className="absolute circle-button mini-circle"
                            onClick={handleEditMap}
                        />
                    </div>
                )}
            </article>
            <BaseModal isOpen={openModal} closeModal={handleCloseModal}>
                {modalType ? (
                    <MyMap isOpen={openModal} modalType={modalType} closeModal={handleCloseModal} data={myMap[0]} />
                ) : null}
            </BaseModal>
        </>
    )
}

export default MyUtmi
