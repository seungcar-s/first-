import Popup from "./Popup"
import ModalInput from "../SignForm/ModalInput"
import useSignIn from "@/hooks/useSignIn"

function SignIn({ closeModal }: { closeModal: () => void }) {
    const {
        email,
        handleEmailChange,
        emailError,
        password,
        handlePasswordChange,
        passwordError,
        handleSubmit,
        isFormValid,
        openPopup,
        popupMessage,
        handleClosePopup,
        isLoading,
        success,
    } = useSignIn(closeModal)

    return (
        <>
            <form
                className="width-90"
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}>
                <header>
                    <h1 className="text-align-center">로그인</h1>
                </header>
                <main>
                    <ModalInput
                        type="text"
                        label="이메일"
                        value={email}
                        onChange={handleEmailChange}
                        errorMessage={emailError}
                    />
                    <ModalInput
                        type="password"
                        label="비밀번호"
                        value={password}
                        onChange={handlePasswordChange}
                        errorMessage={passwordError}
                    />
                </main>
                <button
                    className="margin-button"
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    aria-busy={isLoading ? "true" : "false"}>
                    로그인
                </button>
            </form>
            <Popup isOpen={openPopup} closePopup={handleClosePopup} closeModal={closeModal} isSuccess={success}>
                {popupMessage}
            </Popup>
        </>
    )
}

export default SignIn
