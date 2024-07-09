import { useState } from "react"
import ModalInput from "../SignForm/ModalInput"
import Popup from "./Popup"
import postNewMap from "@/apis/PostNewMap"

function NewMap({ closeModal }: { closeModal: () => void }) {
    const [openPopup, setOpenPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState("")
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [titleValue, setTitleValue] = useState("")
    const [titleError, setTitleError] = useState("")

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

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            await postNewMap({ title: titleValue })
            setSuccess(true)
            handleOpenPopup("새로운 Tmi 맵이 생성 되었습니다.")
        } catch (error: any) {
            handleOpenPopup(error.message)
        } finally {
            setIsLoading(false)
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
                    handleSubmit()
                }}>
                <header>
                    <h1 className="text-align-center">새로운 Tmi 맵 생성</h1>
                </header>
                <main>
                    <ModalInput
                        type="text"
                        label="이름"
                        value={titleValue}
                        onChange={handleTitleChange}
                        errorMessage={titleError}
                    />
                </main>
                <button
                    type="submit"
                    disabled={!titleValue || !!titleError || isLoading}
                    aria-busy={isLoading ? "true" : "false"}>
                    생성하기
                </button>
            </form>
            <Popup isOpen={openPopup} closePopup={handleClosePopup} closeModal={closeModal} isSuccess={success}>
                {popupMessage}
            </Popup>
        </>
    )
}

export default NewMap
