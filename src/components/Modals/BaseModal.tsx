import Portal from "@/utils/Portal"
import React from "react"

interface Props {
    isOpen: boolean
    closeModal: () => void
    children: React.ReactNode
}

function BaseModal({ isOpen, closeModal, children }: Props) {
    const handleClickModalClose = () => {
        closeModal()
    }

    return (
        <>
            <Portal>
                <dialog open={isOpen} onClick={(e) => e.target == e.currentTarget && handleClickModalClose()}>
                    <article>
                        <div className="margin-popup">{children}</div>
                    </article>
                </dialog>
            </Portal>
        </>
    )
}

export default BaseModal
