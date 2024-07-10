import uploadImageFiles from "@/apis/UploadImageFiles"
import Popup from "@/components/Modals/Popup"
import ModalInput from "@/components/SignForm/ModalInput"
import { useData } from "@/context/DataContext"
import useChangePw from "@/hooks/useChangePw"
import { useState } from "react"

function ChangePassword() {
    const {
        password,
        handlePasswordChange,
        passwordError,
        passwordConfirm,
        handlePasswordConfirmChange,
        passwordConfirmError,
        isFormValid,
        openPopup,
        popupMessage,
        handleClosePopup,
        isLoading,
        success,
    } = useChangePw()
    const { userData } = useData()
    const [imageUrl, setImageUrl] = useState("")

    if (!userData) {
        return <div>로그인 해주세요</div>
    }

    return (
        <>
            <article>
                <form
                    className="width-90"
                    onSubmit={(e) => {
                        e.preventDefault()
                        //  handleSubmit()
                    }}>
                    <header>
                        <h1 className="text-align-center">비밀번호 변경</h1>
                    </header>
                    <main>
                        <ModalInput
                            type="password"
                            label="기존 비밀번호"
                            value={password}
                            onChange={handlePasswordChange}
                            errorMessage={passwordError}
                        />
                        <ModalInput
                            type="password"
                            label="변경할 비밀번호"
                            value={password}
                            onChange={handlePasswordChange}
                            errorMessage={passwordError}
                        />
                        <ModalInput
                            type="password"
                            label="변경할 비밀번호 확인 "
                            value={passwordConfirm}
                            onChange={handlePasswordConfirmChange}
                            errorMessage={passwordConfirmError}
                        />
                    </main>
                    <button
                        className="margin-button"
                        type="submit"
                        disabled={!isFormValid || isLoading}
                        aria-busy={isLoading ? "true" : "false"}>
                        비밀번호 변경
                    </button>
                </form>
                {/* <Popup isOpen={openPopup} closePopup={handleClosePopup} closeModal={closeModal} isSuccess={success}>
                    {popupMessage}
                </Popup> */}
            </article>
        </>
    )
}

export default ChangePassword
