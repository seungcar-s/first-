import Portal from "@/utils/Portal"
import React, { useEffect } from "react"

interface Props {
    isOpen: boolean
    closePopup: () => void
    closeModal?: () => void
    isSuccess?: boolean
    children: React.ReactNode
}

function Popup({ isOpen, closePopup, closeModal = undefined, isSuccess = false, children }: Props) {
    const handleClickPopupClose = () => {
        closePopup()
        if (isSuccess && closeModal) {
            closeModal()
        }
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                event.preventDefault()
                event.stopPropagation()
                handleClickPopupClose()
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown)
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isOpen, isSuccess])

    return (
        <Portal>
            <dialog open={isOpen} onClick={(e) => e.target == e.currentTarget && handleClickPopupClose()}>
                <article className="popup">
                    <div className="margin-popup">
                        <h2>{children}</h2>
                        <footer>
                            <button className="width-50" onClick={handleClickPopupClose}>
                                확인
                            </button>
                        </footer>
                    </div>
                </article>
            </dialog>
        </Portal>
    )
}

export default Popup
