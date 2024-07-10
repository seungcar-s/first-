import { useEffect, useState } from "react"
import ModalInput from "../SignForm/ModalInput"
import Popup from "./Popup"
import postNewMap from "@/apis/PostNewMap"
import { useData } from "@/context/DataContext"
import PutEditMap from "@/apis/PutEditMap"

interface MapLists {
    id: number
    title: string
    createdByMe: boolean
}

interface Props {
    isOpen: boolean
    modalType: "New" | "Edit" | ""
    closeModal: () => void
    data?: MapLists
}

function MyMap({ modalType, isOpen, closeModal, data }: Props) {
    const [openPopup, setOpenPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState("")
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [titleValue, setTitleValue] = useState("")
    const [titleError, setTitleError] = useState("")
    const { newData, setNewData } = useData()

    useEffect(() => {
        setTitleError("")
        if (modalType === "New") {
            setTitleValue("")
        }
        if (modalType === "Edit" && data) {
            setTitleValue(data.title)
        }
    }, [isOpen])

    const handleTitleChange = (value: string) => {
        setTitleValue(value)
        setTitleError(validateTitle({ value }))
    }

    const handleOpenPopup = (message: string) => {
        setPopupMessage(message)
        setOpenPopup(true)
    }

    const handleClosePopup = () => {
        setOpenPopup(false)
    }

    const handleNewMap = async () => {
        setIsLoading(true)
        try {
            await postNewMap({ title: titleValue })
            setSuccess(true)
            handleOpenPopup("새로운 Tmi 맵이 생성 되었습니다.")
            setNewData(!newData)
        } catch (error: any) {
            handleOpenPopup(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleEditMap = async () => {
        if (data) {
            setIsLoading(true)
            try {
                await PutEditMap({ title: titleValue, id: data.id })
                setSuccess(true)
                handleOpenPopup("Tmi 맵이 수정 되었습니다.")
                setNewData(!newData)
            } catch (error: any) {
                // handleOpenPopup(error)
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
    }

    const validateTitle = ({ value }: { value: string }) => {
        const trimmedValue = value.trim()
        if (!trimmedValue) {
            return "제목을 입력해 주세요"
        }
        if (trimmedValue.length > 10) {
            return "제목은 10자 이하로 작성해주세요."
        }
        return ""
    }

    return (
        <>
            <form
                className="width-90"
                onSubmit={(e) => {
                    e.preventDefault()
                    modalType === "New" ? handleNewMap() : handleEditMap()
                }}>
                <header>
                    <h1 className="text-align-center">{modalType === "New" ? "새로운 Tmi 맵 생성" : "Tmi 맵 수정"}</h1>
                </header>
                <main>
                    <ModalInput
                        type="text"
                        label="맵 이름"
                        value={titleValue}
                        onChange={handleTitleChange}
                        errorMessage={titleError}
                    />
                </main>
                <button
                    className="margin-button"
                    type="submit"
                    disabled={!titleValue || !!titleError || isLoading}
                    aria-busy={isLoading ? "true" : "false"}>
                    {modalType === "New" ? "생성하기" : "수정하기"}
                </button>
            </form>
            <Popup isOpen={openPopup} closePopup={handleClosePopup} closeModal={closeModal} isSuccess={success}>
                {popupMessage}
            </Popup>
        </>
    )
}

export default MyMap
